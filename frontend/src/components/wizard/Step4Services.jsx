import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Users, UserPlus, Building2, Mountain, Monitor, DollarSign, Info } from 'lucide-react';
import { useBrandStore } from '../../store/brandStore';

// Service types with icons and descriptions
const SERVICE_TYPES = [
  {
    id: 'one-on-one',
    label: '1:1 Sessions',
    icon: UserPlus,
    description: 'Private individual sessions',
    suggestedRate: { min: 100, max: 300 },
  },
  {
    id: 'group',
    label: 'Group Classes',
    icon: Users,
    description: 'Small to medium group sessions',
    suggestedRate: { min: 25, max: 75 },
  },
  {
    id: 'corporate',
    label: 'Corporate Workshops',
    icon: Building2,
    description: 'Workplace wellness programs',
    suggestedRate: { min: 500, max: 2000 },
  },
  {
    id: 'retreats',
    label: 'Retreats',
    icon: Mountain,
    description: 'Multi-day immersive experiences',
    suggestedRate: { min: 1000, max: 5000 },
  },
  {
    id: 'online',
    label: 'Online Sessions',
    icon: Monitor,
    description: 'Virtual breathwork sessions',
    suggestedRate: { min: 50, max: 150 },
  },
];

// Location-based pricing multipliers
const LOCATION_MULTIPLIERS = {
  'high': { label: 'Major Metro (SF, NYC, LA)', multiplier: 1.3 },
  'medium': { label: 'Mid-size City', multiplier: 1.0 },
  'low': { label: 'Small Town/Rural', multiplier: 0.7 },
};

