import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Edit, Check, Wand2 } from 'lucide-react';
import { useAssetStore } from '../store/assetStore';
import { useBrandStore } from '../store/brandStore';
import { toast } from '../components/common/Toast';
import {
  OnePagerTemplate,
  BusinessCardTemplate,
  EmailSignatureTemplate,
  getAssetVariations,
} from '../components/templates';

const AssetViewer = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const {
    assets,
    generateAsset: generateAssetRequest,
    downloadAsset: downloadAssetRequest,
  } = useAssetStore();
  const { brandData } = useBrandStore();
  const previewRef = useRef(null);

  const [selectedVariation, setSelectedVariation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customizations, setCustomizations] = useState({});
  const [isGeneratingAsset, setIsGeneratingAsset] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Find the asset
  const asset = assets.find((a) => a.id === assetId);

  // Get available variations for this asset type
  const variations = asset ? getAssetVariations(asset.assetType) : [];

  useEffect(() => {
    if (!asset) {
      toast.error('Asset not found');
      navigate('/dashboard');
      return;
    }
  }, [asset, navigate]);

  useEffect(() => {
    if (!asset) return;

    const lastCustomization = asset.customData?.lastCustomization || {};
    if (!variations || variations.length === 0) {
      setSelectedVariation(null);
      return;
    }

    setSelectedVariation((prev) => {
      if (prev) {
        const stillExists = variations.find((variation) => variation.id === prev.id);
        if (stillExists) {
          return prev;
        }
      }

      const fallback =
        variations.find((variation) => variation.id === lastCustomization.variation) ||
        variations[0];

      return fallback;
    });
  }, [asset, variations]);

  useEffect(() => {
    if (!asset) return;

    const palette = brandData.colorPalette || {};
    const lastCustomization = asset.customData?.lastCustomization || {};

    setCustomizations({
      fullName: brandData.fullName || '',
      tagline:
        lastCustomization.tagline ||
        brandData.oneLine ||
        brandData.signatureTechnique ||
        '',
      email: brandData.email || '',
      phone: brandData.phone || '',
      website: brandData.website || '',
      services: lastCustomization.services || brandData.services || [],
      primaryColor: lastCustomization.primaryColor || palette.primary || '#0B2545',
      secondaryColor: lastCustomization.secondaryColor || palette.accent || '#3ABAB4',
      ...lastCustomization,
    });
  }, [asset, brandData]);

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
    setCustomizations((prev) => ({
      ...prev,
      variation: variation.id,
    }));
    toast.success(`Selected ${variation.name} template`);
  };

  const handleCustomizationChange = (field, value) => {
    setCustomizations(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async () => {
    if (!asset) return;
    if (isPreviewMode) {
      toast.info('Create an account to generate downloadable assets.');
      return;
    }

    setIsGeneratingAsset(true);
    try {
      const payload = {
        ...customizations,
        variation: selectedVariation?.id,
        services: customizations.services || brandData.services || [],
      };

      const result = await generateAssetRequest(asset.assetType, asset.userId, payload);

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate asset');
      }

      toast.success('Asset generated successfully!');
      setIsEditing(false);
    } catch (error) {
      const message = error.message || 'Failed to generate asset';
      toast.error(message);
    } finally {
      setIsGeneratingAsset(false);
    }
  };

  const handleDownload = async () => {
    if (!asset) return;
    if (isPreviewMode) {
      toast.info('Create an account to download finalized assets.');
      return;
    }
    if (!asset.filePath) {
      toast.error('Please generate this asset before downloading.');
      return;
    }

    setIsDownloading(true);
    try {
      const result = await downloadAssetRequest(asset.id);
      if (!result.success) {
        throw new Error(result.error || 'Download failed');
      }
      toast.success('Download started—check your browser downloads.');
    } catch (error) {
      const message = error.message || 'Failed to download asset';
      toast.error(message);
    } finally {
      setIsDownloading(false);
    }
  };

  // Render the appropriate template
  const renderTemplate = () => {
    if (!selectedVariation) {
      return (
        <div className="p-12 text-center text-gray-500">
          <p>Select a template variation to preview</p>
        </div>
      );
    }

    const palette = brandData.colorPalette || {};
    const templateData = {
      ...customizations,
      primaryColor: customizations.primaryColor || palette.primary || '#0B2545',
      secondaryColor: customizations.secondaryColor || palette.accent || '#3ABAB4',
      services: customizations.services || brandData.services || [],
    };

    // Select the right template component based on asset type
    switch (asset.assetType) {
      case 'onePager':
        return <OnePagerTemplate variation={selectedVariation.id} data={templateData} />;
      case 'businessCard':
        return <BusinessCardTemplate variation={selectedVariation.id} data={templateData} />;
      case 'emailSignature':
        return <EmailSignatureTemplate variation={selectedVariation.id} data={templateData} />;
      default:
        const fallbackTitle = asset.customData?.title || asset.title || asset.fileName;
        return (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">Template coming soon for {fallbackTitle}</p>
            <p className="text-sm text-gray-400">Currently showing: {selectedVariation.name}</p>
          </div>
        );
    }
  };

  if (!asset) {
    return null;
  }

  const displayTitle = asset.customData?.title || asset.title || asset.fileName;
  const displayDescription =
    asset.customData?.description || asset.description || 'Generate to unlock this asset.';
  const isPreviewMode = !asset.userId;
  const canDownload = Boolean(asset.filePath) && !isPreviewMode;

  return (
    <div className="min-h-screen bg-tt-off-white pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-tt-navy-dark to-tt-navy-light text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">
                {displayTitle}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`badge ${
                    canDownload ? 'badge-success' : 'badge-warning'
                  }`}
                >
                  {canDownload ? 'Ready' : isPreviewMode ? 'Preview Mode' : 'Draft'}
                </span>
                {asset.customData?.category && (
                  <span className="badge badge-secondary capitalize">
                    {asset.customData.category.replace('-', ' ')}
                  </span>
                )}
              </div>
              <p className="text-white/80">{displayDescription}</p>
              {isPreviewMode && (
                <p className="text-sm text-white/70 mt-3">
                  Create an account and complete your brand wizard to generate downloadable files.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className={`btn ${isEditing ? 'btn-secondary' : 'btn-outline'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit size={20} />
                <span>{isEditing ? 'Preview' : 'Customize'}</span>
              </motion.button>

              <motion.button
                onClick={handleDownload}
                className={`btn btn-primary ${
                  !canDownload || isDownloading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={!canDownload || isDownloading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={20} className={isDownloading ? 'animate-spin' : ''} />
                <span>{canDownload ? (isDownloading ? 'Downloading...' : 'Download') : 'Generate First'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-xl font-heading font-semibold text-tt-navy-dark mb-4">
                Choose Your Style
              </h3>

              <div className="space-y-3">
                {variations.map((variation) => (
                  <motion.button
                    key={variation.id}
                    onClick={() => handleVariationSelect(variation)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedVariation?.id === variation.id
                        ? 'border-tt-teal bg-tt-teal/5'
                        : 'border-tt-grey-light hover:border-tt-teal/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-tt-navy-dark">
                          {variation.name}
                        </div>
                        <div className="text-sm text-tt-grey-dark capitalize">
                          {variation.theme} theme
                        </div>
                      </div>
                      {selectedVariation?.id === variation.id && (
                        <Check className="text-tt-teal" size={24} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Customization Panel */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-tt-grey-light"
                  >
                    <h4 className="font-heading font-semibold text-tt-navy-dark mb-4">
                      Customize Content
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-tt-navy-dark mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={customizations.fullName || ''}
                          onChange={(e) => handleCustomizationChange('fullName', e.target.value)}
                          className="input"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-tt-navy-dark mb-1">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={customizations.tagline || ''}
                          onChange={(e) => handleCustomizationChange('tagline', e.target.value)}
                          className="input"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-tt-navy-dark mb-1">
                          Primary Color
                        </label>
                        <input
                          type="color"
                          value={customizations.primaryColor || '#2D5F7F'}
                          onChange={(e) => handleCustomizationChange('primaryColor', e.target.value)}
                          className="w-full h-10 rounded-lg border border-tt-grey-light cursor-pointer"
                        />
                      </div>

                      <motion.button
                        onClick={handleGenerate}
                        disabled={isGeneratingAsset || isPreviewMode}
                        className="btn btn-primary w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isGeneratingAsset ? (
                          <>
                            <Wand2 className="animate-spin" size={20} />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Wand2 size={20} />
                            <span>Generate</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-heading font-semibold text-tt-navy-dark">
                  Preview
                </h3>
                <span className="text-sm text-tt-grey-dark">
                  {selectedVariation?.name} Style
                </span>
              </div>

              {/* Preview Container */}
              <div className="bg-gray-100 rounded-lg border-2 border-tt-grey-light p-8 min-h-[600px] flex items-center justify-center overflow-auto">
                <div ref={previewRef} className="bg-white">
                  {renderTemplate()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetViewer;
