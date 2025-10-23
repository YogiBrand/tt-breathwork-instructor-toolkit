import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../common/Button';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = isAuthenticated
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Launch Plan', href: '/launch-plan' },
      ]
    : [];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-tt-teal to-tt-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xl">TT</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-tt-navy-dark">
                TT Breathwork
              </h1>
              <p className="text-xs text-tt-grey">Instructor Toolkit</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-tt-teal'
                    : 'text-tt-navy-dark hover:text-tt-teal'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-tt-grey-light">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-tt-grey" />
                  <span className="text-sm text-tt-navy-dark font-medium">
                    {user?.email || 'User'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/enter-code">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-tt-navy-dark hover:bg-tt-grey-light"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 border-t border-tt-grey-light pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-tt-teal text-white'
                      : 'text-tt-navy-dark hover:bg-tt-grey-light'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm text-tt-grey border-t border-tt-grey-light mt-2 pt-4">
                    Signed in as <strong>{user?.email}</strong>
                  </div>
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    leftIcon={<LogOut size={16} />}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/enter-code" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
