import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI, setAuthToken, clearAuth } from '../utils/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      sessionToken: null,
      codeId: null,
      hasAccount: false,

      // Actions
      validateCode: async (code) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.validateCode(code);
          const { sessionToken, hasAccount, user, codeId, token } = response.data;

          set({
            sessionToken: token ? null : sessionToken,
            codeId,
            hasAccount,
            user: hasAccount ? user : null,
            isAuthenticated: Boolean(hasAccount && token),
            isLoading: false,
            token: token || null,
          });

          if (token) {
            setAuthToken(token);
          }

          return { success: true, hasAccount };
        } catch (error) {
          set({
            error: error.message || 'Invalid code',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      claimCode: async (email) => {
        const { sessionToken } = get();
        if (!sessionToken) {
          set({ error: 'No session token found' });
          return { success: false, error: 'No session token found' };
        }

        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.claimCode(email, sessionToken);
          const { token, user } = response.data;

          setAuthToken(token);

          set({
            user,
            token,
            isAuthenticated: true,
            hasAccount: true,
            isLoading: false,
            sessionToken: null,
            codeId: null,
          });

          return { success: true, user };
        } catch (error) {
          set({
            error: error.message || 'Failed to claim code',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      login: async (email) => {
        const { sessionToken } = get();
        if (!sessionToken) {
          set({ error: 'No session token found' });
          return { success: false, error: 'No session token found' };
        }

        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(email, sessionToken);
          const { token, user } = response.data;

          setAuthToken(token);

          set({
            user,
            token,
            isAuthenticated: true,
            hasAccount: true,
            isLoading: false,
            sessionToken: null,
          });

          return { success: true, user };
        } catch (error) {
          set({
            error: error.message || 'Login failed',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        clearAuth();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          hasAccount: false,
          sessionToken: null,
          codeId: null,
          error: null,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'tt-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        hasAccount: state.hasAccount,
        sessionToken: state.sessionToken,
        codeId: state.codeId,
      }),
    }
  )
);
