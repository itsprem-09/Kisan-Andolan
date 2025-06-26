const About = require('../models/About');
const asyncHandler = require('express-async-handler');
const { cloudinaryUploadImage, cloudinaryDeleteImage } = require('../config/cloudinaryConfig');
const fs = require('fs');

// Initialize the About page content if it doesn't exist
const initializeAboutContent = async () => {
  try {
    let aboutContent = await About.findOne();
    
    // If no About content exists, create default content
    if (!aboutContent) {
      aboutContent = await About.create({
        // Default Impact Metrics
        impactMetrics: {
          farmers: 100000,
          villages: 1250,
          programs: 45,
          states: 18
        },
        
        // Default Info Boxes
        infoBoxes: [
          {
            title: "Sustainable Growth",
            description: "Our movement has been growing steadily since its inception, with a 35% increase in farmer participation in the last three years alone. We're committed to reaching 250,000 farmers by 2026 through expanded programs and regional partnerships.",
            icon: "TrendingUp"
          }
        ],
        
        // Default Testimonials
        testimonials: [
          {
            quote: "Kisan Andolan has transformed our village's approach to agriculture. The training on water conservation techniques helped us increase crop yields by 40% while using less water. Their practical, hands-on approach makes complex farming techniques accessible to everyone.",
            author: "Ramesh Patel",
            role: "Farmer, Gujarat",
            image: "https://images.pexels.com/photos/1822095/pexels-photo-1822095.jpeg",
            impact: "40% increase in crop yields"
          },
          {
            quote: "As a woman farmer, I faced many challenges in accessing resources and training. The Women in Agriculture program provided not just agricultural knowledge but also leadership training that helped me start a cooperative with 15 other women farmers in my village. Now we negotiate better prices and support each other.",
            author: "Lakshmi Devi",
            role: "Cooperative Leader, Tamil Nadu",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            impact: "Founded a 15-member women's cooperative"
          }
        ],
        
        // Default Community Stats
        communityStats: {
          successStories: 850,
          satisfactionRate: 92,
          incomeIncrease: 45
        },
        
        // Default Partner Categories
        partnerCategories: [
          {
            category: "Government Partners",
            partners: [
              "Ministry of Agriculture & Farmers Welfare",
              "State Agricultural Universities",
              "Indian Council of Agricultural Research",
              "National Bank for Agriculture and Rural Development"
            ],
            icon: "Landmark"
          },
          {
            category: "Academic & Research Partners",
            partners: [
              "Punjab Agricultural University",
              "Indian Agricultural Research Institute",
              "National Centre for Agricultural Economics",
              "Centre for Sustainable Agriculture"
            ],
            icon: "GraduationCap"
          }
        ],
        
        // Default Partnership Approach
        partnershipApproach: {
          title: "Our Partnership Approach",
          description: "We believe in collaborative solutions that leverage the strengths of diverse organizations to create sustainable impact for farming communities.",
          values: [
            {
              title: "Aligned Values",
              description: "We partner with organizations that share our commitment to farmer welfare, sustainability, and community empowerment.",
              icon: "Target"
            },
            {
              title: "Measurable Impact",
              description: "All partnerships are evaluated based on tangible outcomes and positive impact for farming communities.",
              icon: "BarChart2"
            },
            {
              title: "Long-term Commitment",
              description: "We focus on sustainable, long-term relationships rather than short-term projects or initiatives.",
              icon: "Refresh"
            },
            {
              title: "Innovation Focus",
              description: "We seek partners who bring innovative solutions and approaches to agricultural challenges.",
              icon: "Zap"
            }
          ]
        }
      });
      console.log('Default about page content created');
    }
    
    return aboutContent;
  } catch (error) {
    console.error('Error initializing about content:', error);
    throw error;
  }
};

// @desc    Get all about page content
// @route   GET /api/about
// @access  Public
const getAboutContent = asyncHandler(async (req, res) => {
  try {
    // First, ensure we have about content
    const aboutContent = await initializeAboutContent();
    
    res.status(200).json({
      success: true,
      data: aboutContent
    });
  } catch (error) {
    console.error('Error getting about content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about page content',
      error: error.message
    });
  }
});

