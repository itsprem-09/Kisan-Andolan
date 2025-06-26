import React, { createContext, useState, useContext, useEffect } from 'react';
import { translateText, batchTranslate } from '../utils/translateApi';

// Create context
const LanguageContext = createContext();

// Static translations for UI elements
const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    visionMission: 'Our Vision & Mission',
    informationCenter: 'Information Center',
    timeline: 'Timeline',
    
    // Actions
    becomeMember: 'Become a Member',
    learnMore: 'Learn More',
    readMore: 'Read More',
    viewAll: 'View All',
    joinNow: 'Join Now',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    
    // Homepage
    heroTitle: 'Supporting Farmers Across India',
    heroSubtitle: 'Join our movement for agricultural rights',
    ourVision: 'Our Vision',
    ourMission: 'Our Mission',
    recentMilestones: 'Recent Milestones',
    mediaCoverage: 'Media Coverage',
    meetOurTeam: 'Meet Our Team',
    
    // Footer
    contactUs: 'Contact Us',
    followUs: 'Follow Us',
    quickLinks: 'Quick Links',
    subscribe: 'Subscribe to Newsletter',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    copyright: 'All rights reserved',
    
    // About Page
    ourStory: 'Our Story',
    ourTeam: 'Our Team',
    coreValues: 'Core Values',
    ourImpact: 'Our Impact',
    founders: 'Founders',
    partnerships: 'Partnerships',
    aboutOurMovement: 'About Our Movement',
    empoweringRuralIndia: 'Empowering Rural India',
    grassrootsTransformation: 'Two decades of grassroots agricultural transformation',
    aboutPageDesc: 'Dedicated to empowering farmers, promoting sustainable agriculture, and building thriving rural communities across India since 2003.',
    joinOurMovement: 'Join Our Movement',
    joinMovementDesc: 'Be part of a growing community dedicated to transforming agriculture in India. Together, we can build a more sustainable and prosperous future for our farmers.',
    aboutBecomeAMember: 'Become a Member',
    aboutKisanLeadershipProgram: 'Kisan Leadership Program',
    communityFirst: 'Community First',
    communityFirstDesc: 'Placing farming communities at the center of all our initiatives and decisions.',
    sustainability: 'Sustainability',
    sustainabilityDesc: 'Promoting farming practices that protect the environment and ensure long-term prosperity.',
    socialJustice: 'Social Justice',
    socialJusticeDesc: 'Advocating for fair policies, equitable resource distribution, and the dignity of agricultural labor.',
    innovation: 'Innovation',
    innovationDesc: 'Embracing new technologies and methods that enhance agricultural productivity and resilience.',
    headquarters: 'Headquarters',
    regionalOffices: 'Regional Offices',
    aboutNorthIndia: 'North India',
    aboutSouthIndia: 'South India',
    aboutEastIndia: 'East India',
    aboutWestIndia: 'West India',
    connectWithUs: 'Connect With Us',
    
    // Vision & Mission Page
    visionMissionDesc: 'Discover our commitment to agricultural excellence, community empowerment, and sustainable farming practices that drive positive change across rural India.',
    ourVisionTitle: 'Our Vision',
    ourMissionTitle: 'Our Mission',
    ourPoliticalMission: 'Our Political Mission',
    joinMovementVision: 'Be part of the change you want to see in agriculture. Together, we can build a stronger farming community.',
    media: 'Media',
    programs: 'Programs',
    projects: 'Projects',
    youthLeadershipProgram: 'Youth Leadership Program',
    
    // Information Center
    informationCenterTitle: 'Information Center',
    informationCenterDesc: 'Access comprehensive agricultural resources, government schemes, and educational content to enhance your farming knowledge and productivity.',
    searchResources: 'Search Resources',
    searchPlaceholder: 'Search for schemes, guides, resources...',
    category: 'Category',
    allCategories: 'All Categories',
    subsidies: 'Subsidies',
    certification: 'Certification',
    insurance: 'Insurance',
    seasonal: 'Seasonal',
    sustainable: 'Sustainable',
    weather: 'Weather',
    pdfGuides: 'PDF Guides',
    videos: 'Videos',
    infographics: 'Infographics',
    policy: 'Policy',
    market: 'Market',
    events: 'Events',
    region: 'Region',
    allRegions: 'All Regions',
    national: 'National',
    infoNorthIndia: 'North India',
    infoSouthIndia: 'South India',
    infoEastIndia: 'East India',
    infoWestIndia: 'West India',
    centralIndia: 'Central India',
    sortBy: 'Sort By',
    relevance: 'Relevance',
    date: 'Date',
    engagement: 'Engagement',
    governmentSchemes: 'Government Schemes',
    agriculturalResources: 'Agricultural Resources',
    educationalMaterials: 'Educational Materials',
    newsAndUpdates: 'News & Updates',
    noContent: 'No content available',
    
    // Organizational Framework Translations
    organizationalFramework: 'Organizational Framework',
    organizationalStructure: 'Organizational Structure',
    governanceFramework: 'Governance Framework',
    organizationalChart: 'Organizational Chart',
    orgChartDescription: 'An overview of our organizational structure and reporting relationships',
    
    // Organizational Roles and Descriptions
    boardOfDirectors: 'Board of Directors',
    executiveCommittee: 'Executive Committee',
    advisoryCouncil: 'Advisory Council',
    regionalCoordinators: 'Regional Coordinators',
    programTeams: 'Program Teams',
    members: 'Members',
    
    // Role Descriptions
    boardDescription: 'Provides strategic direction and governance oversight',
    execCommitteeDescription: 'Manages daily operations and program implementation',
    advisoryDescription: 'Provides technical expertise and policy guidance',
    coordinatorsDescription: 'Coordinates initiatives and activities at the regional level',
    programTeamsDescription: 'Delivers field-based interventions and training programs',
    
    // Responsibilities
    policyApproval: 'Policy Approval',
    financialOversight: 'Financial Oversight',
    strategicPlanning: 'Strategic Planning',
    leadershipAppointment: 'Leadership Appointment',
    operationsManagement: 'Operations Management',
    programExecution: 'Program Execution',
    staffSupervision: 'Staff Supervision',
    budgetAdmin: 'Budget Administration',
    technicalAdvice: 'Technical Advice',
    researchGuidance: 'Research Guidance',
    policyRecommendations: 'Policy Recommendations',
    industryConnections: 'Industry Connections',
    regionalImplementation: 'Regional Implementation',
    localPartnerships: 'Local Partnerships',
    farmerEngagement: 'Farmer Engagement',
    feedbackCollection: 'Feedback Collection',
    trainingDelivery: 'Training Delivery',
    resourceDevelopment: 'Resource Development',
    impactAssessment: 'Impact Assessment',
    innovationTesting: 'Innovation Testing',
    
    // Governance Framework
    governancePrinciples: 'Governance Principles',
    governancePrinciplesDesc: 'Core principles that guide our governance philosophy',
    principleTransparency: 'Transparency and Openness',
    principleInclusion: 'Inclusion and Diversity',
    principleAccountability: 'Accountability and Oversight',
    principleIntegrity: 'Integrity and Ethical Conduct',
    principleSustainability: 'Sustainability and Long-term Thinking',
    
    governanceProcesses: 'Governance Processes',
    governanceProcessesDesc: 'Institutional processes that put our principles into action',
    processAnnualMeeting: 'Annual Member Convention',
    processQuarterlyBoard: 'Quarterly Board Meetings',
    processElection: 'Transparent Leadership Elections',
    processFinancialAudits: 'Annual Financial Audits',
    processGrievance: 'Grievance Redressal System',
    
    transparencyCommitment: 'Transparency Commitment',
    transparencyCommitmentDesc: 'We are committed to making our financial and administrative information transparent and accessible. Our annual reports, financial statements, and key governance documents are publicly available.',
    viewGovernanceDocuments: 'View Governance Documents',
    
    // Timeline Page
    timelineTitle: 'Andolan Timeline',
    timelineDesc: 'Explore the journey and evolution of our movement through key events, milestones, and achievements that have shaped the Kisan Andolan.',
    timelineView: 'Timeline View',
    decadeView: 'Decade View',
    filterByCategory: 'Filter by Category',
    filterByDecade: 'Filter by Decade',
    filterByAchievement: 'Filter by Achievement',
    allDecades: 'All Decades',
    allAchievements: 'All Achievements',
    keyMilestones: 'Key Milestones',
    andolanHistory: 'Andolan History',
    
    // Team and Leadership
    leadership: 'Leadership',
    
    // Partnerships
    currentPartners: 'Current Partners',
    becomePartner: 'Become a Partner',
    partnershipInquiry: 'Partnership Inquiry',
    contactPartnership: 'Contact for Partnership',
    becomeAMember: 'Become a Member',
    governmentPartners: 'Government Partners',
    ministryAgriculture: 'Ministry of Agriculture',
    stateAgriUniversities: 'State Agricultural Universities',
    indianCouncilAgriResearch: 'Indian Council of Agricultural Research',
    nationalBankAgri: 'National Bank of Agriculture',
    academicPartners: 'Academic Partners',
    punjabAgriUniversity: 'Punjab Agricultural University',
    indianAgriResearch: 'Indian Agricultural Research',
    nationalCenterAgriEcon: 'National Centre for Agricultural Economics',
    centerSustainable: 'Centre for Sustainable Agriculture',
    ngoPartners: 'NGO Partners',
    foundationEcological: 'Foundation for Ecological Agriculture',
    professionalAssistance: 'Professional Assistance',
    actionFoodProduction: 'Action for Food Production',
    watershedSupport: 'Watershed Support Services',
    corporatePartners: 'Corporate Partners',
    nationalAgriCoop: 'National Agricultural Cooperative Marketing Federation',
    indianFarmersCooperative: 'Indian Farmers Cooperative',
    agriTechSolutions: 'AgriTech Solutions Limited',
    ruralFinancial: 'Rural Financial Services',
    internationalOrgs: 'International Organizations',
    foodAgriOrg: 'Food and Agriculture Organization',
    internationalFund: 'International Fund',
    globalAlliance: 'Global Alliance',
    worldBank: 'World Bank Group',
    
    // Forms and Submissions
    thankYou: 'Thank You',
    formSubmitSuccess: 'Your message has been successfully submitted. We will contact you soon.',
    yourName: 'Your Name',
    email: 'Email',
    organization: 'Organization',
    message: 'Message',
    submitting: 'Submitting...',
    fillRequiredFields: 'Please fill in all required fields',
    formSubmitError: 'There was an error submitting your form. Please try again.',
    
    // Member Registration Modal Translations
    registerBecomeAMember: 'Become a Member',
    joinCommunity: 'Join our agricultural community and be part of the change',
    personalInformation: 'Personal Information',
    documentUpload: 'Document Upload',
    confirmation: 'Confirmation',
    fullName: 'Full Name',
    enterYourFullName: 'Enter your full name',
    village: 'Village',
    enterYourVillageName: 'Enter your village name',
    city: 'City',
    enterYourCityName: 'Enter your city name',
    mobileNumber: 'Mobile Number',
    enter10DigitMobileNumber: 'Enter 10-digit mobile number',
    problemDetails: 'Problem Details',
    describeYourProblem: 'Describe your problem',
    agreeToTerms: 'I agree to the Terms and Conditions and Privacy Policy of Rashtriya Kisan Manch',
    termsAndConditions: 'Terms and Conditions',
    continueToVerification: 'Continue to Verification',
    processing: 'Processing...',
    needHelp: 'Need help? Contact us at +917860411111',
    informationSecure: 'Your information is secure and protected',
    byContinuing: 'By continuing, you agree to our',
    dismiss: 'Dismiss',
    
    // Document Upload Page
    uploadYourDocument: 'Upload Your Document',
    uploadDocumentDesc: 'Please upload an identity document for verification of your membership',
    dragAndDrop: 'Drag and drop your file here or browse',
    browse: 'Browse',
    supportedFormats: 'Supported formats: JPG, PNG, PDF (max 5MB)',
    documentType: 'Document Type',
    selectDocumentType: 'Select document type',
    aadharCard: 'Aadhar Card',
    voterID: 'Voter ID',
    panCard: 'PAN Card',
    drivingLicense: 'Driving License',
    other: 'Other',
    uploadingDocument: 'Uploading document...',
    uploadSuccess: 'Document uploaded successfully!',
    uploadError: 'Upload failed. Please try again.',
    backToInformation: 'Back to Information',
    skipThisStep: 'Skip this step',
    continueToConfirmation: 'Continue to Confirmation',
    
    // Success Message
    registrationSuccessful: 'Registration Successful!',
    registrationSuccessMessage: 'Your membership application has been successfully submitted.',
    yourMembershipID: 'Your Membership ID',
    membershipStatusPending: 'Your membership status: Pending',
    verificationMessage: 'Our team will verify your documents and contact you within 24-48 hours.',
    whatHappensNext: 'What Happens Next?',
    receiveConfirmationEmail: 'You\'ll receive a confirmation email',
    teamWillVerify: 'Our team will verify your details',
    getMembershipCard: 'After verification, you\'ll get your digital membership card',
    joinCommunityActivities: 'You can join our community activities',
    returnToHome: 'Return to Home Page',
    
    // Youth Leadership Program Modal
    youthKisanLeadershipProgram: 'Kisan Leadership Program',
    joinNextGeneration: 'Join our next generation of agricultural leaders',
    kisanLeadershipProgram: 'Kisan Leadership Program',
    
    // Additional fields for Youth Leadership Program
    age: 'Age',
    enterYourAge: 'Enter your age',
    education: 'Education',
    selectYourEducation: 'Select your education',
    belowHighSchool: 'Below High School',
    highSchool: 'High School',
    graduate: 'Graduate',
    postGraduate: 'Post Graduate',
    farmingExperience: 'Farming Experience',
    selectYourExperience: 'Select your experience',
    lessThanOneYear: 'Less than 1 year',
    oneToThreeYears: '1-3 years',
    threeToFiveYears: '3-5 years',
    moreThanFiveYears: 'More than 5 years',
    aboutYourself: 'About Yourself',
    tellUsAboutYourself: 'Tell us about yourself and why you want to join this program',
    farmingDetails: 'Farming Details',
    primaryCrops: 'Primary Crops',
    enterCrops: 'Enter the crops you grow',
    farmSize: 'Farm Size (in acres)',
    enterFarmSize: 'Enter your farm size',
    
    // Youth Leadership Success Message
    applicationSuccessful: 'Application Successful!',
    leadershipApplicationMessage: 'Your Kisan Youth Leadership Program application has been successfully submitted.',
    applicationID: 'Your Application ID',
    applicationStatusPending: 'Your application status: Pending',
    leadershipVerificationMessage: 'Our selection committee will review your application and contact you within 7-10 business days.',
    leadershipWhatHappensNext: 'What Happens Next?',
    applicationReview: 'Your application will be reviewed',
    possibleInterview: 'Selected candidates will be called for an interview',
    receiveTrainingDetails: 'After selection, you will receive training program details',
    startYourJourney: 'Start your leadership journey',
    
    // Vision, Mission, and Political Mission Content
    visionContent: [
      'To build a just, inclusive, and farmer-centric democracy.',
      'To ensure that farmers are not just voters, but respected policymakers and economically empowered citizens.',
      'To create a nation where every farmer enjoys dignity, income security, and access to quality education and healthcare.',
      'To realign the democratic discourse around agrarian issues, social justice, and constitutional rights.',
      'To establish a society where the backbone of the nation—the farmer—is recognized as a central force in India\'s development.',
    ],
    
    missionContent: [
      'Advocate for constitutional guarantees such as:',
      'Legal enforcement of Minimum Support Price (MSP).',
      'Formation of a National Farmers\' Commission with direct farmer representation.',
      'Protection of land rights and resistance to unjust acquisition.',
      'Promote equitable access to:',
      'Quality education free from privatization and inequality.',
      'Universal healthcare that is accessible to rural and underprivileged communities.',
      'Challenge political narratives based on religion or caste and redirect focus to:',
      'Income, public services, and social welfare.',
      'Transparency and accountability in government spending.',
      'Engage in:',
      'Policy research and solution-oriented activism.',
      'Grassroots mobilization and public awareness campaigns.',
      'Constructive dialogue with political parties, civil society, and media.',
      'Uphold the constitutional values of equality, liberty, and fraternity in all actions and campaigns.',
    ],
    
    politicalMissionContent: [
      'To reclaim political space for farmers and rural citizens by bringing agrarian issues to the forefront of national and state-level political discourse.',
      'To challenge the dominance of communal, caste-based, and corporate-driven politics by promoting a value-based, development-oriented political alternative rooted in income, education, healthcare, and rural dignity.',
      'To build a strong, farmer-led political platform that not only demands policy reforms but actively participates in elections at local, state, and national levels to influence governance from within.',
      'To train and empower grassroots leadership from farming and rural communities, ensuring their representation in decision-making bodies and elected offices.',
      'To expose misuse of public funds on political luxuries and demand accountability in governance, redirecting state resources toward public welfare schemes.',
      'To engage in issue-based political alliances that uphold the principles of social justice, economic equality, and constitutional democracy, without being tied to any one party or ideology.',
      'To foster a new political consciousness among citizens that prioritizes public interest over populism, and evaluates leaders on their commitment to farmer welfare, rural development, and transparent governance.',
    ],
  },
  hi: {
    // Navigation
    home: 'होम',
    about: 'हमारे बारे में',
    visionMission: 'हमारा विज़न और मिशन',
    informationCenter: 'जानकारी केंद्र',
    timeline: 'टाइमलाइन',
    
    // Actions
    becomeMember: 'सदस्य बनें',
    learnMore: 'और जानें',
    readMore: 'और पढ़ें',
    viewAll: 'सभी देखें',
    joinNow: 'अभी शामिल हों',
    submit: 'सबमिट करें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    
    // Homepage
    heroTitle: 'पूरे भारत में किसानों का समर्थन',
    heroSubtitle: 'कृषि अधिकारों के लिए हमारे आंदोलन से जुड़ें',
    ourVision: 'हमारा विज़न',
    ourMission: 'हमारा मिशन',
    recentMilestones: 'हालिया उपलब्धियां',
    mediaCoverage: 'मीडिया कवरेज',
    meetOurTeam: 'हमारी टीम से मिलें',
    
    // Footer
    contactUs: 'संपर्क करें',
    followUs: 'हमें फॉलो करें',
    quickLinks: 'त्वरित लिंक',
    subscribe: 'न्यूज़लेटर के लिए सब्सक्राइब करें',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    cookiePolicy: 'कुकी नीति',
    copyright: 'सर्वाधिकार सुरक्षित',
    
    // About Page
    ourStory: 'हमारी कहानी',
    ourTeam: 'हमारी टीम',
    coreValues: 'मुख्य मूल्य',
    ourImpact: 'हमारा प्रभाव',
    founders: 'संस्थापक',
    partnerships: 'साझेदारी',
    aboutOurMovement: 'हमारे आंदोलन के बारे में',
    empoweringRuralIndia: 'ग्रामीण भारत का सशक्तिकरण',
    grassrootsTransformation: 'जमीनी स्तर पर कृषि परिवर्तन के दो दशक',
    aboutPageDesc: '2003 से किसानों को सशक्त बनाने, टिकाऊ कृषि को बढ़ावा देने और पूरे भारत में समृद्ध ग्रामीण समुदायों के निर्माण के लिए समर्पित।',
    joinOurMovement: 'हमारे आंदोलन से जुड़ें',
    joinMovementDesc: 'भारत में कृषि को बदलने के लिए समर्पित एक बढ़ते समुदाय का हिस्सा बनें। साथ मिलकर, हम अपने किसानों के लिए एक अधिक टिकाऊ और समृद्ध भविष्य का निर्माण कर सकते हैं।',
    aboutBecomeAMember: 'सदस्य बनें',
    aboutKisanLeadershipProgram: 'किसान लीडरशिप प्रोग्राम',
    communityFirst: 'समुदाय पहले',
    communityFirstDesc: 'हमारे सभी पहलों और निर्णयों के केंद्र में कृषि समुदायों को रखना।',
    sustainability: 'स्थायित्व',
    sustainabilityDesc: 'पर्यावरण की रक्षा करने और दीर्घकालिक समृद्धि सुनिश्चित करने वाली कृषि पद्धतियों को बढ़ावा देना।',
    socialJustice: 'सामाजिक न्याय',
    socialJusticeDesc: 'निष्पक्ष नीतियों, संसाधनों के समान वितरण और कृषि श्रम की गरिमा की वकालत करना।',
    innovation: 'नवाचार',
    innovationDesc: 'कृषि उत्पादकता और लचीलेपन को बढ़ाने वाली नई तकनीकों और तरीकों को अपनाना।',
    headquarters: 'मुख्यालय',
    regionalOffices: 'क्षेत्रीय कार्यालय',
    connectWithUs: 'हमसे जुड़ें',
    
    // Vision & Mission Page
    visionMissionDesc: 'कृषि उत्कृष्टता, सामुदायिक सशक्तिकरण और स्थायी कृषि प्रथाओं के प्रति हमारी प्रतिबद्धता को जानें जो ग्रामीण भारत में सकारात्मक परिवर्तन लाते हैं।',
    ourVisionTitle: 'हमारा विज़न',
    ourMissionTitle: 'हमारा मिशन',
    ourPoliticalMission: 'हमारा राजनीतिक मिशन',
    joinMovementVision: 'कृषि में आप जिस परिवर्तन को देखना चाहते हैं, उसका हिस्सा बनें। साथ मिलकर, हम एक मजबूत कृषि समुदाय का निर्माण कर सकते हैं।',
    
    // Vision, Mission, and Political Mission Content
    visionContent: [
      'एक न्यायपूर्ण, समावेशी और किसान-केंद्रित लोकतंत्र का निर्माण करना।',
      'यह सुनिश्चित करना कि किसान केवल मतदाता नहीं, बल्कि सम्मानित नीति निर्माता और आर्थिक रूप से सशक्त नागरिक हैं।',
      'एक ऐसा राष्ट्र बनाना जहां हर किसान को सम्मान, आय सुरक्षा, और गुणवत्तापूर्ण शिक्षा और स्वास्थ्य सेवाओं तक पहुंच प्राप्त हो।',
      'लोकतांत्रिक संवाद को कृषि मुद्दों, सामाजिक न्याय और संवैधानिक अधिकारों के इर्द-गिर्द पुनर्गठित करना।',
      'एक ऐसा समाज स्थापित करना जहां राष्ट्र की रीढ़—किसान—को भारत के विकास में एक केंद्रीय शक्ति के रूप में मान्यता प्राप्त हो।',
    ],
    
    missionContent: [
      'इन संवैधानिक गारंटियों के लिए वकालत करना:',
      'न्यूनतम समर्थन मूल्य (MSP) का कानूनी प्रवर्तन।',
      'प्रत्यक्ष किसान प्रतिनिधित्व के साथ राष्ट्रीय किसान आयोग का गठन।',
      'भूमि अधिकारों की सुरक्षा और अन्यायपूर्ण अधिग्रहण का विरोध।',
      'इन तक समान पहुंच को बढ़ावा देना:',
      'निजीकरण और असमानता से मुक्त गुणवत्तापूर्ण शिक्षा।',
      'सार्वभौमिक स्वास्थ्य सेवा जो ग्रामीण और वंचित समुदायों के लिए सुलभ हो।',
      'धर्म या जाति पर आधारित राजनीतिक बयानबाज़ी को चुनौती देना और इन पर ध्यान केंद्रित करना:',
      'आय, सार्वजनिक सेवाएं और सामाजिक कल्याण।',
      'सरकारी खर्च में पारदर्शिता और जवाबदेही।',
      'इनमें संलग्न होना:',
      'नीति अनुसंधान और समाधान-उन्मुख सक्रियता।',
      'जमीनी स्तर की गतिशीलता और जन जागरूकता अभियान।',
      'राजनीतिक दलों, नागरिक समाज और मीडिया के साथ रचनात्मक संवाद।',
      'सभी कार्यों और अभियानों में समानता, स्वतंत्रता और बंधुत्व के संवैधानिक मूल्यों को बनाए रखना।',
    ],
    
    politicalMissionContent: [
      'कृषि मुद्दों को राष्ट्रीय और राज्य स्तर के राजनीतिक संवाद के अग्रभाग में लाकर किसानों और ग्रामीण नागरिकों के लिए राजनीतिक स्थान का पुन: दावा करना।',
      'सांप्रदायिक, जाति-आधारित और कॉर्पोरेट-संचालित राजनीति के प्रभुत्व को चुनौती देना, आय, शिक्षा, स्वास्थ्य सेवा और ग्रामीण गरिमा में निहित एक मूल्य-आधारित, विकास-उन्मुख राजनीतिक विकल्प को बढ़ावा देना।',
      'एक मजबूत, किसान-नेतृत्व वाला राजनीतिक मंच बनाना जो न केवल नीति सुधारों की मांग करता है, बल्कि भीतर से शासन को प्रभावित करने के लिए स्थानीय, राज्य और राष्ट्रीय स्तर पर चुनावों में सक्रिय रूप से भाग लेता है।',
      'कृषि और ग्रामीण समुदायों से जमीनी स्तर के नेतृत्व को प्रशिक्षित और सशक्त बनाना, निर्णय लेने वाले निकायों और निर्वाचित कार्यालयों में उनके प्रतिनिधित्व को सुनिश्चित करना।',
      'राजनीतिक विलासिता पर सार्वजनिक धन के दुरुपयोग को उजागर करना और शासन में जवाबदेही की मांग करना, राज्य के संसाधनों को सार्वजनिक कल्याण योजनाओं की ओर पुनर्निर्देशित करना।',
      'सामाजिक न्याय, आर्थिक समानता और संवैधानिक लोकतंत्र के सिद्धांतों को बनाए रखने वाले मुद्दा-आधारित राजनीतिक गठबंधनों में शामिल होना, बिना किसी एक पार्टी या विचारधारा से जुड़े।',
      'नागरिकों के बीच एक नई राजनीतिक चेतना को बढ़ावा देना जो लोकलुभावन से ऊपर सार्वजनिक हित को प्राथमिकता देती है, और नेताओं का मूल्यांकन किसान कल्याण, ग्रामीण विकास और पारदर्शी शासन के प्रति उनकी प्रतिबद्धता के आधार पर करती है।',
    ],
    
    media: 'मीडिया',
    programs: 'कार्यक्रम',
    projects: 'परियोजनाएं',
    youthLeadershipProgram: 'युवा नेतृत्व कार्यक्रम',
    
    // Information Center
    informationCenterTitle: 'जानकारी केंद्र',
    informationCenterDesc: 'अपने कृषि ज्ञान और उत्पादकता को बढ़ाने के लिए व्यापक कृषि संसाधनों, सरकारी योजनाओं और शैक्षिक सामग्री तक पहुंचें।',
    searchResources: 'संसाधन खोजें',
    searchPlaceholder: 'योजनाओं, गाइड, संसाधनों के लिए खोज करें...',
    category: 'श्रेणी',
    allCategories: 'सभी श्रेणियां',
    subsidies: 'सब्सिडी',
    certification: 'प्रमाणन',
    insurance: 'बीमा',
    seasonal: 'मौसमी',
    sustainable: 'स्थायी',
    weather: 'मौसम',
    pdfGuides: 'पीडीएफ गाइड',
    videos: 'वीडियो',
    infographics: 'इन्फोग्राफिक्स',
    policy: 'नीति',
    market: 'बाजार',
    events: 'कार्यक्रम',
    region: 'क्षेत्र',
    allRegions: 'सभी क्षेत्र',
    national: 'राष्ट्रीय',
    infoNorthIndia: 'उत्तर भारत',
    infoSouthIndia: 'दक्षिण भारत',
    infoEastIndia: 'पूर्वी भारत',
    infoWestIndia: 'पश्चिमी भारत',
    centralIndia: 'मध्य भारत',
    sortBy: 'इसके अनुसार क्रमबद्ध करें',
    relevance: 'प्रासंगिकता',
    date: 'तिथि',
    engagement: 'जुड़ाव',
    governmentSchemes: 'सरकारी योजनाएं',
    agriculturalResources: 'कृषि संसाधन',
    educationalMaterials: 'शैक्षिक सामग्री',
    newsAndUpdates: 'समाचार और अपडेट',
    noContent: 'कोई सामग्री उपलब्ध नहीं है',
    
    // Organizational Framework Translations
    organizationalFramework: 'संगठनात्मक ढांचा',
    organizationalStructure: 'संगठनात्मक संरचना',
    governanceFramework: 'शासन ढांचा',
    organizationalChart: 'संगठनात्मक चार्ट',
    orgChartDescription: 'हमारी संगठनात्मक संरचना और रिपोर्टिंग संबंधों का अवलोकन',
    
    // Organizational Roles and Descriptions
    boardOfDirectors: 'निदेशक मंडल',
    executiveCommittee: 'कार्यकारी समिति',
    advisoryCouncil: 'सलाहकार परिषद',
    regionalCoordinators: 'क्षेत्रीय समन्वयक',
    programTeams: 'कार्यक्रम टीम',
    members: 'सदस्य',
    
    // Role Descriptions
    boardDescription: 'रणनीतिक निर्देशन और शासन निरीक्षण प्रदान करता है',
    execCommitteeDescription: 'दैनिक संचालन और कार्यक्रम कार्यान्वयन का प्रबंधन करता है',
    advisoryDescription: 'तकनीकी विशेषज्ञता और नीति मार्गदर्शन प्रदान करता है',
    coordinatorsDescription: 'क्षेत्रीय स्तर पर पहल और गतिविधियों का समन्वय करता है',
    programTeamsDescription: 'क्षेत्र-आधारित हस्तक्षेप और प्रशिक्षण कार्यक्रम प्रदान करता है',
    
    // Responsibilities
    policyApproval: 'नीति अनुमोदन',
    financialOversight: 'वित्तीय निरीक्षण',
    strategicPlanning: 'रणनीतिक योजना',
    leadershipAppointment: 'नेतृत्व नियुक्ति',
    operationsManagement: 'संचालन प्रबंधन',
    programExecution: 'कार्यक्रम निष्पादन',
    staffSupervision: 'कर्मचारी पर्यवेक्षण',
    budgetAdmin: 'बजट प्रशासन',
    technicalAdvice: 'तकनीकी सलाह',
    researchGuidance: 'अनुसंधान मार्गदर्शन',
    policyRecommendations: 'नीति सिफारिशें',
    industryConnections: 'उद्योग संबंध',
    regionalImplementation: 'क्षेत्रीय कार्यान्वयन',
    localPartnerships: 'स्थानीय साझेदारी',
    farmerEngagement: 'किसान जुड़ाव',
    feedbackCollection: 'प्रतिक्रिया संग्रह',
    trainingDelivery: 'प्रशिक्षण वितरण',
    resourceDevelopment: 'संसाधन विकास',
    impactAssessment: 'प्रभाव मूल्यांकन',
    innovationTesting: 'नवाचार परीक्षण',
    
    // Governance Framework
    governancePrinciples: 'शासन सिद्धांत',
    governancePrinciplesDesc: 'हमारे शासन दर्शन का मार्गदर्शन करने वाले मूल सिद्धांत',
    principleTransparency: 'पारदर्शिता और खुलापन',
    principleInclusion: 'समावेश और विविधता',
    principleAccountability: 'जवाबदेही और निगरानी',
    principleIntegrity: 'ईमानदारी और नैतिक व्यवहार',
    principleSustainability: 'स्थायित्व और दीर्घकालिक सोच',
    
    governanceProcesses: 'शासन प्रक्रियाएं',
    governanceProcessesDesc: 'हमारे सिद्धांतों को क्रिया में लाने वाली संस्थागत प्रक्रियाएं',
    processAnnualMeeting: 'वार्षिक सदस्य सम्मेलन',
    processQuarterlyBoard: 'त्रैमासिक बोर्ड बैठकें',
    processElection: 'पारदर्शी नेतृत्व चुनाव',
    processFinancialAudits: 'वार्षिक वित्तीय ऑडिट',
    processGrievance: 'शिकायत निवारण प्रणाली',
    
    transparencyCommitment: 'Transparency Commitment',
    transparencyCommitmentDesc: 'We are committed to making our financial and administrative information transparent and accessible. Our annual reports, financial statements, and key governance documents are publicly available.',
    viewGovernanceDocuments: 'View Governance Documents',
    
    // Timeline Page
    timelineTitle: 'Andolan Timeline',
    timelineDesc: 'Explore the journey and evolution of our movement through key events, milestones, and achievements that have shaped the Kisan Andolan.',
    timelineView: 'Timeline View',
    decadeView: 'Decade View',
    filterByCategory: 'Filter by Category',
    filterByDecade: 'Filter by Decade',
    filterByAchievement: 'Filter by Achievement',
    allDecades: 'All Decades',
    allAchievements: 'All Achievements',
    keyMilestones: 'प्रमुख मील के पत्थर',
    andolanHistory: 'आंदोलन का इतिहास',
    
    // Team and Leadership
    leadership: 'नेतृत्व',
    
    // Partnerships
    currentPartners: 'वर्तमान साझेदार',
    becomePartner: 'साझेदार बनें',
    partnershipInquiry: 'साझेदारी पूछताछ',
    contactPartnership: 'साझेदारी के लिए संपर्क करें',
    becomeAMember: 'सदस्य बनें',
    governmentPartners: 'सरकारी साझेदार',
    ministryAgriculture: 'कृषि मंत्रालय',
    stateAgriUniversities: 'राज्य कृषि विश्वविद्यालय',
    indianCouncilAgriResearch: 'भारतीय कृषि अनुसंधान परिषद',
    nationalBankAgri: 'कृषि के लिए राष्ट्रीय बैंक',
    academicPartners: 'शैक्षिक साझेदार',
    punjabAgriUniversity: 'पंजाब कृषि विश्वविद्यालय',
    indianAgriResearch: 'भारतीय कृषि अनुसंधान संस्थान',
    nationalCenterAgriEcon: 'कृषि अर्थशास्त्र के लिए राष्ट्रीय केंद्र',
    centerSustainable: 'टिकाऊ कृषि केंद्र',
    ngoPartners: 'गैर सरकारी संगठन साझेदार',
    foundationEcological: 'पारिस्थितिक सुरक्षा के लिए फाउंडेशन',
    professionalAssistance: 'विकास कार्य के लिए पेशेवर सहायता',
    actionFoodProduction: 'खाद्य उत्पादन के लिए कार्य',
    watershedSupport: 'जलसंभर समर्थन सेवाएं',
    corporatePartners: 'कॉर्पोरेट साझेदार',
    nationalAgriCoop: 'राष्ट्रीय कृषि सहकारी विपणन संघ',
    indianFarmersCooperative: 'भारतीय किसान उर्वरक सहकारी',
    agriTechSolutions: 'एग्रीटेक सॉल्यूशंस लिमिटेड',
    ruralFinancial: 'ग्रामीण वित्तीय संस्थान',
    internationalOrgs: 'अंतर्राष्ट्रीय संगठन',
    foodAgriOrg: 'खाद्य एवं कृषि संगठन',
    internationalFund: 'कृषि विकास के लिए अंतर्राष्ट्रीय कोष',
    globalAlliance: 'बेहतर पोषण के लिए वैश्विक गठबंधन',
    worldBank: 'विश्व बैंक समूह',
    
    // Forms and Submissions
    thankYou: 'धन्यवाद',
    formSubmitSuccess: 'आपका संदेश सफलतापूर्वक सबमिट कर दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।',
    yourName: 'आपका नाम',
    email: 'ईमेल',
    organization: 'संगठन',
    message: 'संदेश',
    submitting: 'सबमिट हो रहा है...',
    fillRequiredFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    formSubmitError: 'आपका फॉर्म जमा करने में एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
    
    // Member Registration Modal Translations
    registerBecomeAMember: 'सदस्य बनें',
    joinCommunity: 'हमारे कृषि समुदाय से जुड़ें और परिवर्तन का हिस्सा बनें',
    personalInformation: 'व्यक्तिगत जानकारी',
    documentUpload: 'दस्तावेज़ अपलोड',
    confirmation: 'पुष्टिकरण',
    fullName: 'पूरा नाम',
    enterYourFullName: 'अपना पूरा नाम दर्ज करें',
    village: 'गाँव',
    enterYourVillageName: 'अपने गाँव का नाम दर्ज करें',
    city: 'शहर',
    enterYourCityName: 'अपने शहर का नाम दर्ज करें',
    mobileNumber: 'मोबाइल नंबर',
    enter10DigitMobileNumber: '10 अंकों का मोबाइल नंबर दर्ज करें',
    problemDetails: 'समस्या विवरण',
    describeYourProblem: 'अपनी समस्या का वर्णन करें',
    agreeToTerms: 'मैं राष्ट्रीय किसान मंच के नियम और शर्तों तथा गोपनीयता नीति से सहमत हूँ',
    termsAndConditions: 'नियम और शर्तें',
    continueToVerification: 'सत्यापन के लिए जारी रखें',
    processing: 'प्रक्रिया जारी है...',
    needHelp: 'मदद चाहिए? हमसे संपर्क करें',
    informationSecure: 'आपकी जानकारी सुरक्षित और संरक्षित है',
    byContinuing: 'जारी रखकर, आप हमारे नियम और शर्तों और गोपनीयता नीति से सहमत होते हैं',
    dismiss: 'हटाएं',
    
    // Document Upload Page
    uploadYourDocument: 'अपना दस्तावेज़ अपलोड करें',
    uploadDocumentDesc: 'अपनी सदस्यता के सत्यापन के लिए कृपया अपना पहचान दस्तावेज़ अपलोड करें',
    dragAndDrop: 'अपनी फ़ाइल को यहां खींचें और छोड़ें या ब्राउज़ करें',
    browse: 'ब्राउज़ करें',
    supportedFormats: 'समर्थित प्रारूप: JPG, PNG, PDF (अधिकतम 5MB)',
    documentType: 'दस्तावेज़ का प्रकार',
    selectDocumentType: 'दस्तावेज़ का प्रकार चुनें',
    aadharCard: 'आधार कार्ड',
    voterID: 'वोटर आईडी',
    panCard: 'पैन कार्ड',
    drivingLicense: 'ड्राइविंग लाइसेंस',
    other: 'अन्य',
    uploadingDocument: 'दस्तावेज़ अपलोड हो रहा है...',
    uploadSuccess: 'दस्तावेज़ सफलतापूर्वक अपलोड किया गया!',
    uploadError: 'अपलोड विफल। कृपया पुनः प्रयास करें।',
    backToInformation: 'जानकारी पर वापस जाएं',
    skipThisStep: 'इस कदम को छोड़ें',
    continueToConfirmation: 'पुष्टिकरण के लिए जारी रखें',
    
    // Success Message
    registrationSuccessful: 'पंजीकरण सफल!',
    registrationSuccessMessage: 'आपका सदस्यता आवेदन सफलतापूर्वक जमा कर दिया गया है।',
    yourMembershipID: 'आपका सदस्यता आईडी',
    membershipStatusPending: 'आपकी सदस्यता की स्थिति: लंबित',
    verificationMessage: 'हमारी टीम आपके दस्तावेज़ों को सत्यापित करेगी और 24-48 घंटों के भीतर आपसे संपर्क करेगी।',
    whatHappensNext: 'अब क्या होगा?',
    receiveConfirmationEmail: 'आप एक पुष्टिकरण ईमेल प्राप्त करेंगे',
    teamWillVerify: 'हमारी टीम आपके विवरण का सत्यापन करेगी',
    getMembershipCard: 'सत्यापन के बाद, आप अपना डिजिटल सदस्यता कार्ड प्राप्त करेंगे',
    joinCommunityActivities: 'आप हमारी सामुदायिक गतिविधियों में शामिल हो सकते हैं',
    returnToHome: 'होम पेज पर वापस जाएं',
    
    // Youth Leadership Program Modal
    youthKisanLeadershipProgram: 'किसान लीडरशिप प्रोग्राम',
    joinNextGeneration: 'कृषि नेताओं की अगली पीढ़ी से जुड़ें',
    kisanLeadershipProgram: 'किसान नेतृत्व कार्यक्रम',
    
    // Additional fields for Youth Leadership Program
    age: 'आयु',
    enterYourAge: 'अपनी आयु दर्ज करें',
    education: 'शिक्षा',
    selectYourEducation: 'अपनी शिक्षा का चयन करें',
    belowHighSchool: 'हाई स्कूल से कम',
    highSchool: 'हाई स्कूल',
    graduate: 'स्नातक',
    postGraduate: 'परास्नातक',
    farmingExperience: 'कृषि अनुभव',
    selectYourExperience: 'अपने अनुभव का चयन करें',
    lessThanOneYear: '1 वर्ष से कम',
    oneToThreeYears: '1-3 वर्ष',
    threeToFiveYears: '3-5 वर्ष',
    moreThanFiveYears: '5 वर्ष से अधिक',
    aboutYourself: 'अपने बारे में',
    tellUsAboutYourself: 'अपने बारे में हमें बताएं और आप इस कार्यक्रम में क्यों शामिल होना चाहते हैं',
    farmingDetails: 'कृषि विवरण',
    primaryCrops: 'प्राथमिक फसलें',
    enterCrops: 'आप जो फसलें उगाते हैं उन्हें दर्ज करें',
    farmSize: 'खेत का आकार (एकड़ में)',
    enterFarmSize: 'अपने खेत का आकार दर्ज करें',
    
    // Youth Leadership Success Message
    applicationSuccessful: 'आवेदन सफल!',
    leadershipApplicationMessage: 'आपका किसान युवा नेतृत्व कार्यक्रम आवेदन सफलतापूर्वक जमा कर दिया गया है।',
    applicationID: 'आपका आवेदन आईडी',
    applicationStatusPending: 'आपके आवेदन की स्थिति: लंबित',
    leadershipVerificationMessage: 'हमारी चयन समिति आपके आवेदन की समीक्षा करेगी और 7-10 कार्य दिवसों के भीतर आपसे संपर्क करेगी।',
    leadershipWhatHappensNext: 'अब क्या होगा?',
    applicationReview: 'आपके आवेदन की समीक्षा की जाएगी',
    possibleInterview: 'चयनित उम्मीदवारों को साक्षात्कार के लिए बुलाया जाएगा',
    receiveTrainingDetails: 'चयन के बाद, आप प्रशिक्षण कार्यक्रम का विवरण प्राप्त करेंगे',
    startYourJourney: 'अपनी नेतृत्व यात्रा शुरू करें',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    setLanguage(savedLang);
    
    // If saved language is not English, translate dynamic content
    if (savedLang !== 'en') {
      translateDynamicContent(savedLang);
    }
  }, []);

  // Function to toggle between languages
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('selectedLang', newLang);
    
    // Translate dynamic content using Google Translate API
    translateDynamicContent(newLang);
  };
  
  // Function to translate dynamic content using Google Translate API
  const translateDynamicContent = async (targetLang) => {
    if (targetLang === 'en') {
      // Reset to English (original content)
      const elements = document.querySelectorAll('[data-translated="true"]');
      elements.forEach(el => {
        if (el.dataset.originalText) {
          el.textContent = el.dataset.originalText;
          delete el.dataset.originalText;
        }
        delete el.dataset.translated;
      });
      return;
    }
    
    // Only translate elements with the data-translate attribute
    const elements = document.querySelectorAll('[data-translate="true"]');
    if (elements.length === 0) return;
    
    // Collect all texts for batch translation to minimize API calls
    const textsToTranslate = [];
    const elementsMap = [];
    
    elements.forEach(el => {
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent;
      }
      
      // Skip empty elements
      if (el.dataset.originalText.trim() === '') return;
      
      textsToTranslate.push(el.dataset.originalText);
      elementsMap.push(el);
    });
    
    try {
      // Batch translate all texts at once
      const translatedTexts = await batchTranslate(textsToTranslate, targetLang);
      
      // Apply translations
      for (let i = 0; i < elementsMap.length; i++) {
        elementsMap[i].textContent = translatedTexts[i];
        elementsMap[i].dataset.translated = "true";
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };
  
  // Get translation for a specific key
  const getTranslation = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      toggleLanguage, 
      getTranslation,
      translateDynamicContent
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext; 