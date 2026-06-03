import React from 'react';

const Certificates = () => {
  return (
    <section id="certificates" className="py-20 relative bg-[#07091a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest">
              CREDENTIALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Certifications & <span className="text-neon-gradient">Milestones</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[#38BDF8] to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Certificates Card */}
        <div className="max-w-3xl mx-auto">
          <div
            className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-start text-left transition-all duration-300 relative overflow-hidden max-w-[750px] mx-auto min-h-[220px]"
            style={{
              boxShadow: '0 0 30px rgba(34,197,94,0.05)',
            }}
          >
            {/* Left Accent vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#22C55E] shadow-[0_0_15px_rgba(34,197,94,0.5)]" />

            {/* Status Badge top right */}
            <div className="absolute top-6 sm:top-8 right-6 sm:right-8 flex items-center bg-[#22C55E]/10 border border-[#22C55E]/20 px-3 py-1.5 rounded-lg text-[#22C55E] font-bold text-[10px] uppercase tracking-wider">
              <span>Certified</span>
            </div>

            {/* Icon Container & Issuer */}
            <div className="flex items-center space-x-4 mb-5 pl-2">
              <div className="p-2.5 rounded-lg bg-[#0f172a]/60 border border-white/5 shadow-[0_0_10px_rgba(34,197,94,0.15)] flex items-center justify-center shrink-0 w-11 h-11 text-xl">
                <span>🍃</span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#94A3B8]/60 tracking-widest uppercase">CREDENTIAL ISSUER</p>
                <h4 className="text-sm font-bold text-[#F8FAFC] mt-0.5">MongoDB University</h4>
              </div>
            </div>

            {/* Course Title & Details */}
            <div className="pl-2 space-y-3">
              <h3 className="text-xl font-bold text-white tracking-wide">
                MongoDB Atlas Administrator Path
              </h3>
              
              <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xl">
                In-depth development and administration of cloud clusters. Covers Atlas database deployment setup, scale provisioning, security configurations, database indexes optimization, and performance diagnostics.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2.5">
                {["MongoDB Atlas", "Cloud Databases", "NoSQL", "Database Security"].map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] bg-[#0f172a]/60 border border-white/5 text-[#94A3B8] px-3 py-1.5 rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* View Certificate Button */}
            <div className="w-full sm:w-auto flex justify-end mt-6 sm:mt-0 pl-2 sm:pl-0 sm:absolute sm:bottom-8 sm:right-8">
              <a
                href="https://www.linkedin.com/posts/diyana-kumarasinghe-2794ab215_mongodb-mongodbatlas-databasemanagement-share-7465684827225104385-4A6-/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 border border-[#38BDF8]/30 hover:border-[#38BDF8]/60 bg-[#38BDF8]/5 hover:bg-[#38BDF8]/10 text-[#38BDF8] hover:text-white font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-[10px] sm:rounded-[12px] transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(56,189,248,0.05)] hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]"
              >
                <span>View Certificate</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Certificates;
