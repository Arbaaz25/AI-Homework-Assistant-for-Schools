'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-deep/80 backdrop-blur-xl border-b border-white/5 shadow-deep color-white'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <AppLogo
          text="StudyBuddy"
          iconName="AcademicCapIcon"
          size={28}
          className="text-white"
        />

        <div className="flex items-center gap-3">
          <Link
            href="/assistant"
            className="gold-btn text-white text-sm font-bold px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}