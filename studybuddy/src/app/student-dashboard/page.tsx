'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface SubjectProgress {
  subject: string;
  score: number;
  sessions: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface RecentActivity {
  subject: string;
  question: string;
  date: string;
  understood: boolean;
}

interface PracticeQuestion {
  id: number;
  subject: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answered: boolean;
}

const SUBJECT_PROGRESS: SubjectProgress[] = [
  { subject: 'Mathematics', score: 72, sessions: 14, trend: 'up', color: '#4DA8DA' },
  { subject: 'Science', score: 58, sessions: 9, trend: 'down', color: '#F5A623' },
  { subject: 'English', score: 85, sessions: 11, trend: 'up', color: '#6DBDE8' },
  { subject: 'Biology', score: 44, sessions: 6, trend: 'stable', color: '#E09410' },
  { subject: 'Chemistry', score: 61, sessions: 8, trend: 'up', color: '#3A8FBF' },
];

const RECENT_ACTIVITY: RecentActivity[] = [
  { subject: 'Math', question: 'How do I solve quadratic equations?', date: 'Today', understood: true },
  { subject: 'Science', question: 'What is Newton\'s third law?', date: 'Today', understood: false },
  { subject: 'English', question: 'How do I write a thesis statement?', date: 'Yesterday', understood: true },
  { subject: 'Biology', question: 'Explain cell mitosis', date: 'Yesterday', understood: false },
  { subject: 'Math', question: 'What is the Pythagorean theorem?', date: '2 days ago', understood: true },
];

const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  { id: 1, subject: 'Biology', question: 'What are the 4 stages of mitosis in order?', difficulty: 'Medium', answered: false },
  { id: 2, subject: 'Science', question: 'Describe an example of Newton\'s third law in everyday life.', difficulty: 'Easy', answered: false },
  { id: 3, subject: 'Biology', question: 'What is the difference between mitosis and meiosis?', difficulty: 'Hard', answered: false },
  { id: 4, subject: 'Math', question: 'Solve: 3x² - 12 = 0', difficulty: 'Medium', answered: false },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: '#4DA8DA',
  Medium: '#F5A623',
  Hard: '#E09410',
};

