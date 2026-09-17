/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PatientCase, AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { 
  CheckCircle2, 
  Stethoscope, 
  Clock, 
  MapPin, 
  User, 
  ArrowRight, 
  FileCheck, 
  BellRing, 
  RotateCcw 
} from 'lucide-react';

interface SubmissionSuccessScreenProps {
  language: AppLanguage;
  patientCase: PatientCase;
  onOpenDoctorDashboard: () => void;
  onStartNewKioskSession: () => void;
}

export const SubmissionSuccessScreen: React.FC<SubmissionSuccessScreenProps> = ({
  language,
  patientCase,
  onOpenDoctorDashboard,
  onStartNewKioskSession,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 text-center">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Success Check Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Case Record Synced</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.submissionSuccessTitle}
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
          {t.submissionSuccessDesc}
        </p>

        {/* Token Card */}
        <div className="my-6 p-6 rounded-2xl bg-teal-50/70 border-2 border-teal-600/30 text-teal-950 max-w-md mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
            {t.tokenNumberLabel}
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold font-mono text-teal-700 my-1 tracking-tight">
            #{patientCase.tokenNumber}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-teal-800 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Status: Waiting for Consultation • Priority Triage</span>
          </div>
        </div>

        {/* Next Instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-md mx-auto mb-8">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-slate-900 font-bold">OPD Room 4</strong>
              <span className="text-slate-600">Internal Medicine & Cardiology</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5">
            <Stethoscope className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-slate-900 font-bold">Dr. Sharma, MD</strong>
              <span className="text-slate-600">Receiving Case Summary</span>
            </div>
          </div>
        </div>

        {/* Dual Actions for Demo/Jury Presentation */}
        <div className="space-y-3 pt-2 max-w-md mx-auto">
          <button
            id="view-doctor-screen-btn"
            type="button"
            onClick={onOpenDoctorDashboard}
            className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-md shadow-teal-700/20 transition-all cursor-pointer"
          >
            <Stethoscope className="w-5 h-5" />
            <span>View Doctor Dashboard (Dr. Sharma Console)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="new-kiosk-session-btn"
            type="button"
            onClick={onStartNewKioskSession}
            className="w-full py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Return to Kiosk Welcome Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
