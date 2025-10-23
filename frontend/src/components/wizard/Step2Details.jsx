import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Award, Building2, MapPin, Phone, Mail, Globe, Instagram, Linkedin } from 'lucide-react';
import { useBrandStore } from '../../store/brandStore';

const Step2Details = ({ onNext, onBack }) => {
  const { brandData, setBrandData } = useBrandStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: brandData.fullName || '',
      credentials: brandData.credentials || '',
      businessName: brandData.businessName || '',
      location: brandData.location || '',
      phone: brandData.phone || '',
      email: brandData.email || '',
      website: brandData.website || '',
      instagram: brandData.instagram || '',
      linkedin: brandData.linkedin || '',
    },
  });

  const onSubmit = (data) => {
    setBrandData(data);
    onNext();
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
          Contact Details
        </h2>
        <p className="text-tt-grey-dark">
          Tell us about yourself and your practice. This information will appear on your marketing materials.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-2">
            <User size={18} className="inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all ${
              errors.fullName ? 'border-error' : 'border-tt-grey-light'
            }`}
            placeholder="John Smith"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-error">{errors.fullName.message}</p>
          )}
        </div>

        {/* Credentials */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-2">
            <Award size={18} className="inline mr-2" />
            Credentials (Optional)
          </label>
          <input
            type="text"
            {...register('credentials')}
            className="w-full px-4 py-3 border border-tt-grey-light rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all"
            placeholder="Certified Breathwork Instructor, Yoga Teacher RYT-200"
          />
          <p className="mt-1 text-xs text-tt-grey-dark">
            e.g., Certifications, degrees, training programs
          </p>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-2">
            <Building2 size={18} className="inline mr-2" />
            Business Name (Optional)
          </label>
          <input
            type="text"
            {...register('businessName')}
            className="w-full px-4 py-3 border border-tt-grey-light rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all"
            placeholder="Breathe with John"
          />
          <p className="mt-1 text-xs text-tt-grey-dark">
            If different from your personal name
          </p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-2">
            <MapPin size={18} className="inline mr-2" />
            Location *
          </label>
          <input
            type="text"
            {...register('location', {
              required: 'Location is required',
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all ${
              errors.location ? 'border-error' : 'border-tt-grey-light'
            }`}
            placeholder="San Francisco, CA"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-error">{errors.location.message}</p>
          )}
        </div>

        {/* Phone and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-tt-navy-dark mb-2">
              <Phone size={18} className="inline mr-2" />
              Phone (Optional)
            </label>
            <input
              type="tel"
              {...register('phone', {
                pattern: {
                  value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                  message: 'Please enter a valid phone number',
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all ${
                errors.phone ? 'border-error' : 'border-tt-grey-light'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-error">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-tt-navy-dark mb-2">
              <Mail size={18} className="inline mr-2" />
              Email *
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all ${
                errors.email ? 'border-error' : 'border-tt-grey-light'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-2">
            <Globe size={18} className="inline mr-2" />
            Website (Optional)
          </label>
          <input
            type="url"
            {...register('website', {
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Please enter a valid URL',
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all ${
              errors.website ? 'border-error' : 'border-tt-grey-light'
            }`}
            placeholder="https://www.yourwebsite.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-error">{errors.website.message}</p>
          )}
        </div>

        {/* Social Media */}
        <div className="border-t border-tt-grey-light pt-6">
          <h3 className="text-lg font-medium text-tt-navy-dark mb-4">Social Media</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-tt-navy-dark mb-2">
                <Instagram size={18} className="inline mr-2" />
                Instagram (Optional)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-tt-grey-light border border-r-0 border-tt-grey-light rounded-l-lg text-tt-grey-dark text-sm">
                  @
                </span>
                <input
                  type="text"
                  {...register('instagram')}
                  className="flex-1 px-4 py-3 border border-tt-grey-light rounded-r-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all"
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tt-navy-dark mb-2">
                <Linkedin size={18} className="inline mr-2" />
                LinkedIn (Optional)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-tt-grey-light border border-r-0 border-tt-grey-light rounded-l-lg text-tt-grey-dark text-sm">
                  linkedin.com/in/
                </span>
                <input
                  type="text"
                  {...register('linkedin')}
                  className="flex-1 px-4 py-3 border border-tt-grey-light rounded-r-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent transition-all"
                  placeholder="username"
                />
              </div>
            </div>
          </div>
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
            className="px-6 py-3 bg-tt-navy-dark text-white rounded-lg hover:bg-tt-navy transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
};

Step2Details.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step2Details;
