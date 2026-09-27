import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  Database,
  GraduationCap,
  Layers,
  Smartphone,
  TrendingUp,
  User,
} from 'lucide-react';
import {
  HomeworkItem,
  PRESENTATION_IMAGES,
  SCHEDULE_BY_DAY,
  SUBJECT_GRADES,
  SlideDefinition,
} from '../data/slidesData';

export interface StudentProfileState {
  name: string;
  gradeClass: string;
  track: string;
  bio: string;
  targetGpa: string;
}

interface SchoolHubMockupsProps {
  slide: SlideDefinition;
  activeZone: string | null;
  onSelectSlide: (slideId: number) => void;
  homeworkList: HomeworkItem[];
  onToggleHomework: (id: string) => void;
  onAddHomework: (subject: string, task: string, dueDate: string) => void;
  profile: StudentProfileState;
  onSaveProfile: (newProfile: StudentProfileState) => void;
}

export const ResilientImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}> = ({ src, alt, className = '', fallbackLabel }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1128] via-[#112240] to-[#0ABAB5]/30 border border-[#0ABAB5]/30 text-[#F8FAFC] p-4 text-center ${className}`}
      >
        <GraduationCap className="w-8 h-8 text-[#2DD4BF] mb-2 opacity-80" />
        <span className="text-xs font-medium text-slate-300">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const SchoolHubMockups: React.FC<SchoolHubMockupsProps> = ({
  slide,
  onSelectSlide,
  homeworkList,
  profile,
}) => {
  const [techTab, setTechTab] = useState<'html' | 'css' | 'js' | 'storage'>('js');
  const remainingHwCount = homeworkList.filter((h) => !h.completed).length;

  // ============================================================================
  // SLIDE 1: ТИТУЛЬНЫЙ СЛАЙД (HORIZONTAL FULL-BLEED COVER + 4 KEY BLOCKS)
  // ============================================================================
  if (slide.mockupType === 'cover') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Horizontal Hero Banner (Fills available height) */}
        <div className="relative flex-1 min-h-[240px] w-full rounded-xl overflow-hidden border border-[#0ABAB5]/40">
          <ResilientImage
            src={PRESENTATION_IMAGES.heroCover}
            alt="SchoolHub Цифровой кабинет ученика"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/95 via-[#0A1128]/60 to-transparent" />

          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
                ДИПЛОМНЫЙ ПРОЕКТ · ВЕБ-РАЗРАБОТКА
              </span>
              <span className="px-3 py-1 rounded-md bg-[#0A1128]/85 border border-[#0ABAB5]/40 font-mono text-xs text-[#2DD4BF]">
                Tiffany (#0ABAB5) + Dark Navy (#0A1128)
              </span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#2DD4BF] mb-1">
                  Персональная учебная платформа старшеклассника
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  SchoolHub
                </h2>
                <div className="text-lg sm:text-2xl font-bold text-[#2DD4BF] mt-1">
                  «Цифровой кабинет ученика»
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectSlide(5)}
                className="px-5 py-3 rounded-xl bg-[#0ABAB5] text-[#070D1F] font-extrabold text-xs sm:text-sm hover:bg-[#2DD4BF] transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Смотреть экраны проекта</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Equal Cards Stretching Full Width */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#111C38] border border-[#0ABAB5]/30 flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono text-[#2DD4BF]">ФОРМАТ</div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                Дипломный проект
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Веб-система из 7 разделов
              </div>
            </div>
            <GraduationCap className="w-8 h-8 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#111C38] border border-[#0ABAB5]/30 flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono text-[#2DD4BF]">ТЕХНОЛОГИИ</div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                HTML / CSS / JS
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                + хранение в localStorage
              </div>
            </div>
            <Code2 className="w-8 h-8 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#111C38] border border-[#0ABAB5]/30 flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono text-[#2DD4BF]">КОНЦЕПЦИЯ</div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                Tiffany + Dark Navy
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Светлые карточки данных
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-5 h-5 rounded-full bg-[#0A1128] border border-white/40" />
              <span className="w-5 h-5 rounded-full bg-[#0ABAB5]" />
              <span className="w-5 h-5 rounded-full bg-[#F8FAFC]" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-[#0ABAB5] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-[#0ABAB5] font-bold">
                КАБИНЕТ УЧЕНИКА
              </div>
              <div className="text-sm sm:text-base font-extrabold truncate mt-0.5">
                {profile.name}
              </div>
              <div className="text-xs text-slate-600 truncate mt-0.5">
                {profile.gradeClass} · Балл 4.78
              </div>
            </div>
            <ResilientImage
              src={PRESENTATION_IMAGES.avatar}
              alt={profile.name}
              className="w-11 h-11 rounded-xl object-cover border-2 border-[#0ABAB5] shrink-0"
            />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 2: АКТУАЛЬНОСТЬ ПРОЕКТА (HORIZONTAL VISUAL + 6 MODULES + HOME SCREEN)
  // ============================================================================
  if (slide.mockupType === 'relevance') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Horizontal Row: 2 Wide Visual Images + 6 Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          {/* Left 4 cols: Student Workspace Photo */}
          <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-[#0ABAB5]/40 min-h-[180px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.workspace}
              alt="Рабочее пространство ученика"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/30 to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0ABAB5] text-[#070D1F] font-mono text-[11px] font-extrabold">
              ВСЕ ДАННЫЕ В ОДНОМ МЕСТЕ
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="text-sm font-extrabold text-white">
                Единое окно вместо 5 разрозненных чатов и таблиц
              </div>
            </div>
          </div>

          {/* Middle 4 cols: Visual Screen of Main Dashboard */}
          <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-[#0ABAB5]/40 min-h-[180px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.slide5Home}
              alt="Экран главной страницы SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/30 to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0A1128]/90 border border-[#0ABAB5]/50 font-mono text-[11px] text-[#2DD4BF] font-bold">
              ЭКРАН ГЛАВНОЙ СТРАНИЦЫ
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="text-sm font-extrabold text-white">
                Наглядный дашборд: балл, уроки и задачи с первой секунды
              </div>
            </div>
          </div>

          {/* Right 4 cols: 6 Core Modules in a Tight 2x3 Grid Filling Full Height */}
          <div className="lg:col-span-4 grid grid-cols-2 grid-rows-3 gap-2.5">
            {[
              { num: '01', name: 'Расписание', tag: 'Уроки и кабинеты' },
              { num: '02', name: 'Домашние задания', tag: 'Дедлайны и чек-лист' },
              { num: '03', name: 'Оценки', tag: 'Средний балл 4.78' },
              { num: '04', name: 'Профиль', tag: 'Анкета ученика' },
              { num: '05', name: 'Статистика', tag: 'Шкалы по предметам' },
              { num: '06', name: 'Новости', tag: 'IT-неделя и события' },
            ].map((item) => (
              <div
                key={item.num}
                className="p-3 rounded-xl bg-[#111C38] border border-white/10 flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono text-[#2DD4BF] font-bold">
                  МОДУЛЬ {item.num}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-white">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    {item.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Light Summary Cards of the Main Screen */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-[#0ABAB5] flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase">
                Средний балл
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#0A1128] mt-0.5">
                4.78
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#0ABAB5]/20 text-[#0A1128] font-mono text-xs font-bold">
              +0.14
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase">
                Активные задания
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#0A1128] mt-0.5">
                {remainingHwCount} ДЗ
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#0A1128] text-[#2DD4BF] font-mono text-xs font-bold">
              В работе
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase">
                Посещаемость
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#0A1128] mt-0.5">
                96%
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-bold">
              Норма
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111C38] text-white border border-[#0ABAB5]/40 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-[#2DD4BF] uppercase">
                Ближайший урок
              </div>
              <div className="text-sm sm:text-base font-extrabold mt-0.5">
                Информатика · 10:25
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              Каб. 401
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 3: ЦЕЛЬ И ЗАДАЧИ (HORIZONTAL GOAL BANNER + 5 TASKS IN WIDESCREEN GRID)
  // ============================================================================
  if (slide.mockupType === 'goals') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: Main Goal + Visual Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#0ABAB5]/40 min-h-[180px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.workspace}
              alt="Цель проекта SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/40 to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0ABAB5] text-[#070D1F] font-mono text-[11px] font-extrabold">
              ОСНОВНАЯ ЦЕЛЬ ПРОЕКТА
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="text-base sm:text-lg font-extrabold text-white leading-snug">
                Создание единого цифрового кабинета ученика SchoolHub с адаптивным интерфейсом
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#0ABAB5]/40 min-h-[180px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.heroCover}
              alt="Экосистема SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/95 via-[#0A1128]/75 to-[#0A1128]/30" />
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <span className="text-xs font-mono text-[#2DD4BF] font-bold">
                КЛЮЧЕВЫЕ РЕЗУЛЬТАТЫ РАЗРАБОТКИ
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#111C38]/90 border border-white/10">
                  <div className="text-xl font-mono font-extrabold text-[#2DD4BF]">
                    7 экранов
                  </div>
                  <div className="text-xs text-white font-semibold mt-0.5">
                    Учебные разделы
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#111C38]/90 border border-white/10">
                  <div className="text-xl font-mono font-extrabold text-[#2DD4BF]">
                    localStorage
                  </div>
                  <div className="text-xs text-white font-semibold mt-0.5">
                    Память браузера
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#111C38]/90 border border-white/10">
                  <div className="text-xl font-mono font-extrabold text-[#2DD4BF]">
                    RWD Сетка
                  </div>
                  <div className="text-xs text-white font-semibold mt-0.5">
                    ПК и смартфоны
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Row: 5 Core Tasks side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 shrink-0">
          {[
            {
              num: 'ЗАДАЧА 01',
              title: 'Удобная навигация',
              tag: 'Быстрый переход по 7 разделам',
              icon: <Compass className="w-4 h-4 text-[#0ABAB5]" />,
            },
            {
              num: 'ЗАДАЧА 02',
              title: 'Учебные разделы',
              tag: 'Главная, Уроки, ДЗ, Оценки',
              icon: <Layers className="w-4 h-4 text-[#0ABAB5]" />,
            },
            {
              num: 'ЗАДАЧА 03',
              title: 'Задания и оценки',
              tag: 'Формы ввода и расчёт балла',
              icon: <CheckCircle2 className="w-4 h-4 text-[#0ABAB5]" />,
            },
            {
              num: 'ЗАДАЧА 04',
              title: 'Сохранение данных',
              tag: 'Запись состояния в localStorage',
              icon: <Database className="w-4 h-4 text-[#0ABAB5]" />,
            },
            {
              num: 'ЗАДАЧА 05',
              title: 'Адаптивный UI',
              tag: 'Концепция Tiffany + Dark Navy',
              icon: <Smartphone className="w-4 h-4 text-[#0ABAB5]" />,
            },
          ].map((task) => (
            <div
              key={task.num}
              className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-[#0ABAB5]/50 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-extrabold text-[#0ABAB5]">
                  {task.num}
                </span>
                {task.icon}
              </div>
              <div className="mt-2">
                <div className="text-sm font-extrabold">{task.title}</div>
                <div className="text-xs text-slate-600 mt-0.5">{task.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 4: ИНФОРМАЦИОННАЯ АРХИТЕКТУРА (HORIZONTAL 7-MODULE SYSTEM DIAGRAM)
  // ============================================================================
  if (slide.mockupType === 'architecture') {
    const modules = [
      { num: '01', name: 'Главная', role: 'Центральный дашборд', img: PRESENTATION_IMAGES.slide5Home },
      { num: '02', name: 'Расписание', role: 'Дни недели и кабинеты', img: PRESENTATION_IMAGES.slide6Schedule },
      { num: '03', name: 'Домашние задания', role: 'Форма и список задач', img: PRESENTATION_IMAGES.slide7Homework },
      { num: '04', name: 'Оценки', role: 'Средний балл и таблица', img: PRESENTATION_IMAGES.slide8Grades },
      { num: '05', name: 'Профиль', role: 'Личные данные ученика', img: PRESENTATION_IMAGES.avatar },
      { num: '06', name: 'Статистика', role: 'Индикаторы по курсам', img: PRESENTATION_IMAGES.slide10Stats },
      { num: '07', name: 'Новости', role: 'IT-неделя и объявления', img: PRESENTATION_IMAGES.itWeek },
    ];

    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: Central Architecture Visual Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#0ABAB5]/40 min-h-[160px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.techArch}
              alt="Информационная архитектура SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/30 to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0ABAB5] text-[#070D1F] font-mono text-[11px] font-extrabold">
              СТРУКТУРА ПРИЛОЖЕНИЯ · 7 РАЗДЕЛОВ
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="text-base font-extrabold text-white">
                Единая модульная система с общим хранилищем данных
              </div>
            </div>
          </div>

          {/* Right 7 cols: First 3 Primary Screen Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {modules.slice(0, 3).map((m) => (
              <div
                key={m.num}
                className="rounded-xl overflow-hidden border border-[#0ABAB5]/40 bg-[#111C38] flex flex-col justify-between"
              >
                <div className="h-28 relative overflow-hidden">
                  <ResilientImage
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0A1128]/90 text-[#2DD4BF] font-mono text-[10px] font-bold">
                    РАЗДЕЛ {m.num}
                  </span>
                </div>
                <div className="p-3">
                  <div className="text-sm font-extrabold text-white">{m.name}</div>
                  <div className="text-xs text-[#2DD4BF] mt-0.5">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Remaining 4 Screen Cards Horizontally */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          {modules.slice(3, 7).map((m) => (
            <div
              key={m.num}
              className="p-3 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-[#0ABAB5]/50 flex items-center gap-3"
            >
              <ResilientImage
                src={m.img}
                alt={m.name}
                className="w-14 h-14 rounded-lg object-cover border border-[#0ABAB5] shrink-0"
              />
              <div className="min-w-0">
                <div className="text-[10px] font-mono font-extrabold text-[#0ABAB5]">
                  РАЗДЕЛ {m.num}
                </div>
                <div className="text-sm font-extrabold truncate">{m.name}</div>
                <div className="text-xs text-slate-600 truncate">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 5: ГЛАВНАЯ СТРАНИЦА (FULL-WIDTH VISUAL + HORIZONTAL KPI & BLOCKS)
  // ============================================================================
  if (slide.mockupType === 'screen-home') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: Wide Dashboard Photo + Student Greeting & Workspace Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[200px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.slide5Home}
              alt="Экран Главная страница SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              ВНЕШНИЙ ВИД · ГЛАВНАЯ СТРАНИЦА
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 bg-[#0A1128]/90 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="text-sm font-extrabold text-white">
                Приветствие ученика · Средний балл · Задания · Посещаемость
              </div>
              <span className="text-xs font-mono text-[#2DD4BF]">
                Светлые карточки + Dark Navy
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-xl bg-[#111C38] border border-white/10 p-4 flex flex-col justify-between">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <ResilientImage
                src={PRESENTATION_IMAGES.avatar}
                alt={profile.name}
                className="w-14 h-14 rounded-xl object-cover border-2 border-[#0ABAB5] shrink-0"
              />
              <div>
                <div className="text-[11px] font-mono text-[#2DD4BF]">
                  ПРИВЕТСТВИЕ КАБИНЕТА
                </div>
                <div className="text-base font-extrabold text-white">
                  Привет, {profile.name.split(' ')[0]}!
                </div>
                <div className="text-xs text-slate-300">{profile.gradeClass}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 my-auto py-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#0A1128] border border-[#0ABAB5]/30">
                <div className="text-lg font-mono font-extrabold text-[#2DD4BF]">
                  4.78
                </div>
                <div className="text-[10px] text-slate-300">Средний балл</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A1128] border border-[#0ABAB5]/30">
                <div className="text-lg font-mono font-extrabold text-white">
                  {remainingHwCount} ДЗ
                </div>
                <div className="text-[10px] text-slate-300">Осталось</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A1128] border border-[#0ABAB5]/30">
                <div className="text-lg font-mono font-extrabold text-[#2DD4BF]">
                  96%
                </div>
                <div className="text-[10px] text-slate-300">Посещение</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0ABAB5] text-[#070D1F] flex items-center justify-between text-xs font-extrabold">
              <span>Статус учебного дня:</span>
              <span className="font-mono">По расписанию</span>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Key Functional Blocks of the Home Page */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                БЛОК 01 · ШАПКА
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Персональное приветствие
              </div>
            </div>
            <User className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                БЛОК 02 · ИНДИКАТОРЫ
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Балл · Задания · Посещаемость
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                БЛОК 03 · ТАЙМИНГ
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Ближайшие уроки и кабинеты
              </div>
            </div>
            <Clock className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                БЛОК 04 · ДЕДЛАЙНЫ
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Ближайшие домашние задания
              </div>
            </div>
            <BookOpen className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 6: РАСПИСАНИЕ (HORIZONTAL PHOTO + LESSON CARDS + 4 KEY BLOCKS)
  // ============================================================================
  if (slide.mockupType === 'screen-schedule') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: Schedule Screen Photo + 4 Horizontal Lesson Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[200px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.slide6Schedule}
              alt="Экран Расписание SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              ВНЕШНИЙ ВИД · РАЗДЕЛ «РАСПИСАНИЕ»
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#0A1128]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">
                Дни недели (Пн–Сб) · Время звонков · Предметы · Кабинеты
              </span>
              <span className="text-xs font-mono text-[#2DD4BF]">6 учебных дней</span>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SCHEDULE_BY_DAY['Понедельник'].map((les) => (
              <div
                key={les.num}
                className="p-3 rounded-xl bg-[#111C38] border border-white/10 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#2DD4BF]">
                    {les.num} УРОК · {les.time}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0ABAB5] text-[#070D1F] font-mono text-[11px] font-extrabold">
                    {les.room}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-extrabold text-white">
                    {les.subject}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {les.teacher}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Elements of Schedule */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                ЭЛЕМЕНТ 01
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Дни недели (Пн–Сб)
              </div>
            </div>
            <Calendar className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                ЭЛЕМЕНТ 02
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Точное время уроков
              </div>
            </div>
            <Clock className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                ЭЛЕМЕНТ 03
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Названия предметов
              </div>
            </div>
            <BookOpen className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                ЭЛЕМЕНТ 04
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Номера кабинетов
              </div>
            </div>
            <Compass className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 7: ДОМАШНИЕ ЗАДАНИЯ (PHOTO OF HOW IT LOOKS + VISUAL CARDS, NO MENU)
  // ============================================================================
  if (slide.mockupType === 'screen-homework') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Horizontal Row: Photo of Homework Screen + Workspace Image & Example Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[200px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.slide7Homework}
              alt="Фото внешнего вида экрана Домашние задания"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              ФОТО ЭКРАНА · РАЗДЕЛ «ДОМАШНИЕ ЗАДАНИЯ»
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#0A1128]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">
                Форма добавления ДЗ + Список карточек + Контроль выполнения
              </span>
              <span className="text-xs font-mono text-[#2DD4BF]">
                localStorage сохранение
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="relative flex-1 min-h-[110px] rounded-xl overflow-hidden border border-white/15">
              <ResilientImage
                src={PRESENTATION_IMAGES.workspace}
                alt="Самоподготовка ученика"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/30 to-transparent flex items-end p-3">
                <div className="text-xs sm:text-sm font-extrabold text-white">
                  Удобное планирование домашних работ и дедлайнов
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 shrink-0">
              {homeworkList.slice(0, 2).map((hw) => (
                <div
                  key={hw.id}
                  className="p-3 rounded-xl bg-[#111C38] border border-[#0ABAB5]/40 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#2DD4BF]">
                      {hw.subject}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#0ABAB5]" />
                  </div>
                  <div className="text-xs font-bold text-white truncate mt-1">
                    {hw.task}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    Срок: {hw.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Key Elements of Homework Screen */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                01 · ФОРМА ВВОДА
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Добавление нового задания
              </div>
            </div>
            <BookOpen className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                02 · ПАРАМЕТРЫ
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Предмет · Описание · Дата
              </div>
            </div>
            <Calendar className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                03 · КОНТРОЛЬ
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Отметка выполнения (Чекбокс)
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                04 · ПАМЯТЬ
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Сохранение в localStorage
              </div>
            </div>
            <Database className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 8: ОЦЕНКИ (HORIZONTAL PHOTO + SUBJECT CARDS + 4 KEY METRICS)
  // ============================================================================
  if (slide.mockupType === 'screen-grades') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: Grades Screen Photo + 4 Subject Grade Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[200px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.slide8Grades}
              alt="Экран Оценки SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              ВНЕШНИЙ ВИД · РАЗДЕЛ «ОЦЕНКИ»
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#0A1128]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">
                Средний балл 4.78 · 42 оценки · Лучшие результаты · Ведомость
              </span>
              <span className="text-xs font-mono text-[#2DD4BF]">Авторасчёт</span>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUBJECT_GRADES.slice(0, 4).map((item) => (
              <div
                key={item.subject}
                className="p-3 rounded-xl bg-[#111C38] border border-white/10 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white truncate">
                    {item.subject}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
                    {item.average.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#2DD4BF] mt-1">
                  Оценки: {item.grades.join(' · ')}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-1">
                  {item.recentNote}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Key Components of Grades Screen */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                МЕТРИКА 01
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Средний балл: 4.78
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                МЕТРИКА 02
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Количество оценок: 42
              </div>
            </div>
            <Award className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                МЕТРИКА 03
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Лучшие результаты (5.00)
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                МЕТРИКА 04
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Список предметов и оценки
              </div>
            </div>
            <Layers className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 9: ПРОФИЛЬ (HORIZONTAL PORTRAIT CARD + WORKSPACE PHOTO + 4 FIELDS)
  // ============================================================================
  if (slide.mockupType === 'screen-profile') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: Student Card + Workspace Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-6 rounded-xl bg-[#111C38] border border-[#0ABAB5]/40 p-5 flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <ResilientImage
                src={PRESENTATION_IMAGES.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-[#0ABAB5] shrink-0"
              />
              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#0ABAB5] text-[#070D1F] font-mono text-[10px] font-extrabold">
                  РАЗДЕЛ «ПРОФИЛЬ УЧЕНИКА»
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1.5">
                  {profile.name}
                </h3>
                <div className="text-sm font-semibold text-[#2DD4BF]">
                  {profile.gradeClass} · {profile.track}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-white/10">
              <div className="p-3 rounded-xl bg-[#0A1128] border border-white/10">
                <div className="text-[10px] font-mono text-[#2DD4BF]">ПОЛЕ 01</div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                  Имя ученика
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#0A1128] border border-white/10">
                <div className="text-[10px] font-mono text-[#2DD4BF]">ПОЛЕ 02</div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                  Класс (11 «А»)
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#0A1128] border border-white/10">
                <div className="text-[10px] font-mono text-[#2DD4BF]">ПОЛЕ 03</div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                  Блок «О себе»
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[#0ABAB5]/40 min-h-[200px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.workspace}
              alt="Персонализация кабинета SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/30 to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0A1128]/90 border border-[#0ABAB5]/40 font-mono text-xs text-[#2DD4BF] font-bold">
              ПЕРСОНАЛИЗАЦИЯ И ХРАНЕНИЕ
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#0A1128]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">
                Автосохранение изменений анкеты в браузере (localStorage)
              </span>
              <span className="text-xs font-mono text-[#2DD4BF]">JSON State</span>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Profile Functions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                ДАННЫЕ 01
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Имя и класс ученика
              </div>
            </div>
            <User className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                ДАННЫЕ 02
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Информация «О себе»
              </div>
            </div>
            <GraduationCap className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                ДАННЫЕ 03
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Сохранение в localStorage
              </div>
            </div>
            <Database className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                ДАННЫЕ 04
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Синхронизация с Главной
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 10: СТАТИСТИКА (HORIZONTAL PHOTO + PROGRESS BARS + 4 INDICATORS)
  // ============================================================================
  if (slide.mockupType === 'screen-stats') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: Stats Screen Photo + Horizontal Progress Bars Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[200px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.slide10Stats}
              alt="Экран Статистика SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              ВНЕШНИЙ ВИД · РАЗДЕЛ «СТАТИСТИКА»
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#0A1128]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">
                Средний балл 4.78 · Посещаемость 96% · Индикаторы предметов
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-xl bg-[#F8FAFC] text-[#0A1128] p-4 border border-[#0ABAB5] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-mono font-extrabold text-[#0ABAB5]">
                ВИЗУАЛЬНЫЕ ИНДИКАТОРЫ ПО ПРЕДМЕТАМ
              </span>
              <span className="text-xs font-mono font-bold text-[#0A1128]">
                Шкала 0–100%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto py-2">
              {SUBJECT_GRADES.map((item) => (
                <div
                  key={item.subject}
                  className="p-2.5 rounded-lg bg-white border border-slate-200"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-extrabold truncate">{item.subject}</span>
                    <span className="font-mono font-bold text-[#0ABAB5]">
                      {item.progressPct}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0A1128] to-[#0ABAB5]"
                      style={{ width: `${item.progressPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Statistics Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#111C38] text-white border border-[#0ABAB5]/40 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#2DD4BF]">
                ИНДИКАТОР 01
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Средний балл: 4.78
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-[#2DD4BF] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#111C38] text-white border border-[#0ABAB5]/40 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#2DD4BF]">
                ИНДИКАТОР 02
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Посещаемость: 96%
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#111C38] text-white border border-[#0ABAB5]/40 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#2DD4BF]">
                ИНДИКАТОР 03
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Рейтинг по предметам
              </div>
            </div>
            <Award className="w-5 h-5 text-[#2DD4BF] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#111C38] text-white border border-[#0ABAB5]/40 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#2DD4BF]">
                ИНДИКАТОР 04
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Графические Progress Bar
              </div>
            </div>
            <Layers className="w-5 h-5 text-[#2DD4BF] shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 11: НОВОСТИ (HORIZONTAL IT-WEEK PHOTO + EVENT CARDS, NO MENU)
  // ============================================================================
  if (slide.mockupType === 'screen-news') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: IT-Week Photo + School Announcements Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[200px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.itWeek}
              alt="IT-неделя в школе — раздел Новости"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              ГЛАВНОЕ СОБЫТИЕ · IT-НЕДЕЛЯ В ШКОЛЕ
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#0A1128]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">
                Хакатон старшеклассников, выставка веб-проектов и мастер-классы
              </span>
              <span className="text-xs font-mono text-[#2DD4BF]">IT-лаб 401</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="relative flex-1 min-h-[110px] rounded-xl overflow-hidden border border-white/15">
              <ResilientImage
                src={PRESENTATION_IMAGES.heroCover}
                alt="Школьные мероприятия"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/40 to-transparent flex items-end p-3">
                <div className="text-xs sm:text-sm font-extrabold text-white">
                  Карточки школьных новостей, олимпиад и важных объявлений
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 shrink-0">
              <div className="p-3 rounded-xl bg-[#111C38] border border-[#0ABAB5]/40">
                <div className="text-[10px] font-mono text-[#2DD4BF] font-bold">
                  НАПОМИНАНИЕ 01
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-1">
                  15 мая · Защита проектов
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#111C38] border border-[#0ABAB5]/40">
                <div className="text-[10px] font-mono text-[#2DD4BF] font-bold">
                  НАПОМИНАНИЕ 02
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-1">
                  Пятница · Консультация ЕГЭ
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 News Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                РУБРИКА 01
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Школьные объявления
              </div>
            </div>
            <Bell className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                РУБРИКА 02
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Школьные мероприятия
              </div>
            </div>
            <Calendar className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                РУБРИКА 03
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Спецпроект «IT-неделя»
              </div>
            </div>
            <Code2 className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
                РУБРИКА 04
              </div>
              <div className="text-sm font-extrabold mt-0.5">
                Важные напоминания
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#0ABAB5] shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 12: ТЕХНИЧЕСКАЯ РЕАЛИЗАЦИЯ (HORIZONTAL ARCHITECTURE IMAGE + CODE)
  // ============================================================================
  if (slide.mockupType === 'tech-stack') {
    const codeSnippets: Record<
      'html' | 'css' | 'js' | 'storage',
      { filename: string; code: string }
    > = {
      html: {
        filename: 'index.html — Структура разделов',
        code: `<main class="schoolhub-layout">
  <section id="dashboard" class="screen-card active">...</section>
  <section id="schedule" class="screen-card">...</section>
  <section id="homework" class="screen-card">...</section>
</main>`,
      },
      css: {
        filename: 'styles.css — Токены Tiffany + Dark Navy',
        code: `:root {
  --dark-navy: #0A1128;
  --tiffany: #0ABAB5;
  --light-card: #F8FAFC;
  --radius-xl: 16px;
}`,
      },
      js: {
        filename: 'app.js — Логика заданий и среднего балла',
        code: `function updateAverageGrade(grades) {
  const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
  document.querySelector('#gpa-value').textContent = avg.toFixed(2);
}`,
      },
      storage: {
        filename: 'storage.js — Сохранение в localStorage',
        code: `function saveState(key, payload) {
  localStorage.setItem(key, JSON.stringify(payload));
}`,
      },
    };

    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Horizontal Row: Tech Architecture Image + Live Code Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[190px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.techArch}
              alt="Техническая реализация SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              АРХИТЕКТУРА ФРОНТЕНДА
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#0A1128]/90 p-3 rounded-xl border border-white/10">
              <div className="text-sm font-extrabold text-white">
                HTML5 · CSS3 · JavaScript · localStorage
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-xl bg-[#070D1F] border border-[#0ABAB5]/40 flex flex-col justify-between overflow-hidden">
            <div className="px-4 py-2.5 bg-[#111C38] border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#2DD4BF] font-bold">
                {codeSnippets[techTab].filename}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Чистый стек без библиотек
              </span>
            </div>
            <pre className="p-5 text-xs sm:text-sm font-mono text-slate-100 overflow-x-auto my-auto leading-relaxed">
              <code>{codeSnippets[techTab].code}</code>
            </pre>
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Tech Stack Switcher Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          {[
            { key: 'html', num: '01 · СТРУКТУРА', name: 'HTML5 разметка' },
            { key: 'css', num: '02 · ОФОРМЛЕНИЕ', name: 'CSS3 сетка и цвета' },
            { key: 'js', num: '03 · ЛОГИКА', name: 'JavaScript интерактив' },
            { key: 'storage', num: '04 · ДАННЫЕ', name: 'localStorage память' },
          ].map((t) => {
            const active = techTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() =>
                  setTechTab(t.key as 'html' | 'css' | 'js' | 'storage')
                }
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  active
                    ? 'bg-[#0ABAB5] text-[#070D1F] border-[#2DD4BF]'
                    : 'bg-[#F8FAFC] text-[#0A1128] border-slate-200 hover:border-[#0ABAB5]'
                }`}
              >
                <div>
                  <div
                    className={`text-[10px] font-mono font-extrabold ${
                      active ? 'text-[#070D1F]' : 'text-[#0ABAB5]'
                    }`}
                  >
                    {t.num}
                  </div>
                  <div className="text-sm font-extrabold mt-0.5">{t.name}</div>
                </div>
                <Code2 className="w-5 h-5 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 13: ДИЗАЙН (HORIZONTAL COLOR SWATCHES + VISUAL SHOWCASE)
  // ============================================================================
  if (slide.mockupType === 'design-system') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
        {/* Top Row: 4 Color Swatches + Visual UI Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-[#070D1F] border border-white/20 flex flex-col justify-between">
              <span className="text-xs font-mono text-slate-400">
                ОСНОВНОЙ ТЁМНЫЙ · 60%
              </span>
              <div>
                <div className="text-xl font-extrabold text-white">Dark Navy</div>
                <div className="text-sm font-mono text-[#2DD4BF] mt-0.5">
                  #0A1128
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0ABAB5] text-[#070D1F] border border-[#2DD4BF] flex flex-col justify-between">
              <span className="text-xs font-mono font-bold">
                АКЦЕНТНЫЙ ЦВЕТ · 10%
              </span>
              <div>
                <div className="text-xl font-extrabold">Tiffany Blue</div>
                <div className="text-sm font-mono font-bold mt-0.5">#0ABAB5</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-300 flex flex-col justify-between">
              <span className="text-xs font-mono text-slate-500 font-bold">
                СВЕТЛЫЕ КАРТОЧКИ · 30%
              </span>
              <div>
                <div className="text-xl font-extrabold">Light Cards</div>
                <div className="text-sm font-mono text-slate-600 mt-0.5">
                  #F8FAFC / #FFFFFF
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#111C38] border border-[#0ABAB5]/40 flex flex-col justify-between">
              <span className="text-xs font-mono text-[#2DD4BF]">
                ВТОРИЧНЫЙ ФОН
              </span>
              <div>
                <div className="text-xl font-extrabold text-white">
                  Navy Surface
                </div>
                <div className="text-sm font-mono text-slate-300 mt-0.5">
                  #111C38
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[190px]">
            <ResilientImage
              src={PRESENTATION_IMAGES.slide7Homework}
              alt="Визуальная система SchoolHub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold">
              ИНТЕРФЕЙСНЫЕ ЭКРАНЫ КАК ОСНОВА
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#0A1128]/90 p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">
                Крупная типографика · Единая сетка · Скругления 16px
              </span>
              <span className="text-xs font-mono text-[#2DD4BF]">Manrope</span>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Row: 4 Design Principles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200">
            <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
              ПРИНЦИП 01
            </div>
            <div className="text-sm font-extrabold mt-0.5">
              Контраст Dark Navy + Tiffany
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200">
            <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
              ПРИНЦИП 02
            </div>
            <div className="text-sm font-extrabold mt-0.5">
              Светлые карточки данных
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200">
            <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
              ПРИНЦИП 03
            </div>
            <div className="text-sm font-extrabold mt-0.5">
              Крупная типографика и сетка
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-slate-200">
            <div className="text-[10px] font-mono font-bold text-[#0ABAB5]">
              ПРИНЦИП 04
            </div>
            <div className="text-sm font-extrabold mt-0.5">
              Скругления и иерархия
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SLIDE 14: ИТОГ (HORIZONTAL SUMMARY + 6-STEP CHAIN)
  // ============================================================================
  const workflowSteps = [
    { num: '01', name: 'Главная', slideId: 5, img: PRESENTATION_IMAGES.slide5Home },
    { num: '02', name: 'Расписание', slideId: 6, img: PRESENTATION_IMAGES.slide6Schedule },
    { num: '03', name: 'Задания', slideId: 7, img: PRESENTATION_IMAGES.slide7Homework },
    { num: '04', name: 'Оценки', slideId: 8, img: PRESENTATION_IMAGES.slide8Grades },
    { num: '05', name: 'Статистика', slideId: 10, img: PRESENTATION_IMAGES.slide10Stats },
    { num: '06', name: 'Профиль', slideId: 9, img: PRESENTATION_IMAGES.avatar },
  ];

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 rounded-2xl overflow-hidden border border-[#0ABAB5]/40 bg-[#0A1128] p-4 shadow-2xl">
      {/* Top Row: Final Hero Banner + 3 Key Conclusions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
        <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#0ABAB5]/50 min-h-[180px]">
          <ResilientImage
            src={PRESENTATION_IMAGES.heroCover}
            alt="Итог проекта SchoolHub"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/95 via-[#0A1128]/65 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <span className="px-3 py-1 rounded bg-[#0ABAB5] text-[#070D1F] font-mono text-xs font-extrabold w-fit">
              ИТОГ ДИПЛОМНОГО ПРОЕКТА
            </span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                SchoolHub объединяет все учебные задачи ученика в одном интерфейсе
              </h3>
              <div className="text-sm font-mono text-[#2DD4BF] mt-2">
                Главная → Расписание → Задания → Оценки → Статистика → Профиль
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#111C38] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-[#2DD4BF]">АРХИТЕКТУРА</span>
            <div>
              <div className="text-2xl font-extrabold text-white">7 разделов</div>
              <div className="text-xs text-slate-300 mt-1">
                Полный цикл учебной деятельности
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111C38] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-[#2DD4BF]">ТЕХНОЛОГИИ</span>
            <div>
              <div className="text-2xl font-extrabold text-white">
                HTML · CSS · JS
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Автономная работа с localStorage
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 p-4 rounded-xl bg-[#0ABAB5] text-[#070D1F] flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase">
                Дипломный проект готов к защите
              </div>
              <div className="text-xl font-extrabold mt-0.5">
                Спасибо за внимание!
              </div>
            </div>
            <button
              type="button"
              onClick={() => onSelectSlide(1)}
              className="px-4 py-2 rounded-xl bg-[#0A1128] text-[#2DD4BF] font-mono text-xs font-bold cursor-pointer"
            >
              В начало →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Row: 6-Step Visual Chain */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 shrink-0">
        {workflowSteps.map((step) => (
          <button
            key={step.num}
            type="button"
            onClick={() => onSelectSlide(step.slideId)}
            className="p-2.5 rounded-xl bg-[#F8FAFC] text-[#0A1128] border border-[#0ABAB5]/50 hover:bg-[#0ABAB5] hover:text-[#070D1F] transition-colors flex items-center gap-2.5 cursor-pointer text-left"
          >
            <ResilientImage
              src={step.img}
              alt={step.name}
              className="w-10 h-10 rounded-lg object-cover border border-[#0A1128]/20 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-extrabold text-[#0ABAB5]">
                ЭТАП {step.num}
              </div>
              <div className="text-xs font-extrabold truncate">{step.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
