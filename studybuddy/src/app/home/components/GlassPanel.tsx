'use client';

import React, { useRef, useEffect, useState } from 'react';
import HeroWaveform from './HeroWaveForm';

interface GlassPanelProps {
  variant: 'left' | 'center' | 'right';
  question: string;
  grade: string;
  subject: string;
  active?: boolean;
  delay?: number;
}

export default function GlassPanel({
  variant,
  question,
  grade,
  subject,
  active = false,
  delay = 0,
}: GlassPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const sizeClasses = {
    left: 'w-56 h-64',
    center: 'w-72 h-80',
    right: 'w-56 h-64',
  };

  const rotations = {
    left: '-rotate-3',
    center: 'rotate-0',
    right: 'rotate-3',
  };

  const waveColors = {
    left: '#4DA8DA',
    center: '#F5A623',
    right: '#4DA8DA',
  };

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      className={`glass-panel rounded-2xl p-5 relative overflow-hidden cursor-pointer ${sizeClasses[variant]} ${rotations[variant]} reveal stagger-${delay}`}
      style={{ animationDelay: `${delay * 0.15}s` }}
    >
      {/* Light refraction effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-150"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(77,168,218,0.15) 0%, transparent 60%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: variant === 'center' ?'linear-gradient(90deg, transparent, rgba(245,166,35,0.6), transparent)' :'linear-gradient(90deg, transparent, rgba(77,168,218,0.4), transparent)',
        }}
      />

      {/* Grade badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            background: variant === 'center' ? 'rgba(245,166,35,0.15)' : 'rgba(77,168,218,0.15)',
            color: variant === 'center' ? '#F5A623' : '#4DA8DA',
            border: `1px solid ${variant === 'center' ? 'rgba(245,166,35,0.3)' : 'rgba(77,168,218,0.3)'}`,
          }}
        >
          {grade}
        </span>
        <span className="text-[10px] text-gray-worn font-medium">{subject}</span>
      </div>

      {/* Question text */}
      <p
        className="font-jakarta text-sm font-semibold leading-snug mb-4"
        style={{ color: '#F4F7FA' }}
      >
        "{question}"
      </p>

      {/* Waveform */}
      <div className="mt-auto">
        <HeroWaveform
          color={waveColors[variant]}
          barCount={variant === 'center' ? 28 : 18}
          size={variant === 'center' ? 'md' : 'sm'}
          active={active || variant === 'center'}
        />
      </div>

      {/* Status dot */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: variant === 'center' ? '#F5A623' : '#4DA8DA' }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: variant === 'center' ? '#F5A623' : '#4DA8DA' }}
          />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-worn">
          {variant === 'center' ? 'Responding' : 'Listening'}
        </span>
      </div>
    </div>
  );
}