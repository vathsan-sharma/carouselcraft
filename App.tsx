
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { FeaturesPage } from './components/pages/Features';
import { TemplatesPage } from './components/pages/Templates';
import { PricingPage } from './components/pages/Pricing';
import { BlogPage } from './components/pages/Blog';
import { Editor } from './components/pages/Editor';

export type Page = 'home' | 'features' | 'templates' | 'pricing' | 'blog' | 'editor';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Handle URL routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam === 'editor') {
      setCurrentPage('editor');
    } else {
      // Reset scroll on normal navigation
      window.scrollTo(0, 0);
    }
  }, []);

  // If we are in editor mode, render only the editor without header/footer
  if (currentPage === 'editor') {
    return <Editor navigateTo={setCurrentPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigateTo={setCurrentPage} />;
      case 'features': return <FeaturesPage navigateTo={setCurrentPage} />;
      case 'templates': return <TemplatesPage />;
      case 'pricing': return <PricingPage navigateTo={setCurrentPage} />;
      case 'blog': return <BlogPage />;
      default: return <Home navigateTo={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden flex flex-col">
      <Header currentPage={currentPage} navigateTo={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigateTo={setCurrentPage} />
    </div>
  );
};

export default App;
