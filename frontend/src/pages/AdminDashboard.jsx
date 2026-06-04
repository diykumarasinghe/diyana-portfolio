import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Info, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Wrench, 
  Mail, 
  BarChart3, 
  Settings as SettingsIcon, 
  LogOut, 
  Eye, 
  Check, 
  Trash2, 
  Menu, 
  X, 
  Clock, 
  Plus, 
  Edit, 
  FileText, 
  Shield, 
  Send,
  EyeOff,
  Globe
} from 'lucide-react';
import { fetchAllCMSData, saveCMSData, migrateLocalStorageToMongoDBIfEmpty } from '../utils/cmsHelper';

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // --- API DATA (Messages) ---
  const [messages, setMessages] = useState([]);
  const [readMessageIds, setReadMessageIds] = useState([]);
  const [repliedMessageIds, setRepliedMessageIds] = useState([]);
  const [deletedCount, setDeletedCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // --- CMS DATA STATES (Synchronized with localStorage) ---
  const [heroData, setHeroData] = useState({});
  const [aboutData, setAboutData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [cvData, setCvData] = useState({});
  const [projectsData, setProjectsData] = useState([]);
  const [certificatesData, setCertificatesData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);

  // --- CRUD Modals & Form States ---
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '', category: '', description: '', imgUrl: '', githubUrl: '', linkedinUrl: '', liveDemoUrl: '', tech: '', icon: ''
  });

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({
    title: '', issuer: '', date: '', description: '', link: '', linkedinUrl: '', tags: '', icon: ''
  });

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    category: '', items: '', icon: '', accentColor: ''
  });

  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [expForm, setExpForm] = useState({
    company: '', position: '', duration: '', description: '', technologies: '', logoUrl: ''
  });

  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [eduForm, setEduForm] = useState({
    institute: '', degree: '', specialization: '', duration: '', status: ''
  });

  // Settings & Status
  const [settingsForm, setSettingsForm] = useState({
    email: 'it23770638@gmail.com', newPassword: '', confirmPassword: ''
  });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [profileUpdatedDate, setProfileUpdatedDate] = useState('Jun 03, 2026');

  // --- CMS TOAST NOTIFICATION ---
  const [cmsToast, setCmsToast] = useState(null); // { type: 'success'|'error', message: string }

  const showCmsToast = (type, message) => {
    setCmsToast({ type, message });
    setTimeout(() => setCmsToast(null), 4000);
  };

  // Fetch messages from MongoDB API
  const fetchMessages = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      const mapped = data.map(m => ({
        id: m._id,
        name: m.name,
        email: m.email,
        message: m.message,
        date: new Date(m.createdAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      }));
      setMessages(mapped);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Sync and initialize all states
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login', { replace: true });
      return;
    }

    // Load CMS data from MongoDB (single request)
    const initCMSData = async () => {
      // Try migration check first: if MongoDB empty & localStorage has old data, pre-fill
      const migrationData = await migrateLocalStorageToMongoDBIfEmpty();

      // Fetch fresh data from MongoDB
      const allCMS = await fetchAllCMSData();

      // Merge: MongoDB data takes priority; migration data fills gaps if MongoDB is empty
      const source = (allCMS && Object.keys(allCMS).length > 0) ? allCMS : (migrationData || {});

      if (source.hero) setHeroData(source.hero);
      if (source.about) setAboutData(source.about);
      if (source.education) {
        const edu = source.education;
        setEducationData(Array.isArray(edu) ? edu : [edu]);
      }
      if (source.experience) setExperienceData(source.experience);
      if (source.cv) setCvData(source.cv);
      if (source.projects) setProjectsData(source.projects);
      if (source.certificates) setCertificatesData(source.certificates);
      if (source.skills) setSkillsData(source.skills);
    };

    initCMSData();

    // Load Message Meta States (read/replied tracking stays in localStorage — it's UI state, not CMS data)
    const savedRead = localStorage.getItem('readMessageIds');
    if (savedRead) setReadMessageIds(JSON.parse(savedRead));

    const savedReplied = localStorage.getItem('repliedMessageIds');
    if (savedReplied) setRepliedMessageIds(JSON.parse(savedReplied));

    const savedDeleted = localStorage.getItem('deletedMessagesCount');
    if (savedDeleted) setDeletedCount(Number(savedDeleted));

    fetchMessages();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  // --- SAVE ACTIONS ---
  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      await saveCMSData('hero', heroData);
      const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      setProfileUpdatedDate(dateStr);
      showCmsToast('success', 'Saved to MongoDB successfully');
    } catch (err) {
      console.error('Profile save failed:', err.message);
      showCmsToast('error', 'Save failed. Please try again.');
    }
  };

  const saveAbout = async (e) => {
    e.preventDefault();
    try {
      await saveCMSData('about', aboutData);
      showCmsToast('success', 'Saved to MongoDB successfully');
    } catch (err) {
      console.error('About save failed:', err.message);
      showCmsToast('error', 'Save failed. Please try again.');
    }
  };

  // --- EDUCATION CRUD ---
  const openEduModal = (edu = null) => {
    if (edu) {
      setEditingEdu(edu);
      setEduForm({
        institute: edu.institute,
        degree: edu.degree,
        specialization: edu.specialization,
        duration: edu.duration,
        status: edu.status
      });
    } else {
      setEditingEdu(null);
      setEduForm({ institute: '', degree: '', specialization: '', duration: '', status: 'Active' });
    }
    setIsEduModalOpen(true);
  };

  const handleSaveEdu = async (e) => {
    e.preventDefault();
    let updated;
    if (editingEdu) {
      updated = educationData.map(item => item.id === editingEdu.id ? { ...item, ...eduForm } : item);
    } else {
      const newItem = { ...eduForm, id: 'edu-' + Date.now() };
      updated = [...educationData, newItem];
    }
    try {
      await saveCMSData('education', updated);
      setEducationData(updated);
      setIsEduModalOpen(false);
      showCmsToast('success', 'Saved to MongoDB successfully');
    } catch (err) {
      console.error('Education save failed:', err.message);
      showCmsToast('error', 'Save failed. Please try again.');
    }
  };

  const handleDeleteEdu = async (id) => {
    if (window.confirm('Delete this academic entry?')) {
      const updated = educationData.filter(item => item.id !== id);
      try {
        await saveCMSData('education', updated);
        setEducationData(updated);
        showCmsToast('success', 'Saved to MongoDB successfully');
      } catch (err) {
        console.error('Education delete failed:', err.message);
        showCmsToast('error', 'Save failed. Please try again.');
      }
    }
  };

  const saveCV = async (e) => {
    e.preventDefault();
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const updatedCV = { ...cvData, lastUpdated: dateStr };
    try {
      await saveCMSData('cv', updatedCV);
      setCvData(updatedCV);
      showCmsToast('success', 'Saved to MongoDB successfully');
    } catch (err) {
      console.error('CV save failed:', err.message);
      showCmsToast('error', 'Save failed. Please try again.');
    }
  };

  // --- EXPERIENCE CRUD ---
  const openExpModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp);
      setExpForm({
        company: exp.company,
        position: exp.position,
        duration: exp.duration,
        description: exp.description,
        technologies: exp.technologies,
        logoUrl: exp.logoUrl || ''
      });
    } else {
      setEditingExp(null);
      setExpForm({ company: '', position: '', duration: '', description: '', technologies: '', logoUrl: '' });
    }
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e) => {
    e.preventDefault();
    let updated;
    if (editingExp) {
      updated = experienceData.map(item => item.id === editingExp.id ? { ...item, ...expForm } : item);
    } else {
      const newItem = { ...expForm, id: 'exp-' + Date.now() };
      updated = [newItem, ...experienceData];
    }
    try {
      await saveCMSData('experience', updated);
      setExperienceData(updated);
      setIsExpModalOpen(false);
      showCmsToast('success', 'Saved to MongoDB successfully');
    } catch (err) {
      console.error('Experience save failed:', err.message);
      showCmsToast('error', 'Save failed. Please try again.');
    }
  };

  const handleDeleteExp = async (id) => {
    if (window.confirm('Delete this internship/job experience?')) {
      const updated = experienceData.filter(item => item.id !== id);
      try {
        await saveCMSData('experience', updated);
        setExperienceData(updated);
        showCmsToast('success', 'Saved to MongoDB successfully');
      } catch (err) {
        console.error('Experience delete failed:', err.message);
        showCmsToast('error', 'Save failed. Please try again.');
      }
    }
  };

  // --- PROJECTS CRUD ---
  const openProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        category: proj.type || proj.category || 'MERN Project',
        description: proj.shortDesc || proj.description || '',
        imgUrl: proj.imgUrl || '',
        githubUrl: proj.githubUrl || '',
        linkedinUrl: proj.linkedinUrl || '',
        liveDemoUrl: proj.liveDemoUrl || '',
        tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech || '',
        icon: proj.icon || '🔍'
      });
    } else {
      setEditingProject(null);
      setProjectForm({ title: '', category: 'MERN Project', description: '', imgUrl: '', githubUrl: '', linkedinUrl: '', liveDemoUrl: '', tech: '', icon: '🔍' });
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    let updated;
    const mappedForm = {
      title: projectForm.title,
      type: projectForm.category,
      category: projectForm.category,
      shortDesc: projectForm.description,
      description: projectForm.description,
      imgUrl: projectForm.imgUrl,
      githubUrl: projectForm.githubUrl,
      linkedinUrl: projectForm.linkedinUrl,
      liveDemoUrl: projectForm.liveDemoUrl,
      tech: projectForm.tech.split(',').map(t => t.trim()).filter(Boolean),
      icon: projectForm.icon || '🔍',
      details: {
        problem: 'Sleek project case study problem statement.',
        solution: 'Custom case study solution statement.',
        role: 'Full-Stack Developer',
        contributions: ['Designed dynamic forms.', 'Integrated database models.'],
        challenges: 'Minor responsive styling challenges resolved.'
      }
    };

    if (editingProject) {
      updated = projectsData.map(p => p.id === editingProject.id ? { ...p, ...mappedForm } : p);
    } else {
      const newProj = { ...mappedForm, id: 'proj-' + Date.now() };
      updated = [newProj, ...projectsData];
    }
    try {
      await saveCMSData('projects', updated);
      setProjectsData(updated);
      setIsProjectModalOpen(false);
      showCmsToast('success', 'Saved to MongoDB successfully');
    } catch (err) {
      console.error('Project save failed:', err.message);
      showCmsToast('error', 'Save failed. Please try again.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projectsData.filter(p => p.id !== id);
      try {
        await saveCMSData('projects', updated);
        setProjectsData(updated);
        showCmsToast('success', 'Saved to MongoDB successfully');
      } catch (err) {
        console.error('Project delete failed:', err.message);
        showCmsToast('error', 'Save failed. Please try again.');
      }
    }
  };

  // --- CERTIFICATES CRUD ---
  const openCertModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        description: cert.description || '',
        link: cert.link || '',
        linkedinUrl: cert.linkedinUrl || '',
        tags: Array.isArray(cert.tags) ? cert.tags.join(', ') : cert.tags || '',
        icon: cert.icon || '🍃'
      });
    } else {
      setEditingCert(null);
      setCertForm({ title: '', issuer: '', date: new Date().getFullYear().toString(), description: '', link: '', linkedinUrl: '', tags: '', icon: '🍃' });
    }
    setIsCertModalOpen(true);
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    let updated;
    const mappedForm = {
      title: certForm.title,
      issuer: certForm.issuer,
      date: certForm.date,
      description: certForm.description,
      link: certForm.link,
      linkedinUrl: certForm.linkedinUrl,
      tags: certForm.tags.split(',').map(s => s.trim()).filter(Boolean),
      skillsEarned: certForm.tags.split(',').map(s => s.trim()).filter(Boolean),
      icon: certForm.icon || '🍃'
    };

    if (editingCert) {
      updated = certificatesData.map(c => c.id === editingCert.id ? { ...c, ...mappedForm } : c);
    } else {
      const newCert = { ...mappedForm, id: 'cert-' + Date.now() };
      updated = [newCert, ...certificatesData];
    }
    try {
      await saveCMSData('certificates', updated);
      setCertificatesData(updated);
      setIsCertModalOpen(false);
      showCmsToast('success', 'Saved to MongoDB successfully');
    } catch (err) {
      console.error('Certificate save failed:', err.message);
      showCmsToast('error', 'Save failed. Please try again.');
    }
  };

  const handleDeleteCert = async (id) => {
    if (window.confirm('Are you sure you want to delete this credential?')) {
      const updated = certificatesData.filter(c => c.id !== id);
      try {
        await saveCMSData('certificates', updated);
        setCertificatesData(updated);
        showCmsToast('success', 'Saved to MongoDB successfully');
      } catch (err) {
        console.error('Certificate delete failed:', err.message);
        showCmsToast('error', 'Save failed. Please try again.');
      }
    }
  };

  // --- SKILLS CRUD ---
  const openSkillModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm({
        category: skill.category,
        items: Array.isArray(skill.items) ? skill.items.join(', ') : skill.items || '',
        icon: skill.icon || '💻',
        accentColor: skill.accentColor || '#38BDF8'
      });
    } else {
      setEditingSkill(null);
      setSkillForm({ category: '', items: '', icon: '💻', accentColor: '#38BDF8' });
    }
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    let updated;
    const color = skillForm.accentColor;
    const mappedForm = {
      category: skillForm.category,
      items: skillForm.items.split(',').map(s => s.trim()).filter(Boolean),
      icon: skillForm.icon || '💻',
      accentColor: color,
      bgGradient: `from-[${color}]/20 to-[#0f172a]/5`,
      glowColor: `rgba(56, 189, 248, 0.15)`,
      hoverGlow: `hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]`,
      borderColor: `border-[${color}]/20 hover:border-[${color}]/50`,
      badgeBg: `bg-[${color}]/5 hover:bg-[${color}]/15 border-[${color}]/10 hover:border-[${color}]/30`,
      badgeText: `text-[#F8FAFC]`,
      description: `Languages and tools utilized for ${skillForm.category}`
    };

    if (editingSkill) {
      updated = skillsData.map((s, idx) => idx === editingSkill.index ? { ...s, ...mappedForm } : s);
    } else {
      updated = [...skillsData, mappedForm];
    }
    try {
      await saveCMSData('skills', updated);
      setSkillsData(updated);
      setIsSkillModalOpen(false);
      showCmsToast('success', 'Saved to MongoDB successfully');
    } catch (err) {
      console.error('Skill save failed:', err.message);
      showCmsToast('error', 'Save failed. Please try again.');
    }
  };

  const handleDeleteSkill = async (index) => {
    if (window.confirm('Delete this entire skill category?')) {
      const updated = skillsData.filter((_, idx) => idx !== index);
      try {
        await saveCMSData('skills', updated);
        setSkillsData(updated);
        showCmsToast('success', 'Saved to MongoDB successfully');
      } catch (err) {
        console.error('Skill delete failed:', err.message);
        showCmsToast('error', 'Save failed. Please try again.');
      }
    }
  };

  // --- MESSAGES CRUD & ACTIONS ---
  const markAsRead = (id) => {
    if (!readMessageIds.includes(id)) {
      const updated = [...readMessageIds, id];
      setReadMessageIds(updated);
      localStorage.setItem('readMessageIds', JSON.stringify(updated));
    }
  };

  const handleViewMessage = (msg) => {
    setSelectedMessage(msg);
    markAsRead(msg.id);
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete this message from the database?')) {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/api/messages/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Failed to delete message');

        setMessages(prev => prev.filter(m => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);

        const updatedCount = deletedCount + 1;
        setDeletedCount(updatedCount);
        localStorage.setItem('deletedMessagesCount', updatedCount.toString());
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Could not delete message.');
      }
    }
  };

  const handleReplyMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // Prefill Gmail web compose link and open in a new tab using the admin's email account session
    const subject = encodeURIComponent("Reply from Diyana Kumarasinghe");
    const body = encodeURIComponent(replyText);
    const senderEmail = heroData.email || 'diykumarasinghe14@gmail.com';
    const gmailLink = `https://mail.google.com/mail/u/${senderEmail}/?view=cm&fs=1&to=${selectedMessage.email}&su=${subject}&body=${body}`;
    window.open(gmailLink, '_blank', 'noopener,noreferrer');

    // Record as replied
    if (!repliedMessageIds.includes(selectedMessage.id)) {
      const updated = [...repliedMessageIds, selectedMessage.id];
      setRepliedMessageIds(updated);
      localStorage.setItem('repliedMessageIds', JSON.stringify(updated));
    }

    setReplyText('');
    setIsReplying(false);
    setSelectedMessage(null);
  };

  // --- COMPUTED TOTALS ---
  const totalMessages = messages.length;
  const readMessages = messages.filter(m => readMessageIds.includes(m.id)).length;
  const newMessages = messages.filter(m => !readMessageIds.includes(m.id)).length;
  const repliedMessages = messages.filter(m => repliedMessageIds.includes(m.id)).length;

  return (
    <div className="min-h-screen bg-[#03061B] text-[#F8FAFC] flex font-outfit relative overflow-hidden text-left">
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#00D4FF]/5 rounded-full blur-[120px] -z-10" />

      {/* CMS TOAST NOTIFICATION */}
      {cmsToast && (
        <div
          className={`fixed bottom-6 right-6 z-[100] flex items-center space-x-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-bold transition-all duration-300 ${
            cmsToast.type === 'success'
              ? 'bg-[#052e16] border border-[#22C55E]/40 text-[#22C55E]'
              : 'bg-[#1c0a0a] border border-red-500/40 text-red-400'
          }`}
        >
          <span className="text-base">{cmsToast.type === 'success' ? '✅' : '❌'}</span>
          <span>{cmsToast.message}</span>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 w-64 bg-[#07122B] border-r border-[#1B2B4D] flex flex-col justify-between shrink-0 lg:static`}
        style={{ boxShadow: '10px 0 30px rgba(3,6,27,0.5)' }}
      >
        <div>
          {/* Brand Logo */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-[#1B2B4D]">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#3B82F6] flex items-center justify-center shadow-[0_0_10px_rgba(0,212,255,0.4)]">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-extrabold tracking-wide text-white">
                Diyana <span className="bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] bg-clip-text text-transparent">CMS</span>
              </span>
            </div>
            <button className="lg:hidden p-1 text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="px-3 py-6 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'about', label: 'About', icon: Info },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'certificates', label: 'Certificates', icon: Award },
              { id: 'skills', label: 'Skills', icon: Wrench },
              { id: 'messages', label: 'Messages', icon: Mail, badge: newMessages > 0 ? newMessages : null },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: SettingsIcon },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#00D4FF]/15 to-[#3B82F6]/5 text-[#00D4FF] border border-[#00D4FF]/25 shadow-[0_0_12px_rgba(0,212,255,0.08)]' 
                      : 'text-[#94A3B8] hover:bg-white/[0.02] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-[#00D4FF]' : 'text-[#94A3B8]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#3B82F6] text-white font-bold text-[9px] px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-[#1B2B4D]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-[#07122B]/60 border-b border-[#1B2B4D] backdrop-blur-md flex items-center justify-between px-6 sm:px-8 relative z-20">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#07122B] border border-[#1B2B4D] text-gray-400 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
            {activeTab !== 'dashboard' && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 hover:border-[#38BDF8]/40 text-xs font-bold text-[#38BDF8] hover:bg-[#38BDF8]/20 transition-all duration-200 cursor-pointer mr-2"
              >
                <span>← Back to Dashboard</span>
              </button>
            )}
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white capitalize">
              {activeTab} Management
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-[#F8FAFC]">{heroData.name || 'Diyana Kumarasinghe'}</span>
              <span className="text-[10px] text-[#94A3B8] font-bold">Administrator</span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#00D4FF] to-[#3B82F6] flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(0,212,255,0.3)]">
              DK
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {[
                  { label: 'Total Projects', count: projectsData.length, color: '#3B82F6', text: 'Active', tabId: 'projects' },
                  { label: 'Total Certificates', count: certificatesData.length, color: '#00D4FF', text: 'Verified', tabId: 'certificates' },
                  { label: 'Skill Categories', count: skillsData.length, color: '#00E676', text: 'Groups', tabId: 'skills' },
                  { label: 'Total Messages', count: totalMessages, color: '#FF8C42', text: 'Database', tabId: 'messages' },
                  { label: 'New Messages', count: newMessages, color: '#FF4FD8', text: 'Unread', tabId: 'messages' },
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveTab(item.tabId)}
                    className="glass-card p-5 rounded-[20px] border border-[#1B2B4D] hover:border-[#00D4FF]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left cursor-pointer w-full"
                    style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)', backdropFilter: 'blur(12px)' }}
                  >
                    <span 
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider self-start"
                      style={{ color: item.color, backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}
                    >
                      {item.text}
                    </span>
                    <div className="mt-4">
                      <h3 className="text-3xl font-extrabold text-white">{item.count}</h3>
                      <p className="text-[10px] text-[#94A3B8] font-bold mt-1 uppercase tracking-wider">{item.label}</p>
                    </div>
                  </button>
                ))}

              </div>

              {/* Additional Metadata Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-[20px] border border-[#1B2B4D] bg-[#07122B]/35 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Profile Updated</p>
                    <p className="text-sm font-bold text-white">{profileUpdatedDate}</p>
                  </div>
                  <FileText className="h-8 w-8 text-[#00D4FF]/40" />
                </div>
                <div className="glass-card p-6 rounded-[20px] border border-[#1B2B4D] bg-[#07122B]/35 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">CV Last Modified</p>
                    <p className="text-sm font-bold text-white">{cvData.lastUpdated || 'Jun 2026'}</p>
                  </div>
                  <Clock className="h-8 w-8 text-[#3B82F6]/40" />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Profile Fields Card */}
              <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-[20px] border border-[#1B2B4D]" style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)' }}>
                <h3 className="text-lg font-bold text-white mb-6 border-b border-[#1B2B4D]/60 pb-3">Identity Particulars</h3>
                <form onSubmit={saveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        value={heroData.name || ''} 
                        onChange={(e) => setHeroData({...heroData, name: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Hero Title</label>
                      <input 
                        type="text" 
                        value={heroData.title || ''} 
                        onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Role Subtitle</label>
                    <input 
                      type="text" 
                      value={heroData.subtitle || ''} 
                      onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                      className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Short Introduction</label>
                    <textarea 
                      rows="3"
                      value={heroData.description || ''} 
                      onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                      className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Phone Number</label>
                      <input 
                        type="text" 
                        value={heroData.phone || ''} 
                        onChange={(e) => setHeroData({...heroData, phone: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        value={heroData.email || ''} 
                        onChange={(e) => setHeroData({...heroData, email: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">GitHub URL</label>
                      <input 
                        type="text" 
                        value={heroData.githubUrl || ''} 
                        onChange={(e) => setHeroData({...heroData, githubUrl: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">LinkedIn URL</label>
                      <input 
                        type="text" 
                        value={heroData.linkedinUrl || ''} 
                        onChange={(e) => setHeroData({...heroData, linkedinUrl: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Avatar Image URL</label>
                    <input 
                      type="text" 
                      value={heroData.avatarUrl || ''} 
                      onChange={(e) => setHeroData({...heroData, avatarUrl: e.target.value})}
                      className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.45)] transition-all duration-300 cursor-pointer"
                  >
                    Update Profile Data
                  </button>
                </form>
              </div>

              {/* LIVE PREVIEW HERO CARD */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block">Live Identity Card Preview</span>
                <div 
                  className="glass-card rounded-[20px] p-6 border border-[#1B2B4D] flex flex-col items-center text-center relative overflow-hidden"
                  style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)', backdropFilter: 'blur(16px)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6]" />
                  <div className="h-24 w-24 rounded-full border-2 border-[#00D4FF] p-1 flex items-center justify-center overflow-hidden mb-4 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                    <img 
                      src={heroData.avatarUrl || '/profile.jpg'} 
                      alt="DK"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => { e.target.src = '/profile.jpg'; }}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white">{heroData.name || 'Your Name'}</h4>
                  <span className="text-[10px] font-extrabold tracking-widest text-[#00D4FF] uppercase mt-1">
                    {heroData.title || 'Role Description'}
                  </span>
                  <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed max-w-xs">{heroData.description || 'Quick bio intro'}</p>
                  
                  <div className="flex space-x-3.5 mt-5">
                    <a href={heroData.githubUrl || '#'} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#03061B] text-[#94A3B8] hover:text-white border border-[#1B2B4D] transition-colors">
                      <GithubIcon className="h-4 w-4" />
                    </a>
                    <a href={heroData.linkedinUrl || '#'} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#03061B] text-[#94A3B8] hover:text-white border border-[#1B2B4D] transition-colors">
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'about' && (
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-6 sm:p-8 rounded-[20px] border border-[#1B2B4D]" style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)' }}>
                <h3 className="text-lg font-bold text-white mb-6 border-b border-[#1B2B4D]/60 pb-3">About Section Manager</h3>
                <form onSubmit={saveAbout} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">About Section Heading</label>
                    <input 
                      type="text" 
                      value={aboutData.heading || ''} 
                      onChange={(e) => setAboutData({...aboutData, heading: e.target.value})}
                      className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Primary Description Bio</label>
                    <textarea 
                      rows="4"
                      value={aboutData.description || ''} 
                      onChange={(e) => setAboutData({...aboutData, description: e.target.value})}
                      className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Additional Bio Text</label>
                    <textarea 
                      rows="4"
                      value={aboutData.additionalText || ''} 
                      onChange={(e) => setAboutData({...aboutData, additionalText: e.target.value})}
                      className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.45)] transition-all duration-300 cursor-pointer"
                  >
                    Save About Sections
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION */}
          {activeTab === 'education' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#94A3B8] font-semibold">Manage Academic Qualifications</span>
                <button 
                  onClick={() => openEduModal()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-[0_0_10px_rgba(0,212,255,0.2)] hover:opacity-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Education</span>
                </button>
              </div>

              {educationData.length === 0 ? (
                <div className="text-center py-20 bg-[#07122B]/20 border border-[#1B2B4D] rounded-[20px] text-[#94A3B8]/60 text-sm font-semibold">
                  No education records logged. Click "Add Education" to add.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {educationData.map((edu, idx) => (
                    <div 
                      key={edu.id || idx}
                      className="glass-card p-6 rounded-[20px] border border-[#1B2B4D] flex flex-col justify-between"
                      style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)' }}
                    >
                      <div>
                        <div className="flex items-center space-x-3.5 mb-4">
                          <div className="h-10 w-10 rounded-lg bg-[#03061B] border border-white/5 flex items-center justify-center font-bold text-[#00D4FF] text-xl">
                            🎓
                          </div>
                          <div className="text-left">
                            <h4 className="text-sm font-bold text-white leading-tight">{edu.institute}</h4>
                            <span className="text-[10px] font-extrabold tracking-widest text-[#00D4FF] uppercase">{edu.degree}</span>
                          </div>
                        </div>
                        <div className="text-left space-y-1 mt-3">
                          <p className="text-xs text-[#94A3B8]"><span className="font-bold text-gray-400">Specialization:</span> {edu.specialization || 'N/A'}</p>
                          <p className="text-xs text-[#94A3B8]"><span className="font-bold text-gray-400">Duration:</span> {edu.duration}</p>
                          <p className="text-xs text-[#94A3B8]"><span className="font-bold text-gray-400">Status:</span> <span className="text-[#00E676] font-semibold">{edu.status}</span></p>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2.5 mt-5 pt-3 border-t border-[#1B2B4D]/60">
                        <button onClick={() => openEduModal(edu)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-[#00D4FF] border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteEdu(edu.id)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-red-400 border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#94A3B8] font-semibold">Manage Job History and Internship Entries</span>
                <button 
                  onClick={() => openExpModal()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-[0_0_10px_rgba(0,212,255,0.2)] hover:opacity-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              {experienceData.length === 0 ? (
                <div className="text-center py-20 bg-[#07122B]/20 border border-[#1B2B4D] rounded-[20px] text-[#94A3B8]/60 text-sm font-semibold">
                  No experience records logged. Click "Add Experience" to add.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experienceData.map((exp) => (
                    <div 
                      key={exp.id}
                      className="glass-card p-6 rounded-[20px] border border-[#1B2B4D] flex flex-col justify-between"
                      style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)' }}
                    >
                      <div>
                        <div className="flex items-center space-x-3.5 mb-4">
                          <div className="h-10 w-10 rounded-lg bg-[#03061B] border border-white/5 flex items-center justify-center font-bold text-[#00D4FF]">
                            {exp.logoUrl ? <img src={exp.logoUrl} className="h-full w-full object-cover rounded-lg" alt="" /> : '💼'}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{exp.company}</h4>
                            <span className="text-[10px] font-extrabold tracking-widest text-[#00D4FF] uppercase">{exp.position}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 font-bold mb-3">{exp.duration}</p>
                        <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{exp.description}</p>
                        <p className="text-[10px] font-bold text-[#3B82F6]">{exp.technologies}</p>
                      </div>

                      <div className="flex justify-end space-x-2.5 mt-5 pt-3 border-t border-[#1B2B4D]/60">
                        <button onClick={() => openExpModal(exp)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-[#00D4FF] border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteExp(exp.id)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-red-400 border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#94A3B8] font-semibold">CMS Projects Manager</span>
                <button 
                  onClick={() => openProjectModal()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-[0_0_10px_rgba(0,212,255,0.2)] hover:opacity-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {projectsData.length === 0 ? (
                <div className="text-center py-20 bg-[#07122B]/20 border border-[#1B2B4D] rounded-[20px] text-[#94A3B8]/60 text-sm font-semibold">
                  No projects logged.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectsData.map((project) => (
                    <div 
                      key={project.id}
                      className="glass-card p-5 rounded-[20px] border border-[#1B2B4D] flex flex-col justify-between relative group"
                      style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)' }}
                    >
                      <div>
                        {/* Header Row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2.5 rounded-lg bg-[#03061B] border border-white/5 text-xl">
                            {project.icon || '🔍'}
                          </div>
                          <span className="text-[9px] font-extrabold tracking-widest text-[#94A3B8]/60 uppercase">
                            {project.type || project.category}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">{project.title}</h4>
                        <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed line-clamp-3">{project.shortDesc || project.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {(project.tech || []).map((t, idx) => (
                            <span key={idx} className="text-[10px] bg-[#03061B]/60 text-[#3B82F6] border border-[#3B82F6]/10 px-2 py-0.5 rounded-md font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2.5 mt-6 pt-3 border-t border-[#1B2B4D]/60">
                        <button onClick={() => openProjectModal(project)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-[#00D4FF] border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteProject(project.id)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-red-400 border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#94A3B8] font-semibold">CMS Certificates & Credentials Manager</span>
                <button 
                  onClick={() => openCertModal()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-[0_0_10px_rgba(0,212,255,0.2)] hover:opacity-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Certificate</span>
                </button>
              </div>

              {certificatesData.length === 0 ? (
                <div className="text-center py-20 bg-[#07122B]/20 border border-[#1B2B4D] rounded-[20px] text-[#94A3B8]/60 text-sm font-semibold">
                  No credentials logged.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificatesData.map((cert) => (
                    <div 
                      key={cert.id}
                      className="glass-card p-5 rounded-[20px] border border-[#1B2B4D] flex flex-col justify-between"
                      style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)' }}
                    >
                      <div>
                        <div className="flex items-center space-x-3.5 mb-4">
                          <div className="p-2.5 rounded-lg bg-[#03061B] border border-white/5 text-xl flex items-center justify-center shrink-0 w-11 h-11">
                            {cert.icon || '🍃'}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                            <span className="text-[10px] font-extrabold tracking-widest text-[#00E676] uppercase">{cert.issuer}</span>
                          </div>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 mb-4">{cert.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {(cert.tags || []).map((t, idx) => (
                            <span key={idx} className="text-[9px] bg-[#03061B]/60 text-[#94A3B8] border border-[#1B2B4D]/60 px-2 py-0.5 rounded-md font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2.5 mt-6 pt-3 border-t border-[#1B2B4D]/60">
                        <button onClick={() => openCertModal(cert)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-[#00D4FF] border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteCert(cert.id)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-red-400 border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SKILLS */}
          {activeTab === 'skills' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#94A3B8] font-semibold">Manage Skills Categories & Tags</span>
                <button 
                  onClick={() => openSkillModal()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-[0_0_10px_rgba(0,212,255,0.2)] hover:opacity-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Skill Group</span>
                </button>
              </div>

              {skillsData.length === 0 ? (
                <div className="text-center py-20 bg-[#07122B]/20 border border-[#1B2B4D] rounded-[20px] text-[#94A3B8]/60 text-sm font-semibold">
                  No technical skill groups configured.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillsData.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="glass-card p-6 rounded-[20px] border border-[#1B2B4D] flex flex-col justify-between"
                      style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)' }}
                    >
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2.5 rounded-lg bg-[#03061B] border border-white/5 text-xl flex items-center justify-center shrink-0 w-11 h-11">
                            {skill.icon || '💻'}
                          </div>
                          <h4 className="text-sm font-bold text-white">{skill.category}</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(skill.items || []).map((s, sIdx) => (
                            <span key={sIdx} className="text-[10px] bg-[#03061B]/60 text-[#3B82F6] border border-[#3B82F6]/10 px-2.5 py-1 rounded-full font-semibold">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2.5 mt-6 pt-3 border-t border-[#1B2B4D]/60">
                        <button onClick={() => openSkillModal({ ...skill, index: idx })} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-[#00D4FF] border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteSkill(idx)} className="p-2 rounded-lg bg-[#03061B]/60 text-gray-400 hover:text-red-400 border border-[#1B2B4D] transition-colors cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="max-w-6xl mx-auto">
              
              <div className="glass-card rounded-[20px] border border-[#1B2B4D] overflow-hidden" style={{ backgroundColor: 'rgba(7, 18, 43, 0.35)', backdropFilter: 'blur(16px)' }}>
                <div className="p-6 border-b border-[#1B2B4D] text-left">
                  <h3 className="text-lg font-bold text-white">Contact Forms Database</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Read, review, and delete form inquiries submitted by recruiters.</p>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-20 text-[#94A3B8]/60 text-sm font-semibold">
                    No contact messages found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-[#1B2B4D] bg-[#07122B]/30">
                          <th className="p-4 text-xs uppercase font-extrabold text-[#94A3B8] tracking-wider pl-6">Status</th>
                          <th className="p-4 text-xs uppercase font-extrabold text-[#94A3B8] tracking-wider">Sender</th>
                          <th className="p-4 text-xs uppercase font-extrabold text-[#94A3B8] tracking-wider">Email Address</th>
                          <th className="p-4 text-xs uppercase font-extrabold text-[#94A3B8] tracking-wider">Message Preview</th>
                          <th className="p-4 text-xs uppercase font-extrabold text-[#94A3B8] tracking-wider">Date Received</th>
                          <th className="p-4 text-xs uppercase font-extrabold text-[#94A3B8] tracking-wider text-right pr-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((msg) => {
                          const isRead = readMessageIds.includes(msg.id);
                          const isReplied = repliedMessageIds.includes(msg.id);
                          return (
                            <tr key={msg.id} className="border-b border-[#1B2B4D]/30 hover:bg-white/[0.01] transition-all duration-200">
                              <td className="p-4 pl-6">
                                <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                  isReplied 
                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                    : isRead 
                                      ? 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20' 
                                      : 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20'
                                }`}>
                                  {isReplied ? 'Replied' : isRead ? 'Read' : 'New'}
                                </span>
                              </td>
                              <td className="p-4 text-sm font-bold text-white">{msg.name}</td>
                              <td className="p-4 text-sm text-gray-300">{msg.email}</td>
                              <td className="p-4 text-sm text-[#94A3B8] max-w-xs truncate">{msg.message}</td>
                              <td className="p-4 text-xs text-gray-400">{msg.date}</td>
                              <td className="p-4 text-right pr-6">
                                <div className="inline-flex space-x-2">
                                  <button
                                    onClick={() => handleViewMessage(msg)}
                                    className="p-2 rounded-lg bg-[#03061B]/60 border border-[#1B2B4D] text-gray-400 hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all duration-300 cursor-pointer"
                                    title="View Message"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className="p-2 rounded-lg bg-[#03061B]/60 border border-[#1B2B4D] text-gray-400 hover:text-[#FF4FD8] hover:border-[#FF4FD8]/30 transition-all duration-300 cursor-pointer"
                                    title="Delete Message"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 10: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="max-w-6xl mx-auto space-y-8 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Portfolio Visits', value: '1,420', percent: '+18.4%', up: true },
                  { title: 'Messages Received', value: totalMessages, percent: '+12.5%', up: true },
                  { title: 'Active Projects', value: projectsData.length, percent: '0.0%', up: false },
                  { title: 'Verified Credentials', value: certificatesData.length, percent: '0.0%', up: false },
                ].map((stat, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-[20px] border border-[#1B2B4D] bg-[#07122B]/35 flex flex-col justify-between h-32">
                    <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">{stat.title}</span>
                    <div className="flex justify-between items-baseline mt-4">
                      <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                      <span className={`text-xs font-bold ${stat.up ? 'text-[#00E676]' : 'text-gray-500'}`}>{stat.percent}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Graphical volume Mock */}
              <div className="glass-card rounded-[20px] border border-[#1B2B4D] p-6 sm:p-8" style={{ backgroundColor: 'rgba(7, 18, 43, 0.35)' }}>
                <h3 className="text-base font-bold text-white mb-6">Traffic & Messages Timeline</h3>
                <div className="h-56 w-full relative pt-4 flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0,160 Q 80,120 150,140 T 300,60 T 450,90 T 500,40" fill="none" stroke="url(#chartGrad)" strokeWidth="4" className="stroke-[#00D4FF]" />
                    <path d="M 0,160 Q 80,120 150,140 T 300,60 T 450,90 T 500,40 L 500,200 L 0,200 Z" fill="url(#chartGrad)" />
                    <line x1="0" y1="50" x2="500" y2="50" stroke="#1B2B4D" strokeDasharray="4 4" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#1B2B4D" strokeDasharray="4 4" />
                    <line x1="0" y1="150" x2="500" y2="150" stroke="#1B2B4D" strokeDasharray="4 4" />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-[#94A3B8]/60 font-bold uppercase tracking-wider mt-4">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto text-left">
              <div className="glass-card p-6 sm:p-8 rounded-[20px] border border-[#1B2B4D]" style={{ backgroundColor: 'rgba(7, 18, 43, 0.45)' }}>
                <div className="mb-6 border-b border-[#1B2B4D]/60 pb-5">
                  <h3 className="text-lg font-bold text-white">Security Settings</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Manage administrative credentials and notification profiles.</p>
                </div>

                {settingsSaved && (
                  <div className="mb-5 bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] p-4 rounded-xl text-xs font-bold flex items-center space-x-2">
                    <Check className="h-4.5 w-4.5" />
                    <span>Administrative credentials updated successfully!</span>
                  </div>
                )}

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSettingsSaved(true);
                    setTimeout(() => setSettingsSaved(false), 3000);
                  }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Login Email Address</label>
                    <input 
                      type="email" 
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                      className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        value={settingsForm.newPassword}
                        onChange={(e) => setSettingsForm({...settingsForm, newPassword: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Confirm Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        value={settingsForm.confirmPassword}
                        onChange={(e) => setSettingsForm({...settingsForm, confirmPassword: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.45)] transition-all duration-300 cursor-pointer"
                  >
                    Save Settings Changes
                  </button>
                </form>

                {/* CV file Configuration Panel */}
                <div className="mt-10 pt-8 border-t border-[#1B2B4D]/60 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white">CV Document Settings</h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">Configure download file links and CV button text.</p>
                  </div>
                  <form onSubmit={saveCV} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">CV URL / Path</label>
                      <input 
                        type="text" 
                        value={cvData.cvUrl || ''} 
                        onChange={(e) => setCvData({...cvData, cvUrl: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Button Label</label>
                      <input 
                        type="text" 
                        value={cvData.buttonText || ''} 
                        onChange={(e) => setCvData({...cvData, buttonText: e.target.value})}
                        className="w-full bg-[#03061B]/60 border border-[#1B2B4D] focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <button type="submit" className="bg-[#03061B] hover:bg-[#03061B]/80 text-[#00D4FF] border border-[#00D4FF]/25 font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer">
                      Update CV Document Info
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- ADD/EDIT PROJECT MODAL --- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setIsProjectModalOpen(false)}>
          <div className="relative w-full max-w-lg glass-card rounded-[20px] border border-[#1B2B4D] p-6 sm:p-8 text-left animate-scaleUp" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'rgba(7, 18, 43, 0.75)', boxShadow: '0 0 50px rgba(0, 212, 255, 0.15)' }}>
            <button onClick={() => setIsProjectModalOpen(false)} className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X className="h-4.5 w-4.5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-5">{editingProject ? 'Edit Project Details' : 'Add New Project'}</h3>
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Project Title</label>
                  <input type="text" required value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Category</label>
                  <input type="text" placeholder="MERN Project" value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Description</label>
                <textarea rows="3" required value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all resize-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Image URL</label>
                  <input type="text" placeholder="/smart-campus.png" value={projectForm.imgUrl} onChange={(e) => setProjectForm({...projectForm, imgUrl: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Project Emoji / Icon</label>
                  <input type="text" placeholder="🔍" value={projectForm.icon} onChange={(e) => setProjectForm({...projectForm, icon: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Technologies (comma separated)</label>
                <input type="text" placeholder="React, Node.js, Express" value={projectForm.tech} onChange={(e) => setProjectForm({...projectForm, tech: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input type="text" placeholder="GitHub URL" value={projectForm.githubUrl} onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})} className="col-span-1 bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                <input type="text" placeholder="LinkedIn URL" value={projectForm.linkedinUrl} onChange={(e) => setProjectForm({...projectForm, linkedinUrl: e.target.value})} className="col-span-1 bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                <input type="text" placeholder="Live Demo URL" value={projectForm.liveDemoUrl} onChange={(e) => setProjectForm({...projectForm, liveDemoUrl: e.target.value})} className="col-span-1 bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm py-3 rounded-xl transition-all cursor-pointer mt-4">
                Save Project Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD/EDIT CERTIFICATE MODAL --- */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setIsCertModalOpen(false)}>
          <div className="relative w-full max-w-lg glass-card rounded-[20px] border border-[#1B2B4D] p-6 sm:p-8 text-left animate-scaleUp" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'rgba(7, 18, 43, 0.75)', boxShadow: '0 0 50px rgba(0, 212, 255, 0.15)' }}>
            <button onClick={() => setIsCertModalOpen(false)} className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X className="h-4.5 w-4.5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-5">{editingCert ? 'Edit Credential Details' : 'Add New Certificate'}</h3>
            <form onSubmit={handleSaveCert} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Title</label>
                  <input type="text" required value={certForm.title} onChange={(e) => setCertForm({...certForm, title: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Issuer</label>
                  <input type="text" required value={certForm.issuer} onChange={(e) => setCertForm({...certForm, issuer: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Date / Year</label>
                  <input type="text" value={certForm.date} onChange={(e) => setCertForm({...certForm, date: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Credential Icon (Emoji)</label>
                  <input type="text" placeholder="🍃" value={certForm.icon} onChange={(e) => setCertForm({...certForm, icon: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Description</label>
                <textarea rows="3" value={certForm.description} onChange={(e) => setCertForm({...certForm, description: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Tags / Skills (comma separated)</label>
                <input type="text" placeholder="NoSQL, Databases, Cloud" value={certForm.tags} onChange={(e) => setCertForm({...certForm, tags: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Credential Link" value={certForm.link} onChange={(e) => setCertForm({...certForm, link: e.target.value})} className="bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                <input type="text" placeholder="LinkedIn URL" value={certForm.linkedinUrl} onChange={(e) => setCertForm({...certForm, linkedinUrl: e.target.value})} className="bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm py-3 rounded-xl transition-all cursor-pointer mt-4">
                Save Credential Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD/EDIT SKILL CATEGORY MODAL --- */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setIsSkillModalOpen(false)}>
          <div className="relative w-full max-w-md glass-card rounded-[20px] border border-[#1B2B4D] p-6 sm:p-8 text-left animate-scaleUp" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'rgba(7, 18, 43, 0.75)', boxShadow: '0 0 50px rgba(0, 212, 255, 0.15)' }}>
            <button onClick={() => setIsSkillModalOpen(false)} className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X className="h-4.5 w-4.5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-5">{editingSkill ? 'Edit Skill Group' : 'Add New Skill Group'}</h3>
            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Category Title</label>
                <input type="text" required placeholder="Frontend Development" value={skillForm.category} onChange={(e) => setSkillForm({...skillForm, category: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Group Icon (Emoji)</label>
                  <input type="text" placeholder="💻" value={skillForm.icon} onChange={(e) => setSkillForm({...skillForm, icon: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Accent Color</label>
                  <input type="color" value={skillForm.accentColor} onChange={(e) => setSkillForm({...skillForm, accentColor: e.target.value})} className="w-full h-11 bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-2 focus:outline-none transition-all cursor-pointer" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Skills List (comma separated)</label>
                <textarea rows="3" required placeholder="React, HTML5, CSS3, Tailwind CSS" value={skillForm.items} onChange={(e) => setSkillForm({...skillForm, items: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all resize-none" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm py-3 rounded-xl transition-all cursor-pointer mt-4">
                Save Skill Group
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD/EDIT EXPERIENCE MODAL --- */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setIsExpModalOpen(false)}>
          <div className="relative w-full max-w-lg glass-card rounded-[20px] border border-[#1B2B4D] p-6 sm:p-8 text-left animate-scaleUp" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'rgba(7, 18, 43, 0.75)', boxShadow: '0 0 50px rgba(0, 212, 255, 0.15)' }}>
            <button onClick={() => setIsExpModalOpen(false)} className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X className="h-4.5 w-4.5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-5">{editingExp ? 'Edit Experience' : 'Add Experience Record'}</h3>
            <form onSubmit={handleSaveExp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Company Name</label>
                  <input type="text" required value={expForm.company} onChange={(e) => setExpForm({...expForm, company: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Position Title</label>
                  <input type="text" required placeholder="Software Engineer Intern" value={expForm.position} onChange={(e) => setExpForm({...expForm, position: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Duration</label>
                  <input type="text" placeholder="6 Months (2025)" value={expForm.duration} onChange={(e) => setExpForm({...expForm, duration: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Company Logo URL</label>
                  <input type="text" value={expForm.logoUrl} onChange={(e) => setExpForm({...expForm, logoUrl: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Job Description / Responsibilities</label>
                <textarea rows="3" required value={expForm.description} onChange={(e) => setExpForm({...expForm, description: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Technologies Used</label>
                <input type="text" placeholder="React, Spring Boot, MySQL" value={expForm.technologies} onChange={(e) => setExpForm({...expForm, technologies: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm py-3 rounded-xl transition-all cursor-pointer mt-4">
                Save Experience Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD/EDIT EDUCATION MODAL --- */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setIsEduModalOpen(false)}>
          <div className="relative w-full max-w-lg glass-card rounded-[20px] border border-[#1B2B4D] p-6 sm:p-8 text-left animate-scaleUp" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'rgba(7, 18, 43, 0.75)', boxShadow: '0 0 50px rgba(0, 212, 255, 0.15)' }}>
            <button onClick={() => setIsEduModalOpen(false)} className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X className="h-4.5 w-4.5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-5">{editingEdu ? 'Edit Academic Entry' : 'Add Academic Entry'}</h3>
            <form onSubmit={handleSaveEdu} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Institution / University</label>
                <input type="text" required value={eduForm.institute} onChange={(e) => setEduForm({...eduForm, institute: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Degree / Qualification</label>
                  <input type="text" required placeholder="BSc (Hons) in Information Technology" value={eduForm.degree} onChange={(e) => setEduForm({...eduForm, degree: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Specialization</label>
                  <input type="text" placeholder="Information Technology" value={eduForm.specialization} onChange={(e) => setEduForm({...eduForm, specialization: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Year / Semester / Duration</label>
                  <input type="text" required placeholder="Year 3 Semester 2 (or 2022 - 2026)" value={eduForm.duration} onChange={(e) => setEduForm({...eduForm, duration: e.target.value})} className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Academic Status</label>
                  <select 
                    value={eduForm.status || 'Active'} 
                    onChange={(e) => setEduForm({...eduForm, status: e.target.value})} 
                    className="w-full bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all cursor-pointer"
                  >
                    <option value="Active" className="bg-[#07122B] text-white">Active</option>
                    <option value="Completed" className="bg-[#07122B] text-white">Completed</option>
                    <option value="On Hold" className="bg-[#07122B] text-white">On Hold</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm py-3 rounded-xl transition-all cursor-pointer mt-4">
                Save Academic Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MESSAGE DETAILS MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => { setSelectedMessage(null); setIsReplying(false); }}>
          <div 
            className="relative w-full max-w-xl glass-card rounded-[20px] border border-[#1B2B4D] p-6 sm:p-8 text-left animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: 'rgba(7, 18, 43, 0.8)', boxShadow: '0 0 50px rgba(0, 212, 255, 0.15)' }}
          >
            <button onClick={() => { setSelectedMessage(null); setIsReplying(false); }} className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#1B2B4D]">
              <div className="p-3 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 shadow-[0_0_10px_rgba(0,212,255,0.15)] flex items-center justify-center">
                <User className="h-5 w-5 text-[#00D4FF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedMessage.name}</h3>
                <p className="text-xs text-[#94A3B8] font-semibold">{selectedMessage.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#94A3B8]/60 tracking-wider">Inquiry Body</span>
                <div className="bg-[#03061B]/60 border border-[#1B2B4D] rounded-xl p-4 text-sm text-gray-200 leading-relaxed min-h-[100px] max-h-[160px] overflow-y-auto">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500 font-semibold">
                <Clock className="h-4 w-4" />
                <span>Submitted on {selectedMessage.date}</span>
              </div>

              {isReplying ? (
                <form onSubmit={handleReplyMessage} className="mt-4 pt-4 border-t border-[#1B2B4D]/60 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-[#00D4FF] tracking-wider block">Write Email Reply</span>
                  <textarea 
                    rows="3" 
                    required 
                    value={replyText} 
                    onChange={(e) => setReplyText(e.target.value)} 
                    placeholder="Write your professional response here..."
                    className="w-full bg-[#03061B]/80 border border-[#1B2B4D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all resize-none"
                  />
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={() => setIsReplying(false)} className="px-3.5 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:text-white cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer">
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Draft</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-[#1B2B4D]">
                  <button onClick={() => setIsReplying(true)} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#3B82F6] hover:opacity-95 text-white text-sm font-bold shadow-[0_0_10px_rgba(0,212,255,0.15)] transition-all cursor-pointer">
                    Reply
                  </button>
                  <button onClick={() => handleDeleteMessage(selectedMessage.id)} className="px-4 py-2.5 rounded-xl border border-[#FF4FD8]/30 bg-[#FF4FD8]/5 hover:bg-[#FF4FD8]/15 text-sm font-bold text-[#FF4FD8] transition-all cursor-pointer">
                    Delete
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
