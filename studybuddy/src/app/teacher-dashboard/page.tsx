'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface Student {
  id: number;
  name: string;
  grade: string;
  sessions: number;
  avgScore: number;
  weakSubjects: string[];
  trend: 'up' | 'down' | 'stable';
  lastActive: string;
}

interface LearningGap {
  topic: string;
  subject: string;
  affectedStudents: number;
  severity: 'High' | 'Medium' | 'Low';
}

interface ClassMetric {
  subject: string;
  avgScore: number;
  sessions: number;
  improvement: number;
}

const STUDENTS: Student[] = [
  { id: 1, name: 'Alex Johnson', grade: 'Grade 8', sessions: 22, avgScore: 74, weakSubjects: ['Biology'], trend: 'up', lastActive: 'Today' },
  { id: 2, name: 'Maria Garcia', grade: 'Grade 8', sessions: 18, avgScore: 58, weakSubjects: ['Math', 'Chemistry'], trend: 'down', lastActive: 'Today' },
  { id: 3, name: 'James Lee', grade: 'Grade 8', sessions: 31, avgScore: 88, weakSubjects: [], trend: 'up', lastActive: 'Yesterday' },
  { id: 4, name: 'Priya Patel', grade: 'Grade 8', sessions: 14, avgScore: 62, weakSubjects: ['Science'], trend: 'stable', lastActive: 'Yesterday' },
  { id: 5, name: 'Noah Williams', grade: 'Grade 8', sessions: 9, avgScore: 45, weakSubjects: ['Math', 'Biology', 'Chemistry'], trend: 'down', lastActive: '3 days ago' },
  { id: 6, name: 'Emma Brown', grade: 'Grade 8', sessions: 27, avgScore: 81, weakSubjects: ['English'], trend: 'up', lastActive: 'Today' },
];

const LEARNING_GAPS: LearningGap[] = [
  { topic: 'Cell Mitosis & Division', subject: 'Biology', affectedStudents: 4, severity: 'High' },
  { topic: 'Quadratic Equations', subject: 'Math', affectedStudents: 3, severity: 'High' },
  { topic: 'Chemical Bonding', subject: 'Chemistry', affectedStudents: 3, severity: 'Medium' },
  { topic: "Newton's Laws of Motion", subject: 'Science', affectedStudents: 2, severity: 'Medium' },
  { topic: 'Essay Structure & Thesis', subject: 'English', affectedStudents: 2, severity: 'Low' },
];

const CLASS_METRICS: ClassMetric[] = [
  { subject: 'Mathematics', avgScore: 66, sessions: 87, improvement: 8 },
  { subject: 'Science', avgScore: 71, sessions: 64, improvement: 3 },
  { subject: 'English', avgScore: 79, sessions: 72, improvement: 12 },
  { subject: 'Biology', avgScore: 55, sessions: 48, improvement: -2 },
  { subject: 'Chemistry', avgScore: 60, sessions: 41, improvement: 5 },
];

