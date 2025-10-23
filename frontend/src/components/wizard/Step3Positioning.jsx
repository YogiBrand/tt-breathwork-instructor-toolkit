import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { Target, Sparkles, Wind, FileText } from 'lucide-react';
import { useBrandStore } from '../../store/brandStore';

// Target audience options
const TARGET_AUDIENCES = [
  { id: 'corporate', label: 'Corporate Professionals', description: 'Stress management for busy executives' },
  { id: 'athletes', label: 'Athletes', description: 'Performance enhancement and recovery' },
  { id: 'wellness', label: 'Wellness Seekers', description: 'Holistic health and personal growth' },
  { id: 'trauma', label: 'Trauma Recovery', description: 'Healing and emotional release' },
  { id: 'yoga', label: 'Yoga Community', description: 'Complementary practice for yogis' },
  { id: 'medical', label: 'Medical Patients', description: 'Therapeutic breathwork' },
  { id: 'performers', label: 'Performers & Artists', description: 'Creativity and stage presence' },
  { id: 'general', label: 'General Public', description: 'Anyone interested in breathwork' },
];

// Unique positioning options
const POSITIONING_OPTIONS = [
  { id: 'science', label: 'Science-Based Approach', description: 'Evidence-backed techniques and methodology' },
  { id: 'spiritual', label: 'Spiritual & Holistic', description: 'Mind-body-spirit integration' },
  { id: 'performance', label: 'Performance Focused', description: 'Results-driven optimization' },
  { id: 'trauma', label: 'Trauma-Informed', description: 'Safe, sensitive, therapeutic approach' },
  { id: 'accessible', label: 'Accessible & Practical', description: 'Simple techniques for everyday life' },
  { id: 'transformational', label: 'Transformational Journey', description: 'Deep personal transformation' },
];

