import { useCMSData } from '../utils/cmsHelper';
import StatusBadge from './StatusBadge';

const Education = () => {
  const educationData = useCMSData('education');
  const eduList = Array.isArray(educationData) ? educationData : [educationData];

  return (
    <section id="education" className="py-20 relative bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest">
              EDUCATION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Academic <span className="text-neon-gradient">Background</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[#38BDF8] to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Education List Stack */}
        <div className="max-w-3xl mx-auto space-y-8">
          {eduList.map((edu, idx) => {
            const { institute, degree, specialization, duration, status } = edu || {};
            return (
              <div key={edu.id || idx} className="relative group">
                
                {/* Subtle blue glow orb behind right side */}
                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-64 h-64 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-[#38BDF8]/15 transition-all duration-300" />
                
                <div className="glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden transition-all duration-300 hover:border-[#38BDF8]/20 max-w-[720px] mx-auto shadow-2xl">
                  
                  {/* Top Center Icon */}
                  <div className="mx-auto w-14 h-14 rounded-xl bg-[#0f172a]/60 border border-white/5 flex items-center justify-center mb-6 text-2xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                    <span>🎓</span>
                  </div>

                  {/* Institution */}
                  <h4 className="text-[10px] sm:text-xs uppercase text-[#38BDF8] tracking-widest font-extrabold mb-3 text-center">
                    {institute}
                  </h4>

                  {/* Degree Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] text-center tracking-tight mb-4 leading-tight">
                    {degree}
                  </h3>

                  {/* Specialization Badge */}
                  {specialization && (
                    <div className="flex justify-center mb-8">
                      <span className="text-xs font-semibold text-[#38BDF8] bg-[#38BDF8]/5 border border-[#38BDF8]/20 px-5 py-2 rounded-full text-center transition-all duration-300 hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]/40">
                        {specialization}
                      </span>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-white/5 mb-8" />

                  {/* Bottom Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Current Status info */}
                    <div className="text-left">
                      <p className="text-[10px] uppercase text-[#94A3B8] font-bold tracking-wider">
                        STATUS / DETAILS
                      </p>
                      <p className="text-base font-bold text-[#F8FAFC] mt-0.5">
                        {duration}
                      </p>
                    </div>

                    {/* Status Badge */}
                    {status && (
                      <StatusBadge status={status} className="sm:justify-end" />
                    )}
                    
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Education;
