import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, PartyPopper } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { useAuthStore } from '../store/authStore';
import { useAssetStore } from '../store/assetStore';
import { toast } from '../components/common/Toast';

// Import wizard steps
import Step1Visuals from '../components/wizard/Step1Visuals';
import Step2Details from '../components/wizard/Step2Details';
import Step3Positioning from '../components/wizard/Step3Positioning';
import Step4Services from '../components/wizard/Step4Services';
import Step5Review from '../components/wizard/Step5Review';

const STEPS = [
  { number: 1, title: 'Visuals', description: 'Logo, photo & colors' },
  { number: 2, title: 'Details', description: 'Contact information' },
  { number: 3, title: 'Positioning', description: 'Target & uniqueness' },
  { number: 4, title: 'Services', description: 'Offerings & pricing' },
  { number: 5, title: 'Review', description: 'Finalize & generate' },
];

// Helper function to create local mock assets for preview mode
const createLocalAssets = () => {
  const assetTemplates = [
    // Personal Branding Assets (8)
    { assetType: 'onePager', title: 'Professional One-Pager', description: 'Comprehensive one-page overview of your breathwork practice', fileName: 'professional-one-pager.pdf', category: 'for-you' },
    { assetType: 'businessCard', title: 'Business Card', description: 'Professional business card design', fileName: 'business-card.pdf', category: 'for-you' },
    { assetType: 'emailSignature', title: 'Email Signature', description: 'Professional email signature', fileName: 'email-signature.html', category: 'for-you' },
    { assetType: 'linkedinBanner', title: 'LinkedIn Banner', description: 'Eye-catching LinkedIn profile banner', fileName: 'linkedin-banner.png', category: 'for-you' },
    { assetType: 'instagramBio', title: 'Instagram Bio', description: 'Optimized Instagram bio', fileName: 'instagram-bio.txt', category: 'for-you' },
    { assetType: 'websiteAbout', title: 'Website About Page', description: 'Compelling about page content', fileName: 'website-about.txt', category: 'for-you' },
    { assetType: 'mediaKit', title: 'Media Kit', description: 'Professional media kit for press and partnerships', fileName: 'media-kit.pdf', category: 'for-you' },
    { assetType: 'speakerSheet', title: 'Speaker Sheet', description: 'One-sheet for speaking engagements', fileName: 'speaker-sheet.pdf', category: 'for-you' },

    // Client Experience Assets (6)
    { assetType: 'welcomeEmail', title: 'Welcome Email', description: 'Warm welcome email for new clients', fileName: 'welcome-email.txt', category: 'for-clients' },
    { assetType: 'healthForm', title: 'Health Intake Form', description: 'Comprehensive health questionnaire', fileName: 'health-intake-form.pdf', category: 'for-clients' },
    { assetType: 'waiverForm', title: 'Liability Waiver', description: 'Legal waiver and release form', fileName: 'liability-waiver.pdf', category: 'for-clients' },
    { assetType: 'sessionGuide', title: 'Session Preparation Guide', description: 'Guide to prepare clients for their session', fileName: 'session-preparation-guide.pdf', category: 'for-clients' },
    { assetType: 'followUpEmail', title: 'Follow-Up Email', description: 'Post-session follow-up template', fileName: 'follow-up-email.txt', category: 'for-clients' },
    { assetType: 'testimonialRequest', title: 'Testimonial Request', description: 'Email template to request testimonials', fileName: 'testimonial-request.txt', category: 'for-clients' },

    // Corporate Partnership Assets (5)
    { assetType: 'corporatePitch', title: 'Corporate Pitch Deck', description: 'Presentation for corporate wellness programs', fileName: 'corporate-pitch-deck.pdf', category: 'for-companies' },
    { assetType: 'workshopProposal', title: 'Workshop Proposal', description: 'Detailed workshop proposal template', fileName: 'workshop-proposal.pdf', category: 'for-companies' },
    { assetType: 'pricingSheet', title: 'Pricing Sheet', description: 'Clear pricing for corporate services', fileName: 'pricing-sheet.pdf', category: 'for-companies' },
    { assetType: 'caseStudy', title: 'Case Study Template', description: 'Template to showcase client success stories', fileName: 'case-study-template.pdf', category: 'for-companies' },
    { assetType: 'roiCalculator', title: 'ROI Calculator', description: 'Calculator to demonstrate corporate ROI', fileName: 'roi-calculator.xlsx', category: 'for-companies' },
  ];

  return assetTemplates.map((template, index) => ({
    id: `local-${template.assetType}-${Date.now()}-${index}`,
    assetType: template.assetType,
    title: template.title,
    description: template.description,
    fileName: template.fileName,
    filePath: `/local/${template.fileName}`,
    fileSize: 0,
    downloads: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    customData: {
      category: template.category,
      isLocal: true,
    },
  }));
};

