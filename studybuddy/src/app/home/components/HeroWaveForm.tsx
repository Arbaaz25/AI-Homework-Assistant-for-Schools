'use client';

import React, { useEffect, useRef } from 'react';

interface HeroWaveformProps {
  color?: string;
  barCount?: number;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export default function HeroWaveform({
  color = '#4DA8DA',
  barCount = 20,
  size = 'md',
  active = true,
}: HeroWaveformProps) {
  const heights = {
    sm: 24,
    md: 40,
    lg: 56,
  };

  const maxH = heights[size];

  return (
    <div className="flex items-center gap-[3px]" style={{ height: maxH }}>
      {Array.from({ length: barCount }).map((_, i) => {
        const duration = 0.6 + Math.random() * 0.8;
        const delay = (i / barCount) * 0.6;
        const baseH = active ? (10 + Math.random() * 70) : 15;
        return (
          <div
            key={i}
            className="wave-bar rounded-full flex-shrink-0"
            style={{
              width: size === 'sm' ? 2 : size === 'md' ? 3 : 4,
              height: `${baseH}%`,
              backgroundColor: color,
              opacity: active ? 0.7 + Math.random() * 0.3 : 0.3,
              '--duration': `${duration}s`,
              '--delay': `${delay}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}