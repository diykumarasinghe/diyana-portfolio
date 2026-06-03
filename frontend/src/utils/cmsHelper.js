import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

// Retrieves a section from localStorage, falling back to portfolioData defaults
export const getCMSData = (key) => {
  const local = localStorage.getItem(`cms_${key}`);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error(`Error parsing cms_${key}`, e);
    }
  }

  // Fallback defaults if not set in localStorage yet
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
    default:
      defaultData = {};
  }

  localStorage.setItem(`cms_${key}`, JSON.stringify(defaultData));
  return defaultData;
};

// Saves a section locally and asynchronously pushes to MongoDB in the background
export const saveCMSData = async (key, data) => {
  // Save locally first for instant reactive update in the browser
  localStorage.setItem(`cms_${key}`, JSON.stringify(data));
  window.dispatchEvent(new Event('storage_update'));

  // Sync to MongoDB in the background if logged in as Admin
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
      console.error(`Failed to sync ${key} to MongoDB database`);
    }
  } catch (error) {
    console.error(`Error syncing ${key} to MongoDB:`, error);
  }
};

// Global flags to prevent duplicate bulk fetches
let isFetchingAll = false;
let allFetched = false;

// Fetches all CMS keys from MongoDB in a single request and caches them
const fetchAllCMSData = async () => {
  if (isFetchingAll || allFetched) return;
  isFetchingAll = true;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  try {
    const response = await fetch(`${API_URL}/api/cms`);
    if (response.ok) {
      const allData = await response.json();
      Object.keys(allData).forEach(key => {
        localStorage.setItem(`cms_${key}`, JSON.stringify(allData[key]));
      });
      allFetched = true;
      window.dispatchEvent(new Event('storage_update'));
    }
  } catch (error) {
    console.error('Error fetching CMS data from MongoDB:', error);
  } finally {
    isFetchingAll = false;
  }
};

// Custom React hook to retrieve dynamic CMS data reactively and fetch updates in background
export const useCMSData = (key) => {
  const [data, setData] = useState(() => getCMSData(key));

  useEffect(() => {
    // Initiate background sync on mount
    fetchAllCMSData();

    const handleStorageChange = (e) => {
      if (!e || e.key === `cms_${key}` || e.type === 'storage_update') {
        setData(getCMSData(key));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage_update', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage_update', handleStorageChange);
    };
  }, [key]);

  return data;
};
