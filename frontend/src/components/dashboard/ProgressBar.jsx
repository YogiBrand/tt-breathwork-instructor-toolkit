import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, showLabel = true, label, className = '' }) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-tt-navy-dark">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-semibold text-tt-teal">
            {normalizedProgress}%
          </span>
        </div>
      )}

      <div className="progress-bar">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${normalizedProgress}%` }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>

      {normalizedProgress === 100 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-success font-medium mt-2 text-center"
        >
          Complete!
        </motion.p>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default ProgressBar;
