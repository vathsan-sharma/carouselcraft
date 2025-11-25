import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Reveal } from './Reveal';

const faqs = [
  { question: "Do I need design experience to use this?", answer: "Not at all. Our templates and AI tools are designed specifically for non-designers to create professional-looking content in minutes." },
  { question: "Can I use my own brand colors and fonts?", answer: "Yes! You can upload your logo to auto-extract colors, or manually set your brand kit including custom fonts." },
  { question: "Does it work for Instagram and LinkedIn?", answer: "Absolutely. We support the standard 4:5 aspect ratio for Instagram and can auto-convert layouts for LinkedIn PDF documents (standard document size)." },
  { question: "Is there a free trial?", answer: "Yes, you can try CarouselCraft for free to generate up to 3 carousels per month. No credit card required." },
  { question: "Can I cancel anytime?", answer: "Yes, our plans are flexible. You can upgrade, downgrade, or cancel your subscription at any time from your account settings." },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary-600">
              <HelpCircle size={24} />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 100}>
              <div 
                className={`border rounded-2xl bg-white overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'border-primary-500 shadow-md ring-1 ring-primary-100' : 'border-slate-200 hover:border-primary-200 hover:shadow-sm'
                }`}
              >
                <button 
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none group"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className={`font-semibold text-lg transition-colors ${openIndex === index ? 'text-primary-700' : 'text-slate-900 group-hover:text-primary-700'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary-600' : 'group-hover:text-primary-400'}`} 
                  />
                </button>
                <div 
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};