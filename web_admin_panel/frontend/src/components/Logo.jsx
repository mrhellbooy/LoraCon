import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 40, className, isConnected = true, isConnecting = false }) => {
  const neonColor = isConnected ? "#22c55e" : isConnecting ? "#f97316" : "#64748b";
  
  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`} 
      style={{ width: size, height: size }}
      animate={{ 
        scale: isConnecting ? [1, 1.05, 1] : [1, 1.02, 1],
        filter: isConnecting ? ["brightness(1)", "brightness(1.5)", "brightness(1)"] : "none"
      }}
      transition={{ 
        duration: isConnecting ? 1 : 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Legs */}
        {[1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            <motion.line
              x1="25" y1={30 + i * 15} x2="15" y2={30 + i * 15}
              stroke={neonColor} strokeWidth="4" strokeLinecap="round"
              animate={{ x2: [15, 10, 15], y2: [30 + i * 15, 30 + i * 15 - 5, 30 + i * 15] }}
              transition={{ repeat: Infinity, duration: isConnecting ? 0.4 : 1.5, delay: i * 0.1 }}
            />
            <motion.line
              x1="75" y1={30 + i * 15} x2="85" y2={30 + i * 15}
              stroke={neonColor} strokeWidth="4" strokeLinecap="round"
              animate={{ x2: [85, 90, 85], y2: [30 + i * 15, 30 + i * 15 + 5, 30 + i * 15] }}
              transition={{ repeat: Infinity, duration: isConnecting ? 0.4 : 1.5, delay: i * 0.1 }}
            />
          </React.Fragment>
        ))}

        {/* Body Segments */}
        {[0, 1, 2, 3, 4].map((i) => {
          const widths = [40, 50, 60, 50, 30];
          const heights = [15, 18, 20, 18, 15];
          const yOffsets = [20, 32, 45, 58, 70];
          return (
            <motion.rect
              key={i}
              x={50 - widths[i] / 2}
              y={yOffsets[i]}
              width={widths[i]}
              height={heights[i]}
              rx="8"
              fill="#1e293b"
              stroke={neonColor}
              strokeWidth="1.5"
              animate={{
                scaleX: [0.95, 1.05, 0.95],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            />
          );
        })}

        {/* Eyes */}
        <motion.circle 
          cx="40" cy="30" r="10" fill="#030711" 
          animate={{ r: [10, 11, 10] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.circle 
          cx="60" cy="30" r="10" fill="#030711" 
          animate={{ r: [10, 11, 10] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        {/* Pupils */}
        <motion.circle 
          cx="42" cy="30" r="4" fill={neonColor} 
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
          transition={{ repeat: Infinity, duration: isConnecting ? 0.5 : 2 }}
        />
        <motion.circle 
          cx="62" cy="30" r="4" fill={neonColor} 
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
          transition={{ repeat: Infinity, duration: isConnecting ? 0.5 : 2 }}
        />

        {/* Antennae */}
        <motion.line
          x1="40" y1="20" x2="30" y2="10"
          stroke={neonColor} strokeWidth="3" strokeLinecap="round"
          animate={{ x2: [30, 25, 30], y2: [10, 5, 10] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.line
          x1="60" y1="20" x2="70" y2="10"
          stroke={neonColor} strokeWidth="3" strokeLinecap="round"
          animate={{ x2: [70, 75, 70], y2: [10, 5, 10] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </svg>
    </div>
  );
};

export default Logo;
