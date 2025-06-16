import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import HeroSection from './components/HeroSection';
import MissionHighlights from './components/MissionHighlights';
import MilestonesSection from './components/MilestonesSection';
import TeamSection from './components/TeamSection';
import OurVisionSection from './components/OurVisionSection';
import Footer from './components/Footer';

const Homepage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const navigate = useNavigate();

  const handleMemberRegistration = () => {
    navigate('/member-registration-modal');
  };

  const handleYouthLeadership = () => {
    navigate('/youth-leadership-program-modal');
  };

  const toggleLanguage = () => {
    setSelectedLanguage(selectedLanguage === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Language Selector */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="bg-surface border border-border rounded-lg px-3 py-2 shadow-md hover:shadow-lg transition-smooth flex items-center space-x-2"
        >
          <Icon name="Globe" size={16} />
          <span className="text-sm font-medium">
            {selectedLanguage === 'en' ? 'हिंदी' : 'English'}
          </span>
        </button>
      </div>

      {/* Hero Section */}
      <HeroSection 
        onMemberRegistration={handleMemberRegistration}
        onYouthLeadership={handleYouthLeadership}
        language={selectedLanguage}
      />

      {/* Mission Highlights */}
      <MissionHighlights language={selectedLanguage} />

      {/* Milestones Section */}
      <MilestonesSection language={selectedLanguage} />

      {/* Our Vision Section */}
      <OurVisionSection language={selectedLanguage} />

      {/* Team Section */}
      <TeamSection language={selectedLanguage} />

      {/* Footer */}
      <Footer language={selectedLanguage} />
    </div>
  );
};

export default Homepage;