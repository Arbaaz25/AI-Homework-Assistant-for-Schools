'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const SAMPLE_IMAGE = {
  src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
  alt: 'Handwritten math homework showing algebra equations: solve for x in 2x + 5 = 13 and 3x - 7 = 14',
};

const EXPLANATION_STEPS = [
  { step: '01', text: 'Isolate the variable — subtract 5 from both sides: 2x = 8' },
  { step: '02', text: 'Divide both sides by 2: x = 4' },
  { step: '03', text: 'Check: 2(4) + 5 = 13 ✓ — your answer is correct!' },
];

export default function HeroSection() {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: '#1E2A3A' }}>
      <div className="noise-overlay" />
      <div className="grid-bg absolute inset-0 opacity-30" />

      {/* Subtle glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(77,168,218,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Status badge */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(77,168,218,0.1)',
              border: '1px solid rgba(77,168,218,0.2)',
              color: '#4DA8DA',
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-400" />
            </span>
            AI Homework Assistant · Built for Schools
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-12">
          <h1
            className="font-jakarta font-extrabold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', color: '#F4F7FA' }}
          >
            Upload a homework question.
            <br />
            <span style={{ color: '#4DA8DA' }}>Get a real explanation.</span>
          </h1>
          <p className="text-base md:text-lg font-medium max-w-2xl mx-auto" style={{ color: '#6B7B8D' }}>
            Students photograph any homework problem. Syllabus reads it and delivers step-by-step concept explanations — not just answers. Built for K–12 districts.
          </p>
        </div>

        {/* Main demo: image + explanation side by side */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(77,168,218,0.18)',
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-2">
              <Icon name="PhotoIcon" size={14} style={{ color: '#4DA8DA' }} />
              <span className="text-xs font-semibold" style={{ color: '#4DA8DA' }}>Sample Homework Image</span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(77,168,218,0.12)', color: '#4DA8DA', border: '1px solid rgba(77,168,218,0.2)' }}
              >
                Math · Grade 8
              </span>
            </div>
         
          </div>

          <div className="grid md:grid-cols-2">
            {/* Left: homework image */}
            <div
              className="relative flex flex-col items-center justify-center p-6 gap-4"
              style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(77,168,218,0.15)', maxHeight: '260px' }}
              >
                <AppImage
                  src={SAMPLE_IMAGE.src}
                  alt={SAMPLE_IMAGE.alt}
                  width={560}
                  height={260}
                  className="w-full object-cover"
                  style={{ filter: 'brightness(0.9) contrast(1.05)' }}
                />
                {/* Scan overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(30,42,58,0.35)' }}
                >
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(30,42,58,0.85)', border: '1px solid rgba(77,168,218,0.3)' }}
                  >
                    <Icon name="MagnifyingGlassIcon" size={13} style={{ color: '#4DA8DA' }} />
                    <span className="text-xs font-semibold" style={{ color: '#4DA8DA' }}>Question detected</span>
                  </div>
                </div>
              </div>

              {/* Upload CTA */}
              <Link
                href="/assistant"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: 'rgba(77,168,218,0.1)',
                  border: '1px dashed rgba(77,168,218,0.35)',
                  color: '#4DA8DA',
                }}
              >
                <Icon name="ArrowUpTrayIcon" size={15} />
                Upload your own image
              </Link>
            </div>

            {/* Right: AI explanation */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(245,166,35,0.15)' }}
                >
                  <Icon name="SparklesIcon" size={12} style={{ color: '#F5A623' }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5A623' }}>
                  Study Buddy · Step-by-step explanation
                </span>
              </div>

              {/* Detected question */}
              <div
                className="rounded-xl p-3"
                style={{ background: 'rgba(77,168,218,0.06)', border: '1px solid rgba(77,168,218,0.12)' }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: '#6B7B8D' }}>Detected question:</p>
                <p className="text-sm font-semibold font-jakarta" style={{ color: '#F4F7FA' }}>
                  "Solve for x: 2x + 5 = 13"
                </p>
              </div>

              {/* Hint first */}
              <div
                className="rounded-xl p-3"
                style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)' }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon name="LightBulbIcon" size={12} style={{ color: '#F5A623' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#F5A623' }}>Hint first</span>
                </div>
                <p className="text-xs font-medium leading-relaxed" style={{ color: '#8A9AAD' }}>
                  What operation would help you get x alone on one side of the equation?
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {EXPLANATION_STEPS.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl p-3"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 font-jakarta"
                      style={{ background: 'rgba(77,168,218,0.15)', color: '#4DA8DA' }}
                    >
                      {s.step}
                    </div>
                    <p className="text-xs font-medium leading-relaxed" style={{ color: '#8A9AAD' }}>
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/assistant"
                className="gold-btn text-slate-deep font-bold px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-gold mt-1"
              >
                <Icon name="ArrowUpTrayIcon" size={14} variant="solid" />
                Try with your own question
              </Link>
            </div>
          </div>
        </div>

        {/* District trust row */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: 'ShieldCheckIcon', label: 'FERPA Compliant' },
            { icon: 'BuildingLibraryIcon', label: 'LMS Integrations' },
            { icon: 'AcademicCapIcon', label: 'K–12 Curriculum Aligned' },
            { icon: 'ChartBarIcon', label: 'District Analytics' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Icon name={item.icon as any} size={13} style={{ color: '#4DA8DA' }} />
              <span className="text-xs font-semibold" style={{ color: '#6B7B8D' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}