
import React from 'react';
import { Reveal } from '../Reveal';
import { Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "The anatomy of a perfect LinkedIn Carousel",
    excerpt: "Learn the 5-slide structure that generated over 1M views for top creators in 2024.",
    category: "Strategy",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    date: "Oct 12, 2024"
  },
  {
    id: 2,
    title: "Typography rules you're probably breaking",
    excerpt: "Stop using Arial. Here are 3 font pairings that instantly make your carousels look expensive.",
    category: "Design",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    date: "Oct 10, 2024"
  },
  {
    id: 3,
    title: "How to repurpose your blog content",
    excerpt: "Don't let your old articles die. Turn them into engaging social slides with one click.",
    category: "Growth",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
    date: "Oct 05, 2024"
  },
  {
    id: 4,
    title: "Color psychology in social media marketing",
    excerpt: "Why blue builds trust and red creates urgency. A guide for non-designers.",
    category: "Design",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=800",
    date: "Sep 28, 2024"
  },
  {
    id: 5,
    title: "AI prompting guide for carousel hooks",
    excerpt: "The exact prompts we use to generate viral hooks for our clients.",
    category: "AI Tools",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "Sep 15, 2024"
  },
  {
    id: 6,
    title: "Case Study: From 0 to 10k followers",
    excerpt: "How Jane Doe used daily carousels to build a massive audience in 3 months.",
    category: "Case Study",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1553484771-371af705b420?auto=format&fit=crop&q=80&w=800",
    date: "Sep 01, 2024"
  }
];

export const BlogPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="text-primary-600 font-bold tracking-wider uppercase text-xs mb-4">The CarouselCraft Blog</div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Master the art of the scroll.</h1>
            <p className="text-xl text-slate-600">
              Expert advice on design, storytelling, and audience growth for the modern creator.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              <article className="group cursor-pointer flex flex-col h-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wide">
                    {post.category}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight size={16} className="ml-2" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 bg-slate-50 rounded-3xl p-12 text-center border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Subscribe to our newsletter</h3>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">Get the latest design trends and growth hacks delivered to your inbox weekly.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-5 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            />
            <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
