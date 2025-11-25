
import React from 'react';
import { Sparkles, Image as ImageIcon, Type, Palette, MousePointer2, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import type { Page } from '../App';

interface HeroProps {
  navigateTo: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
  const openEditor = () => {
    navigateTo('editor');
  };

  return (
    <section className="relative pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[900px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-white to-white -z-10" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-200/30 blur-[100px] rounded-full -z-10 animate-pulse" style={{animationDuration: '5s'}}/>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary-100 shadow-sm text-xs font-bold text-primary-700 tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              New • AI-Powered Design Engine
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
              Create beautiful <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600">carousels</span> in seconds.
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed text-balance mx-auto lg:mx-0">
              Paste a sentence or upload a doc. Our AI builds professional, hook-optimized LinkedIn & Instagram carousels instantly.
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <button 
                onClick={openEditor}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all shadow-xl shadow-slate-900/20 hover:scale-105 hover:-translate-y-1 active:scale-95 ring-offset-2 focus:ring-2 ring-primary-500"
              >
                <Sparkles size={20} className="text-primary-400" />
                Start for Free
              </button>
              <button 
                onClick={() => navigateTo('templates')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-lg font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:-translate-y-1 focus:ring-2 ring-slate-200"
              >
                View Demos
              </button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex items-center gap-6 pt-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary-600"/>
                <span>No design skills needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary-600"/>
                <span>Free Forever Plan</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Mockup */}
        <div className="relative w-full perspective-1000">
          <Reveal delay={200}>
             <div className="relative w-full aspect-square lg:aspect-[4/3] max-w-2xl mx-auto lg:mx-0">
              
              {/* Decorative Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-teal-100/50 to-primary-100/50 blur-3xl rounded-full -z-10" />

              {/* Main App Window UI */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden h-full flex flex-col transform lg:rotate-y-[-5deg] lg:rotate-x-[5deg] lg:rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out group">
                {/* Window Header */}
                <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-2 bg-white/60">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                  </div>
                  <div className="mx-auto text-xs font-medium text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Saved
                  </div>
                </div>

                {/* App Body */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Sidebar */}
                  <div className="w-16 sm:w-20 border-r border-slate-100 flex flex-col items-center py-6 gap-6 bg-slate-50/50 backdrop-blur">
                    <div className="p-3 bg-primary-100 text-primary-600 rounded-xl shadow-sm"><Type size={20}/></div>
                    <div className="p-3 hover:bg-white text-slate-400 rounded-xl transition-colors cursor-pointer"><ImageIcon size={20}/></div>
                    <div className="p-3 hover:bg-white text-slate-400 rounded-xl transition-colors cursor-pointer"><Palette size={20}/></div>
                  </div>

                  {/* Canvas Area */}
                  <div className="flex-1 bg-slate-50/30 p-6 flex flex-col items-center justify-center relative">
                    {/* The "Slide" */}
                    <div className="bg-white w-[280px] sm:w-[320px] aspect-[4/5] shadow-2xl shadow-slate-200 rounded-lg p-8 flex flex-col relative group cursor-default border border-slate-100 transition-transform duration-500 hover:scale-[1.02]">
                      <div className="w-12 h-12 rounded-full bg-primary-50 mb-6 flex items-center justify-center text-primary-600 font-bold text-xl">
                        AI
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                        Stop designing from scratch.
                      </h3>
                      <p className="text-slate-500 leading-relaxed">
                        Use AI to generate your content and layout in seconds.
                      </p>
                      
                      {/* Selection Handles (UI Detail) */}
                      <div className="absolute -inset-0.5 border-2 border-primary-500 opacity-0 group-hover:opacity-100 rounded-lg pointer-events-none transition-opacity">
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-primary-500"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-primary-500"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-primary-500"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-primary-500"></div>
                      </div>
                    </div>

                    {/* Slides Strip */}
                    <div className="absolute bottom-4 left-6 right-6 h-16 bg-white/80 backdrop-blur rounded-xl shadow-lg border border-slate-100 flex items-center px-4 gap-3 overflow-hidden">
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className={`h-10 aspect-[4/5] rounded border transition-all cursor-pointer hover:scale-105 ${i === 1 ? 'border-primary-500 ring-2 ring-primary-100' : 'border-slate-200 bg-slate-50'}`}></div>
                       ))}
                       <div className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 ml-auto cursor-pointer transition-colors">+</div>
                    </div>
                  </div>

                  {/* Settings Panel (Desktop only) */}
                  <div className="w-64 border-l border-slate-100 bg-white hidden sm:flex flex-col p-5 gap-6">
                    <div>
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Typography</div>
                      <div className="h-10 bg-slate-50 border border-slate-200 rounded-md mb-2"></div>
                      <div className="flex gap-2">
                        <div className="h-8 flex-1 bg-slate-50 border border-slate-200 rounded-md"></div>
                        <div className="h-8 w-12 bg-slate-50 border border-slate-200 rounded-md"></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Color Palette</div>
                      <div className="grid grid-cols-5 gap-2">
                        {[1,2,3,4,5].map(i => <div key={i} className={`w-8 h-8 rounded-full border cursor-pointer hover:scale-110 transition-transform ${i===1 ? 'bg-primary-500 border-primary-600' : 'bg-slate-100 border-slate-200'}`}></div>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 1 */}
              <div className="absolute top-20 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-[bounce_4s_infinite]">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">AI Generating...</div>
                  <div className="text-[10px] text-slate-500">Slide 3 of 5</div>
                  <div className="h-1 w-16 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-teal-500 w-2/3"></div>
                  </div>
                </div>
              </div>

               {/* Floating Element 2 */}
               <div className="absolute bottom-32 -right-6 bg-white p-3 rounded-xl shadow-xl border border-slate-100 hidden lg:flex items-center gap-3 hover:scale-105 transition-transform cursor-help">
                 <div className="relative">
                    <MousePointer2 className="fill-primary-600 text-white absolute top-2 left-2" size={24} />
                 </div>
                 <div className="pl-6 text-sm font-semibold text-primary-600">Auto-align active</div>
              </div>

            </div>
          </Reveal>
        </div>
      </div>

      {/* Trusted By Strip */}
      <div className="border-t border-slate-100 bg-slate-50/50 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Trusted by marketing teams at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholder Logos using text for simplicity but styled to look like logos */}
             {['Acme Corp', 'GlobalBank', 'SaaSify', 'Growth.io', 'CreatorLab'].map((logo) => (
               <span key={logo} className="text-xl font-bold text-slate-700 flex items-center gap-2">
                 <div className="w-6 h-6 bg-slate-300 rounded-md"></div> {logo}
               </span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};
