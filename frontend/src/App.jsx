import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import Landing from './pages/Landing';
import CodeEntry from './pages/CodeEntry';
import BrandWizard from './pages/BrandWizard';
import Dashboard from './pages/Dashboard';
import AssetViewer from './pages/AssetViewer';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Toast notifications
import ToastContainer from './components/common/Toast';

function App() {
  const { isAuthenticated, sessionToken } = useAuthStore();

  // User has access if they're authenticated OR have a valid session token
  const hasAccess = isAuthenticated || sessionToken;

  return (
    <div className="min-h-screen flex flex-col bg-tt-off-white">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/enter-code" element={<CodeEntry />} />

          {/* Protected routes */}
          <Route
            path="/wizard"
            element={hasAccess ? <BrandWizard /> : <Navigate to="/enter-code" />}
          />
          <Route
            path="/dashboard"
            element={hasAccess ? <Dashboard /> : <Navigate to="/enter-code" />}
          />
          <Route
            path="/asset/:assetId"
            element={hasAccess ? <AssetViewer /> : <Navigate to="/enter-code" />}
          />

          {/* Future protected routes */}
          {/*
          <Route
            path="/launch-plan"
            element={isAuthenticated ? <LaunchPlan /> : <Navigate to="/enter-code" />}
          />
          */}

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />

      {/* Toast notification container */}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