const Step4Services = ({ onNext, onBack }) => {
  const { brandData, setBrandData } = useBrandStore();
  const [selectedServices, setSelectedServices] = useState(
    brandData.services?.map(s => s.type) || []
  );
  const [servicePricing, setServicePricing] = useState(
    brandData.services?.reduce((acc, service) => {
      acc[service.type] = service.price || '';
      return acc;
    }, {}) || {}
  );
  const [locationMultiplier, setLocationMultiplier] = useState('medium');
  const [showSuggestedRates, setShowSuggestedRates] = useState(true);

  // Update suggested rates when location changes
  useEffect(() => {
    // Auto-detect location multiplier from brand data location
    if (brandData.location) {
      const location = brandData.location.toLowerCase();
      if (location.includes('san francisco') || location.includes('new york') ||
          location.includes('los angeles') || location.includes('seattle') ||
          location.includes('boston') || location.includes('chicago')) {
        setLocationMultiplier('high');
      } else if (location.includes('rural') || location.includes('town')) {
        setLocationMultiplier('low');
      }
    }
  }, [brandData.location]);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        // Remove service
        const newPricing = { ...servicePricing };
        delete newPricing[serviceId];
        setServicePricing(newPricing);
        return prev.filter((id) => id !== serviceId);
      } else {
        // Add service
        return [...prev, serviceId];
      }
    });
  };

  const updatePrice = (serviceId, price) => {
    setServicePricing((prev) => ({
      ...prev,
      [serviceId]: price,
    }));
  };

  const getSuggestedRate = (service) => {
    const multiplier = LOCATION_MULTIPLIERS[locationMultiplier].multiplier;
    const min = Math.round(service.suggestedRate.min * multiplier);
    const max = Math.round(service.suggestedRate.max * multiplier);
    return { min, max };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert to services array format
    const services = selectedServices.map((serviceId) => {
      const serviceType = SERVICE_TYPES.find(s => s.id === serviceId);
      return {
        type: serviceId,
        label: serviceType?.label || serviceId,
        price: servicePricing[serviceId] || '',
      };
    });

    setBrandData({ services });
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
          Services & Pricing
        </h2>
        <p className="text-tt-grey-dark">
          Select the services you offer and set your pricing. This helps create accurate marketing materials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Location Multiplier Info */}
        <div className="bg-tt-teal/5 border border-tt-teal/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-tt-teal flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-tt-navy-dark text-sm mb-1">
                Pricing Guidance
              </h4>
              <p className="text-sm text-tt-grey-dark mb-2">
                Based on your location ({brandData.location || 'Not set'}), we've adjusted the suggested rates.
              </p>
              <select
                value={locationMultiplier}
                onChange={(e) => setLocationMultiplier(e.target.value)}
                className="text-sm px-3 py-2 border border-tt-grey-light rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent"
              >
                {Object.entries(LOCATION_MULTIPLIERS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Service Selection and Pricing */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-tt-navy-dark">
              <DollarSign size={18} className="inline mr-2" />
              Your Services * (Select all that apply)
            </label>
            <button
              type="button"
              onClick={() => setShowSuggestedRates(!showSuggestedRates)}
              className="text-xs text-tt-teal hover:text-tt-teal-light font-medium"
            >
              {showSuggestedRates ? 'Hide' : 'Show'} suggested rates
            </button>
          </div>

          <div className="space-y-4">
            {SERVICE_TYPES.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedServices.includes(service.id);
              const suggestedRate = getSuggestedRate(service);

              return (
                <motion.div
                  key={service.id}
                  className={`border-2 rounded-lg transition-all ${
                    isSelected
                      ? 'border-tt-teal bg-tt-teal/5'
                      : 'border-tt-grey-light'
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-tt-teal text-white' : 'bg-tt-grey-light text-tt-grey-dark'
                        }`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-tt-navy-dark">{service.label}</h4>
                          <p className="text-sm text-tt-grey-dark">{service.description}</p>
                          {showSuggestedRates && (
                            <p className="text-xs text-tt-grey mt-1">
                              Suggested: ${suggestedRate.min} - ${suggestedRate.max}
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-tt-teal bg-tt-teal'
                            : 'border-tt-grey'
                        }`}
                      >
                        {isSelected && (
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
                  </div>

                  {/* Pricing Input */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-tt-grey-light px-4 pb-4"
                    >
                      <div className="mt-4">
                        <label className="block text-xs font-medium text-tt-navy-dark mb-2">
                          Your Rate (Optional)
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-tt-grey-dark">
                              $
                            </span>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={servicePricing[service.id] || ''}
                              onChange={(e) => updatePrice(service.id, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full pl-8 pr-4 py-2 border border-tt-grey-light rounded-lg focus:ring-2 focus:ring-tt-teal focus:border-transparent text-sm"
                              placeholder={`${suggestedRate.min}`}
                            />
                          </div>
                          <span className="text-sm text-tt-grey-dark">per session</span>
                        </div>
                        <p className="text-xs text-tt-grey mt-1">
                          Leave blank to discuss pricing with clients
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {selectedServices.length === 0 && (
            <p className="text-sm text-tt-grey-dark">
              Please select at least one service type
            </p>
          )}
        </div>

        {/* Additional Services Note */}
        <div className="bg-tt-off-white border border-tt-grey-light rounded-lg p-4">
          <h4 className="font-medium text-tt-navy-dark mb-2 text-sm">Pricing Tips:</h4>
          <ul className="space-y-1 text-sm text-tt-grey-dark">
            <li className="flex items-start">
              <span className="text-tt-teal mr-2">•</span>
              <span>Consider package deals (e.g., 5 sessions for a discounted rate)</span>
            </li>
            <li className="flex items-start">
              <span className="text-tt-teal mr-2">•</span>
              <span>Corporate rates are typically hourly or per-workshop</span>
            </li>
            <li className="flex items-start">
              <span className="text-tt-teal mr-2">•</span>
              <span>Online sessions are often priced 20-30% less than in-person</span>
            </li>
            <li className="flex items-start">
              <span className="text-tt-teal mr-2">•</span>
              <span>You can always update your pricing later</span>
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
            disabled={selectedServices.length === 0}
            className="px-6 py-3 bg-tt-navy-dark text-white rounded-lg hover:bg-tt-navy transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
};

Step4Services.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step4Services;
