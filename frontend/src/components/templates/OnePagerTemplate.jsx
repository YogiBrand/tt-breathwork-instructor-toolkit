import React from 'react';
import PropTypes from 'prop-types';

const OnePagerTemplate = ({ variation, data }) => {
  const {
    fullName,
    tagline,
    email,
    phone,
    website,
    instagram,
    bio,
    approach,
    credentials,
    services,
    testimonial,
    primaryColor,
    secondaryColor,
    photoUrl,
    logoUrl,
  } = data;

  // Modern & Clean Template
  if (variation === 'modern') {
    return (
      <div className="w-[816px] h-[1056px] bg-white shadow-2xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Header with Photo */}
        <div className="relative h-64 overflow-hidden" style={{ backgroundColor: primaryColor }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="relative h-full flex items-center justify-between px-12">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                {fullName}
              </h1>
              <p className="text-2xl text-white/90 font-light italic">
                {tagline}
              </p>
            </div>
            {photoUrl && (
              <div className="ml-8">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img src={photoUrl} alt={fullName} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-12 py-10">
          {/* About Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {bio || `Certified breathwork facilitator specializing in transformative breathing techniques
              for stress relief, emotional healing, and peak performance. With years of experience and
              a deep passion for holistic wellness, I guide individuals and groups through powerful
              breathwork journeys that unlock their full potential.`}
            </p>
          </div>

          {/* My Approach */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
              My Approach
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {approach || `I blend ancient wisdom with modern neuroscience to create personalized
              breathwork experiences. Every session is tailored to your unique needs, whether you're
              seeking stress relief, emotional release, or enhanced mental clarity.`}
            </p>
          </div>

          {/* Services Grid */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
              Services
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {(services || [
                { name: 'Private Sessions', price: 'From $150' },
                { name: 'Group Classes', price: 'From $40' },
                { name: 'Corporate Workshops', price: 'Custom' },
                { name: 'Online Programs', price: 'From $97' }
              ]).map((service, idx) => (
                <div key={idx} className="p-4 rounded-lg border-2" style={{
                  borderColor: `${primaryColor}20`,
                  backgroundColor: `${primaryColor}05`
                }}>
                  <div className="font-semibold text-gray-800 mb-1">{service.name}</div>
                  <div className="text-sm" style={{ color: secondaryColor }}>{service.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          {credentials && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                Certifications & Training
              </h2>
              <ul className="space-y-2">
                {credentials.split('\n').map((cert, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-3 mt-1.5" style={{ color: secondaryColor }}>✓</span>
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Testimonial */}
          {testimonial && (
            <div className="mb-10 p-6 rounded-lg" style={{ backgroundColor: `${secondaryColor}10` }}>
              <div className="text-4xl mb-3" style={{ color: secondaryColor }}>"</div>
              <p className="text-gray-700 italic leading-relaxed mb-3">
                {testimonial}
              </p>
              <div className="text-sm text-gray-600">— Happy Client</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-12 py-6 border-t-2" style={{ borderColor: `${primaryColor}20` }}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📧</span>
                <span>{email}</span>
              </div>
              {phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📞</span>
                  <span>{phone}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🌐</span>
                  <span>{website}</span>
                </div>
              )}
              {instagram && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📱</span>
                  <span>@{instagram}</span>
                </div>
              )}
            </div>
            {logoUrl && (
              <img src={logoUrl} alt="Logo" className="h-16 object-contain" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Professional Template
  if (variation === 'professional') {
    return (
      <div className="w-[816px] h-[1056px] bg-white shadow-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
        {/* Elegant Header */}
        <div className="border-b-4 px-12 py-10" style={{ borderColor: primaryColor }}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {logoUrl && (
                <img src={logoUrl} alt="Logo" className="h-20 object-contain mb-6" />
              )}
              <h1 className="text-6xl font-serif mb-3" style={{ color: primaryColor, fontWeight: 300 }}>
                {fullName}
              </h1>
              <div className="w-24 h-1 mb-4" style={{ backgroundColor: secondaryColor }} />
              <p className="text-xl text-gray-600 italic">
                {tagline}
              </p>
            </div>
            {photoUrl && (
              <div className="ml-8">
                <div className="w-56 h-56 rounded-sm overflow-hidden border-8" style={{ borderColor: `${primaryColor}20` }}>
                  <img src={photoUrl} alt={fullName} className="w-full h-full object-cover grayscale" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-12 py-10">
          <div className="grid grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-serif mb-4 pb-2 border-b" style={{ color: primaryColor }}>
                  Professional Background
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {bio || `Distinguished breathwork practitioner with extensive training in multiple
                  modalities. Committed to facilitating profound healing experiences through the
                  conscious use of breath.`}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif mb-4 pb-2 border-b" style={{ color: primaryColor }}>
                  Methodology
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {approach || `My practice integrates traditional breathwork techniques with
                  contemporary understanding of nervous system regulation and trauma-informed care.`}
                </p>
              </div>

              {testimonial && (
                <div className="border-l-4 pl-6 py-2" style={{ borderColor: secondaryColor }}>
                  <p className="text-gray-600 italic text-lg leading-relaxed mb-2">
                    "{testimonial}"
                  </p>
                  <p className="text-sm text-gray-500">— Client Testimonial</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif mb-3 pb-2 border-b" style={{ color: primaryColor }}>
                  Services
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {(services || [
                    { name: 'Private Sessions' },
                    { name: 'Group Workshops' },
                    { name: 'Corporate Training' },
                    { name: 'Online Courses' }
                  ]).map((service, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2" style={{ color: secondaryColor }}>•</span>
                      <span>{service.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {credentials && (
                <div>
                  <h3 className="text-lg font-serif mb-3 pb-2 border-b" style={{ color: primaryColor }}>
                    Credentials
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {credentials.split('\n').map((cert, idx) => (
                      <li key={idx}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t">
                <h3 className="text-lg font-serif mb-3" style={{ color: primaryColor }}>
                  Contact
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>{email}</div>
                  {phone && <div>{phone}</div>}
                  {website && <div>{website}</div>}
                  {instagram && <div>@{instagram}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Creative & Bold Template
  if (variation === 'creative') {
    return (
      <div className="w-[816px] h-[1056px] bg-gradient-to-br shadow-2xl mx-auto overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          fontFamily: 'system-ui, sans-serif'
        }}>
        {/* Overlapping Photo Header */}
        <div className="relative h-80">
          <div className="absolute inset-0 bg-black/20" />
          {photoUrl && (
            <img src={photoUrl} alt={fullName} className="w-full h-full object-cover" />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 to-transparent">
            <h1 className="text-6xl font-black text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              {fullName}
            </h1>
            <p className="text-3xl text-white/90 font-light">
              {tagline}
            </p>
          </div>
        </div>

        {/* Content Panels */}
        <div className="p-12 space-y-6">
          {/* Bio Panel */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-black mb-4" style={{ color: primaryColor }}>
              ABOUT ME
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {bio || `Transform your life through the power of breath. I'm a passionate breathwork
              facilitator dedicated to helping you unlock your full potential through conscious breathing.`}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-4">
            {(services || [
              { name: 'Private Sessions', desc: '1-on-1 Breathwork' },
              { name: 'Group Events', desc: 'Community Healing' },
              { name: 'Corporate Wellness', desc: 'Team Building' },
              { name: 'Digital Courses', desc: 'Learn Anywhere' }
            ]).map((service, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                <h3 className="font-black text-xl mb-2" style={{ color: primaryColor }}>
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.desc || service.price}</p>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center" style={{ color: primaryColor }}>
                  <span className="text-2xl mr-2">✉️</span>
                  <span className="font-medium">{email}</span>
                </div>
                {phone && (
                  <div className="flex items-center" style={{ color: primaryColor }}>
                    <span className="text-2xl mr-2">📱</span>
                    <span className="font-medium">{phone}</span>
                  </div>
                )}
                {website && (
                  <div className="flex items-center" style={{ color: primaryColor }}>
                    <span className="text-2xl mr-2">🌐</span>
                    <span className="font-medium">{website}</span>
                  </div>
                )}
              </div>
              {logoUrl && (
                <img src={logoUrl} alt="Logo" className="h-12 object-contain" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

OnePagerTemplate.propTypes = {
  variation: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default OnePagerTemplate;
