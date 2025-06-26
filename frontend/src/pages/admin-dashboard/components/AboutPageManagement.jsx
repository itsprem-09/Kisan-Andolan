import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import aboutService from 'services/aboutService';
import DynamicForm from './DynamicForm';
import Modal from 'components/ui/Modal';
import ConfirmModal from './ConfirmModal';
import LoadingSpinner from 'components/ui/LoadingSpinner';

const AboutPageManagement = () => {
  const [activeTab, setActiveTab] = useState('impact');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch about data on component mount
  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await aboutService.getAboutContent();
        setAboutData(response.data);
      } catch (err) {
        console.error('Failed to fetch about page content:', err);
        setError('Failed to load about page content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Tabs for about page sections
  const tabs = [
    { id: 'impact', label: 'Impact Metrics', icon: 'BarChart2' },
    { id: 'info-boxes', label: 'Info Boxes', icon: 'MessageSquare' },
    { id: 'testimonials', label: 'Testimonials', icon: 'MessageCircle' },
    { id: 'community-stats', label: 'Community Stats', icon: 'PieChart' },
    { id: 'partners', label: 'Partners', icon: 'Users' }
  ];

  // Handle edit item
  const handleEdit = (item, section) => {
    setCurrentItem(item);
    setCurrentSection(section);
    setIsModalOpen(true);
  };

  // Handle delete item
  const handleDelete = (item, section) => {
    setItemToDelete({ item, section });
    setIsDeleteModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setCurrentSection(null);
  };

  // Handle close delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  // Get form config based on section
  const getFormConfig = (section) => {
    switch (section) {
      case 'impact':
        // Create fallback values for impact metrics when aboutData is null or fields are missing
        const impactMetrics = aboutData?.impactMetrics || {};
        return {
          title: 'Edit Impact Metrics',
          fields: [
            {
              name: 'farmers',
              label: 'Farmers Reached',
              type: 'number',
              defaultValue: impactMetrics.farmers || 100000,
              placeholder: 'Enter number of farmers'
            },
            {
              name: 'villages',
              label: 'Villages Covered',
              type: 'number',
              defaultValue: impactMetrics.villages || 1250,
              placeholder: 'Enter number of villages'
            },
            {
              name: 'programs',
              label: 'Programs Implemented',
              type: 'number',
              defaultValue: impactMetrics.programs || 45,
              placeholder: 'Enter number of programs'
            },
            {
              name: 'states',
              label: 'States Active',
              type: 'number',
              defaultValue: impactMetrics.states || 18,
              placeholder: 'Enter number of states'
            }
          ]
        };
      
      case 'info-boxes':
        return {
          title: currentItem ? 'Edit Info Box' : 'Add Info Box',
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              defaultValue: currentItem?.title || '',
              placeholder: 'Enter info box title'
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              defaultValue: currentItem?.description || '',
              placeholder: 'Enter info box description'
            },
            {
              name: 'icon',
              label: 'Icon',
              type: 'select',
              defaultValue: currentItem?.icon || 'TrendingUp',
              options: [
                { value: 'TrendingUp', label: 'Trending Up' },
                { value: 'Award', label: 'Award' },
                { value: 'Globe', label: 'Globe' },
                { value: 'Target', label: 'Target' },
                { value: 'Zap', label: 'Zap' },
                { value: 'Heart', label: 'Heart' }
              ]
            }
          ]
        };
        
      case 'testimonials':
        return {
          title: currentItem ? 'Edit Testimonial' : 'Add Testimonial',
          fields: [
            {
              name: 'quote',
              label: 'Quote',
              type: 'textarea',
              defaultValue: currentItem?.quote || '',
              placeholder: 'Enter testimonial quote'
            },
            {
              name: 'author',
              label: 'Author Name',
              type: 'text',
              defaultValue: currentItem?.author || '',
              placeholder: 'Enter author name'
            },
            {
              name: 'role',
              label: 'Role/Position',
              type: 'text',
              defaultValue: currentItem?.role || '',
              placeholder: 'Enter author role or position'
            },
            {
              name: 'impact',
              label: 'Impact Highlight',
              type: 'text',
              defaultValue: currentItem?.impact || '',
              placeholder: 'Enter impact highlight (e.g. "40% increase in crop yields")'
            },
            {
              name: 'image',
              label: 'Author Image',
              type: 'file',
              accept: 'image/*',
              defaultValue: currentItem?.image || '',
              existingImageUrl: currentItem?.image || '',
              hint: currentItem?.image ? 'Only upload a new image if you want to replace the existing one' : 'Upload author image',
              isRequired: !currentItem,
              placeholder: 'Upload author image'
            }
          ]
        };
        
      case 'community-stats':
        return {
          title: 'Edit Community Stats',
          fields: [
            {
              name: 'successStories',
              label: 'Success Stories',
              type: 'number',
              defaultValue: aboutData?.communityStats?.successStories || 0,
              placeholder: 'Enter number of success stories'
            },
            {
              name: 'satisfactionRate',
              label: 'Satisfaction Rate (%)',
              type: 'number',
              defaultValue: aboutData?.communityStats?.satisfactionRate || 0,
              placeholder: 'Enter satisfaction rate percentage'
            },
            {
              name: 'incomeIncrease',
              label: 'Income Increase (%)',
              type: 'number',
              defaultValue: aboutData?.communityStats?.incomeIncrease || 0,
              placeholder: 'Enter average income increase percentage'
            }
          ]
        };
        
      case 'partners':
        // Ensure partners are properly formatted as one per line
        let partnersDefaultValue = '';
        if (currentItem?.partners) {
          // Make sure partners are always an array before joining
          const partnersArray = Array.isArray(currentItem.partners) 
            ? currentItem.partners 
            : typeof currentItem.partners === 'string'
              ? currentItem.partners.split(',')  // Handle comma-separated string
              : []; // Fallback for unexpected data types
          
          // Clean up any whitespace from potential comma formatting
          partnersDefaultValue = partnersArray
            .map(partner => partner.trim())
            .filter(partner => partner) // Remove any empty strings
            .join('\n');
          
          console.log('Partners formatted for form:', partnersDefaultValue);
        }
        
        return {
          title: currentItem ? 'Edit Partner Category' : 'Add Partner Category',
          fields: [
            {
              name: 'category',
              label: 'Category Name',
              type: 'text',
              defaultValue: currentItem?.category || '',
              placeholder: 'Enter partner category name'
            },
            {
              name: 'icon',
              label: 'Icon',
              type: 'select',
              defaultValue: currentItem?.icon || 'Building',
              options: [
                { value: 'Building', label: 'Building' },
                { value: 'Landmark', label: 'Landmark' },
                { value: 'Globe', label: 'Globe' },
                { value: 'Globe2', label: 'Globe Alt' },
                { value: 'GraduationCap', label: 'Graduation Cap' },
                { value: 'Book', label: 'Book' }
              ]
            },
            {
              name: 'partners',
              label: 'Partners (one per line)',
              type: 'textarea',
              defaultValue: partnersDefaultValue,
              placeholder: 'Enter partners (one per line)'
            }
          ]
        };
        
      default:
        return { title: '', fields: [] };
    }
  };

  // Handle form submit
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    console.log('Form data submitted:', formData);
    console.log('Current section:', currentSection);
    
    try {
      let response;
      
      switch (currentSection) {
        case 'impact':
          // Extract the data from FormData if it's a FormData object
          let impactMetricsData;
          try {
            if (formData instanceof FormData) {
              console.log('FormData received for impact metrics:', formData);
              impactMetricsData = {
                farmers: Number(formData.get('farmers')) || 100000,
                villages: Number(formData.get('villages')) || 1250,
                programs: Number(formData.get('programs')) || 45,
                states: Number(formData.get('states')) || 18
              };
            } else {
              // Make sure we convert the form values to numbers
              impactMetricsData = {
                farmers: Number(formData.farmers) || 100000,
                villages: Number(formData.villages) || 1250,
                programs: Number(formData.programs) || 45,
                states: Number(formData.states) || 18
              };
            }
            
            console.log('Submitting impact metrics data:', impactMetricsData);
            response = await aboutService.updateImpactMetrics(impactMetricsData);
            console.log('Impact metrics update response:', response);
            
            // Update local state
            setAboutData(prevState => ({
              ...prevState,
              impactMetrics: response.data
            }));
          } catch (err) {
            console.error('Error updating impact metrics:', err);
            setError(`Failed to update impact metrics: ${err.message || 'Unknown error'}`);
            throw err; // Rethrow to prevent modal from closing
          }
          break;
          
        case 'info-boxes':
          // Process the form data
          const newInfoBox = {};
          
          if (formData instanceof FormData) {
            // Extract data from FormData
            newInfoBox.title = formData.get('title') || '';
            newInfoBox.description = formData.get('description') || '';
            newInfoBox.icon = formData.get('icon') || 'TrendingUp';
          } else {
            // Regular object
            newInfoBox.title = formData.title || '';
            newInfoBox.description = formData.description || '';
            newInfoBox.icon = formData.icon || 'TrendingUp';
          }
          
          console.log('Processed info box data:', newInfoBox);
          
          // If editing, update the existing info box
          let updatedInfoBoxes;
          if (currentItem) {
            // Use _id for comparison when available, otherwise use index matching
            updatedInfoBoxes = aboutData.infoBoxes.map(box => 
              (box._id && box._id === currentItem._id) || box === currentItem ? 
                { ...box, ...newInfoBox } : box
            );
          } else {
            // If adding new, append to array
            updatedInfoBoxes = [...aboutData.infoBoxes, newInfoBox];
          }
          
          console.log('Updated info boxes:', updatedInfoBoxes);
          
          response = await aboutService.updateInfoBoxes(updatedInfoBoxes);
          
          // Update local state
          setAboutData(prevState => ({
            ...prevState,
            infoBoxes: response.data
          }));
          break;
          
        case 'testimonials':
          try {
            // Set loading state right away
            setLoading(true);
            setError(null);
            
            // Create FormData for file upload
            const testimonialFormData = new FormData();
            
            // Get current testimonials
            const testimonials = [...aboutData.testimonials];
            
            // Extract testimonial data from form
            const testimonialData = {
              quote: formData instanceof FormData ? formData.get('quote') : formData.quote,
              author: formData instanceof FormData ? formData.get('author') : formData.author,
              role: formData instanceof FormData ? formData.get('role') : formData.role,
              impact: formData instanceof FormData ? formData.get('impact') : formData.impact
            };
            
            // Update or add testimonial
            if (currentItem) {
              // Find the testimonial to edit
              const index = testimonials.findIndex(t => 
                (t._id && t._id === currentItem._id) || 
                JSON.stringify(t) === JSON.stringify(currentItem)
              );
              
              if (index !== -1) {
                // Update existing testimonial with new data
                testimonials[index] = {
                  ...testimonials[index],
                  ...testimonialData
                };
                
                // Ensure _id is passed to the server if we're editing
                if (testimonials[index]._id) {
                  testimonialFormData.append('_id', testimonials[index]._id);
                  console.log(`Editing testimonial with ID: ${testimonials[index]._id}`);
                }
                
                // Handle image upload if provided
                let imageFile = null;
                if (formData instanceof FormData) {
                  imageFile = formData.get('image');
                } else if (formData.image instanceof File) {
                  imageFile = formData.image;
                }
                
                // Only append image if it's a file and has size
                if (imageFile instanceof File && imageFile.size > 0) {
                  console.log(`Adding image file for testimonial ${index}: ${imageFile.name} (${imageFile.size} bytes)`);
                  testimonialFormData.append('image', imageFile);
                } else if (currentItem.image) {
                  // Pass existing image URL if available
                  console.log(`Preserving existing image: ${currentItem.image}`);
                  testimonialFormData.append('existingImageUrl', currentItem.image);
                }
              } else {
                console.error('Could not find testimonial to update');
                setError('Could not locate the testimonial to update');
                setLoading(false);
                return;
              }
            } else {
              // Add new testimonial with temp ID for tracking
              const newTestimonial = { 
                ...testimonialData,
                _id: `temp_${Date.now()}`
              };
              testimonials.push(newTestimonial);
              
              // Handle image upload for new testimonial
              let imageFile = null;
              if (formData instanceof FormData) {
                imageFile = formData.get('image');
              } else if (formData.image instanceof File) {
                imageFile = formData.image;
              }
              
              // Add image file if provided
              if (imageFile instanceof File && imageFile.size > 0) {
                console.log(`Adding image for new testimonial: ${imageFile.name} (${imageFile.size} bytes)`);
                if (imageFile.size > 10 * 1024 * 1024) {
                  setError('Image file is too large. Please use an image smaller than 10MB.');
                  setLoading(false);
                  return;
                }
                testimonialFormData.append('image', imageFile);
              }
            }
            
            // Add testimonials JSON data to FormData
            testimonialFormData.append('testimonials', JSON.stringify(testimonials));
            
            // Log the final form data for debugging
            console.log(`Sending update with ${testimonials.length} testimonials`);
            for (const [key, value] of testimonialFormData.entries()) {
              if (value instanceof File) {
                console.log(`FormData: ${key} = File: ${value.name} (${value.size} bytes)`);
              } else if (key === 'testimonials') {
                console.log(`FormData: ${key} = [JSON data]`);
              } else {
                console.log(`FormData: ${key} = ${value}`);
              }
            }
            
            // Display uploading message
            setError('Uploading image and updating testimonial... This may take a moment.');
            
            // Set up timeout for UI feedback
            const timeoutId = setTimeout(() => {
              setError('Still uploading... Please be patient with large image files.');
            }, 10000);
            
            try {
              // Send request with FormData
              response = await aboutService.updateTestimonials(testimonialFormData);
              
              // Clear timeout
              clearTimeout(timeoutId);
              
              // Update state and close modal
              setAboutData(prevState => ({
                ...prevState,
                testimonials: response.data
              }));
              
              setError(null);
              handleCloseModal();
            } catch (err) {
              clearTimeout(timeoutId);
              console.error('Error updating testimonial:', err);
              setError(`Failed to update testimonial: ${err.message || 'Unknown error'}`);
            } finally {
              setLoading(false);
            }
          } catch (err) {
            console.error('Error in testimonial form handling:', err);
            setError(`Error processing testimonial: ${err.message || 'Unknown error'}`);
            setLoading(false);
          }
          return; // Return early to avoid the finally block outside the switch
          break;
          
        case 'community-stats':
          try {
            // Extract the data from FormData if it's a FormData object
            let communityStatsData;
            if (formData instanceof FormData) {
              communityStatsData = {
                successStories: Number(formData.get('successStories')) || 0,
                satisfactionRate: Number(formData.get('satisfactionRate')) || 0,
                incomeIncrease: Number(formData.get('incomeIncrease')) || 0
              };
            } else {
              communityStatsData = {
                successStories: Number(formData.successStories) || 0,
                satisfactionRate: Number(formData.satisfactionRate) || 0,
                incomeIncrease: Number(formData.incomeIncrease) || 0
              };
            }
            
            console.log('Submitting community stats data:', communityStatsData);
            response = await aboutService.updateCommunityStats(communityStatsData);
            console.log('Community stats update response:', response);
            
            // Update local state if response has valid data
            if (response && response.data) {
              setAboutData(prevState => ({
                ...prevState,
                communityStats: response.data
              }));
            } else {
              console.error('Community stats response missing data property');
              setError('Invalid response format from server');
            }
          } catch (err) {
            console.error('Error updating community stats:', err);
            setError(`Failed to update community stats: ${err.message || 'Unknown error'}`);
            throw err; // Rethrow to prevent modal from closing
          }
          break;
          
        case 'partners':
          // Process the form data
          let partnersList = [];
          let partnerCategory = '';
          let partnerIcon = '';
          
          try {
            if (formData instanceof FormData) {
              const partnersText = formData.get('partners') || '';
              console.log('Raw partners text from form:', partnersText);
              
              // Split by newlines first, then try commas if no newlines found
              if (partnersText.includes('\n')) {
                partnersList = partnersText.split('\n').filter(partner => partner.trim() !== '');
              } else {
                partnersList = partnersText.split(',').filter(partner => partner.trim() !== '');
              }
              
              partnerCategory = formData.get('category') || '';
              partnerIcon = formData.get('icon') || 'Building';
            } else {
              console.log('Raw partners data from form object:', formData.partners);
              
              // Handle different input types for partners
              if (typeof formData.partners === 'string') {
                // Split by newlines first, then try commas if no newlines found
                if (formData.partners.includes('\n')) {
                  partnersList = formData.partners.split('\n').filter(partner => partner.trim() !== '');
                } else {
                  partnersList = formData.partners.split(',').filter(partner => partner.trim() !== '');
                }
              } else if (Array.isArray(formData.partners)) {
                partnersList = formData.partners.filter(Boolean);
              } else {
                partnersList = [];
              }
              
              partnerCategory = formData.category || '';
              partnerIcon = formData.icon || 'Building';
            }
            
            console.log('Processed partner data:', { category: partnerCategory, icon: partnerIcon, partnersList });
          } catch (err) {
            console.error('Error processing partner data:', err);
            setError(`Error processing partner data: ${err.message}`);
            partnersList = [];
          }
          
          const newPartnerCategory = {
            category: partnerCategory,
            icon: partnerIcon,
            partners: partnersList
          };
          
          // If editing, update the existing partner category
          let updatedPartnerCategories;
          if (currentItem) {
            updatedPartnerCategories = aboutData.partnerCategories.map(cat => 
              (cat._id && cat._id === currentItem._id) || cat === currentItem ? 
                { ...cat, ...newPartnerCategory } : cat
            );
          } else {
            // If adding new, append to array
            updatedPartnerCategories = [...aboutData.partnerCategories, newPartnerCategory];
          }
          
          console.log('Updated partner categories:', updatedPartnerCategories);
          
          response = await aboutService.updatePartners(updatedPartnerCategories);
          
          // Update local state
          setAboutData(prevState => ({
            ...prevState,
            partnerCategories: response.data
          }));
          break;
          
        default:
          throw new Error('Invalid section for update');
      }
      
      // Close the modal after successful update
      handleCloseModal();
      
    } catch (err) {
      console.error(`Failed to update ${currentSection}:`, err);
      setError(`Failed to update ${currentSection}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setLoading(true);
    setError(null);
    
    const { item, section } = itemToDelete;
    
    try {
      let response;
      
      switch (section) {
        case 'info-boxes':
          // Filter out the item to delete
          const updatedInfoBoxes = aboutData.infoBoxes.filter(box => box !== item);
          response = await aboutService.updateInfoBoxes(updatedInfoBoxes);
          
          // Update local state
          setAboutData(prevState => ({
            ...prevState,
            infoBoxes: response.data
          }));
          break;
          
        case 'testimonials':
          // Filter out the item to delete
          const updatedTestimonials = aboutData.testimonials.filter(t => t !== item);
          
          const testimonialFormData = new FormData();
          testimonialFormData.append('testimonials', JSON.stringify(updatedTestimonials));
          
          response = await aboutService.updateTestimonials(testimonialFormData);
          
          // Update local state
          setAboutData(prevState => ({
            ...prevState,
            testimonials: response.data
          }));
          break;
          
        case 'partners':
          // Filter out the item to delete
          const updatedPartnerCategories = aboutData.partnerCategories.filter(cat => cat !== item);
          response = await aboutService.updatePartners(updatedPartnerCategories);
          
          // Update local state
          setAboutData(prevState => ({
            ...prevState,
            partnerCategories: response.data
          }));
          break;
          
        default:
          throw new Error('Invalid section for delete operation');
      }
      
      // Close the delete modal
      handleCloseDeleteModal();
      
    } catch (err) {
      console.error(`Failed to delete ${section}:`, err);
      setError(`Failed to delete ${section}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading && !aboutData) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  // Error state
  if (error && !aboutData) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <Icon name="AlertCircle" size={40} className="text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load content</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render content for Impact Metrics tab
  const renderImpactMetricsTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-primary">Impact Metrics</h3>
        <button
          onClick={() => {
            setCurrentItem(null);
            setCurrentSection('impact');
            console.log('Opening Edit Metrics modal with section:', 'impact');
            console.log('Current aboutData:', aboutData);
            console.log('Current impactMetrics:', aboutData?.impactMetrics);
            console.log('Form config:', getFormConfig('impact'));
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Edit" size={16} />
          <span>Edit Metrics</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface rounded-lg p-4 text-center">
          <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary mb-1">
            {aboutData?.impactMetrics?.farmers?.toLocaleString()}+
          </div>
          <p className="text-text-secondary text-sm">Farmers Reached</p>
        </div>
        
        <div className="bg-surface rounded-lg p-4 text-center">
          <Icon name="Home" size={24} className="text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary mb-1">
            {aboutData?.impactMetrics?.villages?.toLocaleString()}+
          </div>
          <p className="text-text-secondary text-sm">Villages Covered</p>
        </div>
        
        <div className="bg-surface rounded-lg p-4 text-center">
          <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary mb-1">
            {aboutData?.impactMetrics?.programs?.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">Programs Implemented</p>
        </div>
        
        <div className="bg-surface rounded-lg p-4 text-center">
          <Icon name="Map" size={24} className="text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary mb-1">
            {aboutData?.impactMetrics?.states?.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">States Active</p>
        </div>
      </div>
    </div>
  );

  // Render content for Info Boxes tab
  const renderInfoBoxesTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-primary">Information Boxes</h3>
        <button
          onClick={() => {
            setCurrentItem(null);
            setCurrentSection('info-boxes');
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Info Box</span>
        </button>
      </div>
      
      {aboutData?.infoBoxes?.length > 0 ? (
        <div className="space-y-4">
          {aboutData.infoBoxes.map((box, index) => (
            <div key={index} className="bg-surface rounded-lg p-4 flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Icon name={box.icon} size={20} className="text-primary" />
              </div>
              
              <div className="flex-grow">
                <h4 className="text-primary font-medium mb-1">{box.title}</h4>
                <p className="text-text-secondary text-sm">{box.description}</p>
              </div>
              
              <div className="flex-shrink-0 space-x-2">
                <button
                  onClick={() => handleEdit(box, 'info-boxes')}
                  className="p-2 text-primary hover:bg-accent rounded-full"
                >
                  <Icon name="Edit" size={16} />
                </button>
                
                <button
                  onClick={() => handleDelete(box, 'info-boxes')}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Icon name="Trash" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-surface rounded-lg">
          <Icon name="FileX" size={40} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary">No information boxes added yet</p>
        </div>
      )}
    </div>
  );

  // Render content for Testimonials tab
  const renderTestimonialsTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-primary">Testimonials</h3>
        <button
          onClick={() => {
            setCurrentItem(null);
            setCurrentSection('testimonials');
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>
      
      {aboutData?.testimonials?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutData.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-surface rounded-lg overflow-hidden">
              <div className="h-40 bg-gray-200 relative">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="User" size={40} className="text-gray-400" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-sm opacity-90">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-text-secondary italic mb-3">"{testimonial.quote.length > 150 ? testimonial.quote.substring(0, 150) + '...' : testimonial.quote}"</p>
                <div className="bg-accent bg-opacity-20 px-3 py-1 rounded-full inline-block">
                  <span className="text-xs font-medium text-primary">{testimonial.impact}</span>
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(testimonial, 'testimonials')}
                    className="p-2 text-primary hover:bg-accent rounded-full"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(testimonial, 'testimonials')}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Icon name="Trash" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-surface rounded-lg">
          <Icon name="MessageCircleOff" size={40} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary">No testimonials added yet</p>
        </div>
      )}
    </div>
  );

  // Render content for Community Stats tab
  const renderCommunityStatsTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-primary">Community Voice Stats</h3>
        <button
          onClick={() => {
            setCurrentItem(null);
            setCurrentSection('community-stats');
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Edit" size={16} />
          <span>Edit Stats</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Users" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary mb-1">
            {aboutData?.communityStats?.successStories?.toLocaleString()}+
          </div>
          <p className="text-text-secondary text-sm">Success stories collected</p>
        </div>
        
        <div className="bg-surface rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Star" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary mb-1">
            {aboutData?.communityStats?.satisfactionRate}%
          </div>
          <p className="text-text-secondary text-sm">Program satisfaction rate</p>
        </div>
        
        <div className="bg-surface rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="TrendingUp" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary mb-1">
            {aboutData?.communityStats?.incomeIncrease}%
          </div>
          <p className="text-text-secondary text-sm">Average income increase</p>
        </div>
      </div>
    </div>
  );

  // Render content for Partners tab
  const renderPartnersTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-primary">Partner Categories</h3>
        <button
          onClick={() => {
            setCurrentItem(null);
            setCurrentSection('partners');
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Partner Category</span>
        </button>
      </div>
      
      {aboutData?.partnerCategories?.length > 0 ? (
        <div className="space-y-6">
          {aboutData.partnerCategories.map((category, index) => (
            <div key={index} className="bg-surface rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Icon name={category.icon} size={20} className="text-primary" />
                  </div>
                  <h4 className="text-primary font-medium">{category.category}</h4>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category, 'partners')}
                    className="p-2 text-primary hover:bg-accent rounded-full"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(category, 'partners')}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Icon name="Trash" size={16} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 pl-14">
                {category.partners.map((partner, i) => (
                  <div key={i} className="text-text-secondary text-sm flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                    <span>{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-surface rounded-lg">
          <Icon name="Users" size={40} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary">No partner categories added yet</p>
        </div>
      )}
    </div>
  );

  // Render the active tab content
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'impact':
        return renderImpactMetricsTab();
      case 'info-boxes':
        return renderInfoBoxesTab();
      case 'testimonials':
        return renderTestimonialsTab();
      case 'community-stats':
        return renderCommunityStatsTab();
      case 'partners':
        return renderPartnersTab();
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">About Page Management</h2>
      
      {/* Section Tabs */}
      <div className="mb-8">
        <div className="border-b border-border">
          <nav className="flex flex-wrap space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-2 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Active Tab Content */}
      {renderActiveTabContent()}
      
      {/* Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={getFormConfig(currentSection).title}
          size="lg"
        >
          {console.log('Rendering DynamicForm with fields:', getFormConfig(currentSection).fields)}
          <DynamicForm
            fields={getFormConfig(currentSection).fields}
            initialData={currentSection === 'impact' ? aboutData?.impactMetrics : 
                       currentSection === 'community-stats' ? aboutData?.communityStats :
                       currentItem}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
            isLoading={loading}
            error={error}
          />
        </Modal>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message={`Are you sure you want to delete this item? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          loading={loading}
        />
      )}
    </div>
  );
};

export default AboutPageManagement; 