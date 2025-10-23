import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { brandAPI } from '../utils/api';

export const useBrandStore = create(
  persist(
    (set, get) => ({
      // State
      brandData: {
        // Visual assets
        logo: null,
        photo: null,
        colorPalette: {
          name: "Tim's Classic",
          primary: '#0B2545',
          accent: '#3ABAB4',
          secondary: '#D4AF37',
        },

        // Contact details
        fullName: '',
        credentials: '',
        businessName: '',
        location: '',
        phone: '',
        email: '',
        website: '',
        instagram: '',
        linkedin: '',

        // Positioning
        targetAudience: [],
        uniquePositioning: '',
        signatureTechnique: '',
        oneLine: '',

        // Services
        services: [],
      },
      isLoading: false,
      error: null,
      isSaved: false,
      wizardStep: 1,
      wizardCompleted: false,

      // Actions
      setBrandData: (data) => {
        set((state) => ({
          brandData: { ...state.brandData, ...data },
          isSaved: false,
        }));
      },

      updateField: (field, value) => {
        set((state) => ({
          brandData: { ...state.brandData, [field]: value },
          isSaved: false,
        }));
      },

      updateColorPalette: (palette) => {
        set((state) => ({
          brandData: {
            ...state.brandData,
            colorPalette: { ...state.brandData.colorPalette, ...palette },
          },
          isSaved: false,
        }));
      },

      addService: (service) => {
        set((state) => ({
          brandData: {
            ...state.brandData,
            services: [...state.brandData.services, service],
          },
          isSaved: false,
        }));
      },

      updateService: (index, service) => {
        set((state) => {
          const services = [...state.brandData.services];
          services[index] = { ...services[index], ...service };
          return {
            brandData: { ...state.brandData, services },
            isSaved: false,
          };
        });
      },

      removeService: (index) => {
        set((state) => ({
          brandData: {
            ...state.brandData,
            services: state.brandData.services.filter((_, i) => i !== index),
          },
          isSaved: false,
        }));
      },

      addTargetAudience: (audience) => {
        set((state) => ({
          brandData: {
            ...state.brandData,
            targetAudience: [...state.brandData.targetAudience, audience],
          },
          isSaved: false,
        }));
      },

      removeTargetAudience: (audience) => {
        set((state) => ({
          brandData: {
            ...state.brandData,
            targetAudience: state.brandData.targetAudience.filter((a) => a !== audience),
          },
          isSaved: false,
        }));
      },

      saveBrandData: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const { brandData } = get();
          const response = await brandAPI.save(userId, brandData);

          set({
            brandData: response.data.brandData,
            isSaved: true,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          set({
            error: error.message || 'Failed to save brand data',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      loadBrandData: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await brandAPI.get(userId);

          set({
            brandData: response.data.brandData,
            isSaved: true,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          set({
            error: error.message || 'Failed to load brand data',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      setWizardStep: (step) => {
        set({ wizardStep: step });
      },

      nextWizardStep: () => {
        set((state) => ({
          wizardStep: Math.min(state.wizardStep + 1, 5),
        }));
      },

      prevWizardStep: () => {
        set((state) => ({
          wizardStep: Math.max(state.wizardStep - 1, 1),
        }));
      },

      completeWizard: () => {
        set({ wizardCompleted: true });
      },

      resetBrandData: () => {
        set({
          brandData: {
            logo: null,
            photo: null,
            colorPalette: {
              name: "Tim's Classic",
              primary: '#0B2545',
              accent: '#3ABAB4',
              secondary: '#D4AF37',
            },
            fullName: '',
            credentials: '',
            businessName: '',
            location: '',
            phone: '',
            email: '',
            website: '',
            instagram: '',
            linkedin: '',
            targetAudience: [],
            uniquePositioning: '',
            signatureTechnique: '',
            oneLine: '',
            services: [],
          },
          wizardStep: 1,
          wizardCompleted: false,
          isSaved: false,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'tt-brand-storage',
      partialize: (state) => ({
        brandData: state.brandData,
        wizardStep: state.wizardStep,
        wizardCompleted: state.wizardCompleted,
      }),
    }
  )
);
