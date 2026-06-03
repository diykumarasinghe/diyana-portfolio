import React from 'react';
import { portfolioData } from '../data/portfolioData';

import { useCMSData } from '../utils/cmsHelper';

const Skills = () => {
  const skillsData = useCMSData('skills');

  const categoryConfigs = {
    'Programming Languages': {
      icon: '💻',
      accentColor: '#06B6D4',
      bgGradient: 'from-[#06B6D4]/20 to-[#0891B2]/5',
      glowColor: 'rgba(6, 182, 212, 0.15)',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
      borderColor: 'border-[#06B6D4]/20 hover:border-[#06B6D4]/50',
      badgeBg: 'bg-[#06B6D4]/5 hover:bg-[#06B6D4]/15 border-[#06B6D4]/10 hover:border-[#06B6D4]/30',
      badgeText: 'text-[#22D3EE]',
      description: 'Languages used for software development, scripting, and system logic',
    },
    'Frontend Development': {
      icon: '🎨',
      accentColor: '#3B82F6',
      bgGradient: 'from-[#3B82F6]/20 to-[#2563EB]/5',
      glowColor: 'rgba(59, 130, 246, 0.15)',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]',
      borderColor: 'border-[#3B82F6]/20 hover:border-[#38BDF8]/50',
      badgeBg: 'bg-[#3B82F6]/5 hover:bg-[#3B82F6]/15 border-[#3B82F6]/10 hover:border-[#3B82F6]/30',
      badgeText: 'text-[#60A5FA]',
      description: 'Building interactive, responsive, and user-centric client interfaces',
    },
    'Backend Development': {
      icon: '⚙️',
      accentColor: '#22C55E',
      bgGradient: 'from-[#22C55E]/20 to-[#16A34A]/5',
      glowColor: 'rgba(34, 197, 94, 0.15)',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]',
      borderColor: 'border-[#22C55E]/20 hover:border-[#22C55E]/50',
      badgeBg: 'bg-[#22C55E]/5 hover:bg-[#22C55E]/15 border-[#22C55E]/10 hover:border-[#22C55E]/30',
      badgeText: 'text-[#4ADE80]',
      description: 'Developing scalable servers, databases integration, and API business logic',
    },
    'Databases': {
      icon: '🗄️',
      accentColor: '#F97316',
      bgGradient: 'from-[#F97316]/20 to-[#EA580C]/5',
      glowColor: 'rgba(249, 115, 22, 0.15)',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]',
      borderColor: 'border-[#F97316]/20 hover:border-[#F97316]/50',
      badgeBg: 'bg-[#F97316]/5 hover:bg-[#F97316]/15 border-[#F97316]/10 hover:border-[#F97316]/30',
      badgeText: 'text-[#FB923C]',
      description: 'Designing, optimizing, and managing structured and unstructured data',
    },
    'Tools & Technologies': {
      icon: '🛠️',
      accentColor: '#EC4899',
      bgGradient: 'from-[#EC4899]/20 to-[#DB2777]/5',
      glowColor: 'rgba(236, 72, 153, 0.15)',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]',
      borderColor: 'border-[#EC4899]/20 hover:border-[#EC4899]/50',
      badgeBg: 'bg-[#EC4899]/5 hover:bg-[#EC4899]/15 border-[#EC4899]/10 hover:border-[#EC4899]/30',
      badgeText: 'text-[#F472B6]',
      description: 'Essential development tools, version control, and deployment pipelines',
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-[#07091a]">
      {/* Background glow overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest">
              SKILLS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight font-outfit">
            Technical <span className="text-neon-gradient">Capabilities</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[#38BDF8] to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Unified Flex Layout for Balanced 5 Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto mb-16">
          {skillsData.map((cat, idx) => {
            const config = categoryConfigs[cat.category] || categoryConfigs['Programming Languages'];
            return (
              <div
                key={idx}
                className={`group w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] glass-card p-7 sm:p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1.5 border ${config.borderColor} ${config.hoverGlow} flex flex-col justify-between min-h-[260px] relative overflow-hidden`}
                style={{
                  boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Top Accent line with glow */}
                <div 
                  className="absolute left-0 top-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 opacity-80 group-hover:opacity-100"
                  style={{
                    backgroundColor: config.accentColor,
                    boxShadow: `0 1px 12px ${config.accentColor}`,
                  }}
                />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-4 mb-5">
                    <div 
                      className="p-3 rounded-xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/80 border border-white/5 flex items-center justify-center shrink-0 w-12 h-12 relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
                      style={{
                        boxShadow: `0 0 15px ${config.glowColor}`
                      }}
                    >
                      {/* Glow effect behind icon */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-50`} />
                      <span className="text-2xl relative z-10">{config.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#F8FAFC] tracking-wide transition-colors duration-300 group-hover:text-white">
                        {cat.category}
                      </h3>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-relaxed">
                        {config.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 cursor-default ${config.badgeBg} ${config.badgeText}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Centered Caption Card */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-card p-5 sm:p-6 rounded-xl text-center border-l-4 border-l-[#38BDF8]">
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Comfortable developing scalable backend systems, responsive frontend user interfaces, and deploying robust web applications.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16 pt-12 border-t border-white/5 font-outfit">
          {/* Stat 1 */}
          <div className="glass-card p-6 rounded-xl text-center hover:border-white/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] transition-all duration-300 group">
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              10+
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#F8FAFC] mt-2 uppercase tracking-wider">
              Technologies
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1 leading-normal">
              Mastered & applied in projects
            </div>
          </div>
          
          {/* Stat 2 */}
          <div className="glass-card p-6 rounded-xl text-center hover:border-white/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] transition-all duration-300 group">
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              5+
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#F8FAFC] mt-2 uppercase tracking-wider">
              Full-Stack Projects
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1 leading-normal">
              End-to-end web applications
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glass-card p-6 rounded-xl text-center hover:border-white/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] transition-all duration-300 group">
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#22C55E] to-[#06B6D4] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              MERN Stack
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#F8FAFC] mt-2 uppercase tracking-wider">
              Experience
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1 leading-normal">
              React, Node.js, Express, MongoDB
            </div>
          </div>

          {/* Stat 4 */}
          <div className="glass-card p-6 rounded-xl text-center hover:border-white/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] transition-all duration-300 group">
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#EC4899] to-[#3B82F6] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Continuous
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#F8FAFC] mt-2 uppercase tracking-wider">
              Learning
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1 leading-normal">
              Adapting to latest tech trends
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