export default function StudentDashboardPage() {
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>(PRACTICE_QUESTIONS);
  const [activeTab, setActiveTab] = useState<'overview' | 'practice' | 'activity'>('overview');

  const totalSessions = SUBJECT_PROGRESS.reduce((s, p) => s + p.sessions, 0);
  const avgScore = Math.round(SUBJECT_PROGRESS.reduce((s, p) => s + p.score, 0) / SUBJECT_PROGRESS.length);
  const weakSubjects = SUBJECT_PROGRESS.filter((p) => p.score < 60).sort((a, b) => a.score - b.score);

  const markAnswered = (id: number) => {
    setPracticeQuestions((prev) => prev.map((q) => q.id === id ? { ...q, answered: true } : q));
  };

  return (
    <div className="min-h-screen" style={{ background: '#1E2A3A' }}>
      <div className="noise-overlay" />

      {/* Header */}
      <header
        className="sticky top-0 z-50 px-4 md:px-6 h-14 flex items-center justify-between"
        style={{ background: 'rgba(30,42,58,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link href="/home">
 <AppLogo
          text="StudyBuddy"
          iconName="AcademicCapIcon"
          size={28}
          className="text-white"
        />        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/assistant" className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors gold-btn text-slate-deep">
            Ask AI
          </Link>
          <Link href="/teacher-dashboard" className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A9AAD', border: '1px solid rgba(255,255,255,0.08)' }}>
            Teacher View
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-jakarta font-extrabold text-2xl md:text-3xl mb-1" style={{ color: '#F4F7FA' }}>
            Student Learning Dashboard
          </h1>
          <p className="text-sm" style={{ color: '#6B7B8D' }}>Track your progress, practice weak areas, and keep improving.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total Sessions', value: totalSessions, icon: 'BookOpenIcon', color: '#4DA8DA' },
            { label: 'Avg. Score', value: `${avgScore}%`, icon: 'ChartBarIcon', color: '#F5A623' },
            { label: 'Subjects Active', value: SUBJECT_PROGRESS.length, icon: 'AcademicCapIcon', color: '#6DBDE8' },
            { label: 'Needs Attention', value: weakSubjects.length, icon: 'ExclamationTriangleIcon', color: '#E09410' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon name={stat.icon} size={16} style={{ color: stat.color }} />
                <span className="text-xs font-medium" style={{ color: '#6B7B8D' }}>{stat.label}</span>
              </div>
              <p className="font-jakarta font-extrabold text-2xl" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['overview', 'practice', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
              style={{
                background: activeTab === tab ? 'rgba(77,168,218,0.2)' : 'transparent',
                color: activeTab === tab ? '#4DA8DA' : '#6B7B8D',
                border: activeTab === tab ? '1px solid rgba(77,168,218,0.3)' : '1px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Subject progress */}
            <div className="md:col-span-2 rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 className="font-jakarta font-bold text-base mb-5" style={{ color: '#F4F7FA' }}>Subject Progress</h2>
              <div className="space-y-4">
                {SUBJECT_PROGRESS.map((p) => (
                  <div key={p.subject}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color: '#F4F7FA' }}>{p.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: '#6B7B8D' }}>{p.sessions} sessions</span>
                        <span className="text-sm font-bold" style={{ color: p.color }}>{p.score}%</span>
                        <Icon
                          name={p.trend === 'up' ? 'ArrowTrendingUpIcon' : p.trend === 'down' ? 'ArrowTrendingDownIcon' : 'MinusIcon'}
                          size={14}
                          style={{ color: p.trend === 'up' ? '#4DA8DA' : p.trend === 'down' ? '#E09410' : '#6B7B8D' }}
                        />
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${p.score}%`, background: p.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak areas + CTA */}
            <div className="flex flex-col gap-4">
              <div className="rounded-xl p-5" style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="ExclamationTriangleIcon" size={16} style={{ color: '#F5A623' }} />
                  <h3 className="font-jakarta font-bold text-sm" style={{ color: '#F5A623' }}>Needs Attention</h3>
                </div>
                {weakSubjects.length === 0 ? (
                  <p className="text-xs" style={{ color: '#6B7B8D' }}>Great job! All subjects above 60%.</p>
                ) : (
                  <div className="space-y-2">
                    {weakSubjects.map((s) => (
                      <div key={s.subject} className="flex items-center justify-between">
                        <span className="text-sm font-medium" style={{ color: '#F4F7FA' }}>{s.subject}</span>
                        <span className="text-sm font-bold" style={{ color: '#E09410' }}>{s.score}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/assistant"
                className="rounded-xl p-5 flex flex-col gap-2 transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(77,168,218,0.08)', border: '1px solid rgba(77,168,218,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <Icon name="ChatBubbleLeftRightIcon" size={18} style={{ color: '#4DA8DA' }} />
                  <span className="font-jakarta font-bold text-sm" style={{ color: '#4DA8DA' }}>Ask AI Now</span>
                </div>
                <p className="text-xs" style={{ color: '#6B7B8D' }}>
                  Get step-by-step help on any homework question
                </p>
              </Link>

              <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-jakarta font-bold text-sm mb-3" style={{ color: '#F4F7FA' }}>AI Feedback</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8A9AAD' }}>
                  You're doing well in English! Focus more on Biology and Science — try practicing cell biology concepts this week.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Icon name="LightBulbIcon" size={18} style={{ color: '#F5A623' }} />
              <h2 className="font-jakarta font-bold text-base" style={{ color: '#F4F7FA' }}>Personalized Practice</h2>
              <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623' }}>Based on weak areas</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {practiceQuestions.map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl p-5 transition-all"
                  style={{
                    background: q.answered ? 'rgba(77,168,218,0.05)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${q.answered ? 'rgba(77,168,218,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    opacity: q.answered ? 0.6 : 1,
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9AAD' }}>{q.subject}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `rgba(${q.difficulty === 'Easy' ? '77,168,218' : q.difficulty === 'Medium' ? '245,166,35' : '224,148,16'},0.15)`, color: DIFFICULTY_COLORS[q.difficulty] }}>{q.difficulty}</span>
                    {q.answered && <span className="text-xs font-bold ml-auto" style={{ color: '#4DA8DA' }}>✓ Done</span>}
                  </div>
                  <p className="text-sm font-medium mb-4 leading-relaxed" style={{ color: '#F4F7FA' }}>{q.question}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/assistant?q=${encodeURIComponent(q.question)}`}
                      className="flex-1 text-center text-xs font-semibold py-2 rounded-lg transition-all"
                      style={{ background: 'rgba(77,168,218,0.15)', color: '#4DA8DA', border: '1px solid rgba(77,168,218,0.3)' }}
                    >
                      Get Help
                    </Link>
                    {!q.answered && (
                      <button
                        onClick={() => markAnswered(q.id)}
                        className="text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#6B7B8D', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-jakarta font-bold text-base" style={{ color: '#F4F7FA' }}>Recent Questions</h2>
            </div>
            <div className="divide-y divide-white/5">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ background: a.understood ? 'rgba(77,168,218,0.15)' : 'rgba(245,166,35,0.15)', color: a.understood ? '#4DA8DA' : '#F5A623' }}
                  >
                    {a.subject[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#F4F7FA' }}>{a.question}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6B7B8D' }}>{a.subject} · {a.date}</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                    style={{
                      background: a.understood ? 'rgba(77,168,218,0.1)' : 'rgba(245,166,35,0.1)',
                      color: a.understood ? '#4DA8DA' : '#F5A623',
                    }}
                  >
                    {a.understood ? 'Understood' : 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
