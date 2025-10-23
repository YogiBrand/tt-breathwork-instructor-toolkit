import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  FileText,
  CreditCard,
  Mail,
  Image,
  FileCheck,
  Presentation,
  Award,
  MessageSquare,
  Briefcase,
  DollarSign,
  Target,
  Calendar,
} from 'lucide-react';

// Map asset types to icons
const ASSET_TYPE_ICONS = {
  onePager: FileText,
  businessCard: CreditCard,
  emailSignature: Mail,
  linkedinBanner: Image,
  instagramBio: Image,
  websiteAbout: FileText,
  mediaKit: Presentation,
  speakerSheet: Award,
  welcomeEmail: Mail,
  healthForm: FileCheck,
  waiverForm: FileCheck,
  sessionGuide: FileText,
  followUpEmail: Mail,
  testimonialRequest: MessageSquare,
  corporatePitch: Briefcase,
  workshopProposal: Presentation,
  pricingSheet: DollarSign,
  caseStudy: Target,
  roiCalculator: DollarSign,
  launchPlan: Calendar,
};

const AssetCard = ({
  asset,
  className = '',
}) => {
  const Icon = ASSET_TYPE_ICONS[asset.assetType] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`card card-hover group relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Asset preview/icon */}
      <div className="relative mb-4 bg-gradient-to-br from-tt-navy-light to-tt-navy rounded-lg aspect-video flex items-center justify-center overflow-hidden">
        {asset.thumbnailUrl ? (
          <img
            src={asset.thumbnailUrl}
            alt={asset.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon size={48} className="text-tt-teal opacity-80" />
        )}

        {/* Status badge */}
        {asset.status && (
          <div className="absolute top-2 right-2">
            <span
              className={`badge ${
                asset.status === 'ready'
                  ? 'badge-success'
                  : asset.status === 'draft'
                  ? 'badge-warning'
                  : 'badge-primary'
              }`}
            >
              {asset.status}
            </span>
          </div>
        )}
      </div>

      {/* Asset info */}
      <div className="mb-4">
        <h3 className="text-lg font-heading font-semibold text-tt-navy-dark mb-1">
          {asset.title}
        </h3>
        {asset.description && (
          <p className="text-sm text-tt-grey-dark line-clamp-2">
            {asset.description}
          </p>
        )}
      </div>

      {/* Asset metadata */}
      {asset.lastUpdated && (
        <div className="text-xs text-tt-grey">
          Updated {new Date(asset.lastUpdated).toLocaleDateString()}
        </div>
      )}

      {/* Click hint */}
      <div className="mt-4 text-center text-sm text-tt-teal opacity-0 group-hover:opacity-100 transition-opacity">
        Click to customize →
      </div>

      {/* Hover effect gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tt-teal to-tt-gold opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

AssetCard.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    assetType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    fileName: PropTypes.string,
    status: PropTypes.oneOf(['ready', 'draft', 'processing']),
    lastUpdated: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

export default AssetCard;
