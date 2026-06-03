import React from 'react';

const StatusBadge = ({ status = '', className = '' }) => {
  const s = status ? status.toLowerCase().trim() : '';

  let config = {
    text: '#FB923C',
    bg: 'rgba(249, 115, 22, 0.08)',
    borderColorHex: '#F97316',
    glow: '0 0 12px rgba(249, 115, 22, 0.25), 0 0 24px rgba(249, 115, 22, 0.15)',
    dotColor: '#FB923C',
    dotAnim: ''
  };

  if (s === 'active') {
    config = {
      text: '#22C55E',
      bg: 'rgba(34, 197, 94, 0.08)',
      borderColorHex: '#22C55E',
      glow: '0 0 12px rgba(34, 197, 94, 0.25), 0 0 24px rgba(34, 197, 94, 0.15)',
      dotColor: '#22C55E',
      dotAnim: 'animate-pulse'
    };
  } else if (s === 'completed') {
    config = {
      text: '#3DB8FF',
      bg: 'rgba(30, 167, 255, 0.08)',
      borderColorHex: '#1EA7FF',
      glow: '0 0 12px rgba(30, 167, 255, 0.25), 0 0 24px rgba(30, 167, 255, 0.15)',
      dotColor: '#3DB8FF',
      dotAnim: ''
    };
  } else if (s === 'on hold') {
    config = {
      text: '#FB923C',
      bg: 'rgba(249, 115, 22, 0.08)',
      borderColorHex: '#F97316',
      glow: '0 0 12px rgba(249, 115, 22, 0.25), 0 0 24px rgba(249, 115, 22, 0.15)',
      dotColor: '#FB923C',
      dotAnim: ''
    };
  }

  const style = {
    color: config.text,
    backgroundColor: config.bg,
    borderColor: config.borderColorHex,
    boxShadow: config.glow,
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span 
        style={style}
        className="font-bold text-[9px] sm:text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center space-x-2 border transition-all duration-300 hover:scale-[1.02] cursor-default"
      >
        <span 
          style={{ backgroundColor: config.dotColor }}
          className={`h-1.5 w-1.5 rounded-full ${config.dotAnim}`} 
        />
        <span>{status || 'Unknown'}</span>
      </span>
    </div>
  );
};

export default StatusBadge;