const BrandWizard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    wizardStep,
    setWizardStep,
    completeWizard,
    saveBrandData,
    wizardCompleted,
  } = useBrandStore();
  const { initializeAssets } = useAssetStore();

  const [currentStep, setCurrentStep] = useState(wizardStep || 1);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync current step with store
  useEffect(() => {
    setWizardStep(currentStep);
  }, [currentStep, setWizardStep]);

  // Handle step navigation
  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEdit = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle wizard completion
  const handleComplete = async () => {
    setIsSaving(true);

    try {
      // If user has an account, save to backend
      if (user?.id) {
        const result = await saveBrandData(user.id);

        if (!result.success) {
          toast.error(result.error || 'Failed to save your brand data. Please try again.');
          setIsSaving(false);
          return;
        }

        // Initialize all 19 assets for this user
        const assetResult = await initializeAssets(user.id);

        if (!assetResult.success) {
          toast.error(assetResult.error || 'Failed to initialize assets. Please try again.');
          setIsSaving(false);
          return;
        }
      } else {
        // No user account - create local mock assets for preview/local use
        const localAssets = createLocalAssets();
        useAssetStore.setState({ assets: localAssets });
        toast.info('Working in preview mode. Create an account to save your assets permanently!');
      }

      // Mark wizard as completed (saves to localStorage via Zustand persist)
      completeWizard();

      // Show celebration
      setShowCelebration(true);

      // Wait for celebration animation
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Show success toast
      toast.success('Your toolkit has been generated successfully!');

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing wizard:', error);
      toast.error('An error occurred. Please try again.');
      setIsSaving(false);
    }
  };

  // Skip wizard (optional - for testing or returning users)
  const handleSkip = () => {
    if (window.confirm('Are you sure you want to skip the wizard? You can always come back later.')) {
      navigate('/dashboard');
    }
  };

  // Render current step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Visuals onNext={handleNext} />;
      case 2:
        return <Step2Details onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3Positioning onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4Services onNext={handleNext} onBack={handleBack} />;
      case 5:
        return (
          <Step5Review
            onBack={handleBack}
            onEdit={handleEdit}
            onComplete={handleComplete}
          />
        );
      default:
        return <Step1Visuals onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tt-off-white via-white to-tt-teal/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-tt-navy-dark mb-3">
            Build Your Brand
          </h1>
          <p className="text-lg text-tt-grey-dark">
            Let's create your personalized marketing toolkit in 5 simple steps
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-tt-grey-light">
              <motion.div
                className="h-full bg-gradient-to-r from-tt-teal to-tt-gold"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Step Indicators */}
            <div className="relative flex justify-between">
              {STEPS.map((step) => {
                const isCompleted = currentStep > step.number;
                const isCurrent = currentStep === step.number;

                return (
                  <div key={step.number} className="flex flex-col items-center">
                    <motion.button
                      type="button"
                      onClick={() => {
                        if (step.number < currentStep) {
                          setCurrentStep(step.number);
                        }
                      }}
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center font-semibold text-lg transition-all ${
                        isCompleted
                          ? 'bg-tt-teal text-white shadow-lg'
                          : isCurrent
                          ? 'bg-tt-navy-dark text-white shadow-xl ring-4 ring-tt-teal/30'
                          : 'bg-white text-tt-grey border-2 border-tt-grey-light'
                      } ${step.number < currentStep ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
                      whileHover={step.number < currentStep ? { scale: 1.1 } : {}}
                      whileTap={step.number < currentStep ? { scale: 0.95 } : {}}
                    >
                      {isCompleted ? (
                        <Check size={28} strokeWidth={3} />
                      ) : (
                        step.number
                      )}
                    </motion.button>
                    <div className="mt-3 text-center">
                      <p className={`font-medium text-sm ${
                        isCurrent ? 'text-tt-navy-dark' : 'text-tt-grey'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-tt-grey hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl p-8 md:p-12 mb-8"
        >
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </motion.div>

        {/* Skip Option */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleSkip}
            className="text-sm text-tt-grey hover:text-tt-grey-dark transition-colors"
          >
            Skip for now
          </button>
        </div>

        {/* Celebration Overlay */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-tt-navy-dark/90 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="text-center px-8 py-12 bg-white rounded-2xl shadow-2xl max-w-lg mx-4"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, -10, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{ duration: 1, repeat: 2 }}
                  className="mb-6"
                >
                  <PartyPopper size={80} className="mx-auto text-tt-teal" />
                </motion.div>

                <h2 className="text-4xl font-heading font-bold text-tt-navy-dark mb-4">
                  Congratulations!
                </h2>

                <p className="text-xl text-tt-grey-dark mb-6">
                  Your personalized marketing toolkit is ready!
                </p>

                <div className="flex items-center justify-center gap-2 text-tt-teal">
                  <Sparkles size={20} />
                  <p className="font-medium">Redirecting to your dashboard...</p>
                  <Sparkles size={20} />
                </div>

                {/* Confetti Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: '50%',
                        backgroundColor: ['#3ABAB4', '#D4AF37', '#0B2545'][i % 3],
                      }}
                      animate={{
                        y: [0, -300, -600],
                        x: [(Math.random() - 0.5) * 200],
                        rotate: [0, 360],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrandWizard;
