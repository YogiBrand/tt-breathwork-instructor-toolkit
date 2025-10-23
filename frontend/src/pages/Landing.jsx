import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Download,
  Palette,
  FileText,
} from 'lucide-react';
import Button from '../components/common/Button';

const Landing = () => {
  const features = [
    {
      icon: Palette,
      title: 'Brand Wizard',
      description: 'Create your unique brand identity in 5 simple steps',
    },
    {
      icon: FileText,
      title: '19 Professional Assets',
      description: 'Business cards, one-pagers, forms, and more',
    },
    {
      icon: Download,
      title: 'Instant Downloads',
      description: 'Generate and download print-ready PDFs in seconds',
    },
    {
      icon: Zap,
      title: '90-Day Launch Plan',
      description: 'Step-by-step roadmap to launch your business',
    },
  ];

  const stats = [
    { value: '19', label: 'Professional Assets' },
    { value: '5', label: 'Minute Setup' },
    { value: '90', label: 'Day Launch Plan' },
    { value: '100%', label: 'Customizable' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-b from-tt-off-white to-white">
      {/* Hero Section */}
      <section className="container-custom py-20 md:py-32">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-tt-teal bg-opacity-10 text-tt-teal rounded-full text-sm font-medium">
              <Sparkles size={16} />
              Your Business-in-a-Box Toolkit
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-heading font-bold text-tt-navy-dark mb-6"
          >
            Launch Your Breathwork Business in{' '}
            <span className="text-gradient">90 Days</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-tt-grey-dark mb-8 max-w-2xl mx-auto"
          >
            Get 19 professional branded assets, a proven launch plan, and everything you
            need to start attracting clients immediately.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/enter-code">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight size={20} />}>
                Get Started Now
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading font-bold text-tt-teal mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-tt-grey-dark">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-tt-navy-dark mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-tt-grey-dark max-w-2xl mx-auto">
              Professional tools designed specifically for TT Breathwork instructors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="card-hover text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-tt-teal to-tt-gold rounded-lg flex items-center justify-center">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-tt-navy-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-tt-grey-dark">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Assets Preview Section */}
      <section className="bg-tt-off-white py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-tt-navy-dark mb-6">
                19 Professional Assets
              </h2>
              <p className="text-lg text-tt-grey-dark mb-6">
                Get instant access to all the materials you need to present yourself
                professionally and attract your ideal clients.
              </p>

              <div className="space-y-3">
                {[
                  'Business cards & one-pagers',
                  'Welcome emails & session guides',
                  'Health forms & waivers',
                  'Corporate pitch decks',
                  'And 12 more professional templates',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-success flex-shrink-0 mt-1" />
                    <span className="text-tt-navy-dark">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="aspect-[3/4] bg-white rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-tt-grey-light">
                    <FileText size={48} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-tt-navy-dark to-tt-navy py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              Ready to Launch Your Business?
            </h2>
            <p className="text-xl text-tt-grey-light mb-8 max-w-2xl mx-auto">
              Join hundreds of TT Breathwork instructors who are building thriving
              practices.
            </p>
            <Link to="/enter-code">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
              >
                Enter Your Access Code
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
