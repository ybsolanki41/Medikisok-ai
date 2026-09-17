/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, stopSpeaking } from '../../utils/speech';
import { 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Check, 
  Lock, 
  FileCheck2, 
  RefreshCw, 
  Info 
} from 'lucide-react';

interface ConsentScreenProps {
  language: AppLanguage;
  onConsentGiven: () => void;
  onBack: () => void;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({
  language,
  onConsentGiven,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [agreed, setAgreed] = useState(true); // pre-checked for smooth demo but interactive
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      const speech = `${t.consentTitle}. ${t.consentSubtitle}. ${t.consentPoint1} ${t.consentPoint2} ${t.consentPoint3} ${t.consentRevocable}`;
      speakText(
        speech,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
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

        <button
          type="button"
          onClick={handleAudioToggle}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
        >
          {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isPlaying ? t.stop : t.listen}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2 border border-teal-200/60">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Module D • Consent & Privacy Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t.consentTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {t.consentSubtitle}
          </p>
        </div>

        {/* 3 Explicit Plain-Language Pillars */}
        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Clinical History Capture</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {t.consentPoint1}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Prescription & Report OCR Digitization</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {t.consentPoint2}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Encrypted Clinical Team Routing</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {t.consentPoint3}
              </p>
            </div>
          </div>
        </div>

        {/* Revocable Consent Indicator */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 mb-6 flex items-start gap-3">
          <RefreshCw className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold">Dynamic Consent Rule:</span> {t.consentRevocable} You can request your nurse or treating physician to delete or unlink the digital intake draft without affecting your in-person medical care.
          </div>
        </div>

        {/* Collapsible Full Privacy Information */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowFullTerms(!showFullTerms)}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showFullTerms ? 'Hide Detailed Privacy & ABDM Notice' : 'View Detailed Privacy & ABDM Notice'}</span>
          </button>

          {showFullTerms && (
            <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <p>
                <strong>Data Processing Purpose:</strong> Pre-consultation anamnesis synthesis for OPD Internal Medicine.
              </p>
              <p>
                <strong>Security:</strong> All inputs are encrypted at rest using AES-256 and during transit with TLS 1.3 conforming to National Digital Health Mission (NDHM) guidelines.
              </p>
              <p>
                <strong>Data Retention:</strong> Structured records are retained only for the duration of the clinical encounter unless specifically authorized into the patient’s personal health record (PHR).
              </p>
            </div>
          )}
        </div>

        {/* Checkbox Agreement */}
        <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 cursor-pointer mb-6 transition-colors">
          <input
            id="consent-checkbox"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-slate-300 mt-0.5 cursor-pointer"
          />
          <span className="text-sm font-semibold text-slate-800 leading-snug">
            {t.consentAgreeCheckbox}
          </span>
        </label>

        {/* Give Consent Button */}
        <button
          id="give-consent-btn"
          type="button"
          disabled={!agreed}
          onClick={onConsentGiven}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            agreed
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <FileCheck2 className="w-5 h-5" />
          <span>{t.giveConsentBtn}</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};
