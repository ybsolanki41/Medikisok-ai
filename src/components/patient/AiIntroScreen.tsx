/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, stopSpeaking } from '../../utils/speech';
import { 
  Bot, 
  Mic, 
  Touchpad, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface AiIntroScreenProps {
  language: AppLanguage;
  onStartQuestions: () => void;
  onBack: () => void;
}

export const AiIntroScreen: React.FC<AiIntroScreenProps> = ({
  language,
  onStartQuestions,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      speakText(
        t.aiIntroSpeech,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  useEffect(() => {
    // Optionally auto-speak welcoming sentence on load if desired, but user initiated is polite
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8 px-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
          Module A • Multimodal Engine
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
        {/* Assistant Avatar */}
        <div className="relative inline-block mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20 mx-auto">
            <Bot className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {t.aiIntroTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
          {t.aiIntroSubtitle}
        </p>

        {/* Speech Bubble Card */}
        <div className="my-6 p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-left relative">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-teal-900 block mb-1 uppercase tracking-wider">
                MediVedah Intake Assistant
              </span>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                "{t.aiIntroSpeech}"
              </p>
            </div>
          </div>

          {/* Interactive Speaking Controls */}
          <div className="mt-4 pt-3 border-t border-teal-200/60 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAudioToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isPlaying
                    ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                    : 'bg-white text-teal-800 border border-teal-300 hover:bg-teal-100/50'
                }`}
              >
                {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlaying ? t.stop : t.listen}</span>
              </button>

              <button
                type="button"
                onClick={handleAudioToggle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.repeat}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-teal-800 font-medium">
              <span className="flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-teal-600" /> Speak
              </span>
              <span>or</span>
              <span className="flex items-center gap-1">
                <Touchpad className="w-3.5 h-3.5 text-teal-600" /> Tap
              </span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          id="begin-questions-btn"
          type="button"
          onClick={onStartQuestions}
          className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>Begin Case-Taking Questions</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
