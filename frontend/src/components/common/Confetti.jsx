import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// Tim's brand colors for confetti
const COLORS = [
  '#0B2545', // Navy Dark
  '#13315C', // Navy
  '#1E4976', // Navy Light
  '#3ABAB4', // Teal
  '#5DD5CF', // Teal Light
  '#D4AF37', // Gold
  '#E5C862', // Gold Light
];

// Generate random confetti particle
const createParticle = (index) => {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const startX = Math.random() * window.innerWidth;
  const startRotation = Math.random() * 360;
  const size = Math.random() * 8 + 6; // 6-14px
  const delay = Math.random() * 0.3; // 0-0.3s delay
  const duration = Math.random() * 2 + 2; // 2-4s duration
  const drift = (Math.random() - 0.5) * 200; // Horizontal drift

  return {
    id: `confetti-${index}`,
    color,
    startX,
    startRotation,
    size,
    delay,
    duration,
    drift,
  };
};

// Individual confetti particle component
const ConfettiParticle = ({ particle }) => {
  const variants = {
    initial: {
      x: particle.startX,
      y: -20,
      rotate: particle.startRotation,
      opacity: 1,
    },
    animate: {
      x: particle.startX + particle.drift,
      y: window.innerHeight + 20,
      rotate: particle.startRotation + 720, // Two full rotations
      opacity: [1, 1, 0.8, 0],
      transition: {
        duration: particle.duration,
        delay: particle.delay,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      style={{
        position: 'fixed',
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

ConfettiParticle.propTypes = {
  particle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    startX: PropTypes.number.isRequired,
    startRotation: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    drift: PropTypes.number.isRequired,
  }).isRequired,
};

// Main confetti component
const Confetti = ({ count = 60, duration = 3000, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: count }, (_, i) =>
      createParticle(i)
    );
    setParticles(newParticles);

    // Auto cleanup
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [count, duration, onComplete]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <ConfettiParticle key={particle.id} particle={particle} />
      ))}
    </div>
  );
};

Confetti.propTypes = {
  count: PropTypes.number,
  duration: PropTypes.number,
  onComplete: PropTypes.func,
};

export default Confetti;
