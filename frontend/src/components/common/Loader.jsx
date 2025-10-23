import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Loader = ({ size = 'md', fullScreen = false, message = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const spinnerSize = sizeClasses[size];

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated spinner */}
      <div className="relative">
        <motion.div
          className={`${spinnerSize} border-4 border-tt-grey-light rounded-full`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div
          className={`${spinnerSize} border-4 border-t-tt-teal border-r-transparent border-b-transparent border-l-transparent rounded-full absolute top-0 left-0`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Loading message */}
      {message && (
        <motion.p
          className="text-tt-navy-dark text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        {loader}
      </div>
    );
  }

  return loader;
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  fullScreen: PropTypes.bool,
  message: PropTypes.string,
};

export default Loader;

// Alternative spinner component with dots
export const DotsLoader = ({ size = 'md' }) => {
  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const dotSize = dotSizes[size];

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${dotSize} bg-tt-teal rounded-full`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
};

DotsLoader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

// Alternative spinner with pulse effect
export const PulseLoader = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const loaderSize = sizeClasses[size];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${loaderSize} bg-tt-teal rounded-full`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

PulseLoader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
