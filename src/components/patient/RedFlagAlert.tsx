/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, stopSpeaking } from '../../utils/speech';
import { 
  AlertTriangle, 
  BellRing, 
  ArrowRight, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  UserCheck, 
  PhoneCall, 
  Clock 
} from 'lucide-react';

interface RedFlagAlertProps {
  language: AppLanguage;
  patientName: string;
  tokenNumber: string;
  onContinue: () => void;
}

export const RedFlagAlert: React.FC<RedFlagAlertProps> = ({
  language,
  patientName,
  tokenNumber,
  onContinue,
}) => {
  const t = TRANSLATIONS[language];
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      const speech = `${t.redFlagTitle}. ${t.redFlagMessage}`;
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
      <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm relative overflow-hidden">
        {/* Soft rose warning header badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider border border-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-600 animate-bounce" />
            <span>Priority Attention Workflow</span>
          </div>

          <button
            type="button"
            onClick={handleAudioToggle}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-rose-900 border border-rose-200"
          >
            {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isPlaying ? t.stop : t.listen}</span>
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.redFlagTitle}
        </h2>

        {/* Priority Message Box */}
        <div className="mt-4 p-5 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950 space-y-3">
          <p className="text-base sm:text-lg font-semibold leading-relaxed">
            {t.redFlagMessage}
          </p>

          <div className="flex items-center gap-2 text-xs font-bold text-rose-800 pt-2 border-t border-rose-200/60">
            <BellRing className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{t.redFlagStaffNotified}</span>
          </div>
        </div>

        {/* Clinical Safety & Non-Diagnostic Reassurance Mandate */}
        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Clinical Protocol Standard:</strong> {t.redFlagDisclaimer} MediVedah does not declare an autonomous medical diagnosis (e.g. Acute Coronary Syndrome). Rather, the triage engine prioritizes your file in Dr. Sharma’s queue so you are evaluated immediately.
          </div>
        </div>

        {/* What Happens Next Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
            <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Priority Token Assigned</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Token #{tokenNumber} marked as HIGH priority on the doctor’s waiting queue.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Nursing Station Alert</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                A duty nurse has been alerted to review your vitals and coordinate ECG.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            You may continue entering your past medicines and scanning records while staff arrives.
          </div>

          <button
            id="acknowledge-redflag-btn"
            type="button"
            onClick={onContinue}
            className="py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <span>Continue to Medical History</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
