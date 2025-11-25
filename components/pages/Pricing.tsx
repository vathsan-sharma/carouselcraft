
import React, { useState } from 'react';
import { Check, X, HelpCircle, Minus } from 'lucide-react';
import { Reveal } from '../Reveal';
import type { Page } from '../../App';

interface PricingProps {
  navigateTo: (page: Page) => void;
}

const pricingTiers = [
  {
    name: "Starter",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Perfect for individuals just getting started.",
    buttonText: "Start for Free",
    popular: false,
  },
  {
    name: "Pro",
    priceMonthly: 29,
    priceYearly: 24,
    description: "For creators who post consistently.",
    buttonText: "Get Started",
    popular: true,
  },
  {
    name: "Agency",
    priceMonthly: 99,
    priceYearly: 79,
    description: "Scale content for multiple clients.",
    buttonText: "Contact Sales",
    popular: false,
  }
];

const featuresComparison = [
  { category: "Content Generation", features: [
    { name: "AI Carousel Generation", starter: "3 / month", pro: "Unlimited", agency: "Unlimited" },
    { name: "AI Hook Writer", starter: true, pro: true, agency: true },
    { name: "Content Repurposing", starter: false, pro: true, agency: true },
  ]},
  { category: "Design & Customization", features: [
    { name: "Premium Templates", starter: false, pro: true, agency: true },
    { name: "Brand Kits", starter: "1", pro: "5", agency: "Unlimited" },
    { name: "Custom Fonts", starter: false, pro: true, agency: true },
    { name: "Remove Watermark", starter: false, pro: true, agency: true },
  ]},
  { category: "Export & Sharing", features: [
    { name: "PDF Export (LinkedIn)", starter: "Standard Res", pro: "High Res", agency: "High Res" },
    { name: "JPG Sequence (Instagram)", starter: true, pro: true, agency: true },
    { name: "White-label Export", starter: false, pro: false, agency: true },
  ]},
  { category: "Support & Team", features: [
    { name: "Team Seats", starter: "1", pro: "1", agency: "5+" },
    { name: "Priority Support", starter: false, pro: true, agency: "Dedicated Mgr" },
  ]}
];

const pricingFaqs = [
  { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade at any time. If you upgrade, the prorated amount will be charged immediately." },
  { q: "What happens if I cancel?", a: "You will keep access to your paid features until the end of your current billing cycle. After that, your account will revert to the Starter plan." },
  { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for all paid plans if you are not satisfied with the product." },
  { q: "Is there a discount for students?", a: "Yes! Contact our support team with your student ID for 50% off the Pro plan." },
];

export const PricingPage: React.FC<PricingProps> = ({ navigateTo }) => {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-primary-50/50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Simple pricing, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-500">powerful results</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10">
              Choose the plan that fits your creative workflow. Save 20% with annual billing.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="inline-flex bg-white p-1.5 rounded-full border border-primary-100 shadow-sm relative">
               <button 
                onClick={() => setAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all z-10 relative ${!annual ? 'text-slate-900 bg-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Monthly
               </button>
               <button 
                onClick={() => setAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all z-10 relative ${annual ? 'text-white bg-primary-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Yearly
               </button>
            </div>
          </Reveal>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 100}>
              <div className={`relative p-8 rounded-3xl bg-white border flex flex-col h-full transition-all hover:-translate-y-2 duration-300 ${tier.popular ? 'border-primary-500 shadow-2xl shadow-primary-900/10 ring-1 ring-primary-500' : 'border-slate-200 shadow-lg'}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-teal-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                  <p className="text-slate-500 text-sm h-10">{tier.description}</p>
                </div>

                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-slate-900">
                    ${annual ? tier.priceYearly : tier.priceMonthly}
                  </span>
                  <span className="text-slate-500 font-medium">/mo</span>
                </div>

                <button 
                  onClick={() => navigateTo('editor')}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm mb-8 transition-all ${tier.popular ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/25' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
                >
                  {tier.buttonText}
                </button>

                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Highlights</div>
                <ul className="space-y-3">
                   {featuresComparison[0].features.map((f, idx) => (
                      idx < (i === 0 ? 2 : i === 1 ? 3 : 3) && (
                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                          <Check size={16} className="text-primary-500" />
                          <span>{f.name}</span>
                        </li>
                      )
                   ))}
                   {i > 0 && (
                      <li className="flex items-center gap-3 text-sm text-slate-700">
                        <Check size={16} className="text-primary-500" />
                        <span>Remove Watermark</span>
                      </li>
                   )}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-24">
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Compare Plans</h2>
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-6 font-bold text-slate-900 min-w-[200px]">Features</th>
                      <th className="p-6 font-bold text-slate-900 text-center min-w-[150px]">Starter</th>
                      <th className="p-6 font-bold text-primary-600 text-center min-w-[150px]">Pro</th>
                      <th className="p-6 font-bold text-slate-900 text-center min-w-[150px]">Agency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuresComparison.map((category, catIdx) => (
                      <React.Fragment key={catIdx}>
                        <tr className="bg-slate-50/50">
                          <td colSpan={4} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                            {category.category}
                          </td>
                        </tr>
                        {category.features.map((feat, fIdx) => (
                          <tr key={fIdx} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-slate-700">{feat.name}</td>
                            <td className="px-6 py-4 text-sm text-center text-slate-600">
                              {typeof feat.starter === 'boolean' ? 
                                (feat.starter ? <Check size={18} className="mx-auto text-primary-500"/> : <Minus size={18} className="mx-auto text-slate-300"/>) 
                                : feat.starter}
                            </td>
                            <td className="px-6 py-4 text-sm text-center font-medium text-slate-900 bg-primary-50/10">
                              {typeof feat.pro === 'boolean' ? 
                                (feat.pro ? <Check size={18} className="mx-auto text-primary-600"/> : <Minus size={18} className="mx-auto text-slate-300"/>) 
                                : feat.pro}
                            </td>
                            <td className="px-6 py-4 text-sm text-center text-slate-600">
                              {typeof feat.agency === 'boolean' ? 
                                (feat.agency ? <Check size={18} className="mx-auto text-primary-500"/> : <Minus size={18} className="mx-auto text-slate-300"/>) 
                                : feat.agency}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h3 className="text-2xl font-bold text-center mb-8 text-slate-900">Frequently Asked Questions</h3>
            <div className="grid gap-6">
              {pricingFaqs.map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-primary-200 transition-colors">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-start gap-3">
                    <HelpCircle size={20} className="text-primary-500 flex-shrink-0 mt-0.5"/>
                    {faq.q}
                  </h4>
                  <p className="text-slate-600 ml-8 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
};
