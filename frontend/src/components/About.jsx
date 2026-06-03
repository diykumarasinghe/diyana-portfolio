import React from 'react';
import { Laptop, Rocket, Sprout } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { heading, description, additionalText, focusAreas } = portfolioData.about;

  const renderIcon = (name) => {
    switch (name) {
      case 'laptop':
        return <span className="text-xl">💻</span>;
      case 'rocket':
        return <span className="text-xl">🚀</span>;
      case 'sprout':
        return <span className="text-xl">🌱</span>;
      default:
        return <span className="text-xl">💻</span>;
    }
  };

  const getBorderColor = (index) => {
    if (index === 0) return 'border-l-4 border-l-[#3B82F6]';
    if (index === 1) return 'border-l-4 border-l-[#06B6D4]';
    return 'border-l-4 border-l-[#A855F7]';
  };

  return (
    <section id="about" className="py-20 relative bg-[#07091a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest">
              ABOUT ME
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            {heading.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="text-neon-gradient">
              {heading.split(' ').slice(-2).join(' ')}
            </span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[#38BDF8] to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Biography & Focus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Biography Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl font-bold text-[#F8FAFC]">
              Who is <span className="text-[#38BDF8]">Diyana Kumarasinghe?</span>
            </h3>
            <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base">
              {description}
            </p>
            <p className="text-[#94A3B8] leading-relaxed text-sm">
              {additionalText}
            </p>
            <p className="text-[#94A3B8] leading-relaxed text-sm">
              I am continuously improving my knowledge of modern technologies, software architecture, and cloud-based systems while seeking opportunities to contribute to impactful development teams and real-world software products.
            </p>
          </div>

          {/* Focus Cards Column */}
          <div className="lg:col-span-5 space-y-5">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className={`glass-card p-5 rounded-xl transition-transform duration-300 hover:-translate-y-1 ${getBorderColor(index)}`}
              >
                {/* Category small text above */}
                <div className="text-left mb-2">
                  <p className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-widest">
                    {index === 0 ? "FOCUS AREAS" : index === 1 ? "PROJECTS BUILT" : "CURRENTLY STUDYING"}
                  </p>
                </div>
                
                {/* Title & Icon container */}
                <div className="flex items-center space-x-3 text-left">
                  <div className="p-2.5 rounded-lg bg-[#0f172a]/60 border border-white/5 shadow-[0_0_10px_rgba(56,189,248,0.15)] flex items-center justify-center shrink-0 w-11 h-11">
                    {renderIcon(area.icon)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#F8FAFC]">{area.title}</h4>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{area.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default About;
