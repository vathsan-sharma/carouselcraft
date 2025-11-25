
import React, { useState } from 'react';
import { Reveal } from '../Reveal';
import { Filter, Search, X, ChevronRight, ChevronLeft, Copy } from 'lucide-react';

const categories = ["All", "Business", "Lifestyle", "Educational", "Minimal", "Bold"];

const templates = [
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    title: ["The Viral Hook", "Deep Dive Strategy", "Listicle Format", "Quote of the Day", "Case Study Breakdown", "How-To Guide"][i % 6],
    category: ["Business", "Educational", "Lifestyle", "Minimal", "Business", "Bold"][i % 6],
    color: ["bg-rose-200", "bg-indigo-200", "bg-emerald-200", "bg-slate-200", "bg-amber-200", "bg-teal-200"][i % 6],
    slides: [1, 2, 3, 4, 5]
  }))
];

interface TemplateModalProps {
  template: typeof templates[0];
  onClose: () => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ template, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
          <X size={20} className="text-slate-900"/>
        </button>

        {/* Left: Preview Area */}
        <div className="flex-1 bg-slate-100 flex flex-col items-center justify-center p-8 md:p-12 relative group select-none">
          
          <div className="relative aspect-[4/5] h-full max-h-[500px] bg-white rounded-xl shadow-2xl flex items-center justify-center text-4xl font-bold text-slate-300 border border-slate-200/50">
             <div className={`absolute inset-0 opacity-20 ${template.color}`}></div>
             Slide {currentSlide + 1}
          </div>

          {/* Navigation */}
          <button 
            onClick={(e) => { e.stopPropagation(); setCurrentSlide(Math.max(0, currentSlide - 1)); }}
            disabled={currentSlide === 0}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setCurrentSlide(Math.min(template.slides.length - 1, currentSlide + 1)); }}
            disabled={currentSlide === template.slides.length - 1}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 flex gap-2">
            {template.slides.map((_, idx) => (
              <div key={idx} className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-slate-900 w-4' : 'bg-slate-300'}`} />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-[400px] p-8 bg-white flex flex-col border-l border-slate-100">
          <div className="mb-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-4">
              {template.category}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{template.title}</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              This template is designed to maximize engagement by using a strong hook followed by value-packed slides. Perfect for LinkedIn storytelling.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Copy size={14}/></div>
                <span>10 Slides included</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Filter size={14}/></div>
                <span>Fully customizable colors</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-all transform hover:-translate-y-1">
              Use This Template
            </button>
            <button className="w-full py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-xl transition-colors">
              Save for Later
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export const TemplatesPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  
  const filtered = activeCat === "All" ? templates : templates.filter(t => t.category === activeCat);

  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-primary-50/30 to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Template Library</h1>
              <p className="text-slate-600 max-w-xl">
                Browse our collection of high-performing carousel templates. Optimized for engagement on LinkedIn and Instagram.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                  <Search size={18} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search templates..." 
                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all shadow-sm"
               />
            </div>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCat === cat 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((template, i) => (
            <Reveal key={template.id} delay={i * 50}>
              <div className="group cursor-pointer" onClick={() => setSelectedTemplate(template)}>
                <div className={`aspect-[4/5] rounded-2xl ${template.color} mb-4 relative overflow-hidden shadow-sm border border-slate-100/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary-900/10 group-hover:-translate-y-2`}>
                   {/* Mock Template Content */}
                   <div className="absolute inset-0 flex flex-col p-6">
                      <div className="w-8 h-8 bg-white/40 rounded-full mb-auto backdrop-blur-sm"></div>
                      <div className="space-y-2">
                        <div className="h-6 bg-white/60 rounded w-3/4"></div>
                        <div className="h-6 bg-white/60 rounded w-full"></div>
                        <div className="h-6 bg-white/60 rounded w-1/2"></div>
                      </div>
                   </div>
                   
                   {/* Hover Overlay */}
                   <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-white text-slate-900 font-bold px-6 py-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        Preview
                      </span>
                   </div>
                </div>
                <div className="flex justify-between items-start px-1">
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{template.title}</h3>
                    <p className="text-xs text-slate-500">{template.category}</p>
                  </div>
                  <div className="bg-primary-50 text-primary-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Free</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
           <div className="py-20 text-center text-slate-400">
             <Filter size={48} className="mx-auto mb-4 opacity-20"/>
             <p>No templates found for this category.</p>
           </div>
        )}

      </div>

      {/* Modal */}
      {selectedTemplate && (
        <TemplateModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
      )}
    </div>
  );
};
