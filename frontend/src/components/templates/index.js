export { default as OnePagerTemplate } from './OnePagerTemplate';
export { default as BusinessCardTemplate } from './BusinessCardTemplate';
export { default as EmailSignatureTemplate } from './EmailSignatureTemplate';

// Template renderer selector
export const getTemplateComponent = (assetType) => {
  const templates = {
    onePager: 'OnePagerTemplate',
    businessCard: 'BusinessCardTemplate',
    emailSignature: 'EmailSignatureTemplate',
    linkedinBanner: 'LinkedinBannerTemplate',
    instagramBio: 'InstagramBioTemplate',
    websiteAbout: 'WebsiteAboutTemplate',
    mediaKit: 'MediaKitTemplate',
    speakerSheet: 'SpeakerSheetTemplate',
    welcomeEmail: 'WelcomeEmailTemplate',
    healthForm: 'HealthFormTemplate',
    waiverForm: 'WaiverFormTemplate',
    sessionGuide: 'SessionGuideTemplate',
    followUpEmail: 'FollowUpEmailTemplate',
    testimonialRequest: 'TestimonialRequestTemplate',
    corporatePitch: 'CorporatePitchTemplate',
    workshopProposal: 'WorkshopProposalTemplate',
    pricingSheet: 'PricingSheetTemplate',
    caseStudy: 'CaseStudyTemplate',
    roiCalculator: 'RoiCalculatorTemplate',
  };

  return templates[assetType] || null;
};

// Get available variations for each asset type
export const getAssetVariations = (assetType) => {
  const variations = {
    onePager: [
      { id: 'modern', name: 'Modern & Clean', theme: 'minimal' },
      { id: 'professional', name: 'Professional', theme: 'corporate' },
      { id: 'creative', name: 'Creative & Bold', theme: 'vibrant' },
    ],
    businessCard: [
      { id: 'classic', name: 'Classic', theme: 'elegant' },
      { id: 'modern', name: 'Modern', theme: 'minimal' },
      { id: 'bold', name: 'Bold', theme: 'vibrant' },
    ],
    emailSignature: [
      { id: 'simple', name: 'Simple', theme: 'minimal' },
      { id: 'detailed', name: 'Detailed', theme: 'corporate' },
    ],
    linkedinBanner: [
      { id: 'gradient', name: 'Gradient', theme: 'vibrant' },
      { id: 'photo', name: 'Photo Overlay', theme: 'elegant' },
      { id: 'minimal', name: 'Minimal', theme: 'minimal' },
    ],
    instagramBio: [
      { id: 'concise', name: 'Concise', theme: 'minimal' },
      { id: 'detailed', name: 'Detailed', theme: 'corporate' },
    ],
    websiteAbout: [
      { id: 'storytelling', name: 'Storytelling', theme: 'elegant' },
      { id: 'professional', name: 'Professional', theme: 'corporate' },
    ],
    // Add more asset types and their variations
  };

  return variations[assetType] || [
    { id: 'default', name: 'Default', theme: 'minimal' }
  ];
};
