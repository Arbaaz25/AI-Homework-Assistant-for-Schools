'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from './components/HeroSection';

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(
              '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-scale:not(.visible)'
            );
            reveals.forEach((el, i) => {
              const delay = parseInt(
                el.classList.contains('stagger-1') ? '100' :
                el.classList.contains('stagger-2') ? '200' :
                el.classList.contains('stagger-3') ? '300' :
                el.classList.contains('stagger-4') ? '400' :
                el.classList.contains('stagger-5') ? '500' : '0'
              );
              setTimeout(() => el.classList.add('visible'), delay);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('section')?.forEach((section) => {
      observer?.observe(section);
    });

    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')?.forEach((el) => {
      elementObserver?.observe(el);
    });

    return () => {
      observer?.disconnect();
      elementObserver?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#1E2A3A' }}>
      <div className="noise-overlay" />
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}