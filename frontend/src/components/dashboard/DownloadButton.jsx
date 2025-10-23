import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const DownloadButton = ({
  onDownload,
  assetId,
  fileName = 'download',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}) => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async () => {
    if (disabled || status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    try {
      if (onDownload) {
        await onDownload(assetId);
      }

      setStatus('success');

      // Reset to idle after 2 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Download failed');

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="animate-spin" size={size === 'sm' ? 16 : 20} />;
      case 'success':
        return <CheckCircle size={size === 'sm' ? 16 : 20} />;
      case 'error':
        return <AlertCircle size={size === 'sm' ? 16 : 20} />;
      default:
        return <Download size={size === 'sm' ? 16 : 20} />;
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'loading':
        return 'Downloading...';
      case 'success':
        return 'Downloaded!';
      case 'error':
        return errorMessage || 'Failed';
      default:
        return 'Download';
    }
  };

  const getButtonClass = () => {
    const baseClass = 'btn';

    let variantClass = '';
    if (status === 'success') {
      variantClass = 'bg-success text-white border-success';
    } else if (status === 'error') {
      variantClass = 'bg-error text-white border-error';
    } else {
      variantClass = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-outline';
    }

    const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

    return `${baseClass} ${variantClass} ${sizeClass} ${className}`;
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={disabled || status === 'loading'}
      className={getButtonClass()}
      whileHover={disabled || status === 'loading' ? {} : { scale: 1.02 }}
      whileTap={disabled || status === 'loading' ? {} : { scale: 0.98 }}
      title={status === 'error' ? errorMessage : `Download ${fileName}`}
    >
      <span className="flex items-center gap-2">
        {getIcon()}
        <span>{getLabel()}</span>
      </span>
    </motion.button>
  );
};

DownloadButton.propTypes = {
  onDownload: PropTypes.func.isRequired,
  assetId: PropTypes.string,
  fileName: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DownloadButton;
