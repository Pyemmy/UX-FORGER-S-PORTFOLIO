import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { sounds } from '../../utils/audio';
import { SPRING_SNAPPY } from '../../utils/motion';

interface ToastItem {
  id: number;
  message: string;
}

interface ToastApi {
  toast: (message: string) => void;
  /** Copy text to the clipboard, play the success chime, and confirm with a toast. */
  copy: (text: string, message?: string) => Promise<boolean>;
}

const ToastContext = createContext<ToastApi | null>(null);

const fallbackCopy = (text: string) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(el);
  return ok;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const toast = useCallback((message: string) => {
    const id = nextId.current++;
    // Only keep the latest two toasts on screen
    setItems((prev) => [...prev.slice(-1), { id, message }]);
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2400);
  }, []);

  const copy = useCallback(
    async (text: string, message = 'Copied to clipboard') => {
      let ok = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          ok = true;
        }
      } catch {
        ok = false;
      }
      if (!ok) ok = fallbackCopy(text);
      if (ok) {
        sounds.playChime();
        toast(message);
      } else {
        toast(`Couldn't copy — ${text}`);
      }
      return ok;
    },
    [toast],
  );

  const api = useMemo(() => ({ toast, copy }), [toast, copy]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[90] flex flex-col items-center gap-2 px-4"
      >
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={SPRING_SNAPPY}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-ink px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)]"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sun text-ink">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
