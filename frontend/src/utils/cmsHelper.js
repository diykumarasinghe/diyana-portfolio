import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Default fallback data from portfolioData.js ────────────────────────────
// Used only when MongoDB has no data for a given key.
const getDefaultForKey = (key) => {
  switch (key) {
    case 'hero':
      return {
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
    case 'about':
      return {
        heading: portfolioData.about.heading,
        description: portfolioData.about.description,
        additionalText: portfolioData.about.additionalText,
        focusAreas: portfolioData.about.focusAreas
      };
    case 'education':
      return {
        institute: portfolioData.education.institute,
        degree: portfolioData.education.degree,
        specialization: portfolioData.education.specialization,
        duration: portfolioData.education.duration,
        status: portfolioData.education.status
      };
    case 'experience':
      return [
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
    case 'cv':
      return {
        cvUrl: portfolioData.hero.cvUrl,
        buttonText: 'Download CV',
        lastUpdated: 'Jun 2026'
      };
    case 'projects':
      return portfolioData.projects;
    case 'certificates':
      return (portfolioData.certificates || []).map((c, index) => ({
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
    case 'skills':
      return portfolioData.skills;
    case 'profile':
      return {
        name: portfolioData.hero.name,
        title: portfolioData.hero.title,
        avatarUrl: '/profile.jpg'
      };
    case 'contact':
      return {
        phone: portfolioData.contact.phone || '+94 76 727 0603',
        email: portfolioData.hero.email || 'diykumarasinghe14@gmail.com'
      };
    default:
      return {};
  }
};

// ─── fetchAllCMSData ─────────────────────────────────────────────────────────
// Fetches all CMS sections in a single GET /api/cms request.
// Returns the MongoDB data object. Does NOT write to localStorage.
export const fetchAllCMSData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/cms`);
    if (response.ok) {
      const allData = await response.json();
      return allData;
    }
    return {};
  } catch (error) {
    console.error('Error fetching all CMS data from MongoDB:', error);
    return {};
  }
};

// ─── getCMSData ──────────────────────────────────────────────────────────────
// Fetches one CMS section by key from MongoDB.
// Falls back to defaultValue or portfolioData.js defaults if MongoDB has no data.
// Never reads from localStorage.
export const getCMSData = async (key, defaultValue) => {
  try {
    const response = await fetch(`${API_URL}/api/cms/${key}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    // 404 = key not in MongoDB yet — use fallback
    return defaultValue !== undefined ? defaultValue : getDefaultForKey(key);
  } catch (error) {
    console.error(`Error fetching CMS key '${key}' from MongoDB:`, error);
    return defaultValue !== undefined ? defaultValue : getDefaultForKey(key);
  }
};

// ─── saveCMSData ─────────────────────────────────────────────────────────────
// Saves CMS data to MongoDB via PUT /api/cms/:key.
// Requires admin token in localStorage (auth token only, not CMS data).
// Throws on failure — caller must handle errors and show "Save failed" message.
// Does NOT write CMS data to localStorage.
export const saveCMSData = async (key, data) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    throw new Error('Not authenticated. Please log in again.');
  }

  const response = await fetch(`${API_URL}/api/cms/${key}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ data })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to save CMS key: ${key}`);
  }

  const savedData = await response.json();
  return savedData;
};

// ─── migrateLocalStorageToMongoDBIfEmpty ─────────────────────────────────────
// One-time migration helper.
// Checks MongoDB first. If it has ANY CMS data → returns null (nothing to migrate).
// If MongoDB is empty AND old 'portfolioCMS' localStorage key exists →
//   returns the parsed localStorage data so AdminDashboard can pre-fill its state.
// Does NOT auto-save to MongoDB.
// Does NOT clear localStorage.
export const migrateLocalStorageToMongoDBIfEmpty = async () => {
  try {
    const mongoData = await fetchAllCMSData();

    // If MongoDB has any CMS entries, skip migration entirely
    if (mongoData && Object.keys(mongoData).length > 0) {
      return null;
    }

    // MongoDB is empty — check old localStorage key
    const localRaw = localStorage.getItem('portfolioCMS');
    if (!localRaw) return null;

    const localData = JSON.parse(localRaw);
    if (!localData || Object.keys(localData).length === 0) return null;

    console.log('Migration available: localStorage portfolioCMS data found. Pre-filling Admin Dashboard. Click Save on each section to push to MongoDB.');
    return localData;
  } catch (e) {
    console.error('Migration check failed:', e);
    return null;
  }
};

// ─── useCMSData ──────────────────────────────────────────────────────────────
// React hook for public portfolio components.
// Shows defaultValue (or portfolioData.js fallback) while loading.
// Fetches latest MongoDB data on component mount.
// Never reads or writes localStorage for CMS data.
export const useCMSData = (key, defaultValue) => {
  const fallback = defaultValue !== undefined ? defaultValue : getDefaultForKey(key);
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let cancelled = false;

    const fetchFromMongoDB = async () => {
      try {
        const response = await fetch(`${API_URL}/api/cms/${key}`);
        if (response.ok && !cancelled) {
          const mongoData = await response.json();
          setData(mongoData);
        }
        // If 404, keep showing the fallback — MongoDB has no data for this key yet
      } catch (error) {
        console.error(`useCMSData: failed to fetch key '${key}' from MongoDB:`, error);
        // Keep showing the fallback on network error
      }
    };

    fetchFromMongoDB();

    return () => { cancelled = true; };
  }, [key]);

  return data;
};
