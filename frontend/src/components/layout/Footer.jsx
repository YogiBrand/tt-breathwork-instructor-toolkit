import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'FAQ', href: '/#faq' },
    ],
    support: [
      { name: 'Contact', href: '/contact' },
      { name: 'Help Center', href: '/help' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    social: [
      { name: 'Instagram', href: 'https://instagram.com/timvandervliet', icon: Instagram },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/timvandervliet', icon: Linkedin },
    ],
  };

  return (
    <footer className="bg-tt-navy-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-tt-teal to-tt-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">TT</span>
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold">TT Breathwork</h2>
                <p className="text-sm text-tt-grey-light">Instructor Toolkit</p>
              </div>
            </div>
            <p className="text-tt-grey-light max-w-md mb-4">
              Empowering breathwork instructors with professional tools to build their
              business and transform lives.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tt-grey-light hover:text-tt-teal transition-colors"
                    aria-label={item.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-tt-grey-light hover:text-tt-teal transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-tt-grey-light hover:text-tt-teal transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-tt-navy-light">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-tt-grey-light text-sm">
              &copy; {currentYear} Tim van der Vliet. All rights reserved.
            </p>
            <p className="text-tt-grey-light text-sm flex items-center gap-1">
              Made with <Heart size={14} className="text-error" fill="currentColor" /> for
              breathwork instructors worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
