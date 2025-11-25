
import React from 'react';
import { Layers, Twitter, Instagram, Linkedin } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="col-span-2 lg:col-span-2 space-y-6">
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                  <Layers size={20} />
                </div>
                <span className="font-bold text-xl text-slate-900">CarouselCraft</span>
             </div>
             <p className="text-slate-500 max-w-sm leading-relaxed">
               The fastest way to create professional social media carousels. Powered by AI, designed for growth.
             </p>
             <div className="flex gap-4 text-slate-400">
               <a href="#" className="hover:text-primary-600 hover:-translate-y-1 transition-all"><Twitter size={20} /></a>
               <a href="#" className="hover:text-primary-600 hover:-translate-y-1 transition-all"><Instagram size={20} /></a>
               <a href="#" className="hover:text-primary-600 hover:-translate-y-1 transition-all"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-slate-600">
              <li><button onClick={() => navigateTo('features')} className="hover:text-primary-600 transition-colors text-left">Features</button></li>
              <li><button onClick={() => navigateTo('templates')} className="hover:text-primary-600 transition-colors text-left">Templates</button></li>
              <li><button onClick={() => navigateTo('pricing')} className="hover:text-primary-600 transition-colors text-left">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
            <ul className="space-y-4 text-slate-600">
              <li><button onClick={() => navigateTo('blog')} className="hover:text-primary-600 transition-colors text-left">Blog</button></li>
              <li><button className="hover:text-primary-600 transition-colors text-left">Help Center</button></li>
              <li><button className="hover:text-primary-600 transition-colors text-left">Community</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-600">
              <li><button className="hover:text-primary-600 transition-colors text-left">Privacy</button></li>
              <li><button className="hover:text-primary-600 transition-colors text-left">Terms</button></li>
              <li><button className="hover:text-primary-600 transition-colors text-left">Cookie Policy</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} CarouselCraft. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
