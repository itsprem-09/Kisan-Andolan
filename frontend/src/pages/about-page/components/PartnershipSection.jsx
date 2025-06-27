import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import { getAboutContent } from 'services/aboutService';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import Modal from 'components/ui/Modal';
import { useLanguage } from '../../../contexts/LanguageContext';
import { submitPartnerInquiry } from '../../../services/partnerInquiryService';

const PartnershipSection = ({ showPartnershipModal, setShowPartnershipModal }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { getTranslation, language } = useLanguage();

  // Manual translations for Partnership Approach
  const partnershipApproachContent = {
    en: {
      title: "Our Partnership Approach",
      description: "We believe that meaningful partnerships are essential to creating sustainable change in the agricultural sector. Our collaborative approach focuses on building long-term relationships that align with our core values and mission.",
      values: [
        {
          title: "Aligned Values",
          description: "We partner with organizations that share our commitment to farmer empowerment, sustainable agriculture, and rural development.",
          icon: "Target"
        },
        {
          title: "Measurable Impact",
          description: "Our partnerships are designed to create tangible, measurable improvements in the lives of farming communities.",
          icon: "BarChart2"
        },
        {
          title: "Long-Term Commitment",
          description: "We seek partners who are committed to sustained engagement rather than short-term interventions.",
          icon: "Refresh"
        },
        {
          title: "Innovation Focus",
          description: "We prioritize partnerships that bring innovative approaches and technologies to address complex agricultural challenges.",
          icon: "Zap"
        }
      ]
    },
    hi: {
      title: "हमारा साझेदारी दृष्टिकोण",
      description: "हमारा मानना है कि कृषि क्षेत्र में स्थायी परिवर्तन लाने के लिए सार्थक साझेदारी आवश्यक है। हमारा सहयोगात्मक दृष्टिकोण दीर्घकालिक संबंध बनाने पर केंद्रित है जो हमारे मूल मूल्यों और मिशन के अनुरूप हों।",
      values: [
        {
          title: "समान मूल्य",
          description: "हम ऐसे संगठनों के साथ साझेदारी करते हैं जो किसान सशक्तिकरण, स्थायी कृषि और ग्रामीण विकास के प्रति हमारी प्रतिबद्धता साझा करते हैं।",
          icon: "Target"
        },
        {
          title: "मापने योग्य प्रभाव",
          description: "हमारी साझेदारियां कृषि समुदायों के जीवन में ठोस, मापने योग्य सुधार पैदा करने के लिए डिज़ाइन की गई हैं।",
          icon: "BarChart2"
        },
        {
          title: "दीर्घकालिक प्रतिबद्धता",
          description: "हम ऐसे साझेदारों की तलाश करते हैं जो अल्पकालिक हस्तक्षेपों के बजाय निरंतर जुड़ाव के लिए प्रतिबद्ध हों।",
          icon: "Refresh"
        },
        {
          title: "नवाचार फोकस",
          description: "हम ऐसी साझेदारियों को प्राथमिकता देते हैं जो जटिल कृषि चुनौतियों का समाधान करने के लिए नवीन दृष्टिकोण और प्रौद्योगिकियां लाती हैं।",
          icon: "Zap"
        }
      ]
    }
  };

  // Default partner data for fallback
  const defaultPartnerCategories = [
    {
      category: getTranslation('governmentPartners'),
      partners: [
        getTranslation('ministryAgriculture'),
        getTranslation('stateAgriUniversities'),
        getTranslation('indianCouncilAgriResearch'),
        getTranslation('nationalBankAgri')
      ],
      icon: "Landmark"
    },
    {
      category: getTranslation('academicPartners'),
      partners: [
        getTranslation('punjabAgriUniversity'),
        getTranslation('indianAgriResearch'),
        getTranslation('nationalCenterAgriEcon'),
        getTranslation('centerSustainable')
      ],
      icon: "GraduationCap"
    },
    {
      category: getTranslation('ngoPartners'),
      partners: [
        getTranslation('foundationEcological'),
        getTranslation('professionalAssistance'),
        getTranslation('actionFoodProduction'),
        getTranslation('watershedSupport')
      ],
      icon: "Globe"
    },
    {
      category: getTranslation('corporatePartners'),
      partners: [
        getTranslation('nationalAgriCoop'),
        getTranslation('indianFarmersCooperative'),
        getTranslation('agriTechSolutions'),
        getTranslation('ruralFinancial')
      ],
      icon: "Building"
    },
    {
      category: getTranslation('internationalOrgs'),
      partners: [
        getTranslation('foodAgriOrg'),
        getTranslation('internationalFund'),
        getTranslation('globalAlliance'),
        getTranslation('worldBank')
      ],
      icon: "Globe2"
    }
  ];

  // Fetch about data
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await getAboutContent();
        
        if (response && response.data) {
          setAboutData(response.data);
        }
      } catch (err) {
        console.error('Error fetching about content:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Get partner categories from API or use defaults
  const partnerCategories = aboutData?.partnerCategories && aboutData.partnerCategories.length > 0
    ? aboutData.partnerCategories
    : defaultPartnerCategories;

  // Get translated partner category
  const getTranslatedCategory = (category) => {
    if (language === 'hi' && category.hindi_category) {
      return category.hindi_category;
    }
    return category.category;
  };

  // Get partnership approach from manual translations instead of API
  const currentPartnershipApproach = partnershipApproachContent[language] || partnershipApproachContent.en;

  // Handle partnership contact form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle partnership contact form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(getTranslation('fillRequiredFields'));
      setSubmitting(false);
      return;
    }

    try {
      // Submit the form data to the backend API
      await submitPartnerInquiry(formData);
      
      // Show success message
      setFormSubmitted(true);
      setSubmitting(false);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setShowPartnershipModal(false);
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          organization: '',
          message: ''
        });
      }, 5000);
    } catch (err) {
      console.error('Error submitting partnership form:', err);
      setFormError(getTranslation('formSubmitError'));
      setSubmitting(false);
    }
  };

  // Render partnership contact form
  const renderPartnershipContactForm = () => {
    if (formSubmitted) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} />
          </div>
          <h3 className="text-xl font-heading font-semibold text-primary mb-2">{getTranslation('thankYou')}</h3>
          <p className="text-text-secondary mb-4">
            {getTranslation('formSubmitSuccess')}
          </p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {formError}
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-text-primary font-medium mb-1">
            {getTranslation('yourName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-text-primary font-medium mb-1">
            {getTranslation('email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="organization" className="block text-text-primary font-medium mb-1">
            {getTranslation('organization')}
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-text-primary font-medium mb-1">
            {getTranslation('message')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Icon name="Loader" size={18} className="mr-2 animate-spin" />
                {getTranslation('submitting')}
              </>
            ) : getTranslation('submit')}
          </button>
        </div>
      </form>
    );
  };

  if (loading) {
    return (
      <section className="my-20">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="my-20">
      <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
        {getTranslation('partnerships')}
      </h2>
      
      {/* Partnership Approach Section */}
      <div className="bg-surface rounded-xl p-8 shadow-md mb-12">
        <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
          {currentPartnershipApproach.title}
        </h3>
        <p className="text-text-secondary mb-8 max-w-4xl">
          {currentPartnershipApproach.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPartnershipApproach.values.map((value, index) => (
            <div key={index} className="bg-background p-6 rounded-lg hover:shadow-md transition-smooth">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Icon name={value.icon} size={24} />
              </div>
              <h4 className="text-lg font-heading font-semibold text-primary mb-2">
                {value.title}
              </h4>
              <p className="text-text-secondary text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current Partners Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-heading font-semibold text-primary mb-8 text-center">
          {getTranslation('currentPartners')}
        </h3>
        
        {/* Partner Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partnerCategories.map((category, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-start mb-4">
                <span className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-3">
                  <Icon name={category.icon} size={20} color="#4a7c59" />
                </span>
                <h3 className="text-lg font-heading font-semibold text-primary">
                  {getTranslatedCategory(category)}
                </h3>
              </div>
              <ul className="space-y-2 text-text-secondary">
                {category.partners.map((partner, idx) => (
                  <li key={idx} className="flex items-center">
                    <Icon name="ArrowRight" size={14} className="mr-2 text-primary" />
                    <span>{partner}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Partnership Call to Action */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
          {getTranslation('becomePartner')}
        </h3>
        <p className="text-text-secondary max-w-2xl mx-auto mb-6">
          {getTranslation('partnershipInquiry')}
        </p>
        <button
          onClick={() => setShowPartnershipModal(true)}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          {getTranslation('contactPartnership')}
        </button>
      </div>
      
      {/* Partnership Modal */}
      <Modal 
        isOpen={showPartnershipModal}
        title={getTranslation('partnershipInquiry')} 
        onClose={() => setShowPartnershipModal(false)}
      >
        {renderPartnershipContactForm()}
      </Modal>
    </section>
  );
};

export default PartnershipSection;