'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const CASE_STUDIES = [
  {
    district: 'Riverside Unified School District',
    location: 'Riverside, CA',
    size: '28,400 students · 42 schools',
    grade: 'K–8',
    color: '#4DA8DA',
    tagColor: 'rgba(77,168,218,0.15)',
    tagBorder: 'rgba(77,168,218,0.3)',
    headline: 'Closed the achievement gap by 34% in one semester',
    body: 'Riverside piloted Syllabus across 18 elementary schools. With 1:1 AI tutoring available in English and Spanish, students who previously fell behind in math showed measurable acceleration within 8 weeks.',
    stats: [
      { label: 'Math proficiency improvement', value: '+34%' },
      { label: 'Reduction in aide overtime', value: '$2.1M' },
      { label: 'Teacher satisfaction', value: '9.2/10' },
    ],
    quote: 'For the first time, every child in my classroom has access to a patient tutor.',
    author: 'Marcus Webb',
    role: 'Principal, Jefferson Elementary',
    image: 'https://images.unsplash.com/photo-1662946979416-697d1116691f',
    imageAlt: 'Elementary school students engaged in learning at colorful desks',
  },
  {
    district: 'Northfield Township High Schools',
    location: 'Northfield, IL',
    size: '6,200 students · 3 high schools',
    grade: 'Grades 9–12',
    color: '#F5A623',
    tagColor: 'rgba(245,166,35,0.12)',
    tagBorder: 'rgba(245,166,35,0.3)',
    headline: 'AP pass rates up 28% — without adding a single tutor',
    body: "Northfield used Syllabus to deliver differentiated AP prep across all 7 AP subjects. Students accessed on-demand essay coaching and concept review, closing the gap between students with and without private tutors.",
    stats: [
      { label: 'AP exam pass rate increase', value: '+28%' },
      { label: 'Students using daily', value: '94%' },
      { label: 'Avg. daily tutoring per student', value: '22 min' },
    ],
    quote: 'My students used to email me at 11 PM before an AP test. Now they ask Syllabus.',
    author: 'Dr. Sarah Chen',
    role: 'AP History Department Chair',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_17aac765a-1772199017249.png',
    imageAlt: 'High school students in classroom focused on learning with books and laptops',
  },
  {
    district: 'Green Valley Middle District',
    location: 'Phoenix, AZ',
    size: '11,800 students · 16 schools',
    grade: 'Grades 6–8',
    color: '#4DA8DA',
    tagColor: 'rgba(77,168,218,0.15)',
    tagBorder: 'rgba(77,168,218,0.3)',
    headline: 'Replaced $1.4M in aide contracts with better outcomes',
    body: "Facing a budget shortfall, Green Valley proposed Syllabus as a bridge between teacher capacity and student need. The district reallocated aide hours toward social-emotional support while Syllabus handled academic Q&A.",
    stats: [
      { label: 'Annual aide contract savings', value: '$1.4M' },
      { label: 'Reading level gains increase', value: '+41%' },
      { label: 'Pilot-to-district expansion', value: '6 weeks' },
    ],
    quote: 'The board asked how we improved outcomes while cutting costs. The answer was Syllabus.',
    author: 'Jennifer Morales',
    role: 'District Technology Coordinator',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16aea19e2-1764661578906.png',
    imageAlt: 'Middle school students collaborating on tablets in a modern classroom',
  },
];

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-scale').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="districts"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1E2A3A 0%, #1a3352 100%)' }}
    >
      <div className="noise-overlay" />
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(77,168,218,0.1)', border: '1px solid rgba(77,168,218,0.2)', color: '#4DA8DA' }}
          >
            <Icon name="FolderOpenIcon" size={12} variant="solid" />
            Case Studies
          </div>
          <h2
            className="font-jakarta font-extrabold mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F4F7FA', lineHeight: 1.1 }}
          >
            Real districts. Measurable results.
          </h2>
          <p className="text-base font-medium max-w-lg" style={{ color: '#6B7B8D' }}>
            Three districts that deployed Syllabus and what they measured after one semester.
          </p>
        </div>

        {/* Case study cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {CASE_STUDIES?.map((study, i) => (
            <div
              key={i}
              className={`glass-panel rounded-2xl overflow-hidden reveal stagger-${i + 1}`}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <AppImage
                  src={study?.image}
                  alt={study?.imageAlt}
                  fill
                  className="object-cover"
                  style={{ filter: 'brightness(0.55) saturate(0.7)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(30,42,58,0.95) 100%)' }}
                />
                <div
                  className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: study?.tagColor, border: `1px solid ${study?.tagBorder}` }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: study?.color }}>
                    {study?.grade}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-0.5">
                    {study?.location}
                  </p>
                  <h3 className="font-jakarta font-bold text-sm leading-snug" style={{ color: '#F4F7FA' }}>
                    {study?.district}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h4 className="font-jakarta font-bold text-sm leading-snug mb-2" style={{ color: study?.color }}>
                  {study?.headline}
                </h4>
                <p className="text-xs font-medium leading-relaxed mb-4" style={{ color: '#8A9AAD' }}>
                  {study?.body}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {study?.stats?.map((stat, j) => (
                    <div
                      key={j}
                      className="rounded-lg p-2.5 text-center"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="font-jakarta font-extrabold text-base leading-none mb-1" style={{ color: study?.color }}>
                        {stat?.value}
                      </div>
                      <div className="text-[9px] font-medium leading-tight" style={{ color: '#6B7B8D' }}>
                        {stat?.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div
                  className="rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-xs font-medium italic leading-relaxed mb-2" style={{ color: '#F4F7FA' }}>
                    "{study?.quote}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: `${study?.color}20`, color: study?.color }}
                    >
                      {study?.author?.[0]}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold" style={{ color: '#F4F7FA' }}>{study?.author}</p>
                      <p className="text-[9px] font-medium" style={{ color: '#6B7B8D' }}>{study?.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
