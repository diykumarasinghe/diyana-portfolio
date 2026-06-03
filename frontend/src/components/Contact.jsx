import React, { useState } from 'react';
import { CheckCircle2, Mail, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const LinkedinIcon = ({ className = "h-6 w-6 text-[#38BDF8]" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = ({ className = "h-6 w-6 text-[#38BDF8]" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("diykumarasinghe14@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit message.');
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage(error.message || 'Could not send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-outfit">
          <h2 className="text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Let's <span className="text-neon-gradient">Connect</span>
          </h2>
          <div className="w-20 h-[3px] bg-[#38BDF8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">

          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-6">
              {/* Green availability badge */}
              <div>
                <div className="inline-flex items-center space-x-2 bg-[#22C55E]/10 border border-[#22C55E]/20 px-3.5 py-1.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
                    Open for internship opportunities
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#F8FAFC]">
                Have a project or job opening?
              </h3>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Whether you have an internship slot, a full-stack project collaboration idea, or simply want to chat about modern tech — feel free to drop a line. I'll get back to you as soon as possible!
              </p>
            </div>

            {/* Channels cards list */}
            <div className="space-y-4 pt-2">

              {/* Email card */}
              <div
                className="glass-card p-4 rounded-xl flex items-center justify-between border border-white/5 hover:border-[#38BDF8]/20 hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0 w-11 h-11">
                    <Mail className="h-5 w-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8]/60 tracking-wider">EMAIL ADDRESS</p>
                    <p className="text-xs sm:text-sm font-bold text-[#F8FAFC] mt-0.5 break-all">diykumarasinghe14@gmail.com</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-lg bg-[#0f172a]/60 border border-white/10 text-[#F8FAFC] text-xs font-bold hover:bg-[#1e293b]/60 transition-all duration-200 cursor-pointer shrink-0"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Phone card */}
              <div
                className="glass-card p-4 rounded-xl flex items-center justify-between border border-white/5 hover:border-[#38BDF8]/20 hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 rounded-lg bg-[#EC4899]/10 border border-[#EC4899]/20 flex items-center justify-center shrink-0 w-11 h-11">
                    <Phone className="h-5 w-5 text-[#EC4899]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8]/60 tracking-wider">PHONE CALL</p>
                    <p className="text-xs sm:text-sm font-bold text-[#F8FAFC] mt-0.5">+94 76 727 0603</p>
                  </div>
                </div>
                <a
                  href="tel:+94767270603"
                  className="px-4 py-2 rounded-lg bg-[#0f172a]/60 border border-white/10 text-[#F8FAFC] text-xs font-bold hover:bg-[#1e293b]/60 transition-all duration-200 shrink-0 text-center"
                >
                  Call
                </a>
              </div>

              {/* Grid for LinkedIn & GitHub */}
              <div className="grid grid-cols-2 gap-4">

                <a
                  href="https://www.linkedin.com/in/diyana-kumarasinghe-2794ab215/?skipRedirect=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 rounded-xl flex flex-col items-center justify-center border border-white/5 hover:border-[#38BDF8]/20 hover:bg-white/[0.02] transition-all duration-300 group text-center space-y-2 h-24"
                >
                  <div className="flex items-center justify-center shrink-0">
                    <LinkedinIcon />
                  </div>
                  <span className="text-[9px] font-bold text-[#F8FAFC] tracking-widest">LINKEDIN</span>
                </a>

                <a
                  href="https://github.com/diykumarasinghe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 rounded-xl flex flex-col items-center justify-center border border-white/5 hover:border-[#38BDF8]/20 hover:bg-white/[0.02] transition-all duration-300 group text-center space-y-2 h-24"
                >
                  <div className="flex items-center justify-center shrink-0">
                    <GithubIcon />
                  </div>
                  <span className="text-[9px] font-bold text-[#F8FAFC] tracking-widest">GITHUB</span>
                </a>

              </div>

            </div>
          </div>

          {/* Right Column: Send Message Card */}
          <div className="lg:col-span-7 w-full">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl relative overflow-hidden text-left h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-6">Send a Message</h3>
                {submitSuccess ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-scaleUp">
                    <div className="p-4 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                    <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm">
                      Thank you for reaching out. Your message has been saved, and I will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[9px] font-bold text-[#94A3B8] tracking-wider uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full bg-[#0f172a]/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all duration-200 placeholder-slate-500"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[9px] font-bold text-[#94A3B8] tracking-wider uppercase">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full bg-[#0f172a]/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all duration-200 placeholder-slate-500"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-[9px] font-bold text-[#94A3B8] tracking-wider uppercase">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your proposal or message here..."
                        className="w-full bg-[#0f172a]/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all duration-200 placeholder-slate-500 resize-none"
                      />
                    </div>

                    {/* Errors */}
                    {errorMessage && (
                      <p className="text-xs font-bold text-red-400">
                        {errorMessage}
                      </p>
                    )}

                    {/* Send Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#38BDF8] to-[#2563EB] hover:opacity-95 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.2)] cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
