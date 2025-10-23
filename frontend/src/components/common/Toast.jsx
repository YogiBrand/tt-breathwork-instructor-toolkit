import React, { useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { create } from 'zustand';

// Toast store for managing toast notifications
export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToasts: () => set({ toasts: [] }),
}));

// Toast helper functions
export const toast = {
  success: (message, options = {}) => {
    return useToastStore.getState().addToast({
      type: 'success',
      message,
      ...options,
    });
  },
  error: (message, options = {}) => {
    return useToastStore.getState().addToast({
      type: 'error',
      message,
      ...options,
    });
  },
  warning: (message, options = {}) => {
    return useToastStore.getState().addToast({
      type: 'warning',
      message,
      ...options,
    });
  },
  info: (message, options = {}) => {
    return useToastStore.getState().addToast({
      type: 'info',
      message,
      ...options,
    });
  },
};

// Individual toast component
const ToastItem = forwardRef(({ id, type, message, duration = 5000, onClose }, ref) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  const colors = {
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-white',
    info: 'bg-tt-teal text-white',
  };

  const toastVariants = {
    initial: { opacity: 0, y: -50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: 300, scale: 0.9 },
  };

  return (
    <motion.div
      className={`flex items-center gap-3 min-w-[300px] max-w-md px-4 py-3 rounded-lg shadow-lg ${colors[type]}`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
});

ToastItem.displayName = 'ToastItem';

ToastItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

// Toast container component
const ToastContainer = ({ position = 'top-right' }) => {
  const { toasts, removeToast } = useToastStore();

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-3`}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

ToastContainer.propTypes = {
  position: PropTypes.oneOf([
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ]),
};

export default ToastContainer;
