import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        localStorage.setItem('adminToken', 'diyana-admin-token-' + Date.now());
        setIsLoading(false);
        navigate('/admin/dashboard', { replace: true });
      } else {
        setIsLoading(false);
        setError('Invalid email or password. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050816] text-[#F8FAFC] px-4">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-[80px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#2563EB]/10 rounded-full blur-[80px] -z-10 animate-pulse-slow" />

      {/* Back button */}
      <div className="absolute top-8 left-8">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-sm text-[#94A3B8] hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-[#38BDF8]/30">
          
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Admin <span className="text-neon-gradient">Login</span>
            </h2>
            <p className="text-[10px] text-[#94A3B8]/60 mt-2 font-bold tracking-widest uppercase">
              Secure control terminal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs uppercase font-bold text-[#94A3B8]/60 tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full bg-[#0f172a]/60 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all duration-200 placeholder-gray-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs uppercase font-bold text-[#94A3B8]/60 tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0f172a]/60 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all duration-200 placeholder-gray-600"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Trigger */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#38BDF8] to-[#2563EB] hover:opacity-90 disabled:opacity-50 text-white py-3 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.2)] cursor-pointer"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <span>Authenticate</span>
              )}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
