import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useCMSData } from '../utils/cmsHelper';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { name } = useCMSData('hero');
  const logoName = name ? (name.split(' ').find(part => !part.includes('.')) || name.split(' ')[0]) : "Diyana";

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Certifications', href: '#certificates', id: 'certificates' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050816]/90 backdrop-blur-md border-b border-white/5 h-[72px] flex items-center">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between" style={{ maxWidth: '1320px' }}>
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, 'home')}
            className="text-2xl font-extrabold text-white"
          >
            {logoName}<span className="text-[#38BDF8]">.</span>
          </a>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`text-sm font-medium transition-colors duration-200 relative py-1 hover:text-white ${
                activeSection === link.id ? 'text-white' : 'text-[#94A3B8]'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#38BDF8]" />
              )}
            </a>
          ))}
        </div>

        {/* Right side Green Pill & Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#22C55E]/10 border border-[#22C55E]/30 px-3.5 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span className="text-xs font-semibold text-[#22C55E] tracking-wide">
              Available for Internships
            </span>
          </div>

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm w-9 h-9 html-light-theme-btn"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="h-4.5 w-4.5 text-slate-700" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm w-9 h-9 mr-1"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="h-4.5 w-4.5 text-slate-700" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#94A3B8] hover:text-white p-2 rounded-md focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden fixed top-[72px] left-0 w-full bg-[#050816]/95 border-b border-white/5 transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 py-0 overflow-hidden'
        }`}
      >
        <div className="px-4 space-y-2.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`block px-4 py-2 text-base font-medium rounded-lg ${
                activeSection === link.id ? 'bg-[#38BDF8]/10 text-white' : 'text-[#94A3B8] hover:bg-white/5'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]"></span>
              <span className="text-sm font-semibold text-[#22C55E]">Available for Internships</span>
            </div>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm w-9 h-9"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5 text-slate-700" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