const Step3Positioning = ({ onNext, onBack }) => {
  const { brandData, setBrandData } = useBrandStore();
  const [selectedAudiences, setSelectedAudiences] = useState(brandData.targetAudience || []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      targetAudience: brandData.targetAudience || [],
      uniquePositioning: brandData.uniquePositioning || '',
      signatureTechnique: brandData.signatureTechnique || '',
      oneLine: brandData.oneLine || '',
    },
  });

  const toggleAudience = (audienceId) => {
    setSelectedAudiences((prev) => {
      if (prev.includes(audienceId)) {
        return prev.filter((id) => id !== audienceId);
      } else {
        return [...prev, audienceId];
      }
    });
  };

  const onSubmit = (data) => {
    setBrandData({
      ...data,
      targetAudience: selectedAudiences,
    });
    onNext();
  };

  // Generate one-line description helper
  const generateOneLine = (technique, positioning) => {
    if (technique && positioning) {
      const positioningText = POSITIONING_OPTIONS.find(p => p.id === positioning)?.label || positioning;
      return `${technique} | ${positioningText} breathwork for transformation`;
    }
    return '';
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
          Your Positioning
        </h2>
        <p className="text-tt-grey-dark">
          Define who you serve and what makes your breathwork practice unique.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-3">
            <Target size={18} className="inline mr-2" />
            Target Audience * (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TARGET_AUDIENCES.map((audience) => (
              <motion.button
                key={audience.id}
                type="button"
                onClick={() => toggleAudience(audience.id)}
                className={`p-4 text-left border-2 rounded-lg transition-all ${
                  selectedAudiences.includes(audience.id)
                    ? 'border-tt-teal bg-tt-teal/5'
                    : 'border-tt-grey-light hover:border-tt-teal'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-tt-navy-dark">{audience.label}</h4>
                    <p className="text-xs text-tt-grey-dark mt-1">{audience.description}</p>
                  </div>
                  <div
                    className={`flex-shrink-0 ml-3 w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedAudiences.includes(audience.id)
                        ? 'border-tt-teal bg-tt-teal'
                        : 'border-tt-grey'
                    }`}
                  >
                    {selectedAudiences.includes(audience.id) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          {selectedAudiences.length === 0 && (
            <p className="mt-2 text-sm text-tt-grey-dark">
              Please select at least one target audience
            </p>
          )}
        </div>

        {/* Unique Positioning */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-3">
            <Sparkles size={18} className="inline mr-2" />
            What Makes You Unique? *
          </label>
          <Controller
            name="uniquePositioning"
            control={control}
            rules={{ required: 'Please select your unique positioning' }}
            render={({ field }) => (
              <div className="space-y-3">
                {POSITIONING_OPTIONS.map((option) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => field.onChange(option.id)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                      field.value === option.id
                        ? 'border-tt-teal bg-tt-teal/5'
                        : 'border-tt-grey-light hover:border-tt-teal'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-tt-navy-dark">{option.label}</h4>
                        <p className="text-sm text-tt-grey-dark mt-1">{option.description}</p>
                      </div>
                      <div
                        className={`flex-shrink-0 ml-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          field.value === option.id
                            ? 'border-tt-teal'
                            : 'border-tt-grey'
                        }`}
                      >
                        {field.value === option.id && (
                          <div className="w-3 h-3 bg-tt-teal rounded-full" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          />
          {errors.uniquePositioning && (
            <p className="mt-2 text-sm text-error">{errors.uniquePositioning.message}</p>
          )}
        </div>

        {/* Signature Technique */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-2">
            <Wind size={18} className="inline mr-2" />
            Signature Technique Name (Optional)
          </label>
          <input
            type="text"
            {...register('signatureTechnique', {
              maxLength: { value: 50, message: 'Technique name must be 50 characters or less' },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all ${
              errors.signatureTechnique ? 'border-error' : 'border-tt-grey-light'
            }`}
            placeholder="e.g., Conscious Connected Breathing, Power Breath Method"
          />
          {errors.signatureTechnique && (
            <p className="mt-1 text-sm text-error">{errors.signatureTechnique.message}</p>
          )}
          <p className="mt-1 text-xs text-tt-grey-dark">
            Your unique breathwork method or approach
          </p>
        </div>

        {/* One-Line Description */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-2">
            <FileText size={18} className="inline mr-2" />
            One-Line Description *
          </label>
          <textarea
            {...register('oneLine', {
              required: 'One-line description is required',
              maxLength: { value: 150, message: 'Description must be 150 characters or less' },
            })}
            rows="3"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all ${
              errors.oneLine ? 'border-error' : 'border-tt-grey-light'
            }`}
            placeholder="Transform your stress into strength through science-based breathwork techniques"
          />
          {errors.oneLine && (
            <p className="mt-1 text-sm text-error">{errors.oneLine.message}</p>
          )}
          <p className="mt-1 text-xs text-tt-grey-dark">
            A compelling summary of what you offer (max 150 characters)
          </p>
        </div>

        {/* Examples Box */}
        <div className="bg-tt-off-white border border-tt-grey-light rounded-lg p-4">
          <h4 className="font-medium text-tt-navy-dark mb-2 text-sm">Examples:</h4>
          <ul className="space-y-2 text-sm text-tt-grey-dark">
            <li className="flex items-start">
              <span className="text-tt-teal mr-2">•</span>
              <span>Helping corporate professionals reduce stress and boost performance through evidence-based breathwork</span>
            </li>
            <li className="flex items-start">
              <span className="text-tt-teal mr-2">•</span>
              <span>Transformational breathwork for athletes seeking peak performance and rapid recovery</span>
            </li>
            <li className="flex items-start">
              <span className="text-tt-teal mr-2">•</span>
              <span>Trauma-informed breathwork facilitating deep healing and emotional release</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border-2 border-tt-navy-dark text-tt-navy-dark rounded-lg hover:bg-tt-navy-dark hover:text-white transition-colors font-medium"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={selectedAudiences.length === 0}
            className="px-6 py-3 bg-tt-navy-dark text-white rounded-lg hover:bg-tt-navy transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
};

Step3Positioning.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step3Positioning;
