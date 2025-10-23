const assetDefinitions = [
  // Personal Branding Assets (8)
  {
    assetType: 'onePager',
    category: 'for-you',
    title: 'Professional One-Pager',
    description: 'Comprehensive overview of your breathwork practice.',
    fileName: 'professional-one-pager.pdf'
  },
  {
    assetType: 'businessCard',
    category: 'for-you',
    title: 'Business Card',
    description: 'Polished business card layout for print or digital.',
    fileName: 'business-card.pdf'
  },
  {
    assetType: 'emailSignature',
    category: 'for-you',
    title: 'Email Signature',
    description: 'Branded email signature block.',
    fileName: 'email-signature.pdf'
  },
  {
    assetType: 'linkedinBanner',
    category: 'for-you',
    title: 'LinkedIn Banner',
    description: 'Social banner ready for LinkedIn profile upload.',
    fileName: 'linkedin-banner.pdf'
  },
  {
    assetType: 'instagramBio',
    category: 'for-you',
    title: 'Instagram Bio',
    description: 'Optimised Instagram profile copy.',
    fileName: 'instagram-bio.pdf'
  },
  {
    assetType: 'websiteAbout',
    category: 'for-you',
    title: 'Website About Page',
    description: 'Compelling about-page copy for your site.',
    fileName: 'website-about.pdf'
  },
  {
    assetType: 'mediaKit',
    category: 'for-you',
    title: 'Media Kit',
    description: 'Media kit with services, testimonials, and contact info.',
    fileName: 'media-kit.pdf'
  },
  {
    assetType: 'speakerSheet',
    category: 'for-you',
    title: 'Speaker Sheet',
    description: 'Speaker one-sheet with topics and credentials.',
    fileName: 'speaker-sheet.pdf'
  },

  // Client Experience Assets (6)
  {
    assetType: 'welcomeEmail',
    category: 'for-clients',
    title: 'Welcome Email',
    description: 'Warm welcome email template for new clients.',
    fileName: 'welcome-email.pdf'
  },
  {
    assetType: 'healthForm',
    category: 'for-clients',
    title: 'Health Intake Form',
    description: 'Health questionnaire for assessing client readiness.',
    fileName: 'health-intake-form.pdf'
  },
  {
    assetType: 'waiverForm',
    category: 'for-clients',
    title: 'Liability Waiver',
    description: 'Legal waiver covering breathwork sessions.',
    fileName: 'liability-waiver.pdf'
  },
  {
    assetType: 'sessionGuide',
    category: 'for-clients',
    title: 'Session Preparation Guide',
    description: 'Pre-session guidance for clients.',
    fileName: 'session-preparation-guide.pdf'
  },
  {
    assetType: 'followUpEmail',
    category: 'for-clients',
    title: 'Follow-Up Email',
    description: 'Post-session follow-up email template.',
    fileName: 'follow-up-email.pdf'
  },
  {
    assetType: 'testimonialRequest',
    category: 'for-clients',
    title: 'Testimonial Request',
    description: 'Email template for gathering testimonials.',
    fileName: 'testimonial-request.pdf'
  },

  // Corporate Partnership Assets (5)
  {
    assetType: 'corporatePitch',
    category: 'for-companies',
    title: 'Corporate Pitch Deck',
    description: 'Pitch deck outline for corporate wellness offerings.',
    fileName: 'corporate-pitch-deck.pdf'
  },
  {
    assetType: 'workshopProposal',
    category: 'for-companies',
    title: 'Workshop Proposal',
    description: 'Proposal template for corporate workshops.',
    fileName: 'workshop-proposal.pdf'
  },
  {
    assetType: 'pricingSheet',
    category: 'for-companies',
    title: 'Pricing Sheet',
    description: 'Pricing breakdown for packages and services.',
    fileName: 'pricing-sheet.pdf'
  },
  {
    assetType: 'caseStudy',
    category: 'for-companies',
    title: 'Case Study Template',
    description: 'Template for showcasing client success stories.',
    fileName: 'case-study-template.pdf'
  },
  {
    assetType: 'roiCalculator',
    category: 'for-companies',
    title: 'ROI Calculator',
    description: 'Breathwork ROI summary for decision makers.',
    fileName: 'roi-calculator.pdf'
  }
];

const assetDefinitionMap = assetDefinitions.reduce((acc, definition) => {
  acc[definition.assetType] = definition;
  return acc;
}, {});

const getAssetDefinition = (assetType) => assetDefinitionMap[assetType];

module.exports = {
  assetDefinitions,
  getAssetDefinition
};
