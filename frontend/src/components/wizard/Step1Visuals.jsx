import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Upload, X, Check, Image as ImageIcon, Palette } from 'lucide-react';
import { useBrandStore } from '../../store/brandStore';

// Preset color palettes
const COLOR_PALETTES = [
  {
    name: "Tim's Classic",
    description: 'Professional and trustworthy with a calming accent',
    primary: '#0B2545',
    accent: '#3ABAB4',
    secondary: '#D4AF37',
  },
  {
    name: 'Calm Professional',
    description: 'Serene blues and grays for a peaceful presence',
    primary: '#2C5F7C',
    accent: '#7AB8C7',
    secondary: '#E8EFF1',
  },
  {
    name: 'Warm Wellness',
    description: 'Earthy tones that evoke comfort and healing',
    primary: '#8B6F47',
    accent: '#D4A574',
    secondary: '#E8D5C4',
  },
];

const Step1Visuals = ({ onNext }) => {
  const { brandData, updateField, updateColorPalette } = useBrandStore();
  const [logoPreview, setLogoPreview] = useState(brandData.logo);
  const [photoPreview, setPhotoPreview] = useState(brandData.photo);
  const [selectedPalette, setSelectedPalette] = useState(brandData.colorPalette.name);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [dragActive, setDragActive] = useState({ logo: false, photo: false });

  const logoInputRef = useRef(null);
  const photoInputRef = useRef(null);

  // Handle file upload
  const handleFileUpload = (file, type) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (type === 'logo') {
          setLogoPreview(result);
          updateField('logo', result);
        } else {
          setPhotoPreview(result);
          updateField('photo', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive({ ...dragActive, [type]: true });
    } else if (e.type === 'dragleave') {
      setDragActive({ ...dragActive, [type]: false });
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive({ ...dragActive, [type]: false });

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], type);
    }
  };

  // Handle file input change
  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0], type);
    }
  };

  // Remove image
  const removeImage = (type) => {
    if (type === 'logo') {
      setLogoPreview(null);
      updateField('logo', null);
      if (logoInputRef.current) logoInputRef.current.value = '';
    } else {
      setPhotoPreview(null);
      updateField('photo', null);
      if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  // Handle palette selection
  const handlePaletteSelect = (palette) => {
    setSelectedPalette(palette.name);
    updateColorPalette(palette);
    setShowCustomPicker(false);
  };

  // Handle custom color change
  const handleCustomColorChange = (key, value) => {
    updateColorPalette({ [key]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
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
          Visual Identity
        </h2>
        <p className="text-tt-grey-dark">
          Upload your logo and photo, then choose your brand colors. These will be used across all your marketing materials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-3">
            <ImageIcon size={18} className="inline mr-2" />
            Logo (Optional)
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
              dragActive.logo
                ? 'border-tt-teal bg-tt-teal/5'
                : 'border-tt-grey-light hover:border-tt-teal'
            }`}
            onDragEnter={(e) => handleDrag(e, 'logo')}
            onDragLeave={(e) => handleDrag(e, 'logo')}
            onDragOver={(e) => handleDrag(e, 'logo')}
            onDrop={(e) => handleDrop(e, 'logo')}
          >
            {logoPreview ? (
              <div className="relative">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="max-h-32 mx-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => removeImage('logo')}
                  className="absolute top-0 right-0 p-2 bg-error text-white rounded-full hover:bg-error/90 transition-colors"
                  aria-label="Remove logo"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload size={32} className="mx-auto text-tt-grey mb-3" />
                <p className="text-sm text-tt-grey-dark mb-2">
                  Drag and drop your logo here, or
                </p>
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="text-sm text-tt-teal hover:text-tt-teal-light font-medium"
                >
                  Browse files
                </button>
                <p className="text-xs text-tt-grey mt-2">
                  PNG, JPG up to 5MB
                </p>
              </div>
            )}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'logo')}
              className="hidden"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-3">
            <ImageIcon size={18} className="inline mr-2" />
            Professional Photo (Optional)
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
              dragActive.photo
                ? 'border-tt-teal bg-tt-teal/5'
                : 'border-tt-grey-light hover:border-tt-teal'
            }`}
            onDragEnter={(e) => handleDrag(e, 'photo')}
            onDragLeave={(e) => handleDrag(e, 'photo')}
            onDragOver={(e) => handleDrag(e, 'photo')}
            onDrop={(e) => handleDrop(e, 'photo')}
          >
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Photo preview"
                  className="max-h-48 mx-auto object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage('photo')}
                  className="absolute top-0 right-0 p-2 bg-error text-white rounded-full hover:bg-error/90 transition-colors"
                  aria-label="Remove photo"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload size={32} className="mx-auto text-tt-grey mb-3" />
                <p className="text-sm text-tt-grey-dark mb-2">
                  Drag and drop your photo here, or
                </p>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="text-sm text-tt-teal hover:text-tt-teal-light font-medium"
                >
                  Browse files
                </button>
                <p className="text-xs text-tt-grey mt-2">
                  PNG, JPG up to 5MB
                </p>
              </div>
            )}
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'photo')}
              className="hidden"
            />
          </div>
        </div>

        {/* Color Palette Selection */}
        <div>
          <label className="block text-sm font-medium text-tt-navy-dark mb-3">
            <Palette size={18} className="inline mr-2" />
            Brand Color Palette
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {COLOR_PALETTES.map((palette) => (
              <motion.button
                key={palette.name}
                type="button"
                onClick={() => handlePaletteSelect(palette)}
                className={`relative p-4 border-2 rounded-lg text-left transition-all ${
                  selectedPalette === palette.name
                    ? 'border-tt-teal bg-tt-teal/5 shadow-md'
                    : 'border-tt-grey-light hover:border-tt-teal'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedPalette === palette.name && (
                  <div className="absolute top-2 right-2">
                    <Check size={20} className="text-tt-teal" />
                  </div>
                )}
                <h4 className="font-medium text-tt-navy-dark mb-1">{palette.name}</h4>
                <p className="text-xs text-tt-grey-dark mb-3">{palette.description}</p>
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded border border-tt-grey-light"
                    style={{ backgroundColor: palette.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-8 h-8 rounded border border-tt-grey-light"
                    style={{ backgroundColor: palette.accent }}
                    title="Accent"
                  />
                  <div
                    className="w-8 h-8 rounded border border-tt-grey-light"
                    style={{ backgroundColor: palette.secondary }}
                    title="Secondary"
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Custom Color Picker */}
          <button
            type="button"
            onClick={() => setShowCustomPicker(!showCustomPicker)}
            className="text-sm text-tt-teal hover:text-tt-teal-light font-medium"
          >
            {showCustomPicker ? 'Hide' : 'Customize'} color picker
          </button>

          {showCustomPicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-tt-off-white rounded-lg space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-tt-navy-dark mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandData.colorPalette.primary}
                      onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                      className="w-12 h-12 rounded border border-tt-grey-light cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandData.colorPalette.primary}
                      onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                      className="flex-1 px-3 py-2 border border-tt-grey-light rounded focus:border-tt-teal focus:outline-none text-sm"
                      placeholder="#0B2545"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-tt-navy-dark mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandData.colorPalette.accent}
                      onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                      className="w-12 h-12 rounded border border-tt-grey-light cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandData.colorPalette.accent}
                      onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                      className="flex-1 px-3 py-2 border border-tt-grey-light rounded focus:border-tt-teal focus:outline-none text-sm"
                      placeholder="#3ABAB4"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-tt-navy-dark mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandData.colorPalette.secondary}
                      onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                      className="w-12 h-12 rounded border border-tt-grey-light cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandData.colorPalette.secondary}
                      onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                      className="flex-1 px-3 py-2 border border-tt-grey-light rounded focus:border-tt-teal focus:outline-none text-sm"
                      placeholder="#D4AF37"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-6">
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

Step1Visuals.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default Step1Visuals;
