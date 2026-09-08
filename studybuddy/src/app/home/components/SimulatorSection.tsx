'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const GRADE_LEVELS = [
  { value: '3', label: 'Grade 3', subject: 'Math' },
  { value: '5', label: 'Grade 5', subject: 'Reading' },
  { value: '7', label: 'Grade 7', subject: 'Science' },
  { value: '10', label: 'Grade 10', subject: 'History' },
  { value: '12', label: 'Grade 12', subject: 'AP English' },
];

const DEMO_EXCHANGES: Record<string, { question: string; response: string[] }> = {
  '3': {
    question: "What's 3/4 plus 1/2?",
    response: [
      "Great question! Let's think about this together.",
      "To add fractions, we need the same denominator — the bottom number.",
      "1/2 is the same as 2/4. Can you see why? We just doubled both numbers.",
      "So now we have 3/4 + 2/4. When the bottoms match, we just add the tops!",
      "3 + 2 = 5, so our answer is 5/4 — or one and a quarter. 🎉",
    ],
  },
  '5': {
    question: "What does 'infer' mean when I'm reading?",
    response: [
      "Inferring is like being a detective while you read.",
      "The author doesn't always tell you everything directly.",
      "You use clues from the text plus what you already know.",
      "If a character grabs an umbrella before leaving, you infer it might rain.",
      "Try it: what can you infer when a character tiptoes past a room?",
    ],
  },
  '7': {
    question: 'How does photosynthesis actually make energy?',
    response: [
      "Think of a leaf as a tiny solar panel with a built-in kitchen.",
      "Chlorophyll — the green stuff — captures sunlight energy.",
      "That energy splits water molecules: 2H₂O → 4H⁺ + O₂.",
      "The hydrogen ions combine with CO₂ to build glucose — plant food.",
      "The oxygen? That's what you're breathing right now. Plants made it.",
    ],
  },
  '10': {
    question: 'Explain the Missouri Compromise and why it mattered.',
    response: [
      "1820. The US has 22 states — 11 free, 11 slave. Perfect balance in the Senate.",
      "Missouri wants to join as a slave state. That breaks the balance.",
      "Henry Clay brokers a deal: Missouri enters slave, Maine enters free.",
      "A line at 36°30'N splits future territories: north free, south slave.",
      "It held for 34 years — until Kansas-Nebraska tore it apart in 1854.",
    ],
  },
  '12': {
    question: 'How do I structure an argumentative essay for AP English?',
    response: [
      "AP readers want a clear claim they can trace through every paragraph.",
      "Hook → context → thesis. Your thesis should argue, not just state.",
      "Each body paragraph: claim → evidence → analysis → link back to thesis.",
      "The strongest essays acknowledge counterarguments and refute them.",
      "Conclusion: synthesize, don't summarize. What does your argument mean?",
    ],
  },
};

