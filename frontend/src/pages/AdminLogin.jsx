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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or password. Please try again.');
      }

      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      setIsLoading(false);
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Could not validate admin credentials.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#03061B] text-[#F8FAFC] px-4 font-outfit overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[100px] -z-10 animate-pulse" />

      {/* Back button */}
      <div className="absolute top-8 left-8">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-sm text-[#94A3B8] hover:text-white transition-colors duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Login Card Container */}
      <div className="w-full max-w-md">
        <div 
          className="glass-card rounded-[20px] p-8 sm:p-10 border border-[#1B2B4D] relative overflow-hidden transition-all duration-500 hover:border-[#00D4FF]/30"
          style={{
            backgroundColor: 'rgba(7, 18, 43, 0.45)',
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Admin <span className="bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] bg-clip-text text-transparent">Login</span>
            </h2>
            <p className="text-[10px] text-[#94A3B8]/60 mt-2 font-bold tracking-widest uppercase">
              Secure Control Terminal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase font-bold text-[#94A3B8]/80 tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-4.5 w-4.5 text-[#00D4FF]" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none transition-all duration-300 placeholder-gray-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs uppercase font-bold text-[#94A3B8]/80 tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4.5 w-4.5 text-[#3B82F6]" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none transition-all duration-300 placeholder-gray-600"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs font-semibold animate-shake">
                <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Trigger */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 active:scale-[0.98] disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.45)] cursor-pointer"
            >
              {isLoading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
