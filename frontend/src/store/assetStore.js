import { create } from 'zustand';
import { assetAPI } from '../utils/api';

export const useAssetStore = create((set, get) => ({
  // State
  assets: [],
  currentAsset: null,
  isLoading: false,
  isGenerating: false,
  error: null,
  downloadProgress: {},

  // Actions
  initializeAssets: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await assetAPI.initialize(userId);

      set({
        assets: response.data.assets || [],
        isLoading: false,
      });

      return { success: true, assets: response.data.assets };
    } catch (error) {
      set({
        error: error.message || 'Failed to initialize assets',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  loadAssets: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await assetAPI.list(userId);

      set({
        assets: response.data.assets || [],
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      set({
        error: error.message || 'Failed to load assets',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  generateAsset: async (templateId, userId, customizations = {}) => {
    set({ isGenerating: true, error: null });
    try {
      const response = await assetAPI.generate(templateId, userId, customizations);
      const newAsset = response.data.asset;

      set((state) => ({
        assets: [
          newAsset,
          ...state.assets.filter(
            (asset) => asset.id !== newAsset.id && asset.assetType !== newAsset.assetType
          ),
        ],
        currentAsset: newAsset,
        isGenerating: false,
      }));

      return { success: true, asset: newAsset };
    } catch (error) {
      set({
        error: error.message || 'Failed to generate asset',
        isGenerating: false,
      });
      return { success: false, error: error.message };
    }
  },

  downloadAsset: async (assetId) => {
    set((state) => ({
      downloadProgress: { ...state.downloadProgress, [assetId]: 0 },
    }));

    try {
      const response = await assetAPI.download(assetId);

      // Create blob from response
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Get filename from asset
      const asset = get().assets.find((a) => a.id === assetId);
      const filename = asset?.fileName || `asset-${assetId}.pdf`;

      // Create download link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      set((state) => ({
        downloadProgress: { ...state.downloadProgress, [assetId]: 100 },
      }));

      // Clear progress after delay
      setTimeout(() => {
        set((state) => {
          const { [assetId]: removed, ...rest } = state.downloadProgress;
          return { downloadProgress: rest };
        });
      }, 2000);

      return { success: true };
    } catch (error) {
      set((state) => {
        const { [assetId]: removed, ...rest } = state.downloadProgress;
        return {
          downloadProgress: rest,
          error: error.message || 'Download failed',
        };
      });
      return { success: false, error: error.message };
    }
  },

  setCurrentAsset: (asset) => {
    set({ currentAsset: asset });
  },

  updateAsset: (assetId, updates) => {
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === assetId ? { ...asset, ...updates } : asset
      ),
      currentAsset:
        state.currentAsset?.id === assetId
          ? { ...state.currentAsset, ...updates }
          : state.currentAsset,
    }));
  },

  clearAssets: () => {
    set({ assets: [], currentAsset: null });
  },

  clearError: () => {
    set({ error: null });
  },

  // Asset organization helpers
  getAssetsByCategory: (category) => {
    const { assets } = get();
    return assets.filter((asset) => {
      if (asset?.customData?.category) {
        return asset.customData.category === category;
      }

      return false;
    });
  },

  getAssetByType: (assetType) => {
    const { assets } = get();
    return assets.find((asset) => asset.assetType === assetType);
  },

  hasAsset: (assetType) => {
    const { assets } = get();
    return assets.some((asset) => asset.assetType === assetType);
  },
}));
