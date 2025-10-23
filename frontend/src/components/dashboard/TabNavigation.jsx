import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { User, Users, Building2, Rocket } from 'lucide-react';

const TabNavigation = ({ activeTab, onTabChange, tabCounts = {} }) => {
  const tabs = [
    {
      id: 'for-you',
      label: 'For You',
      icon: User,
      description: 'Personal branding assets',
    },
    {
      id: 'for-clients',
      label: 'For Clients',
      icon: Users,
      description: 'Client-facing materials',
    },
    {
      id: 'for-companies',
      label: 'For Companies',
      icon: Building2,
      description: 'Corporate proposals',
    },
    {
      id: 'launch-plan',
      label: 'Launch Plan',
      icon: Rocket,
      description: 'Your 30-day action plan',
    },
  ];

  return (
    <div className="border-b border-tt-grey-light bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Desktop tabs */}
        <div className="hidden md:flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = tabCounts[tab.id] || 0;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex-1 px-6 py-4 text-left transition-colors ${
                  isActive
                    ? 'text-tt-navy-dark'
                    : 'text-tt-grey-dark hover:text-tt-navy'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className={isActive ? 'text-tt-teal' : 'text-tt-grey'}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                        {tab.label}
                      </span>
                      {count > 0 && (
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            isActive
                              ? 'bg-tt-teal text-white'
                              : 'bg-tt-grey-light text-tt-grey-dark'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-tt-grey mt-0.5">{tab.description}</p>
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tt-teal to-tt-gold"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile dropdown */}
        <div className="md:hidden p-4">
          <select
            value={activeTab}
            onChange={(e) => onTabChange(e.target.value)}
            className="input w-full"
          >
            {tabs.map((tab) => {
              const count = tabCounts[tab.id] || 0;
              return (
                <option key={tab.id} value={tab.id}>
                  {tab.label} {count > 0 ? `(${count})` : ''}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

TabNavigation.propTypes = {
  activeTab: PropTypes.oneOf(['for-you', 'for-clients', 'for-companies', 'launch-plan'])
    .isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabCounts: PropTypes.shape({
    'for-you': PropTypes.number,
    'for-clients': PropTypes.number,
    'for-companies': PropTypes.number,
    'launch-plan': PropTypes.number,
  }),
};

export default TabNavigation;
