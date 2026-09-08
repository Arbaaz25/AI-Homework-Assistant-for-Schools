'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useChat } from '@/lib/hooks/useChat';
import toast, { Toaster } from 'react-hot-toast';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const SUBJECTS = ['Math', 'Science', 'English', 'Biology', 'Chemistry', 'History'];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  imagePreview?: string;
  isHint?: boolean;
}

interface StruggleArea {
  subject: string;
  count: number;
}

const SYSTEM_PROMPT = `You are Syllabus, an AI homework assistant for K-12 students. Your goal is to help students UNDERSTAND concepts, not just give answers.

Rules:
1. ALWAYS start with a hint or guiding question first, labeled clearly as "💡 Hint:"
2. Then provide a step-by-step explanation, numbered clearly
3. End with a "🎯 Key Concept:" summary
4. Use age-appropriate language
5. Encourage the student to try each step themselves
6. If an image is provided, analyze the homework question in it carefully
7. Keep explanations clear, engaging, and educational
8. For follow-up questions, build on previous context`;

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [attachedImage, setAttachedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [struggleAreas, setStruggleAreas] = useState<StruggleArea[]>([]);
  const [sessionCount, setSessionCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { response, isLoading, error, sendMessage } = useChat('OPEN_AI', 'gpt-4o', true);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (response && !isLoading) {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && last?.content === '') {
          return [...prev.slice(0, -1), { role: 'assistant', content: response }];
        }
        return prev;
      });
    }
  }, [response, isLoading]);

  useEffect(() => {
    if (isLoading && messages[messages.length - 1]?.role !== 'assistant') {
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    }
  }, [isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, response]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    setAttachedImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const trackStruggle = (subject: string) => {
    setStruggleAreas((prev) => {
      const existing = prev.find((s) => s.subject === subject);
      if (existing) {
        return prev.map((s) => s.subject === subject ? { ...s, count: s.count + 1 } : s);
      }
      return [...prev, { subject, count: 1 }];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedImage) || isLoading) return;

    const userText = input.trim() || 'Please analyze this homework question from the image.';
    let contentParts: any[] = [{ type: 'text', text: `Subject: ${selectedSubject}\n\nQuestion: ${userText}` }];

    if (attachedImage) {
      const base64 = await fileToBase64(attachedImage);
      contentParts.push({ type: 'image_url', image_url: { url: base64, detail: 'auto' } });
    }

    const userMsg: Message = {
      role: 'user',
      content: userText,
      imagePreview: imagePreview || undefined,
    };

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
        .filter((m) => m.content)
        .map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: contentParts },
    ];

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setAttachedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setSessionCount((c) => c + 1);
    trackStruggle(selectedSubject);

    sendMessage(apiMessages as any, { max_completion_tokens: 1500 });
  };

  const topStruggle = struggleAreas.sort((a, b) => b.count - a.count)[0];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1E2A3A' }}>
      <Toaster position="top-right" />
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
        <div className="flex items-center gap-3">
          <Link href="/student-dashboard" className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors" style={{ background: 'rgba(77,168,218,0.1)', color: '#4DA8DA', border: '1px solid rgba(77,168,218,0.2)' }}>
            My Dashboard
          </Link>
          <Link href="/teacher-dashboard" className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A9AAD', border: '1px solid rgba(255,255,255,0.08)' }}>
            Teacher View
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-6xl mx-auto w-full px-4 md:px-6 py-4 gap-4">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-4 w-64 flex-shrink-0">
          {/* Subject selector */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6B7B8D' }}>Subject</p>
            <div className="flex flex-col gap-1.5">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    background: selectedSubject === s ? 'rgba(77,168,218,0.15)' : 'transparent',
                    color: selectedSubject === s ? '#4DA8DA' : '#8A9AAD',
                    border: `1px solid ${selectedSubject === s ? 'rgba(77,168,218,0.3)' : 'transparent'}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Session stats */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6B7B8D' }}>This Session</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white">Questions asked</span>
                <span className="text-sm font-bold" style={{ color: '#4DA8DA' }}>{sessionCount}</span>
              </div>
              {topStruggle && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white">Focus area</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623' }}>{topStruggle.subject}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(77,168,218,0.06)', border: '1px solid rgba(77,168,218,0.15)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4DA8DA' }}>💡 Learning Tips</p>
            <ul className="text-xs space-y-1.5" style={{ color: '#8A9AAD' }}>
              <li>• Try the hint before reading the full answer</li>
              <li>• Ask follow-up questions to go deeper</li>
              <li>• Upload a photo of your textbook question</li>
            </ul>
          </div>
        </aside>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile subject bar */}
          <div className="lg:hidden flex gap-2 mb-3 overflow-x-auto pb-1">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: selectedSubject === s ? 'rgba(77,168,218,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${selectedSubject === s ? 'rgba(77,168,218,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  color: selectedSubject === s ? '#4DA8DA' : '#6B7B8D',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto rounded-xl p-4 mb-4 space-y-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', minHeight: 0 }}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(77,168,218,0.1)', border: '1px solid rgba(77,168,218,0.2)' }}>
                  <Icon name="AcademicCapIcon" size={32} className="text-sky-DEFAULT" />
                </div>
                <h3 className="font-jakarta font-bold text-lg mb-2" style={{ color: '#F4F7FA' }}>Ask your homework question</h3>
                <p className="text-sm max-w-sm" style={{ color: '#6B7B8D' }}>
                  Type a question or upload a photo of your homework. I'll give you hints first, then walk you through it step by step.
                </p>
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {['How do I solve 2x + 5 = 13?', 'What is photosynthesis?', 'Explain a metaphor'].map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="text-xs px-3 py-1.5 rounded-full transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#8A9AAD' }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(77,168,218,0.15)', border: '1px solid rgba(77,168,218,0.3)' }}>
                    <Icon name="AcademicCapIcon" size={16} className="text-sky-DEFAULT" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                  {msg.imagePreview && (
                    <img src={msg.imagePreview} alt="Uploaded homework question" className="rounded-lg max-w-xs max-h-48 object-cover" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                  )}
                  <div
                    className="rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
                    style={{
                      background: msg.role === 'user' ? 'rgba(77,168,218,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${msg.role === 'user' ? 'rgba(77,168,218,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      color: '#F4F7FA',
                    }}
                  >
                    {msg.role === 'assistant' && !msg.content && isLoading ? (
                      <span className="flex gap-1 items-center" style={{ color: '#6B7B8D' }}>
                        <span className="animate-bounce" style={{ animationDelay: '0ms' }}>•</span>
                        <span className="animate-bounce" style={{ animationDelay: '150ms' }}>•</span>
                        <span className="animate-bounce" style={{ animationDelay: '300ms' }}>•</span>
                      </span>
                    ) : (
                      msg.content || (isLoading ? response : '')
                    )}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold" style={{ background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)', color: '#F5A623' }}>
                    S
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit}>
            {imagePreview && (
              <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(77,168,218,0.08)', border: '1px solid rgba(77,168,218,0.2)' }}>
                <img src={imagePreview} alt="Attached homework image preview" className="w-10 h-10 rounded-lg object-cover" />
                <span className="text-xs font-medium flex-1" style={{ color: '#4DA8DA' }}>{attachedImage?.name}</span>
                <button type="button" onClick={() => { setAttachedImage(null); setImagePreview(null); }} style={{ color: '#6B7B8D' }}>
                  <Icon name="XMarkIcon" size={16} />
                </button>
              </div>
            )}
            <div className="flex gap-2 items-end rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(77,168,218,0.2)' }}>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#8A9AAD' }}
                title="Upload homework photo"
              >
                <Icon name="PhotoIcon" size={18} />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e as any); } }}
                placeholder={`Ask a ${selectedSubject} question… or upload a photo`}
                rows={2}
                className="flex-1 bg-transparent resize-none text-sm font-medium leading-relaxed outline-none placeholder:text-gray-worn/50"
                style={{ color: '#F4F7FA' }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || (!input.trim() && !attachedImage)}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all gold-btn"
                style={{ opacity: isLoading || (!input.trim() && !attachedImage) ? 0.5 : 1 }}
              >
                <Icon name="PaperAirplaneIcon" size={16} variant="solid" className="text-slate-deep" />
              </button>
            </div>
            <p className="text-xs mt-2 text-center" style={{ color: '#6B7B8D' }}>
              Hints first · Step-by-step explanations · {selectedSubject} mode
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