// @desc    Update impact metrics
// @route   PUT /api/about/impact-metrics
// @access  Private/Admin
const updateImpactMetrics = asyncHandler(async (req, res) => {
  try {
    const { farmers, villages, programs, states } = req.body;
    
    // Initialize about content if it doesn't exist
    await initializeAboutContent();
    
    const updatedAbout = await About.findOneAndUpdate(
      {},
      {
        'impactMetrics.farmers': farmers || 100000,
        'impactMetrics.villages': villages || 1250,
        'impactMetrics.programs': programs || 45,
        'impactMetrics.states': states || 18,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedAbout.impactMetrics
    });
  } catch (error) {
    console.error('Error updating impact metrics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update impact metrics',
      error: error.message
    });
  }
});

// @desc    Manage info boxes
// @route   PUT /api/about/info-boxes
// @access  Private/Admin
const updateInfoBoxes = asyncHandler(async (req, res) => {
  try {
    const { infoBoxes } = req.body;
    
    if (!infoBoxes || !Array.isArray(infoBoxes)) {
      return res.status(400).json({
        success: false,
        message: 'Info boxes data is required and should be an array'
      });
    }
    
    // Initialize about content if it doesn't exist
    await initializeAboutContent();
    
    const updatedAbout = await About.findOneAndUpdate(
      {},
      {
        infoBoxes,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedAbout.infoBoxes
    });
  } catch (error) {
    console.error('Error updating info boxes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update info boxes',
      error: error.message
    });
  }
});

// @desc    Manage testimonials
// @route   PUT /api/about/testimonials
// @access  Private/Admin
const updateTestimonials = asyncHandler(async (req, res) => {
  try {
    console.log('Testimonial update request received');
    
    // Parse testimonials data
    let testimonials;
    try {
      if (typeof req.body.testimonials === 'string') {
        testimonials = JSON.parse(req.body.testimonials);
        console.log(`Parsed ${testimonials.length} testimonials from JSON string`);
      } else if (req.body.testimonials) {
        testimonials = req.body.testimonials;
        console.log(`Received testimonials as object: ${testimonials.length} items`);
      } else {
        return res.status(400).json({
          success: false,
          message: 'Testimonials data is required'
        });
      }
      
      if (!Array.isArray(testimonials)) {
        return res.status(400).json({
          success: false,
          message: 'Testimonials data must be an array'
        });
      }
    } catch (parseError) {
      console.error('Error parsing testimonials data:', parseError);
      return res.status(400).json({
        success: false,
        message: 'Invalid testimonials data format'
      });
    }
    
    // Get existing testimonials from database
    const aboutDoc = await initializeAboutContent();
    const existingTestimonials = aboutDoc.testimonials || [];
    
    // Find which testimonial is being updated/added - usually the last one modified
    // If req.body._id is provided, use that to match (edit case)
    let targetTestimonialIndex = testimonials.length - 1; // Default to the last one (new testimonial case)
    
    if (req.body._id) {
      // Find the index of the testimonial being edited
      const editIndex = testimonials.findIndex(t => 
        t._id && t._id.toString() === req.body._id.toString()
      );
      if (editIndex !== -1) {
        targetTestimonialIndex = editIndex;
        console.log(`Identified testimonial being edited at index ${editIndex} with ID ${req.body._id}`);
      }
    }
    
    // Handle image upload if file was provided
    if (req.file) {
      try {
        console.log(`Processing uploaded file: ${req.file.originalname} (${req.file.size} bytes)`);
        
        // Check if file exists on disk
        if (!fs.existsSync(req.file.path)) {
          console.error(`File not found at path: ${req.file.path}`);
          return res.status(500).json({
            success: false,
            message: 'File upload failed - file not found on disk'
          });
        }
        
        // Get the actual file size from disk to verify
        const stats = fs.statSync(req.file.path);
        console.log(`Verified file on disk: ${stats.size} bytes`);
        
        // Upload image to Cloudinary
        console.log(`Uploading image to Cloudinary from local path: ${req.file.path}`);
        const uploadResult = await cloudinaryUploadImage(req.file.path, 'testimonials');
        
        if (uploadResult && uploadResult.secure_url) {
          console.log(`✅ Image uploaded successfully to Cloudinary: ${uploadResult.secure_url}`);
          
          // Update the identified testimonial with the new image URL
          testimonials[targetTestimonialIndex].image = uploadResult.secure_url;
          console.log(`Updated testimonial at index ${targetTestimonialIndex} with new image`);
        } else {
          console.error(`❌ Failed to upload image for testimonial`);
        }
      } catch (uploadError) {
        console.error(`❌ Error uploading image:`, uploadError);
        console.error(uploadError.stack);
        
        // Continue processing even if image upload fails
        // We'll just keep the existing image or have none
      }
    } else if (req.body.existingImageUrl) {
      // If no new file but existing URL provided, keep it
      console.log(`Using existing image URL: ${req.body.existingImageUrl}`);
      testimonials[targetTestimonialIndex].image = req.body.existingImageUrl;
    } else {
      console.log('No image file to process');
    }
    
    // Preserve existing images for testimonials that don't have an image set
    testimonials.forEach((testimonial, index) => {
      if (!testimonial.image && index < existingTestimonials.length) {
        const existingImage = existingTestimonials[index]?.image;
        if (existingImage) {
          testimonial.image = existingImage;
          console.log(`Preserved existing image for testimonial at index ${index}`);
        }
      }
    });
    
    // Clean up temp IDs and ensure consistent data format
    const cleanedTestimonials = testimonials.map(testimonial => {
      const { _id, id, __v, ...cleanData } = testimonial;
      
      // Keep real MongoDB _id if present, remove temp IDs
      if (_id && !_id.toString().includes('temp_')) {
        return { _id, ...cleanData };
      }
      
      return cleanData;
    });
    
    // Update the database
    console.log(`Saving ${cleanedTestimonials.length} testimonials to database`);
    const updatedAbout = await About.findOneAndUpdate(
      {},
      { testimonials: cleanedTestimonials, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    console.log('✅ Testimonials updated successfully in database');
    return res.status(200).json({
      success: true,
      data: updatedAbout.testimonials
    });
    
  } catch (error) {
    console.error('❌ Error in updateTestimonials:', error);
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Server error updating testimonials',
      error: error.message || 'Unknown error occurred'
    });
  }
});

