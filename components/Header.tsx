
import React, { useState, useEffect } from 'react';
import { Menu, X, Layers } from 'lucide-react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Features', value: 'features' },
    { label: 'Templates', value: 'templates' },
    { label: 'Pricing', value: 'pricing' },
    { label: 'Blog', value: 'blog' },
  ];

  const openEditor = () => {
    navigateTo('editor');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200 py-3 shadow-sm' 
          : 'bg-white/50 backdrop-blur-sm border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigateTo('home')} className="flex items-center gap-2 cursor-pointer group focus:outline-none rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            <Layers size={22} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary-700 transition-colors">CarouselCraft</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button 
              key={item.value} 
              onClick={() => navigateTo(item.value)}
              className={`text-sm font-medium transition-colors relative after:content-[''] after:absolute after:h-0.5 after:bg-primary-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full ${
                currentPage === item.value 
                  ? 'text-primary-700 after:w-full' 
                  : 'text-slate-600 hover:text-primary-600 after:w-0'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => navigateTo('home')} className="text-sm font-semibold text-slate-900 hover:text-primary-700 transition-colors">
            Sign In
          </button>
          <button 
            onClick={openEditor}
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started Free
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 md:hidden flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5 duration-200 h-screen">
          {navItems.map((item) => (
            <button 
              key={item.value} 
              onClick={() => {
                navigateTo(item.value);
                setIsMobileMenuOpen(false);
              }}
              className={`text-lg font-medium py-3 border-b border-slate-50 text-left transition-all ${
                currentPage === item.value ? 'text-primary-600 pl-2' : 'text-slate-700 hover:text-primary-600 hover:pl-2'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button className="w-full py-3 text-slate-900 font-semibold bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              Sign In
            </button>
            <button 
              onClick={() => {
                openEditor();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all"
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
