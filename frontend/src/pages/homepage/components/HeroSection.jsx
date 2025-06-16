import React from 'react';

import Icon from 'components/AppIcon';


const HeroSection = ({ onMemberRegistration, onYouthLeadership, language }) => {
  const content = {
    en: {
      title: "Empowering Farmers, Growing Communities",
      subtitle: "Join the movement that\'s transforming agriculture and rural livelihoods across India",
      memberButton: "Become a Member",
      youthButton: "Youth Leadership Program",
      scrollText: "Scroll to explore"
    },
    hi: {
      title: "किसानों को सशक्त बनाना, समुदायों को बढ़ाना",
      subtitle: "उस आंदोलन में शामिल हों जो भारत भर में कृषि और ग्रामीण आजीविका को बदल रहा है",
      memberButton: "सदस्य बनें",
      youthButton: "युवा नेतृत्व कार्यक्रम",
      scrollText: "अन्वेषण के लिए स्क्रॉल करें"
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-surface to-accent flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300712d' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Clickable Central Logo */}
          <div 
            className="mb-8 cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={handleLogoClick}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 bg-primary rounded-full flex items-center justify-center mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Icon name="Sprout" size={64} color="white" className="md:w-20 md:h-20" />
            </div>
            <div className="mt-4">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-2">
                Kisan Andolan
              </h1>
              <p className="text-lg md:text-xl text-secondary font-medium">
                {language === 'en' ? 'Growing Together' : 'साथ बढ़ते हैं'}
              </p>
            </div>
          </div>

          {/* Hero Content */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6 leading-tight">
              {content[language].title}
            </h2>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              {content[language].subtitle}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={onMemberRegistration}
              className="btn-primary w-full sm:w-auto px-8 py-4 text-lg font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
            >
              <Icon name="UserPlus" size={24} />
              <span>{content[language].memberButton}</span>
            </button>
            
            <button
              onClick={onYouthLeadership}
              className="btn-outline w-full sm:w-auto px-8 py-4 text-lg font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
            >
              <Icon name="Users" size={24} />
              <span>{content[language].youthButton}</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center text-text-secondary animate-bounce">
            <p className="text-sm font-medium mb-2">{content[language].scrollText}</p>
            <Icon name="ChevronDown" size={24} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-primary rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default HeroSection;