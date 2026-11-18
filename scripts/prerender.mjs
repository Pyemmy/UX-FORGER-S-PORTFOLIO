// Pre-renders the React app into dist/index.html after `vite build`.
// The page shows real content before any JavaScript runs; React then hydrates it.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const htmlPath = path.join(root, 'dist', 'index.html');

const { render } = await import(pathToFileURL(ssrEntry).href);
const template = await readFile(htmlPath, 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('dist/index.html is missing the <!--app-html--> marker');

// Preload the two fonts used above the fold so text renders in-brand without waiting for CSS to parse
const assets = await readdir(path.join(root, 'dist', 'assets'));
const preloadFonts = [/^plus-jakarta-sans-latin-wght-normal-.*\.woff2$/, /^bricolage-grotesque-latin-wght-normal-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

// Paint first, then hydrate: pull the module entry + modulepreloads out of <head> and load them
// right after the first frame, so the pre-rendered page never waits on JavaScript to appear.
const entryMatch = template.match(/\s*<script type="module" crossorigin src="([^"]+)"><\/script>/);
if (!entryMatch) throw new Error('Could not find the module entry script in dist/index.html');
const modulePreloads = [...template.matchAll(/\s*<link rel="modulepreload" crossorigin href="([^"]+)">/g)];
let shell = template.replace(entryMatch[0], '');
for (const m of modulePreloads) shell = shell.replace(m[0], '');

const loader = `<script>
      (function () {
        var done = false;
        function boot() {
          if (done) return;
          done = true;
          ${JSON.stringify(modulePreloads.map((m) => m[1]))}.forEach(function (href) {
            var l = document.createElement('link');
            l.rel = 'modulepreload';
            l.crossOrigin = '';
            l.href = href;
            document.head.appendChild(l);
          });
          var s = document.createElement('script');
          s.type = 'module';
          s.crossOrigin = '';
          s.src = ${JSON.stringify(entryMatch[1])};
          document.head.appendChild(s);
        }
        requestAnimationFrame(function () { setTimeout(boot, 0); });
        setTimeout(boot, 1200); // background tabs don't run rAF
      })();
    </script>`;

const html = shell
  .replace('<!--app-html-->', render())
  .replace('</head>', `    ${preloadFonts}\n  </head>`)
  .replace('</body>', `    ${loader}\n  </body>`);
await writeFile(htmlPath, html);
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`✓ pre-rendered dist/index.html (${(html.length / 1024).toFixed(1)} kB)`);
