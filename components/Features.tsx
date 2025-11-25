
import React from 'react';
import { Wand2, Layout, Palette, Settings2, CheckCircle2, Zap, Quote } from 'lucide-react';
import { Reveal } from './Reveal';

const features = [
  {
    title: "AI-Powered Carousel Generator",
    description: "Turn any sentence or document into a complete 3–10 slide carousel. Our AI generates hooks, body content, and CTAs tailored to your brand voice.",
    bullets: [
      "Instant Text-to-Slide conversion",
      "Auto-generated hooks that stop the scroll",
      "Smart text summarization for clean design"
    ],
    icon: <Wand2 className="w-6 h-6 text-white" />,
    color: "bg-indigo-600",
    testimonial: {
      text: "I cut my content creation time by 90%. The AI gets the structure right every single time.",
      author: "Sarah J., Marketing Director"
    },
    imageAlign: "left",
    imgContent: (
      <div className="w-full h-full bg-slate-50 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,56,202,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
        <div className="w-3/4 bg-white rounded-xl shadow-xl border border-slate-100 p-6 space-y-4 relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
          <div className="flex gap-3 mb-2">
             <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center"><Wand2 size={16} className="text-indigo-600"/></div>
             <div className="text-sm font-medium text-slate-900 pt-1">AI Generator</div>
          </div>
          <div className="h-2 bg-slate-100 rounded w-full"></div>
          <div className="h-2 bg-slate-100 rounded w-5/6"></div>
          <div className="h-2 bg-slate-100 rounded w-4/6"></div>
          <div className="pt-4 flex gap-2">
             <div className="h-20 w-16 bg-indigo-50 border border-indigo-100 rounded shadow-sm"></div>
             <div className="h-20 w-16 bg-slate-50 border border-slate-100 rounded shadow-sm"></div>
             <div className="h-20 w-16 bg-slate-50 border border-slate-100 rounded shadow-sm"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Flexible Templates & Designs",
    description: "Don't start from blank. Browse a growing library of high-end carousel templates that you can customize in seconds.",
    bullets: [
      "100+ Professional templates included",
      "Customize fonts, colors, and layouts",
      "Save your own templates for reuse"
    ],
    icon: <Layout className="w-6 h-6 text-white" />,
    color: "bg-primary-500",
    testimonial: {
      text: "The templates are actually usable. Clean, modern, and easy to adapt to my brand.",
      author: "Mike T., Founder"
    },
    imageAlign: "right",
    imgContent: (
      <div className="w-full h-full bg-slate-50 p-8 grid grid-cols-2 gap-4 content-center group">
         {[1,2,3,4].map(i => (
           <div key={i} className={`aspect-square bg-white rounded-lg shadow-md border border-slate-100 p-2 transform transition-all duration-500 hover:scale-105 hover:shadow-lg ${i===2 ? 'group-hover:-translate-y-3' : 'group-hover:translate-y-1'}`}>
              <div className={`w-full h-full rounded bg-${i === 1 ? 'rose' : i === 2 ? 'blue' : i === 3 ? 'amber' : 'primary'}-50 flex items-center justify-center`}>
                 <div className="w-1/2 h-2 rounded bg-white/50"></div>
              </div>
           </div>
         ))}
      </div>
    )
  },
  {
    title: "Seamless Branding Integration",
    description: "Keep your visuals consistent. Upload your logo, define your color palette, and apply your brand kit to any project in a single click.",
    bullets: [
      "Auto-extract colors from your logo",
      "One-click brand application",
      "Custom font support"
    ],
    icon: <Palette className="w-6 h-6 text-white" />,
    color: "bg-teal-600",
    testimonial: {
      text: "Being able to apply my brand kit in one click saves me hours of manual tweaking.",
      author: "Jessica L., Content Creator"
    },
    imageAlign: "left",
    imgContent: (
      <div className="w-full h-full bg-slate-50 flex items-center justify-center group">
         <div className="w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-teal-900/5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">A</div>
              <div>
                <div className="text-sm font-bold text-slate-900">Acme Inc.</div>
                <div className="text-xs text-slate-500">Brand Kit</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Palette</div>
              <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-full bg-[#1e293b] ring-2 ring-offset-2 ring-slate-200"></div>
                 <div className="w-8 h-8 rounded-full bg-[#059669]"></div>
                 <div className="w-8 h-8 rounded-full bg-[#ef4444]"></div>
                 <div className="w-8 h-8 rounded-full bg-[#f59e0b]"></div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Fonts</div>
              <div className="text-xl font-bold text-slate-900">Inter Tight</div>
              <div className="text-lg font-serif text-slate-600 italic">Playfair Display</div>
            </div>
         </div>
      </div>
    )
  },
  {
    title: "User-Friendly Editor",
    description: "Power without the complexity. A drag-and-drop slide manager with smart alignment tools designed for non-designers.",
    bullets: [
      "Drag-and-drop slide reordering",
      "Smart alignment & snapping",
      "Export to PDF or JPG instantly"
    ],
    icon: <Settings2 className="w-6 h-6 text-white" />,
    color: "bg-amber-500",
    testimonial: {
      text: "I have zero design skills, but my LinkedIn posts look like I hired a pro agency.",
      author: "David R., Solopreneur"
    },
    imageAlign: "right",
    imgContent: (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center p-8 relative overflow-hidden group">
        {/* Dark Mode UI representation */}
         <div className="w-full max-w-sm bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex justify-between items-center mb-4 text-slate-400">
               <div className="text-xs font-medium">Export Settings</div>
               <div className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="space-y-3">
               <div className="h-8 bg-slate-700 rounded w-full animate-pulse"></div>
               <div className="flex gap-2">
                  <div className="h-8 bg-slate-700 rounded flex-1"></div>
                  <div className="h-8 bg-primary-600 rounded flex-1"></div>
               </div>
            </div>
         </div>
         {/* Cursor */}
         <div className="absolute bottom-10 right-10 w-8 h-8 bg-white/10 rounded-full border border-white/20 backdrop-blur flex items-center justify-center transition-all duration-700 group-hover:translate-x-[-20px] group-hover:translate-y-[-20px]">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
         </div>
      </div>
    )
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
       {/* Decorative background blur */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-50/50 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-4">
             <Zap size={14} /> Features
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Everything you need to design <br className="hidden md:block"/> stunning carousels
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AI-powered content, flexible templates, and seamless branding—all in one place.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-32 max-w-7xl mx-auto px-6">
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${feature.imageAlign === 'right' ? '' : 'lg:flex-row-reverse'}`}>
            
            {/* Text Content */}
            <div className="flex-1 space-y-8">
              <Reveal>
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center shadow-lg shadow-slate-200 mb-6`}>
                  {feature.icon}
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {feature.description}
                </p>
              </Reveal>
              
              <div className="space-y-4 border-l-2 border-slate-100 pl-6 ml-1">
                {feature.bullets.map((bullet, idx) => (
                  <Reveal key={idx} delay={150 + (idx * 50)}>
                    <div className="flex items-start gap-3 group">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{bullet}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Social Proof Pill */}
              <Reveal delay={300}>
                 <div className="mt-8 inline-flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 max-w-md">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary-500 shrink-0">
                       <Quote size={16} />
                    </div>
                    <div>
                       <p className="text-sm text-slate-600 italic mb-1">"{feature.testimonial.text}"</p>
                       <p className="text-xs font-bold text-slate-900">{feature.testimonial.author}</p>
                    </div>
                 </div>
              </Reveal>
            </div>

            {/* Image Content */}
            <div className="flex-1 w-full">
              <Reveal width="100%" delay={200}>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100 bg-slate-50 transform transition-all hover:shadow-3xl">
                  {feature.imgContent}
                </div>
              </Reveal>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
