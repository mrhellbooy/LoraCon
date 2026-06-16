import React from 'react';

const Logo = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2v10l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default Logo;
