import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(
  (
    {
      label,
      type = 'text',
      name,
      value,
      placeholder,
      error,
      helperText,
      disabled = false,
      required = false,
      leftIcon = null,
      rightIcon = null,
      fullWidth = true,
      className = '',
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputClasses =
      'block w-full px-4 py-3 text-base text-tt-navy-dark bg-white border-2 rounded-md transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-tt-teal focus:ring-offset-1 disabled:bg-tt-grey-light disabled:cursor-not-allowed';

    const errorClasses = error
      ? 'border-error focus:border-error focus:ring-error'
      : 'border-tt-grey-light focus:border-tt-teal';

    const iconPaddingLeft = leftIcon ? 'pl-10' : '';
    const iconPaddingRight = rightIcon ? 'pr-10' : '';

    const inputClasses = `${baseInputClasses} ${errorClasses} ${iconPaddingLeft} ${iconPaddingRight} ${className}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-tt-navy-dark mb-2"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-tt-grey">{leftIcon}</span>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-tt-grey">{rightIcon}</span>
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-error" role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-tt-grey">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default Input;
