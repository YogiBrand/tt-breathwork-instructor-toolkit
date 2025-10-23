import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Key, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { toast } from '../components/common/Toast';

const CodeEntry = () => {
  const navigate = useNavigate();
  const { validateCode, claimCode, isLoading } = useAuthStore();

  const [step, setStep] = useState('code'); // 'code' or 'claim'
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate code format (TT-2025-A7B9C2)
    const codePattern = /^TT-\d{4}-[A-Z0-9]{6}$/i;
    if (!codePattern.test(code)) {
      setErrors({ code: 'Invalid code format. Expected: TT-2025-XXXXXX' });
      return;
    }

    const result = await validateCode(code);

    if (result.success) {
      if (result.hasAccount) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.info('Code validated! Create your account to continue.');
        setStep('claim');
      }
    } else {
      setErrors({ code: result.error || 'Invalid or expired code' });
      toast.error(result.error || 'Invalid code');
    }
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    const result = await claimCode(email);

    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/wizard');
    } else {
      setErrors({ email: result.error || 'Failed to create account' });
      toast.error(result.error || 'Failed to create account');
    }
  };

  const handleSkipClaim = () => {
    toast.info('You can save your progress later from the dashboard');
    navigate('/wizard');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-tt-teal to-tt-gold rounded-lg flex items-center justify-center">
              {step === 'code' ? (
                <Key size={32} className="text-white" />
              ) : (
                <Mail size={32} className="text-white" />
              )}
            </div>
            <h1 className="text-3xl font-heading font-bold text-tt-navy-dark mb-2">
              {step === 'code' ? 'Enter Your Access Code' : 'Save Your Progress'}
            </h1>
            <p className="text-tt-grey-dark">
              {step === 'code'
                ? 'Use the code provided in your TT Breathwork certification'
                : 'Create an account to save your brand and access it anywhere'}
            </p>
          </div>

          {/* Code Entry Form */}
          {step === 'code' && (
            <motion.form
              onSubmit={handleCodeSubmit}
              className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Input
                label="Access Code"
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="TT-2025-XXXXXX"
                error={errors.code}
                required
                leftIcon={<Key size={20} />}
                helperText="Format: TT-2025-XXXXXX"
              />

              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  rightIcon={<ArrowRight size={20} />}
                >
                  Continue
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-tt-grey-dark">
                Your code is included in your TT Breathwork certification package
              </div>
            </motion.form>
          )}

          {/* Claim Account Form */}
          {step === 'claim' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Success message */}
              <div className="bg-success bg-opacity-10 border border-success rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-success font-medium">Code validated!</p>
                    <p className="text-sm text-tt-grey-dark mt-1">
                      Your access code <strong>{code}</strong> is valid and ready to use.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleClaimSubmit} className="card">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  error={errors.email}
                  required
                  leftIcon={<Mail size={20} />}
                  helperText="We'll use this to save your progress and send you your assets"
                />

                <div className="mt-6 space-y-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    rightIcon={<ArrowRight size={20} />}
                  >
                    Create Account
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    fullWidth
                    onClick={handleSkipClaim}
                    disabled={isLoading}
                  >
                    Skip for now
                  </Button>
                </div>

                <div className="mt-6 text-xs text-tt-grey-dark text-center">
                  By creating an account, you agree to our Terms of Service and Privacy
                  Policy
                </div>
              </form>

              {/* Back button */}
              <button
                type="button"
                onClick={() => setStep('code')}
                className="mt-4 text-sm text-tt-teal hover:text-tt-teal-light transition-colors w-full text-center"
              >
                Use a different code
              </button>
            </motion.div>
          )}

          {/* Benefits */}
          {step === 'claim' && (
            <motion.div
              className="mt-8 p-6 bg-tt-off-white rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-tt-navy-dark mb-3">
                Why create an account?
              </h3>
              <ul className="space-y-2 text-sm text-tt-grey-dark">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-tt-teal flex-shrink-0 mt-0.5" />
                  <span>Save your brand data and access it from any device</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-tt-teal flex-shrink-0 mt-0.5" />
                  <span>Download your assets anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-tt-teal flex-shrink-0 mt-0.5" />
                  <span>Track your 90-day launch plan progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-tt-teal flex-shrink-0 mt-0.5" />
                  <span>Receive updates and new templates</span>
                </li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CodeEntry;
