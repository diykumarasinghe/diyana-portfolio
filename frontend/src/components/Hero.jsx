import React from 'react';
import { Download, ArrowRight, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const GithubIcon = ({ className = "h-5 w-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "h-5 w-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import { useCMSData } from '../utils/cmsHelper';

const Hero = () => {
  const heroData = useCMSData('hero');
  const cvData = useCMSData('cv');

  const { name, title, subtitle, description, githubUrl, linkedinUrl, avatarUrl } = heroData;
  const { cvUrl } = cvData;

  const displayName = name || "I.D. Diyana Kumarasinghe";
  const nameParts = displayName.split(' ');
  const firstNamePart = nameParts.length > 2 ? nameParts.slice(0, 2).join(' ') : nameParts[0] || '';
  const lastNamePart = nameParts.length > 2 ? nameParts.slice(2).join(' ') : nameParts.slice(1).join(' ') || '';

  const formatRole = (text) => {
    if (!text) return "";
    const parts = text.trim().split(' ');
    if (parts.length <= 1) return text;
    return (
      <>
        <span>{parts[0]}</span>
        <br />
        <span>{parts.slice(1).join(' ')}</span>
      </>
    );
  };

  const formatSubtitle = (text) => {
    if (!text) return "";
    const parts = text.trim().split(' ');
    if (parts.length <= 1) return text;
    const lastIndex = parts.length - 1;
    const firstPart = parts.slice(0, lastIndex).join(' ');
    const lastPart = parts[lastIndex];
    return (
      <>
        <span>{firstPart}</span>
        <br />
        <span>{lastPart}</span>
      </>
    );
  };

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-[#050816] overflow-hidden">

      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center"
        style={{
          maxWidth: '1320px',
          paddingTop: '130px',
          paddingBottom: '50px'
        }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">

          {/* Hero Left Info */}
          <div className="flex flex-col text-left max-w-[660px] w-full">

            {/* Portfolio Space Tag */}
            <div className="inline-flex w-fit items-center space-x-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-3.5 py-1.5 rounded-full mb-6">
              <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-widest">
                Portfolio Space
              </span>
            </div>

            {/* Title with matching font weighting */}
            <div className="space-y-2 text-left">
              <p className="text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] m-0">Hi, I'm</p>
              <h1 className="text-[46px] sm:text-[56px] lg:text-[64px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] leading-[1.1] m-0 tracking-tight">
                {firstNamePart}
                {lastNamePart && <><br />{lastNamePart}</>}
              </h1>
            </div>

            {/* Subtitle Role row */}
            <div className="flex items-center gap-6 sm:gap-8 mt-[30px] text-left">
              <div className="text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold text-[#00D4FF] leading-[1.15] tracking-tight">
                {formatRole(title)}
              </div>
              <div className="w-[1.5px] h-[50px] sm:h-[60px] bg-slate-700/60 self-center" />
              <div className="text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold text-white leading-[1.15] tracking-tight hero-subtitle-text">
                {formatSubtitle(subtitle)}
              </div>
            </div>

            {/* Description */}
            <p className="w-[620px] max-w-full text-[18px] leading-[1.8] text-[#A1A1AA] mt-[28px] text-left">
              {description}
            </p>

            {/* Featured Tech badges */}
            <div className="flex flex-wrap items-center gap-2 mt-[32px] text-left">
              <span className="text-[11px] font-bold text-[#64748B] tracking-wider mr-2">FEATURED TECH:</span>
              {["React.js", "Node.js", "MongoDB", "Spring Boot", "MySQL"].map((tech) => (
                <span 
                  key={tech} 
                  className="text-[11px] font-semibold bg-[#0D1527] border border-white/10 text-slate-300 px-3 py-1.5 rounded-[6px] tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-[34px]">
              <a
                href={cvUrl}
                download="Diyana_Kumarasinghe_CV.pdf"
                className="inline-flex items-center justify-center space-x-2 bg-white text-[#050816] hover:bg-slate-100 transition-colors duration-200 w-[170px] h-[54px] rounded-[10px] font-bold text-sm shadow-md"
              >
                <span>Download CV</span>
                <Download className="h-4 w-4" />
              </a>

              <button
                onClick={() => handleScrollTo('projects')}
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] text-white hover:opacity-90 transition-opacity duration-200 w-[175px] h-[54px] rounded-[10px] font-bold text-sm shadow-[0_0_15px_rgba(0,212,255,0.2)]"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="inline-flex items-center justify-center space-x-2 border border-white/10 hover:border-white/20 text-[#F8FAFC] hover:bg-white/5 transition-all duration-200 w-[175px] h-[54px] rounded-[10px] font-bold text-sm bg-[#0f172a]/45"
                >
                  <span>Contact Me</span>
                  <Mail className="h-4 w-4 text-[#38BDF8]" />
                </button>

                <div className="hidden xl:flex flex-col items-center space-y-1 translate-y-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    EXPLORE MORE
                  </span>
                  <div className="w-[18px] h-[28px] rounded-full border border-slate-600 flex justify-center p-1">
                    <div className="w-1 h-1 bg-[#38BDF8] rounded-full animate-bounce" />
                  </div>
                  <div className="w-[1px] h-[20px] bg-gradient-to-b from-[#38BDF8] to-transparent" />
                </div>
              </div>
            </div>

          </div>

          {/* Hero Right Avatar */}
          <div className="flex justify-center lg:justify-end pr-4 lg:pr-8">
            <div 
              className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full border-2 p-1 bg-[#050816] flex items-center justify-center"
              style={{
                borderColor: '#0b1329',
                boxShadow: '0 0 50px rgba(0, 212, 255, 0.45)'
              }}
            >
              {/* Subtle radial blue glow behind image */}
              <div className="absolute inset-[-40px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.2)_0%,rgba(14,165,233,0)_70%)] blur-2xl pointer-events-none -z-10" />

              {/* Inner Circle Frame with thin dark navy border */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#050816] bg-[#050816] flex items-center justify-center">
                <img
                  src={avatarUrl || "/profile.jpg"}
                  alt="Diyana Kumarasinghe"
                  className="w-full h-full object-cover rounded-full"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center 20%' 
                  }}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
