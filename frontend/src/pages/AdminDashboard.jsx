import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Award, 
  Mail, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Menu, 
  X, 
  ChevronRight, 
  User, 
  Clock, 
  Check, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- CRUD States ---
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modals Toggles
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Form Fields
  const [projectForm, setProjectForm] = useState({
    title: '',
    type: '',
    tech: '',
    shortDesc: ''
  });

  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    skillsEarned: '',
    date: ''
  });

  // --- Initialize state from LocalStorage or Fallbacks ---
  useEffect(() => {
    // 1. Projects
    const localProjects = localStorage.getItem('dashboardProjects');
    if (localProjects) {
      setProjects(JSON.parse(localProjects));
    } else {
      localStorage.setItem('dashboardProjects', JSON.stringify(portfolioData.projects));
      setProjects(portfolioData.projects);
    }

    // 2. Certificates
    const localCerts = localStorage.getItem('dashboardCerts');
    if (localCerts) {
      setCertificates(JSON.parse(localCerts));
    } else {
      localStorage.setItem('dashboardCerts', JSON.stringify(portfolioData.certificates));
      setCertificates(portfolioData.certificates);
    }

    // 3. Messages (seed with a dummy inquiry if empty)
    const localMessages = localStorage.getItem('portfolioMessages');
    if (localMessages) {
      setMessages(JSON.parse(localMessages));
    } else {
      const seedMessages = [
        {
          id: 'seed-1',
          name: 'Sarah Connor',
          email: 'sarah.connor@cyberdyne.com',
          message: 'Hi Diyana, I saw your Smart Campus Operations Hub project and I would love to discuss a potential internship opportunity with our dev team.',
          date: 'Jun 2, 2026, 10:14 AM'
        }
      ];
      localStorage.setItem('portfolioMessages', JSON.stringify(seedMessages));
      setMessages(seedMessages);
    }
  }, []);

  // --- Handlers ---
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  // --- Project Add / Edit CRUD Operations ---
  const openProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        type: proj.type,
        tech: proj.tech.join(', '),
        shortDesc: proj.shortDesc
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        type: 'MERN Project',
        tech: '',
        shortDesc: ''
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.shortDesc) return;

    let updatedProjects = [];
    if (editingProject) {
      // Edit
      updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { 
              ...p, 
              title: projectForm.title, 
              type: projectForm.type, 
              tech: projectForm.tech.split(',').map(t => t.trim()).filter(Boolean),
              shortDesc: projectForm.shortDesc
            }
          : p
      );
    } else {
      // Add
      const newProj = {
        id: 'proj-' + Date.now(),
        title: projectForm.title,
        type: projectForm.type,
        tech: projectForm.tech.split(',').map(t => t.trim()).filter(Boolean),
        shortDesc: projectForm.shortDesc,
        githubUrl: 'https://github.com/diyanakumarasinghe',
        linkedinUrl: 'https://linkedin.com',
        liveDemoUrl: '#',
        details: {
          problem: 'Case study details mock problem statement.',
          solution: 'Case study details mock solution statement.',
          role: 'Full-Stack Developer',
          contributions: ['Developed basic features.', 'Maintained code repository.'],
          challenges: 'Minor deployment adjustments.'
        }
      };
      updatedProjects = [newProj, ...projects];
    }

    setProjects(updatedProjects);
    localStorage.setItem('dashboardProjects', JSON.stringify(updatedProjects));
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('dashboardProjects', JSON.stringify(updated));
    }
  };

  // --- Certificate Add / Edit CRUD Operations ---
  const openCertModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({
        title: cert.title,
        issuer: cert.issuer,
        skillsEarned: cert.skillsEarned.join(', '),
        date: cert.date
      });
    } else {
      setEditingCert(null);
      setCertForm({
        title: '',
        issuer: '',
        skillsEarned: '',
        date: new Date().getFullYear().toString()
      });
    }
    setIsCertModalOpen(true);
  };

  const handleSaveCert = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;

    let updatedCerts = [];
    if (editingCert) {
      // Edit
      updatedCerts = certificates.map((c, idx) => 
        idx === editingCert.index
          ? {
              title: certForm.title,
              issuer: certForm.issuer,
              skillsEarned: certForm.skillsEarned.split(',').map(s => s.trim()).filter(Boolean),
              date: certForm.date
            }
          : c
      );
    } else {
      // Add
      const newCert = {
        title: certForm.title,
        issuer: certForm.issuer,
        skillsEarned: certForm.skillsEarned.split(',').map(s => s.trim()).filter(Boolean),
        date: certForm.date
      };
      updatedCerts = [newCert, ...certificates];
    }

    setCertificates(updatedCerts);
    localStorage.setItem('dashboardCerts', JSON.stringify(updatedCerts));
    setIsCertModalOpen(false);
  };

  const handleDeleteCert = (index) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const updated = certificates.filter((_, idx) => idx !== index);
      setCertificates(updated);
      localStorage.setItem('dashboardCerts', JSON.stringify(updated));
    }
  };

  // --- Messages Delete Operation ---
  const handleDeleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('portfolioMessages', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-gray-200 flex font-sans">
      
      {/* Sidebar - Desktop Layout */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#0b0e17] border-r border-white/5 shrink-0">
        {/* Sidebar Brand header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <span className="text-xl font-bold text-white">Diyana <span className="text-neonBlue">Admin</span></span>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-left">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-neonBlue/10 text-neonBlue border-l-2 border-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'projects' ? 'bg-neonBlue/10 text-neonBlue border-l-2 border-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'certificates' ? 'bg-neonBlue/10 text-neonBlue border-l-2 border-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Certificates</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'messages' ? 'bg-neonBlue/10 text-neonBlue border-l-2 border-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4" />
              <span>Messages</span>
            </div>
            {messages.length > 0 && (
              <span className="text-[10px] font-bold bg-neonBlue text-darkBg px-2 py-0.5 rounded-full shrink-0">
                {messages.length}
              </span>
            )}
          </button>
        </nav>

        {/* Sidebar Footer logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-400 hover:text-neonPink hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Drawer */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}>
          <div className="w-64 h-full bg-[#0b0e17] border-r border-white/5 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
              <span className="text-xl font-bold text-white">Diyana <span className="text-neonBlue">Admin</span></span>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 text-left">
              <button
                onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-neonBlue/10 text-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'projects' ? 'bg-neonBlue/10 text-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => { setActiveTab('certificates'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'certificates' ? 'bg-neonBlue/10 text-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Award className="h-4 w-4" />
                <span>Certificates</span>
              </button>
              <button
                onClick={() => { setActiveTab('messages'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'messages' ? 'bg-neonBlue/10 text-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" />
                  <span>Messages</span>
                </div>
                {messages.length > 0 && (
                  <span className="text-[10px] font-bold bg-neonBlue text-darkBg px-2 py-0.5 rounded-full">
                    {messages.length}
                  </span>
                )}
              </button>
            </nav>
            <div className="p-4 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-400 hover:text-neonPink hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 sm:px-8 bg-[#070911]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold text-white capitalize">
              {activeTab === 'dashboard' ? 'Overview' : activeTab}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/"
              target="_blank" 
              className="text-xs font-bold text-neonBlue hover:underline bg-neonBlue/10 border border-neonBlue/20 px-3.5 py-1.5 rounded-lg transition-all duration-200"
            >
              View Live Portfolio
            </a>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-neonBlue/20 border border-neonBlue/40 flex items-center justify-center font-bold text-xs text-neonBlue">
                A
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-gray-400">Admin</span>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-6 sm:p-8 space-y-8">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Stat 1: Projects */}
                <div 
                  onClick={() => setActiveTab('projects')}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-neonBlue/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.05)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-2">
                    <p className="text-xs uppercase font-extrabold text-gray-500 tracking-wider">Total Projects</p>
                    <p className="text-3xl font-extrabold text-white group-hover:text-neonBlue transition-colors duration-200">{projects.length}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-neonBlue/10 border border-neonBlue/20 text-neonBlue">
                    <Briefcase className="h-6 w-6" />
                  </div>
                </div>

                {/* Stat 2: Certificates */}
                <div 
                  onClick={() => setActiveTab('certificates')}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-neonSky/30 hover:shadow-[0_0_15px_rgba(0,114,255,0.05)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-2">
                    <p className="text-xs uppercase font-extrabold text-gray-500 tracking-wider">Certificates</p>
                    <p className="text-3xl font-extrabold text-white group-hover:text-neonSky transition-colors duration-200">{certificates.length}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-neonSky/10 border border-neonSky/20 text-neonSky">
                    <Award className="h-6 w-6" />
                  </div>
                </div>

                {/* Stat 3: Messages */}
                <div 
                  onClick={() => setActiveTab('messages')}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-neonBlue/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.05)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-2">
                    <p className="text-xs uppercase font-extrabold text-gray-500 tracking-wider">Inquiries Received</p>
                    <p className="text-3xl font-extrabold text-white group-hover:text-neonBlue transition-colors duration-200">{messages.length}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-neonBlue/10 border border-neonBlue/20 text-neonBlue">
                    <Mail className="h-6 w-6" />
                  </div>
                </div>

              </div>

              {/* Recent Activity Rows */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Recent Messages list */}
                <div className="lg:col-span-7 glass-card p-6 rounded-2xl text-left border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Recent Messages</h3>
                    <button onClick={() => setActiveTab('messages')} className="text-xs text-neonBlue hover:underline flex items-center space-x-1">
                      <span>View All</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                  {messages.length === 0 ? (
                    <p className="text-xs text-gray-500 py-6 text-center">No messages received.</p>
                  ) : (
                    <div className="space-y-4">
                      {messages.slice(0, 3).map((msg) => (
                        <div 
                          key={msg.id}
                          onClick={() => setSelectedMessage(msg)}
                          className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-neonBlue/20 hover:bg-white/[0.08] transition-all duration-200 cursor-pointer flex justify-between items-center group"
                        >
                          <div className="space-y-1 pr-4 truncate flex-grow">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-white group-hover:text-neonBlue transition-colors duration-200">{msg.name}</span>
                              <span className="text-[10px] text-gray-500 font-semibold">• {msg.date.split(',')[0]}</span>
                            </div>
                            <p className="text-xs text-gray-400 truncate">{msg.message}</p>
                          </div>
                          <Eye className="h-4 w-4 text-gray-500 group-hover:text-neonBlue shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Shortcuts */}
                <div className="lg:col-span-5 glass-card p-6 rounded-2xl text-left border border-white/5 space-y-6">
                  <h3 className="text-lg font-bold text-white">Console Console</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => openProjectModal()}
                      className="p-4 rounded-xl bg-neonBlue/10 border border-neonBlue/20 text-neonBlue hover:bg-neonBlue/20 transition-all duration-200 font-bold text-xs flex flex-col items-center justify-center space-y-2 cursor-pointer"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add New Project</span>
                    </button>
                    
                    <button 
                      onClick={() => openCertModal()}
                      className="p-4 rounded-xl bg-neonSky/10 border border-neonSky/20 text-neonSky hover:bg-neonSky/20 transition-all duration-200 font-bold text-xs flex flex-col items-center justify-center space-y-2 cursor-pointer"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>
                  
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-2 text-xs">
                    <p className="font-bold text-gray-300">Environment System Details</p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500">
                      <span>Server Engine:</span>
                      <span className="font-mono text-gray-400">NodeJS / ViteDev</span>
                      <span>CSS Framework:</span>
                      <span className="font-mono text-gray-400">TailwindCSS 3.x</span>
                      <span>Database Engine:</span>
                      <span className="font-mono text-gray-400">LocalStorage / Client</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Manage Projects</h3>
                  <p className="text-xs text-gray-500">Add, edit, or delete portfolio entries visible to visitors.</p>
                </div>
                <button
                  onClick={() => openProjectModal()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-neonBlue to-neonSky text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 shadow-[0_0_10px_rgba(0,240,255,0.25)] cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Table wrapper */}
              <div className="glass-card rounded-2xl border border-white/5 overflow-x-auto shadow-xl">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Title</th>
                      <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Classification</th>
                      <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Technologies</th>
                      <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj) => (
                      <tr key={proj.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all duration-200">
                        <td className="p-4 text-sm font-bold text-white">{proj.title}</td>
                        <td className="p-4">
                          <span className="text-[10px] font-extrabold bg-white/5 border border-white/10 text-gray-400 px-2.5 py-1 rounded-md">
                            {proj.type}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {proj.tech.slice(0, 3).map((t, idx) => (
                              <span key={idx} className="text-[9px] bg-neonBlue/5 border border-neonBlue/10 text-cyan-400 px-2 py-0.5 rounded-md font-semibold">
                                {t}
                              </span>
                            ))}
                            {proj.tech.length > 3 && (
                              <span className="text-[9px] text-gray-500 font-bold px-1.5 py-0.5">+{proj.tech.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="inline-flex space-x-2">
                            <button
                              onClick={() => openProjectModal(proj)}
                              className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neonBlue hover:border-neonBlue/30 transition-all duration-200 cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neonPink hover:border-neonPink/30 transition-all duration-200 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CERTIFICATES MANAGEMENT */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Manage Certificates</h3>
                  <p className="text-xs text-gray-500">Edit or append verified technical achievement credentials.</p>
                </div>
                <button
                  onClick={() => openCertModal()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-neonBlue to-neonSky text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 shadow-[0_0_10px_rgba(0,240,255,0.25)] cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Certificate</span>
                </button>
              </div>

              {/* Certificates Table */}
              <div className="glass-card rounded-2xl border border-white/5 overflow-x-auto shadow-xl">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Credential Title</th>
                      <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Issuer</th>
                      <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Date</th>
                      <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-all duration-200">
                        <td className="p-4 text-sm font-bold text-white">{cert.title}</td>
                        <td className="p-4 text-sm text-gray-300">{cert.issuer}</td>
                        <td className="p-4 text-sm text-gray-400">{cert.date}</td>
                        <td className="p-4 text-right">
                          <div className="inline-flex space-x-2">
                            <button
                              onClick={() => openCertModal({ ...cert, index })}
                              className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neonBlue hover:border-neonBlue/30 transition-all duration-200 cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCert(index)}
                              className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neonPink hover:border-neonPink/30 transition-all duration-200 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: INCOMING MESSAGES LIST */}
          {activeTab === 'messages' && (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-lg font-bold text-white">Contact Messages</h3>
                <p className="text-xs text-gray-500">View form submissions sent from your portfolio website.</p>
              </div>

              {/* Messages Table */}
              <div className="glass-card rounded-2xl border border-white/5 overflow-x-auto shadow-xl">
                {messages.length === 0 ? (
                  <div className="py-16 text-center text-gray-500 text-sm">
                    No inquiries received yet. Submit a message on the Contact form to test it!
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Sender</th>
                        <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Email Address</th>
                        <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider">Date Received</th>
                        <th className="p-4 text-xs uppercase font-extrabold text-gray-400 tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((msg) => (
                        <tr key={msg.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all duration-200">
                          <td className="p-4 text-sm font-bold text-white">{msg.name}</td>
                          <td className="p-4 text-sm text-gray-300">{msg.email}</td>
                          <td className="p-4 text-xs text-gray-400">{msg.date}</td>
                          <td className="p-4 text-right">
                            <div className="inline-flex space-x-2">
                              <button
                                onClick={() => setSelectedMessage(msg)}
                                className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neonBlue hover:border-neonBlue/30 transition-all duration-200 cursor-pointer"
                                title="View Message"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neonPink hover:border-neonPink/30 transition-all duration-200 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- ADD/EDIT PROJECT MODAL --- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-2xl border border-white/10 p-6 sm:p-8 animate-scaleUp text-left" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button 
                onClick={() => setIsProjectModalOpen(false)} 
                className="p-1 rounded bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Project Title</label>
                <input 
                  type="text" 
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Back2U Lost & Found"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Project Classification</label>
                <select 
                  value={projectForm.type}
                  onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
                  className="w-full bg-[#0b0e17] border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-neonBlue"
                >
                  <option value="MERN Project">MERN Project</option>
                  <option value="Full-Stack Project">Full-Stack Project</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Web App">Web App</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Technologies (comma separated)</label>
                <input 
                  type="text" 
                  value={projectForm.tech}
                  onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                  placeholder="e.g. React.js, Express, MongoDB, Node.js"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Short Description</label>
                <textarea 
                  rows="3"
                  value={projectForm.shortDesc}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDesc: e.target.value })}
                  placeholder="Summary of the project..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue resize-none"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 border border-white/15 text-gray-300 hover:text-white rounded-lg text-xs font-bold hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-neonBlue to-neonSky text-white rounded-lg text-xs font-bold shadow-lg shadow-cyan-500/10 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD/EDIT CERTIFICATE MODAL --- */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-2xl border border-white/10 p-6 sm:p-8 animate-scaleUp text-left" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingCert ? 'Edit Certificate' : 'Add Certificate'}
              </h3>
              <button 
                onClick={() => setIsCertModalOpen(false)} 
                className="p-1 rounded bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveCert} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Credential Name</label>
                <input 
                  type="text" 
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  placeholder="e.g. MongoDB Atlas Administrator Path"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Issuing Authority</label>
                <input 
                  type="text" 
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                  placeholder="e.g. MongoDB Inc."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Skills Validated (comma separated)</label>
                <input 
                  type="text" 
                  value={certForm.skillsEarned}
                  onChange={(e) => setCertForm({ ...certForm, skillsEarned: e.target.value })}
                  placeholder="e.g. MongoDB, Cloud Database, NoSQL"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Date Earned / Year</label>
                <input 
                  type="text" 
                  value={certForm.date}
                  onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                  placeholder="e.g. 2025"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 border border-white/15 text-gray-300 hover:text-white rounded-lg text-xs font-bold hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-neonBlue to-neonSky text-white rounded-lg text-xs font-bold shadow-lg shadow-cyan-500/10 cursor-pointer"
                >
                  Save Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- INQUIRY VIEW DETAILED MODAL --- */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-2xl border border-white/10 p-6 sm:p-8 animate-scaleUp text-left" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-neonBlue/10 border border-neonBlue/20 text-neonBlue">
                  <Mail className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold text-white">Inquiry Details</h3>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)} 
                className="p-1 rounded bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5">
                <span className="font-extrabold text-gray-500 uppercase text-[10px] flex items-center"><User className="h-3.5 w-3.5 mr-1" /> Sender</span>
                <span className="col-span-2 text-white font-bold">{selectedMessage.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5">
                <span className="font-extrabold text-gray-500 uppercase text-[10px] flex items-center"><Mail className="h-3.5 w-3.5 mr-1" /> Email</span>
                <span className="col-span-2 text-neonBlue break-all">{selectedMessage.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5">
                <span className="font-extrabold text-gray-500 uppercase text-[10px] flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> Timestamp</span>
                <span className="col-span-2 text-gray-300">{selectedMessage.date}</span>
              </div>
              
              <div className="space-y-2 pt-2 text-left">
                <span className="font-extrabold text-gray-500 uppercase text-[10px]">Message Body</span>
                <p className="p-4 rounded-xl bg-white/5 border border-white/5 text-gray-300 leading-relaxed max-h-[200px] overflow-y-auto">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Inquiry from portfolio`}
                  className="px-4 py-2 bg-neonBlue/10 border border-neonBlue/20 text-neonBlue hover:bg-neonBlue/20 rounded-lg text-xs font-bold transition-all duration-200"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
