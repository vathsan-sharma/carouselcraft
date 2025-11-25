
import React from 'react';
import { Hero } from '../Hero';
import { Features } from '../Features';
import { TemplateGallery } from '../TemplateGallery';
import { FAQ } from '../FAQ';
import { BookOpen, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import type { Page } from '../../App';

interface HomeProps {
  navigateTo: (page: Page) => void;
}

const HowItWorks = () => (
  <section className="py-24 bg-white border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">From idea to carousel in <span className="text-primary-600">minutes</span></h2>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { step: "01", title: "Add your content", text: "Paste your text, upload a document, or just type a topic.", icon: <BookOpen className="text-primary-600" /> },
          { step: "02", title: "Let AI structure it", text: "Our engine breaks it down into hooks, value points, and CTAs.", icon: <Zap className="text-primary-600" /> },
          { step: "03", title: "Customize & Export", text: "Apply your brand kit, tweak the design, and download as PDF/JPG.", icon: <TrendingUp className="text-primary-600" /> }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 150}>
            <div className="relative p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.text}</p>
              <div className="absolute top-6 right-8 text-6xl font-bold text-slate-200/50 select-none -z-0 group-hover:text-primary-100/50 transition-colors">
                {item.step}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
      {[
        { label: "Carousels Created", value: "1M+" },
        { label: "Creators", value: "50k+" },
        { label: "Hours Saved", value: "250k" },
        { label: "Avg Engagement", value: "2.5x" },
      ].map((stat, i) => (
        <Reveal key={i} delay={i * 100}>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary-200">{stat.value}</div>
            <div className="text-primary-100/80 font-medium">{stat.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const BlogPreview = ({ navigateTo }: { navigateTo: (page: Page) => void }) => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
       <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900">Level up your content game</h2>
            <p className="text-slate-600 mt-2">Latest tips and tricks from the CarouselCraft team.</p>
          </Reveal>
          <Reveal delay={100}>
            <button onClick={() => navigateTo('blog')} className="text-primary-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View all articles <ArrowRight size={18} />
            </button>
          </Reveal>
       </div>
       <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "How to write hooks that actually convert", cat: "Strategy", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", color: "bg-purple-100 text-purple-700" },
            { title: "5 design rules for non-designers", cat: "Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800", color: "bg-emerald-100 text-emerald-700" },
            { title: "Repurposing your blog posts into carousels", cat: "Growth", img: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800", color: "bg-amber-100 text-amber-700" }
          ].map((post, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group cursor-pointer" onClick={() => navigateTo('blog')}>
                 <div className="rounded-2xl overflow-hidden mb-4 relative shadow-md hover:shadow-xl transition-all duration-300">
                    <img src={post.img} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                 </div>
                 <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${post.color}`}>
                    {post.cat}
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
                    {post.title}
                 </h3>
              </div>
            </Reveal>
          ))}
       </div>
    </div>
  </section>
);

const FinalCTA = ({ navigateTo }: { navigateTo: (page: Page) => void }) => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto relative">
       <Reveal>
         <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 z-0"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/30 blur-[100px] rounded-full z-0"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-600/30 blur-[100px] rounded-full z-0"></div>
            
            <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                  Ready to stop scrolling <br/> and start creating?
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Join thousands of creators who are saving hours every week with CarouselCraft.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <button 
                    onClick={() => navigateTo('editor')}
                    className="bg-primary-500 text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-primary-400 transition-all shadow-lg hover:shadow-primary-500/25 hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Start for Free
                  </button>
                  <button onClick={() => navigateTo('templates')} className="text-white font-semibold text-lg px-10 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur transition-all w-full sm:w-auto">
                    View Templates
                  </button>
                </div>
                <p className="text-slate-500 text-sm pt-4">No credit card required • Cancel anytime</p>
            </div>
         </div>
       </Reveal>
    </div>
  </section>
);

export const Home: React.FC<HomeProps> = ({ navigateTo }) => {
  return (
    <>
      <Hero navigateTo={navigateTo} />
      <StatsSection />
      <HowItWorks />
      <Features />
      <TemplateGallery />
      <BlogPreview navigateTo={navigateTo} />
      <FAQ />
      <FinalCTA navigateTo={navigateTo} />
    </>
  );
};
