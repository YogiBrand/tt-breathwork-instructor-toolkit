import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import Confetti from './Confetti';

const CelebrationModal = ({ isOpen, onClose, title, message, buttonText = 'Continue' }) => {
  const [showConfetti, setShowConfetti] = useState(isOpen);

  const handleClose = () => {
    setShowConfetti(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti effect */}
          {showConfetti && (
            <Confetti
              count={60}
              duration={3000}
              onComplete={() => setShowConfetti(false)}
            />
          )}

          {/* Modal backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Modal content */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleClose}
                  className="text-tt-grey hover:text-tt-navy-dark transition-colors p-2 rounded-full hover:bg-tt-grey-light"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Success icon */}
              <div className="flex justify-center pt-8 pb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-tt-teal to-tt-gold rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="text-white" size={48} />
                </motion.div>
              </div>

              {/* Content */}
              <div className="px-8 pb-8 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-heading font-bold text-tt-navy-dark mb-3"
                >
                  {title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-tt-grey-dark text-lg mb-6"
                >
                  {message}
                </motion.p>

                {/* Action button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleClose}
                  className="btn btn-primary btn-lg w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {buttonText}
                </motion.button>
              </div>

              {/* Decorative gradient bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="h-2 bg-gradient-to-r from-tt-teal via-tt-gold to-tt-navy"
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

CelebrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
};

export default CelebrationModal;
