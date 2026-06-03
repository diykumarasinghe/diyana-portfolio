import React from 'react';
import { Search, School, Leaf, Smartphone, Wallet } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Custom SVG Icons to avoid registry version compatibility issues with Lucide brand icons
const GithubIcon = ({ className = "h-4 w-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "h-4 w-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Projects = () => {
  const projects = portfolioData.projects;

  const getProjectIcon = (id) => {
    switch (id) {
      case 'back2u':
        return <span className="text-xl">🔍</span>;
      case 'smart-campus':
        return <span className="text-xl">🏠</span>;
      case 'cinnex':
        return <span className="text-xl">🌿</span>;
      case 'habit-tracker':
        return <span className="text-xl">📱</span>;
      case 'fintrack':
        return <span className="text-xl">💰</span>;
      default:
        return <span className="text-xl">🔍</span>;
    }
  };

  return (
    <section id="projects" className="py-20 relative bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest">
              PROJECTS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Featured <span className="text-neon-gradient">Creations</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[#38BDF8] to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 text-left flex flex-col justify-between transition-all duration-300 hover:border-[#38BDF8]/20 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:-translate-y-1 relative group"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 rounded-lg bg-[#0f172a]/60 border border-white/5 shrink-0">
                    {getProjectIcon(project.id)}
                  </div>
                  <span className="text-[10px] font-extrabold tracking-widest text-[#94A3B8]/60 uppercase">
                    {project.type}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2.5 group-hover:text-[#38BDF8] transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {project.shortDesc}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[#38BDF8]/5 border border-[#38BDF8]/10 text-[#38BDF8] px-2.5 py-1 rounded-md font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: GitHub & LinkedIn only (as in screenshot) */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 bg-[#0f172a]/45 hover:bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-[#94A3B8]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={project.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 bg-[#0f172a]/45 hover:bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                >
                  <LinkedinIcon className="h-3.5 w-3.5 text-[#38BDF8]" />
                  <span>LinkedIn</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
