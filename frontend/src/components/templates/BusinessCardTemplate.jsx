import React from 'react';
import PropTypes from 'prop-types';

const BusinessCardTemplate = ({ variation, data }) => {
  const {
    fullName,
    tagline,
    email,
    phone,
    website,
    instagram,
    primaryColor,
    secondaryColor,
    logoUrl,
  } = data;

  // Classic Design
  if (variation === 'classic') {
    return (
      <div className="relative" style={{ width: '3.5in', height: '2in' }}>
        {/* Front Side */}
        <div className="absolute inset-0 bg-white rounded-lg shadow-2xl p-6 flex flex-col justify-between border"
          style={{ borderColor: `${primaryColor}40` }}>
          <div>
            {logoUrl && (
              <img src={logoUrl} alt="Logo" className="h-8 mb-3 object-contain" style={{ maxWidth: '120px' }} />
            )}
            <h2 className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>
              {fullName}
            </h2>
            <p className="text-sm italic text-gray-600">
              {tagline}
            </p>
          </div>

          <div className="space-y-1 text-xs text-gray-700">
            <div className="flex items-center">
              <span className="mr-2">📧</span>
              <span>{email}</span>
            </div>
            {phone && (
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <span>{phone}</span>
              </div>
            )}
            {website && (
              <div className="flex items-center">
                <span className="mr-2">🌐</span>
                <span>{website}</span>
              </div>
            )}
            {instagram && (
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                <span>@{instagram}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Modern Design
  if (variation === 'modern') {
    return (
      <div className="relative" style={{ width: '3.5in', height: '2in' }}>
        <div className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}>
          <div className="absolute inset-0 opacity-10">
            <div style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 2px, transparent 2px)',
              backgroundSize: '30px 30px',
              height: '100%',
              width: '100%'
            }} />
          </div>

          <div className="relative h-full flex flex-col justify-between p-6 text-white">
            <div>
              {logoUrl && (
                <img src={logoUrl} alt="Logo" className="h-8 mb-3 object-contain brightness-0 invert"
                  style={{ maxWidth: '120px' }} />
              )}
              <h2 className="text-3xl font-bold mb-1">
                {fullName}
              </h2>
              <div className="w-16 h-1 bg-white mb-2" />
              <p className="text-sm font-light">
                {tagline}
              </p>
            </div>

            <div className="space-y-0.5 text-xs font-light">
              <div>{email}</div>
              {phone && <div>{phone}</div>}
              {website && <div>{website}</div>}
              {instagram && <div>@{instagram}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bold Design
  if (variation === 'bold') {
    return (
      <div className="relative" style={{ width: '3.5in', height: '2in' }}>
        <div className="absolute inset-0 bg-black rounded-lg shadow-2xl overflow-hidden">
          {/* Accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-3"
            style={{ background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }} />

          <div className="relative h-full flex flex-col justify-between p-6 pt-8 text-white">
            <div>
              <h2 className="text-4xl font-black mb-1 tracking-tight">
                {fullName.toUpperCase()}
              </h2>
              <p className="text-base font-light" style={{ color: secondaryColor }}>
                {tagline}
              </p>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wide">Email</div>
                  <div className="font-medium">{email}</div>
                </div>
                {phone && (
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase tracking-wide">Phone</div>
                    <div className="font-medium">{phone}</div>
                  </div>
                )}
                {website && (
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase tracking-wide">Web</div>
                    <div className="font-medium">{website}</div>
                  </div>
                )}
                {instagram && (
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase tracking-wide">Instagram</div>
                    <div className="font-medium">@{instagram}</div>
                  </div>
                )}
              </div>

              {logoUrl && (
                <div className="mt-3 flex justify-end">
                  <img src={logoUrl} alt="Logo" className="h-6 object-contain brightness-0 invert opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

BusinessCardTemplate.propTypes = {
  variation: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default BusinessCardTemplate;
