import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAssetStore } from '../store/assetStore';
import { useBrandStore } from '../store/brandStore';
import TabNavigation from '../components/dashboard/TabNavigation';
import AssetCard from '../components/dashboard/AssetCard';
import ProgressBar from '../components/dashboard/ProgressBar';
import CelebrationModal from '../components/common/CelebrationModal';

// Asset categories and their templates
const ASSET_CATEGORIES = {
  'for-you': {
    title: 'Personal Branding Assets',
    description: 'Build your professional presence and credibility',
    templates: [
      {
        id: 'onePager',
        title: 'Professional One-Pager',
        description: 'Your complete story on one powerful page',
        assetType: 'onePager',
      },
      {
        id: 'businessCard',
        title: 'Business Card',
        description: 'Make a lasting first impression',
        assetType: 'businessCard',
      },
      {
        id: 'emailSignature',
        title: 'Email Signature',
        description: 'Professional signature with your branding',
        assetType: 'emailSignature',
      },
      {
        id: 'linkedinBanner',
        title: 'LinkedIn Banner',
        description: 'Stand out with a custom banner',
        assetType: 'linkedinBanner',
      },
      {
        id: 'instagramBio',
        title: 'Instagram Bio',
        description: 'Optimized bio with your positioning',
        assetType: 'instagramBio',
      },
      {
        id: 'websiteAbout',
        title: 'Website About Copy',
        description: 'Compelling about page content',
        assetType: 'websiteAbout',
      },
      {
        id: 'mediaKit',
        title: 'Media Kit',
        description: 'Professional press and media package',
        assetType: 'mediaKit',
      },
      {
        id: 'speakerSheet',
        title: 'Speaker One-Sheet',
        description: 'Showcase your speaking expertise',
        assetType: 'speakerSheet',
      },
    ],
  },
  'for-clients': {
    title: 'Client Experience Assets',
    description: 'Deliver professional service from start to finish',
    templates: [
      {
        id: 'welcomeEmail',
        title: 'Welcome Email',
        description: 'Set the tone for a great client experience',
        assetType: 'welcomeEmail',
      },
      {
        id: 'healthForm',
        title: 'Health Intake Form',
        description: 'Comprehensive client health questionnaire',
        assetType: 'healthForm',
      },
      {
        id: 'waiverForm',
        title: 'Liability Waiver',
        description: 'Protect your practice with proper waivers',
        assetType: 'waiverForm',
      },
      {
        id: 'sessionGuide',
        title: 'Session Preparation Guide',
        description: 'Help clients prepare for sessions',
        assetType: 'sessionGuide',
      },
      {
        id: 'followUpEmail',
        title: 'Follow-Up Email',
        description: 'Nurture the client relationship',
        assetType: 'followUpEmail',
      },
      {
        id: 'testimonialRequest',
        title: 'Testimonial Request',
        description: 'Gather powerful client testimonials',
        assetType: 'testimonialRequest',
      },
    ],
  },
  'for-companies': {
    title: 'Corporate Partnership Assets',
    description: 'Win corporate clients and grow your business',
    templates: [
      {
        id: 'corporatePitch',
        title: 'Corporate Pitch Deck',
        description: 'Sell your services to companies',
        assetType: 'corporatePitch',
      },
      {
        id: 'workshopProposal',
        title: 'Workshop Proposal',
        description: 'Detailed workshop offering and pricing',
        assetType: 'workshopProposal',
      },
      {
        id: 'pricingSheet',
        title: 'Pricing Sheet',
        description: 'Professional pricing and packages',
        assetType: 'pricingSheet',
      },
      {
        id: 'caseStudy',
        title: 'Case Study Template',
        description: 'Showcase your corporate success stories',
        assetType: 'caseStudy',
      },
      {
        id: 'roiCalculator',
        title: 'ROI Calculator',
        description: 'Demonstrate the business value',
        assetType: 'roiCalculator',
      },
    ],
  },
  'launch-plan': {
    title: '30-Day Launch Plan',
    description: 'Your step-by-step action plan to launch your practice',
    templates: [], // Launch plan is handled differently
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, sessionToken } = useAuthStore();
  const { assets, loadAssets, downloadAsset, isLoading, getAssetsByCategory } =
    useAssetStore();
  const { brandData, wizardCompleted } = useBrandStore();

  const [activeTab, setActiveTab] = useState('for-you');
  const [showCelebration, setShowCelebration] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    // User must have either authentication OR a session token to access dashboard
    const hasAccess = isAuthenticated || sessionToken;
    if (!hasAccess) {
      navigate('/enter-code');
    }
  }, [isAuthenticated, sessionToken, navigate]);

  // Load assets on mount
  useEffect(() => {
    if (user?.id) {
      loadAssets(user.id);
    }
  }, [user?.id, loadAssets]);

  // Show celebration modal if wizard was just completed
  useEffect(() => {
    const hasSeenCelebration = sessionStorage.getItem('hasSeenDashboardCelebration');
    if (wizardCompleted && !hasSeenCelebration) {
      setShowCelebration(true);
      sessionStorage.setItem('hasSeenDashboardCelebration', 'true');
    }
  }, [wizardCompleted]);

  // Calculate progress
  const totalAssets = assets.length;
  const completedAssets = assets.length; // All assets created = all completed for now
  const progress = totalAssets > 0 ? Math.round((completedAssets / totalAssets) * 100) : 0;

  // Get tab counts (show actual asset counts)
  const tabCounts = {
    'for-you': getAssetsByCategory('for-you').length,
    'for-clients': getAssetsByCategory('for-clients').length,
    'for-companies': getAssetsByCategory('for-companies').length,
    'launch-plan': 0,
  };

  // Handle asset click - navigate to asset viewer
  const handleAssetClick = (asset) => {
    navigate(`/asset/${asset.id}`);
  };

  // Get current category data
  const currentCategory = ASSET_CATEGORIES[activeTab];

  // Get actual assets from database and enrich with template data
  const dbAssets = getAssetsByCategory(activeTab);
  const currentAssets = dbAssets.map(asset => {
    // Find the matching template to get title and description
    const template = currentCategory.templates.find(t => t.assetType === asset.assetType);
    return {
      ...asset,
      title: template?.title || asset.fileName,
      description: template?.description || '',
      status: 'ready', // All initialized assets are ready
      lastUpdated: asset.createdAt
    };
  });

  return (
    <div className="min-h-screen bg-tt-off-white">
      {/* Header section */}
      <div className="bg-gradient-to-br from-tt-navy-dark to-tt-navy-light text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="text-tt-gold" size={32} />
                  <h1 className="text-4xl font-heading font-bold text-white">
                    Welcome back, {brandData.fullName || user?.email?.split('@')[0]}!
                  </h1>
                </div>
                <p className="text-white/90 text-lg mb-6">
                  Your complete breathwork instructor marketing toolkit
                </p>

                {/* Progress bar */}
                <div className="max-w-md">
                  <ProgressBar
                    progress={progress}
                    label="Toolkit Completion"
                    showLabel={true}
                  />
                </div>
              </div>

              {/* Quick stats */}
              <div className="hidden lg:flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-tt-gold">{completedAssets}</div>
                  <div className="text-sm text-tt-grey-light">Assets Ready</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-tt-teal">{totalAssets}</div>
                  <div className="text-sm text-tt-grey-light">Total Assets</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tab navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabCounts={tabCounts}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category header */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-tt-navy-dark mb-2">
            {currentCategory.title}
          </h2>
          <p className="text-tt-grey-dark">{currentCategory.description}</p>
        </div>

        {/* Content area */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-tt-teal" size={48} />
          </div>
        ) : activeTab === 'launch-plan' ? (
          // Launch Plan View
          <div className="card max-w-2xl mx-auto text-center py-12">
            <h3 className="text-2xl font-heading font-bold text-tt-navy-dark mb-4">
              Launch Plan Coming Soon!
            </h3>
            <p className="text-tt-grey-dark mb-6">
              Your personalized 30-day action plan will guide you through launching your
              breathwork practice step by step.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/launch-plan')}
            >
              View Launch Plan
            </button>
          </div>
        ) : currentAssets.length > 0 ? (
          // Asset grid
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleAssetClick(asset)}
                className="cursor-pointer"
              >
                <AssetCard asset={asset} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty state
          <motion.div
            className="card max-w-2xl mx-auto text-center py-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <AlertCircle className="mx-auto text-tt-grey mb-4" size={48} />
            <h3 className="text-xl font-heading font-semibold text-tt-navy-dark mb-2">
              No Assets Yet
            </h3>
            <p className="text-tt-grey-dark mb-6">
              Complete the brand wizard to generate your personalized assets.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/wizard')}
            >
              Start Brand Wizard
            </button>
          </motion.div>
        )}
      </div>

      {/* Celebration modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        title="Congratulations!"
        message="Your brand wizard is complete! All your personalized assets are ready to download."
        buttonText="Explore My Assets"
      />
    </div>
  );
};

export default Dashboard;