const SEVERITY_COLORS: Record<string, string> = {
  High: '#E09410',
  Medium: '#F5A623',
  Low: '#4DA8DA',
};

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'gaps'>('overview');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'sessions'>('score');

  const sortedStudents = [...STUDENTS].sort((a, b) => {
    if (sortBy === 'score') return a.avgScore - b.avgScore;
    if (sortBy === 'sessions') return b.sessions - a.sessions;
    return a.name.localeCompare(b.name);
  });

  const classAvg = Math.round(STUDENTS.reduce((s, st) => s + st.avgScore, 0) / STUDENTS.length);
  const atRisk = STUDENTS.filter((s) => s.avgScore < 60).length;
  const totalSessions = STUDENTS.reduce((s, st) => s + st.sessions, 0);

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
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)' }}>
            Teacher View
          </span>
          <Link href="/student-dashboard" className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A9AAD', border: '1px solid rgba(255,255,255,0.08)' }}>
            Student View
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-jakarta font-extrabold text-2xl md:text-3xl mb-1" style={{ color: '#F4F7FA' }}>
            Teacher Dashboard
          </h1>
          <p className="text-sm" style={{ color: '#6B7B8D' }}>Monitor student performance, identify learning gaps, and track class progress.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total Students', value: STUDENTS.length, icon: 'UsersIcon', color: '#4DA8DA' },
            { label: 'Class Average', value: `${classAvg}%`, icon: 'ChartBarIcon', color: '#F5A623' },
            { label: 'Total Sessions', value: totalSessions, icon: 'BookOpenIcon', color: '#6DBDE8' },
            { label: 'At Risk', value: atRisk, icon: 'ExclamationTriangleIcon', color: '#E09410' },
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
          {(['overview', 'students', 'gaps'] as const).map((tab) => (
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
              {tab === 'gaps' ? 'Learning Gaps' : tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 className="font-jakarta font-bold text-base mb-5" style={{ color: '#F4F7FA' }}>Class Performance by Subject</h2>
              <div className="space-y-4">
                {CLASS_METRICS.map((m) => (
                  <div key={m.subject}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color: '#F4F7FA' }}>{m.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: '#6B7B8D' }}>{m.sessions} sessions</span>
                        <span className="text-xs font-semibold" style={{ color: m.improvement > 0 ? '#4DA8DA' : '#E09410' }}>
                          {m.improvement > 0 ? '+' : ''}{m.improvement}%
                        </span>
                        <span className="text-sm font-bold" style={{ color: m.avgScore < 60 ? '#E09410' : '#4DA8DA' }}>{m.avgScore}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${m.avgScore}%`, background: m.avgScore < 60 ? '#E09410' : '#4DA8DA' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Top learning gaps preview */}
              <div className="rounded-xl p-5" style={{ background: 'rgba(224,148,16,0.06)', border: '1px solid rgba(224,148,16,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="ExclamationTriangleIcon" size={16} style={{ color: '#E09410' }} />
                  <h3 className="font-jakarta font-bold text-sm" style={{ color: '#E09410' }}>Top Learning Gaps</h3>
                </div>
                <div className="space-y-2">
                  {LEARNING_GAPS.slice(0, 3).map((g) => (
                    <div key={g.topic} className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium" style={{ color: '#F4F7FA' }}>{g.topic}</p>
                        <p className="text-xs" style={{ color: '#6B7B8D' }}>{g.affectedStudents} students</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `rgba(${g.severity === 'High' ? '224,148,16' : '245,166,35'},0.15)`, color: SEVERITY_COLORS[g.severity] }}>
                        {g.severity}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('gaps')} className="mt-3 text-xs font-semibold" style={{ color: '#4DA8DA' }}>
                  View all gaps →
                </button>
              </div>

              {/* AI insight */}
              <div className="rounded-xl p-5" style={{ background: 'rgba(77,168,218,0.06)', border: '1px solid rgba(77,168,218,0.15)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="LightBulbIcon" size={16} style={{ color: '#4DA8DA' }} />
                  <h3 className="font-jakarta font-bold text-sm" style={{ color: '#4DA8DA' }}>AI Insight</h3>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#8A9AAD' }}>
                  Biology scores dropped 2% this week. 4 students are struggling with cell division. Consider a focused review session on mitosis before the next assessment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-jakarta font-bold text-base" style={{ color: '#F4F7FA' }}>All Students</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: '#6B7B8D' }}>Sort by:</span>
                {(['score', 'sessions', 'name'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all"
                    style={{
                      background: sortBy === s ? 'rgba(77,168,218,0.15)' : 'rgba(255,255,255,0.05)',
                      color: sortBy === s ? '#4DA8DA' : '#6B7B8D',
                      border: `1px solid ${sortBy === s ? 'rgba(77,168,218,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="grid grid-cols-5 px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.04)', color: '#6B7B8D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="col-span-2">Student</span>
                <span>Sessions</span>
                <span>Avg Score</span>
                <span>Status</span>
              </div>
              {sortedStudents.map((student) => (
                <div key={student.id} className="grid grid-cols-5 items-center px-5 py-4 transition-colors hover:bg-white/[0.02]" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="col-span-2 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: 'rgba(77,168,218,0.15)', color: '#4DA8DA' }}
                    >
                      {student.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#F4F7FA' }}>{student.name}</p>
                      <p className="text-xs" style={{ color: '#6B7B8D' }}>{student.grade} · {student.lastActive}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#8A9AAD' }}>{student.sessions}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: student.avgScore < 60 ? '#E09410' : student.avgScore >= 80 ? '#4DA8DA' : '#F5A623' }}>
                      {student.avgScore}%
                    </span>
                    <Icon
                      name={student.trend === 'up' ? 'ArrowTrendingUpIcon' : student.trend === 'down' ? 'ArrowTrendingDownIcon' : 'MinusIcon'}
                      size={12}
                      style={{ color: student.trend === 'up' ? '#4DA8DA' : student.trend === 'down' ? '#E09410' : '#6B7B8D' }}
                    />
                  </div>
                  <div>
                    {student.weakSubjects.length === 0 ? (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(77,168,218,0.1)', color: '#4DA8DA' }}>On Track</span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(224,148,16,0.1)', color: '#E09410' }}>Needs Help</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Gaps Tab */}
        {activeTab === 'gaps' && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Icon name="MagnifyingGlassIcon" size={18} style={{ color: '#F5A623' }} />
              <h2 className="font-jakarta font-bold text-base" style={{ color: '#F4F7FA' }}>Common Learning Gaps</h2>
              <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623' }}>AI-identified</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {LEARNING_GAPS.map((gap) => (
                <div key={gap.topic} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(${gap.severity === 'High' ? '224,148,16' : gap.severity === 'Medium' ? '245,166,35' : '77,168,218'},0.2)` }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-jakarta font-bold text-sm mb-1" style={{ color: '#F4F7FA' }}>{gap.topic}</p>
                      <p className="text-xs" style={{ color: '#6B7B8D' }}>{gap.subject}</p>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                      style={{ background: `rgba(${gap.severity === 'High' ? '224,148,16' : gap.severity === 'Medium' ? '245,166,35' : '77,168,218'},0.15)`, color: SEVERITY_COLORS[gap.severity] }}
                    >
                      {gap.severity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="UsersIcon" size={14} style={{ color: '#6B7B8D' }} />
                      <span className="text-xs font-medium" style={{ color: '#8A9AAD' }}>
                        {gap.affectedStudents} of {STUDENTS.length} students affected
                      </span>
                    </div>
                    <div className="h-1.5 w-24 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(gap.affectedStudents / STUDENTS.length) * 100}%`, background: SEVERITY_COLORS[gap.severity] }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xs" style={{ color: '#6B7B8D' }}>
                      <span className="font-semibold" style={{ color: '#8A9AAD' }}>Suggested action: </span>
                      {gap.severity === 'High' ? 'Schedule a focused review session this week.' : gap.severity === 'Medium' ? 'Assign targeted practice questions.' : 'Monitor and provide optional resources.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
