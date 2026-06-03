import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-darkBg text-gray-200 overflow-x-hidden font-sans">
      
      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        
        {/* Home/Hero Section */}
        <Hero />

        {/* Biography Section */}
        <About />

        {/* Academic Details Section */}
        <Education />

        {/* Categorised Tech Capability Badges */}
        <Skills />

        {/* Portfolio Project Cards Grid with Case Study Modals */}
        <Projects />

        {/* Verified Certificate Badges */}
        <Certificates />

        {/* Interactive Query Form */}
        <Contact />

      </main>

      {/* Site Footer */}
      <Footer />
      
    </div>
  );
};

export default Home;
