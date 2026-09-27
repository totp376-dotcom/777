/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  Maximize2,
  Minimize2,
  Mic,
  X,
} from 'lucide-react';
import {
  HomeworkItem,
  INITIAL_HOMEWORK,
  SLIDES_DATA,
  SlideDefinition,
} from './data/slidesData';
import {
  SchoolHubMockups,
  StudentProfileState,
} from './components/SchoolHubMockups';

const STORAGE_HW_KEY = 'schoolhub_presentation_hw_v1';
const STORAGE_PROFILE_KEY = 'schoolhub_presentation_profile_v1';

const DEFAULT_PROFILE: StudentProfileState = {
  name: 'Александр Соколов',
  gradeClass: '11 «А» класс',
  track: 'Технологический (IT-профиль)',
  bio: 'Фронтенд-разработка (HTML, CSS, JavaScript) · Профильный ЕГЭ по информатике и математике · Проект SchoolHub',
  targetGpa: '4.85',
};

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [isGridOpen, setIsGridOpen] = useState<boolean>(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_HW_KEY);
      return saved ? JSON.parse(saved) : INITIAL_HOMEWORK;
    } catch {
      return INITIAL_HOMEWORK;
    }
  });

  const [profile, setProfile] = useState<StudentProfileState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_HW_KEY, JSON.stringify(homeworkList));
    } catch {
      // Ignore storage quota errors
    }
  }, [homeworkList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors
    }
  }, [profile]);

  const currentSlide: SlideDefinition =
    SLIDES_DATA[currentSlideIndex] || SLIDES_DATA[0];

  const goToSlide = (idNumber: number) => {
    const idx = SLIDES_DATA.findIndex((s) => s.id === idNumber);
    if (idx !== -1) {
      setCurrentSlideIndex(idx);
      setActiveZone(null);
      setIsGridOpen(false);
    }
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) =>
      prev < SLIDES_DATA.length - 1 ? prev + 1 : 0
    );
    setActiveZone(null);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) =>
      prev > 0 ? prev - 1 : SLIDES_DATA.length - 1
    );
    setActiveZone(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        setIsGridOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleToggleHomework = (id: string) => {
    setHomeworkList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddHomework = (
    subject: string,
    task: string,
    dueDate: string
  ) => {
    const newItem: HomeworkItem = {
      id: `hw-${Date.now()}`,
      subject,
      task,
      dueDate: dueDate || 'Завтра, 10:00',
      completed: false,
      priority: 'Высокий',
    };
    setHomeworkList((prev) => [newItem, ...prev]);
  };

  const chapters: {
    name: SlideDefinition['chapter'];
    firstSlideId: number;
  }[] = [
    { name: 'Введение', firstSlideId: 1 },
    { name: 'Основные экраны', firstSlideId: 5 },
    { name: 'Доп. функции', firstSlideId: 9 },
    { name: 'Технологии и дизайн', firstSlideId: 12 },
  ];

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col bg-[#070D1F] text-[#F8FAFC] selection:bg-[#0ABAB5]/30 selection:text-[#2DD4BF]">
      {/* TOP BAR: Brand | 4 Chapter Links | 2 Actions */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-2.5 bg-[#0A1128] border-b border-white/10 shrink-0">
        <a
          href="#slide-1"
          onClick={(e) => {
            e.preventDefault();
            goToSlide(1);
          }}
          className="text-lg font-extrabold tracking-tight text-white hover:text-[#2DD4BF] transition-colors font-display whitespace-nowrap"
        >
          SchoolHub
        </a>

        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-300">
          {chapters.map((ch) => {
            const isActiveChapter = currentSlide.chapter === ch.name;
            return (
              <a
                key={ch.name}
                href={`#chapter-${ch.firstSlideId}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSlide(ch.firstSlideId);
                }}
                className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                  isActiveChapter
                    ? 'text-[#2DD4BF] border-[#0ABAB5] font-semibold'
                    : 'border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                {ch.name}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowSpeakerNotes((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              showSpeakerNotes
                ? 'bg-[#0ABAB5]/20 border-[#0ABAB5] text-[#2DD4BF]'
                : 'border-white/15 text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Речь докладчика</span>
          </button>

          <button
            type="button"
            onClick={() => setIsGridOpen(true)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#0ABAB5] text-[#070D1F] hover:bg-[#2DD4BF] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Все слайды (14)</span>
          </button>
        </div>
      </header>

      {/* MAIN WIDESCREEN PRESENTATION STAGE — 100% FULL VIEWPORT, NO VERTICAL SIDEBARS, NO EMPTY SPACE */}
      <main className="flex-1 min-h-0 flex flex-col justify-between w-full px-3 sm:px-5 py-2.5 gap-2.5">
        {/* Compact Horizontal Header Row: Title on Left, Slide Switcher on Right */}
        <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              СЛАЙД {currentSlide.numberLabel} / 14
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display">
              {currentSlide.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-xl bg-[#111C38] hover:bg-[#162447] border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              title="Предыдущий слайд"
            >
              <ChevronLeft className="w-4 h-4 text-[#2DD4BF]" />
              <span>Назад</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-3.5 py-1.5 rounded-xl bg-[#0ABAB5] hover:bg-[#2DD4BF] text-[#070D1F] text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              title="Следующий слайд"
            >
              <span>Далее</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-xl bg-[#111C38] hover:bg-[#162447] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Полноэкранный режим"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {showSpeakerNotes && (
          <div className="px-4 py-2.5 rounded-xl bg-[#111C38] border border-[#0ABAB5]/50 flex items-center justify-between gap-4 shrink-0">
            <div className="text-xs text-slate-200 truncate">
              <span className="font-mono font-bold text-[#2DD4BF] mr-2">
                [Речь · Слайд {currentSlide.numberLabel}]:
              </span>
              {currentSlide.speakerNotes}
            </div>
            <button
              type="button"
              onClick={() => setShowSpeakerNotes(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* FULL-WIDTH HORIZONTAL SLIDE CANVAS — FILLS 100% OF AVAILABLE SPACE */}
        <div className="flex-1 min-h-0 w-full flex flex-col">
          <SchoolHubMockups
            slide={currentSlide}
            activeZone={activeZone}
            onSelectSlide={goToSlide}
            homeworkList={homeworkList}
            onToggleHomework={handleToggleHomework}
            onAddHomework={handleAddHomework}
            profile={profile}
            onSaveProfile={setProfile}
          />
        </div>

        {/* Bottom Horizontal Bar: 3 Key Accents + 14-Slide Selector */}
        <div className="shrink-0 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
            {currentSlide.bottomAccents.map((acc, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-xl bg-[#0A1128] border border-[#0ABAB5]/30 flex items-center justify-between gap-2"
              >
                <span className="text-[11px] font-mono text-[#2DD4BF] font-bold shrink-0">
                  {acc.label}:
                </span>
                <span className="text-xs font-semibold text-white truncate text-right">
                  {acc.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 bg-[#0A1128] px-2.5 py-1.5 rounded-xl border border-white/10 shrink-0">
            {SLIDES_DATA.map((s, idx) => {
              const active = idx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(s.id)}
                  title={`Слайд ${s.numberLabel}: ${s.title}`}
                  className={`h-6 rounded text-[10px] font-mono tabular-nums transition-all cursor-pointer ${
                    active
                      ? 'px-2 bg-[#0ABAB5] text-[#070D1F] font-bold'
                      : 'w-5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {s.numberLabel}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* SLIDE OVERVIEW MODAL (ALL 14 SLIDES GRID) */}
      {isGridOpen && (
        <div className="fixed inset-0 z-50 bg-[#070D1F]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-6xl w-full bg-[#0A1128] border border-[#0ABAB5]/40 rounded-2xl p-6 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-[#2DD4BF]">
                  НАВИГАЦИЯ ПО ПРЕЗЕНТАЦИИ
                </div>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  Все 14 слайдов проекта SchoolHub
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsGridOpen(false)}
                className="p-2 rounded-lg bg-[#111C38] text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto pr-1">
              {SLIDES_DATA.map((slideItem, idx) => {
                const isCurrent = idx === currentSlideIndex;
                return (
                  <button
                    key={slideItem.id}
                    type="button"
                    onClick={() => goToSlide(slideItem.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-[#0ABAB5] text-[#070D1F] border-[#2DD4BF]'
                        : 'bg-[#111C38] text-white border-white/10 hover:border-[#0ABAB5]'
                    }`}
                  >
                    <div>
                      <div
                        className={`text-xs font-mono font-bold ${
                          isCurrent ? 'text-[#070D1F]' : 'text-[#2DD4BF]'
                        }`}
                      >
                        Слайд {slideItem.numberLabel} · {slideItem.chapter}
                      </div>
                      <div className="text-sm font-extrabold mt-1">
                        {slideItem.title}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-current/10 text-[11px] font-mono">
                      Открыть слайд →
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
