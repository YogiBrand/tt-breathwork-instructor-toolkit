import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  CheckCircle, Edit, Sparkles, User, Target, DollarSign,
  Palette, Image as ImageIcon, Loader
} from 'lucide-react';
import { useBrandStore } from '../../store/brandStore';

const Step5Review = ({ onBack, onEdit, onComplete }) => {
  const { brandData } = useBrandStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Simulate generation progress
  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate progress
    const progressSteps = [
      { percent: 20, message: 'Analyzing your brand data...' },
      { percent: 40, message: 'Generating color scheme...' },
      { percent: 60, message: 'Creating templates...' },
      { percent: 80, message: 'Personalizing content...' },
      { percent: 100, message: 'Finalizing your toolkit...' },
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.percent);
    }

    // Complete after a short delay
    await new Promise(resolve => setTimeout(resolve, 500));
    onComplete();
  };

  // Get target audience labels
  const getAudienceLabels = () => {
    const audiences = {
      'corporate': 'Corporate Professionals',
      'athletes': 'Athletes',
      'wellness': 'Wellness Seekers',
      'trauma': 'Trauma Recovery',
      'yoga': 'Yoga Community',
      'medical': 'Medical Patients',
      'performers': 'Performers & Artists',
      'general': 'General Public',
    };
    return brandData.targetAudience?.map(id => audiences[id] || id) || [];
  };

  // Get positioning label
  const getPositioningLabel = () => {
    const positions = {
      'science': 'Science-Based Approach',
      'spiritual': 'Spiritual & Holistic',
      'performance': 'Performance Focused',
      'trauma': 'Trauma-Informed',
      'accessible': 'Accessible & Practical',
      'transformational': 'Transformational Journey',
    };
    return positions[brandData.uniquePositioning] || brandData.uniquePositioning;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-heading font-semibold text-tt-navy-dark mb-2">
          Review & Generate
        </h2>
        <p className="text-tt-grey-dark">
          Review your brand information and generate your complete marketing toolkit.
        </p>
      </div>

      {!isGenerating ? (
        <div className="space-y-6">
          {/* Visual Identity */}
          <div className="bg-white border border-tt-grey-light rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Palette size={20} className="text-tt-teal" />
                <h3 className="font-semibold text-tt-navy-dark">Visual Identity</h3>
              </div>
              <button
                type="button"
                onClick={() => onEdit(1)}
                className="text-sm text-tt-teal hover:text-tt-teal-light font-medium flex items-center gap-1"
              >
                <Edit size={16} />
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brandData.logo && (
                  <div>
                    <p className="text-sm font-medium text-tt-grey-dark mb-2">Logo</p>
                    <img
                      src={brandData.logo}
                      alt="Logo"
                      className="max-h-20 object-contain border border-tt-grey-light rounded p-2"
                    />
                  </div>
                )}
                {brandData.photo && (
                  <div>
                    <p className="text-sm font-medium text-tt-grey-dark mb-2">Photo</p>
                    <img
                      src={brandData.photo}
                      alt="Professional"
                      className="max-h-20 object-cover rounded border border-tt-grey-light"
                    />
                  </div>
                )}
              </div>
              {!brandData.logo && !brandData.photo && (
                <p className="text-sm text-tt-grey-dark flex items-center gap-2">
                  <ImageIcon size={16} />
                  No logo or photo uploaded
                </p>
              )}
              <div>
                <p className="text-sm font-medium text-tt-grey-dark mb-2">Color Palette</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-12 h-12 rounded border border-tt-grey-light"
                    style={{ backgroundColor: brandData.colorPalette.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-12 h-12 rounded border border-tt-grey-light"
                    style={{ backgroundColor: brandData.colorPalette.accent }}
                    title="Accent"
                  />
                  <div
                    className="w-12 h-12 rounded border border-tt-grey-light"
                    style={{ backgroundColor: brandData.colorPalette.secondary }}
                    title="Secondary"
                  />
                  <span className="text-sm text-tt-grey-dark ml-2">
                    {brandData.colorPalette.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white border border-tt-grey-light rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User size={20} className="text-tt-teal" />
                <h3 className="font-semibold text-tt-navy-dark">Contact Details</h3>
              </div>
              <button
                type="button"
                onClick={() => onEdit(2)}
                className="text-sm text-tt-teal hover:text-tt-teal-light font-medium flex items-center gap-1"
              >
                <Edit size={16} />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-tt-grey-dark">Name</p>
                <p className="font-medium text-tt-navy-dark">{brandData.fullName}</p>
              </div>
              {brandData.credentials && (
                <div>
                  <p className="text-tt-grey-dark">Credentials</p>
                  <p className="font-medium text-tt-navy-dark">{brandData.credentials}</p>
                </div>
              )}
              {brandData.businessName && (
                <div>
                  <p className="text-tt-grey-dark">Business Name</p>
                  <p className="font-medium text-tt-navy-dark">{brandData.businessName}</p>
                </div>
              )}
              <div>
                <p className="text-tt-grey-dark">Location</p>
                <p className="font-medium text-tt-navy-dark">{brandData.location}</p>
              </div>
              <div>
                <p className="text-tt-grey-dark">Email</p>
                <p className="font-medium text-tt-navy-dark">{brandData.email}</p>
              </div>
              {brandData.phone && (
                <div>
                  <p className="text-tt-grey-dark">Phone</p>
                  <p className="font-medium text-tt-navy-dark">{brandData.phone}</p>
                </div>
              )}
              {brandData.website && (
                <div>
                  <p className="text-tt-grey-dark">Website</p>
                  <p className="font-medium text-tt-navy-dark">{brandData.website}</p>
                </div>
              )}
              {brandData.instagram && (
                <div>
                  <p className="text-tt-grey-dark">Instagram</p>
                  <p className="font-medium text-tt-navy-dark">@{brandData.instagram}</p>
                </div>
              )}
            </div>
          </div>

          {/* Positioning */}
          <div className="bg-white border border-tt-grey-light rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={20} className="text-tt-teal" />
                <h3 className="font-semibold text-tt-navy-dark">Positioning</h3>
              </div>
              <button
                type="button"
                onClick={() => onEdit(3)}
                className="text-sm text-tt-teal hover:text-tt-teal-light font-medium flex items-center gap-1"
              >
                <Edit size={16} />
                Edit
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-tt-grey-dark mb-2">Target Audience</p>
                <div className="flex flex-wrap gap-2">
                  {getAudienceLabels().map((audience, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-tt-teal/10 text-tt-teal rounded-full text-xs font-medium"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-tt-grey-dark">Unique Positioning</p>
                <p className="font-medium text-tt-navy-dark">{getPositioningLabel()}</p>
              </div>
              {brandData.signatureTechnique && (
                <div>
                  <p className="text-tt-grey-dark">Signature Technique</p>
                  <p className="font-medium text-tt-navy-dark">{brandData.signatureTechnique}</p>
                </div>
              )}
              <div>
                <p className="text-tt-grey-dark">One-Line Description</p>
                <p className="font-medium text-tt-navy-dark italic">&ldquo;{brandData.oneLine}&rdquo;</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white border border-tt-grey-light rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-tt-teal" />
                <h3 className="font-semibold text-tt-navy-dark">Services</h3>
              </div>
              <button
                type="button"
                onClick={() => onEdit(4)}
                className="text-sm text-tt-teal hover:text-tt-teal-light font-medium flex items-center gap-1"
              >
                <Edit size={16} />
                Edit
              </button>
            </div>
            <div className="space-y-2">
              {brandData.services?.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-tt-grey-light last:border-0"
                >
                  <span className="font-medium text-tt-navy-dark">{service.label}</span>
                  <span className="text-tt-grey-dark">
                    {service.price ? `$${service.price}` : 'Contact for pricing'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-gradient-to-r from-tt-teal/10 to-tt-gold/10 border-2 border-tt-teal rounded-lg p-8 text-center">
            <Sparkles size={48} className="mx-auto text-tt-teal mb-4" />
            <h3 className="text-2xl font-heading font-semibold text-tt-navy-dark mb-2">
              Ready to Generate Your Toolkit?
            </h3>
            <p className="text-tt-grey-dark mb-6">
              We'll create personalized marketing materials using your brand information.
              This includes social media posts, email templates, and promotional graphics.
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              className="px-8 py-4 bg-tt-navy-dark text-white rounded-lg hover:bg-tt-navy transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Generate My Toolkit
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-start pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border-2 border-tt-navy-dark text-tt-navy-dark rounded-lg hover:bg-tt-navy-dark hover:text-white transition-colors font-medium"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        /* Generation Progress */
        <div className="py-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Sparkles size={64} className="text-tt-teal" />
            </motion.div>

            <h3 className="text-2xl font-heading font-semibold text-tt-navy-dark mb-4">
              Creating Your Toolkit...
            </h3>

            {/* Progress Bar */}
            <div className="w-full bg-tt-grey-light rounded-full h-3 mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-tt-teal to-tt-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${generationProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <p className="text-lg text-tt-grey-dark mb-2">
              {generationProgress}% Complete
            </p>

            <div className="flex items-center justify-center gap-2 text-tt-grey-dark">
              <Loader size={16} className="animate-spin" />
              <p className="text-sm">
                {generationProgress < 40 && 'Analyzing your brand data...'}
                {generationProgress >= 40 && generationProgress < 60 && 'Generating color scheme...'}
                {generationProgress >= 60 && generationProgress < 80 && 'Creating templates...'}
                {generationProgress >= 80 && generationProgress < 100 && 'Personalizing content...'}
                {generationProgress === 100 && 'Finalizing your toolkit...'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

Step5Review.propTypes = {
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Step5Review;
