import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

// Generate placeholder images for the marquee
const row1 = [1, 2, 3, 4, 5, 6];
const row2 = [7, 8, 9, 10, 11, 12];

const CarouselCard: React.FC<{ id: number, color: string }> = ({ id, color }) => (
  <div className="flex-shrink-0 w-[240px] h-[320px] mx-4 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden hover:scale-105 transition-transform duration-300 group cursor-pointer">
     <div className={`h-2/3 ${color} relative`}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
        {/* Mock Design Elements */}
        <div className="p-6">
           <div className="w-8 h-8 bg-white/30 rounded-full mb-4 backdrop-blur-sm"></div>
           <div className="h-4 bg-white/40 rounded w-3/4 mb-2"></div>
           <div className="h-4 bg-white/40 rounded w-1/2"></div>
        </div>
     </div>
     <div className="h-1/3 p-4 flex flex-col justify-between bg-white">
        <div className="flex gap-1">
           <div className="w-full h-16 bg-slate-50 rounded border border-slate-100"></div>
           <div className="w-8 h-16 bg-slate-50 rounded border border-slate-100 opacity-50"></div>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase">Business Template {id}</div>
     </div>
  </div>
);

export const TemplateGallery: React.FC = () => {
  return (
    <section id="templates" className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-900/20 to-slate-900 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <Reveal>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Endless inspiration
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Choose from hundreds of professionally designed templates or let AI build one for you from scratch.
          </p>
        </Reveal>
      </div>

      {/* Marquee Row 1 (Left) */}
      <div className="relative flex overflow-x-hidden mb-8 group">
         <div className="animate-scroll flex items-center whitespace-nowrap hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((i, idx) => (
               <CarouselCard key={`${i}-${idx}`} id={i} color={idx % 2 === 0 ? 'bg-primary-500' : 'bg-indigo-500'} />
            ))}
         </div>
         <div className="absolute top-0 animate-scroll flex items-center whitespace-nowrap hover:[animation-play-state:paused]" aria-hidden="true">
            {[...row1, ...row1, ...row1].map((i, idx) => (
               <CarouselCard key={`clone-${i}-${idx}`} id={i} color={idx % 2 === 0 ? 'bg-primary-500' : 'bg-indigo-500'} />
            ))}
         </div>
      </div>

      {/* Marquee Row 2 (Right) */}
      <div className="relative flex overflow-x-hidden group">
         <div className="animate-scroll-reverse flex items-center whitespace-nowrap hover:[animation-play-state:paused]">
            {[...row2, ...row2, ...row2].map((i, idx) => (
               <CarouselCard key={`${i}-${idx}`} id={i} color={idx % 2 === 0 ? 'bg-rose-500' : 'bg-amber-500'} />
            ))}
         </div>
         <div className="absolute top-0 animate-scroll-reverse flex items-center whitespace-nowrap hover:[animation-play-state:paused]" aria-hidden="true">
            {[...row2, ...row2, ...row2].map((i, idx) => (
               <CarouselCard key={`clone-${i}-${idx}`} id={i} color={idx % 2 === 0 ? 'bg-rose-500' : 'bg-amber-500'} />
            ))}
         </div>
      </div>
      
      {/* Side Fades */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

      <div className="text-center mt-16 relative z-20">
        <Reveal delay={200}>
          <button className="bg-white text-slate-900 text-lg font-bold px-8 py-4 rounded-full hover:bg-primary-50 transition-colors shadow-lg shadow-white/10 inline-flex items-center gap-2 group">
            Explore Template Library <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};