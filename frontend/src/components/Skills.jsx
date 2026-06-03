import React from 'react';
import { Terminal, Palette, Server, Database, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  const skillsData = portfolioData.skills;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming Languages':
        return <span className="text-xl">💻</span>;
      case 'Frontend Development':
        return <span className="text-xl">🎨</span>;
      case 'Backend Development':
        return <span className="text-xl">⚙️</span>;
      case 'Databases':
        return <span className="text-xl">🗄️</span>;
      case 'Tools & Technologies':
        return <span className="text-xl">🛠️</span>;
      default:
        return <span className="text-xl">💻</span>;
    }
  };


  const getTopAccentColor = (category) => {
    switch (category) {
      case 'Programming Languages':
        return 'bg-[#06B6D4] shadow-[0_1px_8px_rgba(6,182,212,0.4)]';
      case 'Frontend Development':
        return 'bg-[#3B82F6] shadow-[0_1px_8px_rgba(59,130,246,0.4)]';
      case 'Backend Development':
        return 'bg-[#22C55E] shadow-[0_1px_8px_rgba(34,197,94,0.4)]';
      case 'Databases':
        return 'bg-[#F97316] shadow-[0_1px_8px_rgba(249,115,22,0.4)]';
      case 'Tools & Technologies':
        return 'bg-[#EC4899] shadow-[0_1px_8px_rgba(236,72,153,0.4)]';
      default:
        return 'bg-[#38BDF8] shadow-[0_1px_8px_rgba(56,189,248,0.4)]';
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-[#07091a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest">
              SKILLS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Technical <span className="text-neon-gradient">Capabilities</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[#38BDF8] to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Row 1 Grid: 3 cards (Languages, Frontend, Backend) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {skillsData.slice(0, 3).map((cat, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-xl text-left transition-all duration-300 hover:border-white/10 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Accent line with glow */}
              <div className={`absolute left-0 top-0 right-0 h-[2.5px] rounded-t-xl ${getTopAccentColor(cat.category)}`} />
              
              <div className="flex items-center space-x-3 mb-5">
                <div className="p-2.5 rounded-lg bg-[#0f172a]/60 border border-white/5 shadow-[0_0_10px_rgba(56,189,248,0.15)] flex items-center justify-center shrink-0 w-11 h-11">
                  {getCategoryIcon(cat.category)}
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] tracking-wide">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs bg-[#0f172a]/45 border border-[#94A3B8]/10 text-[#94A3B8] px-3 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 Grid: 2 cards centered (Databases, Tools) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {skillsData.slice(3).map((cat, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-xl text-left transition-all duration-300 hover:border-white/10 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Accent line with glow */}
              <div className={`absolute left-0 top-0 right-0 h-[2.5px] rounded-t-xl ${getTopAccentColor(cat.category)}`} />
              
              <div className="flex items-center space-x-3 mb-5">
                <div className="p-2.5 rounded-lg bg-[#0f172a]/60 border border-white/5 shadow-[0_0_10px_rgba(56,189,248,0.15)] flex items-center justify-center shrink-0 w-11 h-11">
                  {getCategoryIcon(cat.category)}
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] tracking-wide">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs bg-[#0f172a]/45 border border-[#94A3B8]/10 text-[#94A3B8] px-3 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Centered Caption Card */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-5 sm:p-6 rounded-xl text-center border-l-4 border-l-[#38BDF8]">
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Comfortable developing scalable backend systems, responsive frontend user interfaces, and deploying robust web applications.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
