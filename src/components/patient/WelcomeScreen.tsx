/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, stopSpeaking } from '../../utils/speech';
import { 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sparkles, 
  HeartPulse, 
  FileText, 
  Stethoscope, 
  CheckCircle2, 
  Languages 
} from 'lucide-react';

interface WelcomeScreenProps {
  language: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onStart: () => void;
  onQuickDemoLoad: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onLanguageChange,
  onStart,
  onQuickDemoLoad,
}) => {
  const t = TRANSLATIONS[language];
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      const speech = `${t.welcomeGreeting}. ${t.welcomeDesc}`;
      speakText(
        speech,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden">
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-200/70">
              <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
              <span>Ayushman Bharat Digital Mission (ABDM) Compatible</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.welcomeGreeting}
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t.welcomeDesc}
            </p>
          </div>

          {/* Audio Assistance Affordance */}
          <button
            type="button"
            onClick={handleAudioToggle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all shadow-xs ${
              isPlaying
                ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlaying ? t.stop : t.listen}</span>
          </button>
        </div>

        {/* 3 Core Highlights (Non-slop, functional clinical pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-3">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Adaptive Case-Taking</h3>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              Voice and touch guided branching to record onset, character, and red-flag symptoms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Document OCR Intelligence</h3>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              Digitize paper prescriptions and laboratory reports into structured clinical timelines.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-3">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Physician Summary Ready</h3>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              Generates an editable clinical draft and safety alerts directly for the doctor’s desk.
            </p>
          </div>
        </div>

        {/* Language Selection Row */}
        <div className="pt-2 pb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-teal-600" />
            <span>Select Working Consultation Language</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`p-3 rounded-xl border text-left font-medium transition-all ${
                language === 'en'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-1 ring-teal-600 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <span className="block text-sm font-bold">English</span>
              <span className="block text-xs text-slate-500">Standard</span>
            </button>

            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`p-3 rounded-xl border text-left font-medium transition-all ${
                language === 'hi'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-1 ring-teal-600 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <span className="block text-sm font-bold">हिन्दी (Hindi)</span>
              <span className="block text-xs text-slate-500">राजभाषा</span>
            </button>

            <button
              type="button"
              onClick={() => onLanguageChange('gu')}
              className={`p-3 rounded-xl border text-left font-medium transition-all ${
                language === 'gu'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-1 ring-teal-600 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <span className="block text-sm font-bold">ગુજરાતી (Gujarati)</span>
              <span className="block text-xs text-slate-500">પ્રાદેશિક</span>
            </button>

            <div className="p-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-slate-400 cursor-not-allowed">
              <span className="block text-sm font-semibold">தமிழ் / বাংলা</span>
              <span className="block text-[11px]">Regional (Placeholder)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-slate-100">
          <button
            id="start-consultation-btn"
            type="button"
            onClick={onStart}
            className="flex-1 py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-md shadow-teal-700/20 transition-all hover:translate-y-[-1px] cursor-pointer"
          >
            <span>{t.startConsultation}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            id="quick-demo-patient-btn"
            type="button"
            onClick={onQuickDemoLoad}
            className="py-4 px-5 rounded-xl border-2 border-teal-600/30 hover:border-teal-600 text-teal-800 bg-teal-50/50 hover:bg-teal-50 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Load Fictional Yug Solanki (SIH Demo)</span>
          </button>
        </div>

        {/* Bottom Trust & Compliance Footnote */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Consent-driven data capture • No real Aadhaar or PII stored</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Touch & Voice Enabled
            </span>
            <span>•</span>
            <span>Ayush/OPD Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
