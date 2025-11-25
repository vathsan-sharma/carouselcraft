
import React from 'react';
import { Wand2, Layout, Palette, Globe, Lock, Zap, ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import type { Page } from '../../App';

interface FeaturesPageProps {
  navigateTo: (page: Page) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ navigateTo }) => {
  return (
    <div className="pt-32 pb-24 bg-white">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-500">speed</span>. <br/> Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">impact</span>.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            Explore the tools that help 50,000+ creators build their personal brand on LinkedIn and Instagram.
          </p>
          <button onClick={() => navigateTo('pricing')} className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform">
            Start Creating Now
          </button>
        </Reveal>
      </div>

      {/* Feature Grid Deep Dive */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 mb-32">
         {[
            {
              icon: <Wand2 size={32} />,
              title: "AI Content Rewrite",
              desc: "Paste a messy blog post or a rough note. Our AI identifies key points, summarizes them, and distributes them across slides for maximum readability.",
              color: "bg-indigo-50 text-indigo-600"
            },
            {
              icon: <Layout size={32} />,
              title: "Smart Auto-Layout",
              desc: "Never worry about pixel-pushing. Text auto-resizes, images snap to grids, and spacing adjusts automatically as you type.",
              color: "bg-rose-50 text-rose-600"
            },
            {
              icon: <Palette size={32} />,
              title: "One-Click Branding",
              desc: "Define your brand kit once. Apply it to every new carousel with a single click. Consistent fonts, colors, and logos instantly.",
              color: "bg-emerald-50 text-emerald-600"
            },
            {
              icon: <Globe size={32} />,
              title: "Multi-Platform Export",
              desc: "Export high-res PDF for LinkedIn documents and optimized 4:5 JPG sequences for Instagram carousels automatically.",
              color: "bg-amber-50 text-amber-600"
            }
         ].map((item, i) => (
            <Reveal key={i} delay={i*100}>
               <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 group h-full">
                  <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
               </div>
            </Reveal>
         ))}
      </div>

      {/* Visual Breakdown Section */}
      <div className="bg-slate-900 py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <Reveal>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold uppercase tracking-wider mb-6">
                  <Zap size={14} /> Workflow
               </div>
               <h2 className="text-4xl font-bold mb-6">From blank page to viral post in 3 minutes.</h2>
               <ul className="space-y-6">
                 {[
                   "1. Paste your topic or text",
                   "2. AI generates the hook and structure",
                   "3. Select a high-converting template",
                   "4. Tweak and Export"
                 ].map((step, i) => (
                   <li key={i} className="flex items-center gap-4 text-lg text-slate-300">
                     <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">{i+1}</span>
                     {step.substring(3)}
                   </li>
                 ))}
               </ul>
            </Reveal>
          </div>
          <div className="lg:w-1/2 relative">
             <Reveal delay={200}>
               <div className="relative z-10 bg-slate-800 rounded-xl border border-slate-700 p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                 <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" alt="Editor Interface" className="rounded-lg opacity-80" />
               </div>
               <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-500/30 blur-[100px] rounded-full -z-10"></div>
             </Reveal>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <h2 className="text-3xl font-bold text-center mb-16">Why creators switch to CarouselCraft</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-200"></th>
                  <th className="p-4 border-b border-slate-200 text-xl font-bold text-primary-600 bg-primary-50/50 rounded-t-xl w-1/3 text-center">CarouselCraft</th>
                  <th className="p-4 border-b border-slate-200 text-xl font-bold text-slate-400 w-1/3 text-center">Standard Design Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: "AI Content Generation", us: true, them: false },
                  { feat: "Auto-Resize Text", us: true, them: false },
                  { feat: "LinkedIn PDF Export", us: true, them: true },
                  { feat: "Brand Kit Automation", us: true, them: "Manual" },
                  { feat: "Templates designed for hooks", us: true, them: false },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-6 font-medium text-slate-700">{row.feat}</td>
                    <td className="p-6 text-center bg-primary-50/10 border-x border-primary-100">
                      {row.us === true ? <CheckIcon /> : row.us}
                    </td>
                    <td className="p-6 text-center text-slate-400">
                      {row.them === false ? <XIcon /> : row.them === true ? <CheckIcon color="text-slate-400"/> : row.them}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>

    </div>
  );
};

const CheckIcon = ({color = "text-primary-600"}) => (
  <div className={`inline-flex justify-center items-center w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 ${color}`}>
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
  </div>
);

const XIcon = () => (
  <div className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-slate-100 text-slate-300">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  </div>
);
