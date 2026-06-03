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

const Hero = () => {
  const { name, title, subtitle, description, cvUrl, githubUrl, linkedinUrl } = portfolioData.hero;

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
          paddingTop: '110px',
          paddingBottom: '40px'
        }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center">

          {/* Hero Left Info */}
          <div className="flex flex-col text-left max-w-[620px] w-full">

            {/* Portfolio Space Tag */}
            <div className="inline-flex w-fit items-center space-x-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-3.5 py-1.5 rounded-full mb-6">
              <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-widest">
                Portfolio Space
              </span>
            </div>

            {/* Title with matching font weighting */}
            <div className="space-y-2 text-left">
              <p className="text-[56px] font-extrabold text-white leading-[1.1] m-0">Hi, I'm</p>
              <h1 className="text-[62px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] leading-[1.1] m-0 tracking-tight">
                I.D. Diyana
                <br />
                Kumarasinghe
              </h1>
            </div>

            {/* Subtitle Role row */}
            <div className="flex items-center gap-[40px] mt-[30px] text-left">
              <div className="text-sm sm:text-base font-extrabold text-[#06B6D4] leading-tight uppercase tracking-wider">
                Full-Stack<br />Developer
              </div>
              <div className="w-[1.5px] h-[45px] bg-[#64748B]" />
              <div className="text-sm sm:text-base font-bold text-white leading-tight">
                Information Technology<br />Undergraduate
              </div>
            </div>

            {/* Description */}
            <p className="w-[600px] max-w-full text-[18px] leading-[1.8] text-[#A1A1AA] mt-[28px] text-left">
              Passionate about building modern web applications. Currently a Year 3 student specializing in Information Technology at the Sri Lanka Institute of Information Technology (SLIIT). I enjoy creating highly responsive, clean, and scalable digital solutions.
            </p>

            {/* Featured Tech badges */}
            <div className="flex flex-wrap items-center gap-2 mt-[32px] text-left">
              <span className="text-xs font-bold text-[#94A3B8] mr-2">FEATURED TECH:</span>
              {["React.js", "Node.js", "MongoDB", "Spring Boot", "MySQL"].map((tech) => (
                <span key={tech} className="text-xs bg-[#0f172a]/65 border border-white/5 text-[#94A3B8] px-3 py-1.5 rounded-md">
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-[34px]">
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
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:opacity-90 transition-opacity duration-200 w-[175px] h-[54px] rounded-[10px] font-bold text-sm shadow-[0_0_15px_rgba(56,189,248,0.2)]"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleScrollTo('contact')}
                className="inline-flex items-center justify-center space-x-2 border border-white/10 hover:border-white/20 text-[#F8FAFC] hover:bg-white/5 transition-all duration-200 w-[175px] h-[54px] rounded-[10px] font-bold text-sm bg-[#0f172a]/45"
              >
                <Mail className="h-4 w-4 text-[#38BDF8]" />
                <span>Contact Me</span>
              </button>
            </div>

          </div>

          {/* Hero Right Avatar */}
          <div className="flex justify-center lg:justify-end pr-4">
            <div 
              className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] rounded-full border-2 p-1.5 bg-[#050816] flex items-center justify-center"
              style={{
                borderColor: 'rgba(56,189,248,0.4)',
                boxShadow: '0 0 80px rgba(14, 165, 233, 0.45)'
              }}
            >
              {/* Very subtle blue radial gradient behind profile image only */}
              <div className="absolute inset-[-40px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.25)_0%,rgba(14,165,233,0)_70%)] blur-xl pointer-events-none -z-10" />

              {/* Inner Circle Frame with thin dark navy border */}
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0F172A] bg-white flex items-center justify-center">
                <img
                  src="/profile.jpg"
                  alt="Diyana Kumarasinghe"
                  className="w-full h-full object-cover rounded-full"
                  style={{ objectPosition: 'center 20%' }}
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