// @desc    Update community stats
// @route   PUT /api/about/community-stats
// @access  Private/Admin
const updateCommunityStats = asyncHandler(async (req, res) => {
  try {
    const { successStories, satisfactionRate, incomeIncrease } = req.body;
    
    // Initialize about content if it doesn't exist
    await initializeAboutContent();
    
    const updatedAbout = await About.findOneAndUpdate(
      {},
      {
        'communityStats.successStories': successStories || 850,
        'communityStats.satisfactionRate': satisfactionRate || 92,
        'communityStats.incomeIncrease': incomeIncrease || 45,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedAbout.communityStats
    });
  } catch (error) {
    console.error('Error updating community stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update community stats',
      error: error.message
    });
  }
});

// @desc    Manage partner categories
// @route   PUT /api/about/partners
// @access  Private/Admin
const updatePartners = asyncHandler(async (req, res) => {
  try {
    const { partnerCategories } = req.body;
    
    if (!partnerCategories || !Array.isArray(partnerCategories)) {
      return res.status(400).json({
        success: false,
        message: 'Partner categories data is required and should be an array'
      });
    }
    
    // Initialize about content if it doesn't exist
    await initializeAboutContent();
    
    const updatedAbout = await About.findOneAndUpdate(
      {},
      {
        partnerCategories,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedAbout.partnerCategories
    });
  } catch (error) {
    console.error('Error updating partner categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update partner categories',
      error: error.message
    });
  }
});

// @desc    Update partnership approach
// @route   PUT /api/about/partnership-approach
// @access  Private/Admin
const updatePartnershipApproach = asyncHandler(async (req, res) => {
  try {
    const { title, description, values } = req.body;
    
    if (!values || !Array.isArray(values)) {
      return res.status(400).json({
        success: false,
        message: 'Partnership values data is required and should be an array'
      });
    }
    
    // Initialize about content if it doesn't exist
    await initializeAboutContent();
    
    const updatedAbout = await About.findOneAndUpdate(
      {},
      {
        'partnershipApproach.title': title || 'Our Partnership Approach',
        'partnershipApproach.description': description || 'We believe in collaborative solutions that leverage the strengths of diverse organizations to create sustainable impact for farming communities.',
        'partnershipApproach.values': values,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedAbout.partnershipApproach
    });
  } catch (error) {
    console.error('Error updating partnership approach:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update partnership approach',
      error: error.message
    });
  }
});

module.exports = {
  getAboutContent,
  updateImpactMetrics,
  updateInfoBoxes,
  updateTestimonials,
  updateCommunityStats,
  updatePartners,
  updatePartnershipApproach
}; 