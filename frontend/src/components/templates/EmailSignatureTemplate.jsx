import React from 'react';
import PropTypes from 'prop-types';

const EmailSignatureTemplate = ({ variation, data }) => {
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
    photoUrl,
  } = data;

  // Simple Design
  if (variation === 'simple') {
    return (
      <div className="bg-white p-6 max-w-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            <tr>
              {photoUrl && (
                <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
                  <img src={photoUrl} alt={fullName}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }} />
                </td>
              )}
              <td style={{ verticalAlign: 'top' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: primaryColor,
                  marginBottom: '4px'
                }}>
                  {fullName}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  fontStyle: 'italic',
                  marginBottom: '12px'
                }}>
                  {tagline}
                </div>
                <div style={{ fontSize: '13px', color: '#555', lineHeight: '20px' }}>
                  <div style={{ marginBottom: '4px' }}>
                    <span style={{ color: primaryColor }}>✉</span> {email}
                  </div>
                  {phone && (
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{ color: primaryColor }}>☎</span> {phone}
                    </div>
                  )}
                  {website && (
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{ color: primaryColor }}>🌐</span>{' '}
                      <a href={`https://${website}`} style={{ color: secondaryColor, textDecoration: 'none' }}>
                        {website}
                      </a>
                    </div>
                  )}
                  {instagram && (
                    <div>
                      <span style={{ color: primaryColor }}>📱</span> @{instagram}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Detailed Design
  if (variation === 'detailed') {
    return (
      <div className="bg-white p-6 max-w-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>
        <table cellPadding="0" cellSpacing="0" border="0" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <table cellPadding="0" cellSpacing="0" border="0">
                  <tbody>
                    <tr>
                      {(photoUrl || logoUrl) && (
                        <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
                          {photoUrl ? (
                            <img src={photoUrl} alt={fullName}
                              style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                border: `3px solid ${primaryColor}`
                              }} />
                          ) : logoUrl && (
                            <img src={logoUrl} alt="Logo"
                              style={{
                                width: '100px',
                                height: 'auto',
                                maxHeight: '100px',
                                objectFit: 'contain'
                              }} />
                          )}
                        </td>
                      )}
                      <td style={{ verticalAlign: 'top' }}>
                        <div style={{
                          fontSize: '22px',
                          fontWeight: 'bold',
                          color: primaryColor,
                          marginBottom: '2px'
                        }}>
                          {fullName}
                        </div>
                        <div style={{
                          width: '50px',
                          height: '3px',
                          backgroundColor: secondaryColor,
                          marginBottom: '8px'
                        }} />
                        <div style={{
                          fontSize: '15px',
                          color: '#666',
                          fontStyle: 'italic',
                          marginBottom: '16px'
                        }}>
                          {tagline}
                        </div>
                        <table cellPadding="0" cellSpacing="0" border="0">
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  fontSize: '13px',
                                  paddingBottom: '6px',
                                  paddingRight: '10px',
                                  verticalAlign: 'top',
                                  width: '80px',
                                  fontWeight: 'bold',
                                  color: primaryColor,
                                }}
                              >
                                Email:
                              </td>
                              <td style={{ fontSize: '13px', color: '#555', paddingBottom: '6px' }}>
                                <a href={`mailto:${email}`} style={{ color: secondaryColor, textDecoration: 'none' }}>
                                  {email}
                                </a>
                              </td>
                            </tr>
                            {phone && (
                              <tr>
                                <td style={{
                                  fontSize: '13px',
                                  paddingBottom: '6px',
                                  paddingRight: '10px',
                                  fontWeight: 'bold',
                                  color: primaryColor
                                }}>
                                  Phone:
                                </td>
                                <td style={{ fontSize: '13px', color: '#555', paddingBottom: '6px' }}>
                                  {phone}
                                </td>
                              </tr>
                            )}
                            {website && (
                              <tr>
                                <td style={{
                                  fontSize: '13px',
                                  paddingBottom: '6px',
                                  paddingRight: '10px',
                                  fontWeight: 'bold',
                                  color: primaryColor
                                }}>
                                  Website:
                                </td>
                                <td style={{ fontSize: '13px', paddingBottom: '6px' }}>
                                  <a href={`https://${website}`} style={{ color: secondaryColor, textDecoration: 'none' }}>
                                    {website}
                                  </a>
                                </td>
                              </tr>
                            )}
                            {instagram && (
                              <tr>
                                <td style={{
                                  fontSize: '13px',
                                  paddingBottom: '6px',
                                  paddingRight: '10px',
                                  fontWeight: 'bold',
                                  color: primaryColor
                                }}>
                                  Instagram:
                                </td>
                                <td style={{ fontSize: '13px', color: '#555', paddingBottom: '6px' }}>
                                  @{instagram}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: `2px solid ${primaryColor}40`,
                  fontSize: '11px',
                  color: '#999'
                }}>
                  🌬️ Transform Your Life Through Breathwork
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

EmailSignatureTemplate.propTypes = {
  variation: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default EmailSignatureTemplate;