export default function SimulatorSection() {
  const [selectedGrade, setSelectedGrade] = useState('10');
  const [customQuestion, setCustomQuestion] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const exchange = DEMO_EXCHANGES[selectedGrade];

  const resetSimulator = () => {
    setDisplayedLines([]);
    setCurrentLine('');
    setLineIndex(0);
    setCharIndex(0);
    setIsComplete(false);
    setIsRunning(false);
  };

  const startSimulator = () => {
    resetSimulator();
    setTimeout(() => setIsRunning(true), 50);
  };

  useEffect(() => {
    if (!isRunning) return;
    const lines = exchange.response;
    if (lineIndex >= lines.length) {
      setIsComplete(true);
      setIsRunning(false);
      return;
    }
    const line = lines[lineIndex];
    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex((l) => l + 1);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isRunning, lineIndex, charIndex, exchange]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [displayedLines, currentLine]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ask"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1E2A3A 0%, #1a3352 50%, #1E2A3A 100%)' }}
    >
      <div className="noise-overlay" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5"
            style={{
              background: 'rgba(245,166,35,0.12)',
              border: '1px solid rgba(245,166,35,0.25)',
              color: '#F5A623',
            }}
          >
            <Icon name="BoltIcon" size={12} variant="solid" />
            Live Demo
          </div>
          <h2
            className="font-jakarta font-extrabold mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#F4F7FA', lineHeight: 1.1 }}
          >
            See how Syllabus explains.
          </h2>
          <p className="text-base font-medium max-w-lg mx-auto" style={{ color: '#6B7B8D' }}>
            Pick a grade level and watch a real explanation unfold — step by step.
          </p>
        </div>

        {/* Demo card */}
        <div
          className="rounded-2xl overflow-hidden reveal"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(77,168,218,0.15)' }}
        >
          {/* Grade tabs */}
          <div
            className="flex items-center gap-2 px-5 py-3 overflow-x-auto"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
          >
            <span className="text-xs font-semibold text-gray-worn mr-1 flex-shrink-0">Grade:</span>
            {GRADE_LEVELS.map((g) => (
              <button
                key={g.value}
                onClick={() => { setSelectedGrade(g.value); resetSimulator(); }}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: selectedGrade === g.value ? 'rgba(77,168,218,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${selectedGrade === g.value ? 'rgba(77,168,218,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  color: selectedGrade === g.value ? '#4DA8DA' : '#6B7B8D',
                }}
              >
                {g.label} · {g.subject}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2">
            {/* Left: Question */}
            <div
              className="p-6 flex flex-col gap-4"
              style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(77,168,218,0.15)', color: '#4DA8DA' }}
                >
                  S
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-worn">
                  Student · {GRADE_LEVELS.find((g) => g.value === selectedGrade)?.label}
                </span>
              </div>

              {/* Question display */}
              <div
                className="rounded-xl p-4 flex-1"
                style={{ background: 'rgba(77,168,218,0.06)', border: '1px solid rgba(77,168,218,0.12)' }}
              >
                <p className="font-jakarta text-sm font-semibold leading-relaxed" style={{ color: '#F4F7FA' }}>
                  "{exchange.question}"
                </p>
              </div>

              {/* Custom question input */}
              <div>
                <p className="text-xs font-medium text-gray-worn mb-2">Or type your own question:</p>
                <div
                  className="flex gap-2 rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Ask something…"
                    className="flex-1 bg-transparent px-3 py-2 text-xs font-medium outline-none placeholder:text-gray-worn/40"
                    style={{ color: '#F4F7FA' }}
                  />
                  <button
                    className="px-3 py-2 text-xs font-semibold flex-shrink-0 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#6B7B8D' }}
                  >
                    <Icon name="PaperAirplaneIcon" size={13} variant="solid" />
                  </button>
                </div>
              </div>

              <button
                onClick={startSimulator}
                disabled={isRunning}
                className="gold-btn text-slate-deep font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 w-fit transition-all duration-200"
                style={{ opacity: isRunning ? 0.6 : 1, cursor: isRunning ? 'not-allowed' : 'pointer' }}
              >
                <Icon name={isRunning ? 'EllipsisHorizontalIcon' : 'PlayIcon'} size={15} variant="solid" />
                {isRunning ? 'Explaining…' : isComplete ? 'Explain Again' : 'Get Explanation'}
              </button>
            </div>

            {/* Right: AI response */}
            <div className="p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623' }}
                >
                  <Icon name="SparklesIcon" size={14} variant="solid" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-worn">
                  Syllabus AI
                </span>
                {isRunning && (
                  <span className="relative flex h-2 w-2 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                  </span>
                )}
              </div>

              <div
                ref={transcriptRef}
                className="flex-1 overflow-y-auto space-y-3 min-h-[240px] max-h-[240px] pr-1"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#2D3F56 transparent' }}
              >
                {!isRunning && !isComplete && displayedLines.length === 0 && (
                  <p className="text-sm font-medium italic" style={{ color: '#6B7B8D' }}>
                    Press "Get Explanation" to see Syllabus break it down step by step…
                  </p>
                )}

                {displayedLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5"
                  >
                    <span
                      className="text-xs font-bold mt-0.5 flex-shrink-0"
                      style={{ color: '#F5A623' }}
                    >
                      {i + 1}.
                    </span>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: '#F4F7FA' }}>
                      {line}
                    </p>
                  </div>
                ))}

                {currentLine && (
                  <div className="flex gap-2.5">
                    <span className="text-xs font-bold mt-0.5 flex-shrink-0" style={{ color: '#F5A623' }}>
                      {displayedLines.length + 1}.
                    </span>
                    <p className="text-sm font-medium leading-relaxed typing-cursor" style={{ color: '#4DA8DA' }}>
                      {currentLine}
                    </p>
                  </div>
                )}

                {isComplete && (
                  <div
                    className="flex items-center gap-2 text-xs font-semibold mt-3 pt-3"
                    style={{ color: '#F5A623', borderTop: '1px solid rgba(245,166,35,0.15)' }}
                  >
                    <Icon name="CheckCircleIcon" size={14} variant="solid" />
                    Explanation complete
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}