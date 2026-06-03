import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

// Helper to get all CMS data from the single localStorage key
const getPortfolioCMS = () => {
  const local = localStorage.getItem('portfolioCMS');
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error('Error parsing portfolioCMS from localStorage', e);
    }
  }
  return {};
};

// Retrieves a section from the unified portfolioCMS cache, falling back to defaults
export const getCMSData = (key, defaultValue) => {
  const cms = getPortfolioCMS();
  if (cms && cms[key] !== undefined && cms[key] !== null) {
    return cms[key];
  }
  if (defaultValue !== undefined) {
    return defaultValue;
  }

  // Fallback defaults if not cached in localStorage yet
  let defaultData;
  switch (key) {
    case 'hero':
      defaultData = {
        name: portfolioData.hero.name,
        title: portfolioData.hero.title,
        subtitle: portfolioData.hero.subtitle,
        description: portfolioData.hero.description,
        avatarUrl: '/profile.jpg',
        phone: portfolioData.contact.phone || '+94 76 727 0603',
        email: portfolioData.hero.email,
        githubUrl: portfolioData.hero.githubUrl,
        linkedinUrl: portfolioData.hero.linkedinUrl
      };
      break;
    case 'about':
      defaultData = {
        heading: portfolioData.about.heading,
        description: portfolioData.about.description,
        additionalText: portfolioData.about.additionalText,
        focusAreas: portfolioData.about.focusAreas
      };
      break;
    case 'education':
      defaultData = {
        institute: portfolioData.education.institute,
        degree: portfolioData.education.degree,
        specialization: portfolioData.education.specialization,
        duration: portfolioData.education.duration,
        status: portfolioData.education.status
      };
      break;
    case 'experience':
      defaultData = [
        {
          id: 'exp-1',
          company: 'Sri Lanka Institute of Information Technology',
          position: 'Software Engineering Intern',
          duration: '6 Months (2025)',
          description: 'Developed responsive client interfaces using React, built server logic in Express, and managed SQL database entities.',
          technologies: 'React, Node.js, MySQL, REST APIs',
          logoUrl: ''
        }
      ];
      break;
    case 'cv':
      defaultData = {
        cvUrl: portfolioData.hero.cvUrl,
        buttonText: 'Download CV',
        lastUpdated: 'Jun 2026'
      };
      break;
    case 'projects':
      defaultData = portfolioData.projects;
      break;
    case 'certificates':
      defaultData = (portfolioData.certificates || []).map((c, index) => ({
        id: `cert-${index}`,
        title: c.title,
        issuer: c.issuer,
        date: c.date,
        description: 'In-depth development and administration of cloud clusters. Covers Atlas database deployment setup, scale provisioning, security configurations, database indexes optimization, and performance diagnostics.',
        link: 'https://www.linkedin.com/posts/diyana-kumarasinghe-2794ab215_mongodb-mongodbatlas-databasemanagement-share-7465684827225104385-4A6-/',
        linkedinUrl: 'https://www.linkedin.com/posts/diyana-kumarasinghe-2794ab215_mongodb-mongodbatlas-databasemanagement-share-7465684827225104385-4A6-/',
        tags: c.skillsEarned || ['MongoDB Atlas', 'Cloud Databases', 'NoSQL', 'Database Security'],
        icon: '🍃'
      }));
      break;
    case 'skills':
      defaultData = portfolioData.skills;
      break;
    case 'profile':
      defaultData = {
        name: portfolioData.hero.name,
        title: portfolioData.hero.title,
        avatarUrl: '/profile.jpg'
      };
      break;
    case 'contact':
      defaultData = {
        phone: portfolioData.contact.phone || '+94 76 727 0603',
        email: portfolioData.hero.email || 'diykumarasinghe14@gmail.com'
      };
      break;
    default:
      defaultData = {};
  }

  // Update local cache
  cms[key] = defaultData;
  localStorage.setItem('portfolioCMS', JSON.stringify(cms));
  return defaultData;
};

// Saves a section locally in portfolioCMS and asynchronously pushes to MongoDB in the background
export const saveCMSData = async (key, data) => {
  // Update local cache first
  const cms = getPortfolioCMS();
  cms[key] = data;
  localStorage.setItem('portfolioCMS', JSON.stringify(cms));
  
  // Dispatch event for UI reactivity
  window.dispatchEvent(new Event('storage_update'));

  // Push updates to MongoDB
  const token = localStorage.getItem('adminToken');
  if (!token) return;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  try {
    const response = await fetch(`${API_URL}/api/cms/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ data })
    });
    if (!response.ok) {
      console.error(`Failed to sync key: ${key} to MongoDB`);
    }
  } catch (error) {
    console.error(`Error syncing key: ${key} to MongoDB:`, error);
  }
};

// Fetch all CMS data from MongoDB in a single request and update local storage
let isFetchingAll = false;
let allFetched = false;

export const fetchAllCMSData = async () => {
  if (isFetchingAll || allFetched) return;
  isFetchingAll = true;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  try {
    const response = await fetch(`${API_URL}/api/cms`);
    if (response.ok) {
      const allData = await response.json();
      const cms = getPortfolioCMS();
      
      // Update cache with all database records
      Object.keys(allData).forEach(key => {
        cms[key] = allData[key];
      });
      
      localStorage.setItem('portfolioCMS', JSON.stringify(cms));
      allFetched = true;
      window.dispatchEvent(new Event('storage_update'));
    }
  } catch (error) {
    console.error('Error fetching CMS data from MongoDB:', error);
  } finally {
    isFetchingAll = false;
  }
};

// React hook to fetch dynamic CMS data reactively
export const useCMSData = (key, defaultValue) => {
  const [data, setData] = useState(() => getCMSData(key, defaultValue));

  useEffect(() => {
    // Trigger bulk fetch on mount
    fetchAllCMSData();

    const handleStorageChange = (e) => {
      if (!e || e.key === 'portfolioCMS' || e.type === 'storage_update') {
        setData(getCMSData(key, defaultValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage_update', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage_update', handleStorageChange);
    };
  }, [key, defaultValue]);

  return data;
};
