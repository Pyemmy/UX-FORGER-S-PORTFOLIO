import React from 'react';
import { Layers, Image as ImageIcon, ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface FrostedCanvasFrameProps {
  project: ProjectItem;
  onClickCaseStudy: () => void;
}

export const FrostedCanvasFrame: React.FC<FrostedCanvasFrameProps> = ({
  project,
  onClickCaseStudy,
}) => {
  const isMobileApp =
    project.id === 'pocketa-proj' ||
    project.id === 'carecell-proj' ||
    project.id === 'smartajo-proj';

  // If a high-fidelity production mockup is provided (e.g. QAS Compliance Web)
  if (project.mockupImage) {
    return (
      <div className="w-full relative group">
        {/* Outer Glow / Drop Shadow */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-white/25 via-white/10 to-transparent rounded-3xl blur-lg -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Frame Container */}
        <div
          onClick={onClickCaseStudy}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/60 bg-white/90 backdrop-blur-md shadow-2xl p-3 sm:p-4 transition-all duration-300 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
        >
          {/* Top Browser / Chrome Status Bar */}
          <div className="flex items-center justify-between pb-2.5 px-1 border-b border-black/10 select-none">
            {/* Traffic Lights & Live URL */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
              </div>
              <div className="px-2.5 py-0.5 bg-black/5 rounded-full text-[10px] font-mono text-[#52525B] font-semibold flex items-center gap-1.5 border border-black/5 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="truncate max-w-[170px] sm:max-w-none">
                  {project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.slug}.vercel.app`}
                </span>
              </div>
            </div>

            {/* Read Case Study Badge */}
            <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#3062F7] group-hover:underline">
              <span>Inspect Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Central Mockup Container (aspect-[4/3] matches 1920x1440 100% perfectly) */}
          <div className="relative my-2.5 w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#15463f] border border-black/15 shadow-inner group/img">
            <img
              src={project.mockupImage}
              alt={`${project.title} Web Application Mockup`}
              className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-[1.015]"
              loading="eager"
            />

            {/* Subtle Interactive Hover Pill */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/25 text-white text-xs font-mono font-bold shadow-xl flex items-center gap-2">
                <span>Click to inspect full architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F4BE24]" />
              </div>
            </div>
          </div>

          {/* Footer Metadata Strip */}
          <div className="flex items-center justify-between pt-2 px-1 border-t border-black/10 text-[10px] font-mono text-[#71717A] select-none">
            <span className="font-semibold text-[#141618] truncate">
              {project.clientOrOrg} · {project.role}
            </span>
            <span className="font-bold text-[#141618] shrink-0 ml-2">
              {project.awardOrBadge || `${project.year} Shipped Build`}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative group">
      {/* Outer Glow / Drop Shadow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-black/5 via-black/10 to-black/5 rounded-3xl blur-md -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Frame Container */}
      <div
        onClick={onClickCaseStudy}
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/60 bg-white/75 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:shadow-2xl cursor-pointer ${
          isMobileApp
            ? 'max-w-[340px] mx-auto aspect-[9/16] p-4 flex flex-col justify-between'
            : 'w-full aspect-[16/10] p-4 sm:p-6 flex flex-col justify-between'
        }`}
      >
        {/* Device/Browser Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-black/10 select-none">
          {/* Traffic lights or status pill */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
          </div>

          {/* Browser Address / Viewport pill */}
          <div className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-mono text-[#52525B] font-semibold flex items-center gap-1.5 border border-black/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA06A]" />
            <span className="truncate max-w-[160px]">
              {project.slug}.uxforger.live
            </span>
          </div>

          {/* Canvas Tag */}
          <div className="text-[10px] font-mono font-bold text-[#8A8275]">
            {isMobileApp ? 'MOBILE · 9:16' : 'DESKTOP · 16:10'}
          </div>
        </div>

        {/* Central Frosted Technical Grid Placeholder */}
        <div className="relative flex-1 my-3 rounded-xl border border-dashed border-black/15 bg-gradient-to-b from-black/[0.02] to-black/[0.05] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden group-hover:border-black/30 transition-colors">
          {/* Subtle Technical Grid Lines */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #141618 1px, transparent 1px), linear-gradient(to bottom, #141618 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Large Monogram Watermark */}
          <div className="absolute font-display font-black text-7xl sm:text-9xl text-black/[0.04] pointer-events-none select-none tracking-tighter">
            {project.monogram}
          </div>

          {/* Corner Crosshairs */}
          <span className="absolute top-2 left-2 text-xs font-mono text-black/30">+</span>
          <span className="absolute top-2 right-2 text-xs font-mono text-black/30">+</span>
          <span className="absolute bottom-2 left-2 text-xs font-mono text-black/30">+</span>
          <span className="absolute bottom-2 right-2 text-xs font-mono text-black/30">+</span>

          {/* Central Information Stamp */}
          <div className="relative z-10 flex flex-col items-center gap-2 max-w-xs">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-black/10 flex items-center justify-center text-[#141618] group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5 text-[#8A8275] group-hover:text-[#141618] transition-colors" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-black/10 text-[10px] font-mono font-bold text-[#141618] shadow-2xs mb-1">
                <span>PROJECT SCREENSHOT CANVAS</span>
              </div>
              <p className="text-xs font-sans font-semibold text-[#141618] leading-tight">
                {project.title}
              </p>
              <p className="text-[10px] font-mono text-[#71717A] mt-1">
                Click to inspect full case study &amp; architecture
              </p>
            </div>
          </div>
        </div>

        {/* Footer Meta Strip */}
        <div className="flex items-center justify-between pt-2 border-t border-black/10 text-[10px] font-mono text-[#71717A] select-none">
          <span className="font-semibold text-[#141618]">
            {project.role} · {project.year}
          </span>
          <div className="flex items-center gap-1 text-[#3062F7] font-bold group-hover:underline">
            <span>Read Case Study</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
