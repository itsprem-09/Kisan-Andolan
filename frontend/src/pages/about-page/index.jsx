import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import ImpactMetrics from './components/ImpactMetrics';
import TeamStructure from './components/TeamStructure';
import PartnershipSection from './components/PartnershipSection';
import Testimonials from './components/Testimonials';
import MilestoneTimeline from './components/MilestoneTimeline';
import MemberRegistrationModal from '../member-registration-modal';
import YouthLeadershipProgramModal from '../youth-leadership-program-modal';
import { useLanguage } from 'contexts/LanguageContext';

const AboutPage = () => {
  const [showMemberRegistration, setShowMemberRegistration] = useState(false);
  const [showYouthProgram, setShowYouthProgram] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const { getTranslation, language } = useLanguage();

  // Manual translations for the Our Story section
  const ourStoryContent = {
    en: [
      "Founded in 2003 by Dr. Rajesh Kumar, the Kisan Andolan began as a small grassroots movement in a single village in Uttar Pradesh. What started as local meetings to address immediate farming challenges has grown into a nationwide movement that has impacted over 100,000 farmers across India.",
      "In our early years, we focused on helping farmers navigate government subsidy programs and providing basic agricultural education. As we grew, our mission expanded to encompass sustainable farming practices, market access improvement, policy advocacy, and community development.",
      "Today, Kisan Andolan stands as one of India's leading agricultural community organizations, combining traditional farming wisdom with modern agricultural science to address the complex challenges facing rural communities in the 21st century."
    ],
    hi: [
      "2003 में डॉ. राजेश कुमार द्वारा स्थापित, किसान आंदोलन उत्तर प्रदेश के एक छोटे से गांव में एक छोटे जमीनी आंदोलन के रूप में शुरू हुआ। जो स्थानीय बैठकों के रूप में तत्काल कृषि चुनौतियों को संबोधित करने के लिए शुरू हुआ था, वह एक राष्ट्रव्यापी आंदोलन में विकसित हो गया है जिसने पूरे भारत में 100,000 से अधिक किसानों को प्रभावित किया है।",
      "प्रारंभिक वर्षों में, हम किसानों को सरकारी सब्सिडी कार्यक्रमों का उपयोग करने और बुनियादी कृषि शिक्षा प्रदान करने पर ध्यान केंद्रित किया। जैसे-जैसे हम बढ़े, हमारा मिशन स्थायी कृषि पद्धतियों, बाजार पहुंच में सुधार, नीतिगत वकालत और सामुदायिक विकास को शामिल करने के लिए विस्तारित हुआ।",
      "आज, किसान आंदोलन भारत के प्रमुख कृषि सामुदायिक संगठनों में से एक के रूप में खड़ा है, जो 21वीं सदी में ग्रामीण समुदायों के सामने आने वाली जटिल चुनौतियों का समाधान करने के लिए पारंपरिक कृषि ज्ञान को आधुनिक कृषि विज्ञान के साथ जोड़ता है।"
    ]
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container-custom py-8">
        <Breadcrumb customItems={[
          { label: getTranslation('home'), path: '/homepage', isActive: false },
          { label: getTranslation('about'), path: '/about-page', isActive: true }
        ]} />
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
            <Icon name="Info" size={32} color="white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            {getTranslation('aboutOurMovement')}
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {getTranslation('aboutPageDesc')}
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="relative rounded-xl overflow-hidden mb-16 h-96">
          <Image 
            src="https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Farmers in a field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h2 className="text-3xl font-heading font-bold mb-2">{getTranslation('empoweringRuralIndia')}</h2>
              <p className="text-lg opacity-90">{getTranslation('grassrootsTransformation')}</p>
            </div>
          </div>
        </div>

        {/* Organizational Overview Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">{getTranslation('ourStory')}</h2>
              <div className="prose prose-lg max-w-none text-text-secondary">
                {ourStoryContent[language]?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1530507629858-e3759c371e91?q=80&w=1470&auto=format&fit=crop"
                    alt="Early days of the movement"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-48">
                  <Image
                    src="https://images.pixabay.com/photo/2013/12/16/15/59/farmer-229062_1280.jpg"
                    alt="Community meeting"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="rounded-lg overflow-hidden h-full">
                <Image
                  src="https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Farmer in the field"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-20 bg-surface rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">{getTranslation('coreValues')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-background rounded-lg hover:shadow-md transition-smooth">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} color="white" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">{getTranslation('communityFirst')}</h3>
              <p className="text-text-secondary">
                {getTranslation('communityFirstDesc')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg hover:shadow-md transition-smooth">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Sprout" size={32} color="white" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">{getTranslation('sustainability')}</h3>
              <p className="text-text-secondary">
                {getTranslation('sustainabilityDesc')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg hover:shadow-md transition-smooth">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Scale" size={32} color="white" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">{getTranslation('socialJustice')}</h3>
              <p className="text-text-secondary">
                {getTranslation('socialJusticeDesc')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg hover:shadow-md transition-smooth">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Lightbulb" size={32} color="white" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">{getTranslation('innovation')}</h3>
              <p className="text-text-secondary">
                {getTranslation('innovationDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Impact Metrics Section */}
        <ImpactMetrics />

        {/* Organizational Structure */}
        <TeamStructure />

        {/* Milestones Timeline */}
        <MilestoneTimeline />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Partnership Section */}
        <PartnershipSection showPartnershipModal={showPartnershipModal} setShowPartnershipModal={setShowPartnershipModal} />

        {/* Call to Action Section */}
        <section className="my-20 text-center">
          <div className="card bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-xl">
            <h3 className="text-2xl font-heading font-semibold mb-4">
              {getTranslation('joinOurMovement')}
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              {getTranslation('joinMovementDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowMemberRegistration(true)}
                className="bg-white text-primary px-6 py-3 rounded-md font-medium transition-all duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                {getTranslation('becomeAMember')}
              </button>
              <button 
                onClick={() => setShowYouthProgram(true)}
                className="border-2 border-white text-white px-6 py-3 rounded-md font-medium transition-all duration-200 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                {getTranslation('kisanLeadershipProgram')}
              </button>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-20 bg-surface rounded-xl p-8 shadow-md" id='contact'>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-4">{getTranslation('contactUs')}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">{getTranslation('headquarters')}</p>
                    <p className="text-text-secondary">1, Paper Mill Colony, Valmiki Nagar, </p>
                    <p className="text-text-secondary">Lucknow, Uttar Pradesh, 226006</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Mail" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@kisanandolan.org" className="text-primary hover:underline">info@kisanandolan.org</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Phone" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+911234567890" className="text-primary hover:underline">+917860411111</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-4">{getTranslation('regionalOffices')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium">{getTranslation('northIndia')}</p>
                  <p className="text-text-secondary">Lucknow, Uttar Pradesh</p>
                </div>
                
                <div>
                  <p className="font-medium">{getTranslation('southIndia')}</p>
                  <p className="text-text-secondary">Bangalore, Karnataka</p>
                </div>
                
                <div>
                  <p className="font-medium">{getTranslation('eastIndia')}</p>
                  <p className="text-text-secondary">Kolkata, West Bengal</p>
                </div>
                
                <div>
                  <p className="font-medium">{getTranslation('westIndia')}</p>
                  <p className="text-text-secondary">Ahmedabad, Gujarat</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-4">{getTranslation('connectWithUs')}</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors">
                  <Icon name="Facebook" size={20} color="white" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors">
                  <Icon name="Twitter" size={20} color="white" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors">
                  <Icon name="Instagram" size={20} color="white" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors">
                  <Icon name="Youtube" size={20} color="white" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Member Registration Modal */}
      {showMemberRegistration && <MemberRegistrationModal onClose={() => setShowMemberRegistration(false)} />}

      {/* Youth Leadership Program Modal */}
      {showYouthProgram && <YouthLeadershipProgramModal onClose={() => setShowYouthProgram(false)} />}
    </div>
  );
};

export default AboutPage;