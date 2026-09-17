/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppMode, AppLanguage } from '../types';
import { TRANSLATIONS } from '../data/mockData';
import { Activity, Stethoscope, User, RotateCcw, Volume2, ShieldCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  language: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onResetDemo: () => void;
  isAudioPlaying?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  language,
  onLanguageChange,
  onResetDemo,
  isAudioPlaying = false
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-700/20">
              <Activity className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
                  MediKiosk
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
                  SIH 26047
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {mode === 'patient' ? t.appSubtitle : 'Clinical Case Intake & Summary Console'}
              </p>
            </div>
          </div>

          {/* Center Mode Switcher - Prototype Mandate */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200">
            <button
              id="kiosk-mode-btn"
              type="button"
              onClick={() => onModeChange('patient')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                mode === 'patient'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-teal-600" />
              <span>{t.rolePatient}</span>
            </button>
            <button
              id="doctor-mode-btn"
              type="button"
              onClick={() => onModeChange('doctor')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                mode === 'doctor'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>{t.roleDoctor}</span>
            </button>
          </div>

          {/* Right Tools: Language, Audio Indicator, Reset */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Indicator */}
            {isAudioPlaying && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium animate-pulse">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Active</span>
              </div>
            )}

            {/* Language Quick Switch */}
            <div className="relative">
              <select
                id="language-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as AppLanguage)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-lg px-2.5 py-1.5 font-medium hover:bg-slate-100 cursor-pointer focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
              </select>
            </div>

            {/* Reset Demo Button */}
            <button
              id="reset-demo-btn"
              type="button"
              onClick={onResetDemo}
              title="Reset Demo State"
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Fictional Demo Badge */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Demo / Sandbox</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
