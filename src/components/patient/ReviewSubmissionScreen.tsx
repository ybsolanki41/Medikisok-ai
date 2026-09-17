/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PatientCase, AppLanguage, PatientStep } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Send, 
  Edit3, 
  FileText, 
  Heart, 
  Pill, 
  Activity, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

interface ReviewSubmissionScreenProps {
  language: AppLanguage;
  patientCase: PatientCase;
  onNavigateToStep: (step: PatientStep) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const ReviewSubmissionScreen: React.FC<ReviewSubmissionScreenProps> = ({
  language,
  patientCase,
  onNavigateToStep,
  onSubmit,
  onBack,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4">
      {/* Top Header */}
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
          Module C • Structured Summary Generator
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
            Step 5 of 5 • Final Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {t.reviewTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {t.reviewSubtitle}
          </p>
        </div>

        {/* Priority Warning Banner if Red Flag */}
        {patientCase.isPriorityRedFlag && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="font-bold">Priority Triage Flag Attached:</strong> Chest discomfort with exertional onset and diaphoresis has triggered an expedited clinical review tag for Dr. Sharma.
            </div>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {/* Section 1: Patient Identity */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
                {patientCase.profile.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{patientCase.profile.name}</h4>
                <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                  <span>{patientCase.profile.age} Yrs • {patientCase.profile.gender}</span>
                  <span>•</span>
                  <span className="font-mono text-teal-700">{patientCase.profile.id}</span>
                  <span>•</span>
                  <span>ABHA: {patientCase.profile.abhaId}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToStep('profile')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t.edit}</span>
            </button>
          </div>

          {/* Section 2: Chief Complaint & Symptoms */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-teal-600" />
                <h4 className="text-sm font-bold text-slate-900">Chief Complaint & Symptoms</h4>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToStep('complaint')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t.edit}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <span className="text-slate-500 block text-[11px]">Primary Complaint:</span>
                <span className="font-bold text-slate-900">{patientCase.chiefComplaint}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <span className="text-slate-500 block text-[11px]">Onset:</span>
                <span className="font-bold text-slate-900">{patientCase.adaptiveAnswers.onset}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <span className="text-slate-500 block text-[11px]">Character:</span>
                <span className="font-bold text-slate-900">{patientCase.adaptiveAnswers.character}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <span className="text-slate-500 block text-[11px]">Associated Symptoms:</span>
                <span className="font-bold text-slate-900">{patientCase.adaptiveAnswers.associated.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Medical History & Medications */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-600" />
                <h4 className="text-sm font-bold text-slate-900">Chronic Profile & Medications</h4>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToStep('medical-history')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t.edit}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <span className="text-slate-500 block text-[11px]">Conditions:</span>
                <span className="font-semibold text-slate-900">{patientCase.existingConditions.join(', ')}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <span className="text-slate-500 block text-[11px]">Allergies:</span>
                <span className="font-semibold text-emerald-800">{patientCase.drugAllergies.join(', ')}</span>
              </div>
            </div>
            <div className="mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-xs">
              <span className="text-slate-500 block text-[11px] mb-1">Active Prescriptions:</span>
              <div className="space-y-1">
                {patientCase.currentMedications.map((med, idx) => (
                  <span key={idx} className="inline-block mr-3 text-slate-800 font-semibold">
                    • {med.name} {med.dosage} ({med.frequency})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Attached Records */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <h4 className="text-sm font-bold text-slate-900">Attached Digitized Records</h4>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                {patientCase.documents.length} Records Digitized
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              {patientCase.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200/60">
                  <span className="font-semibold text-slate-800">{doc.title}</span>
                  <span className="font-mono text-[11px] text-slate-500">{doc.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="submit-case-history-btn"
          type="button"
          onClick={onSubmit}
          className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-md shadow-teal-700/20 transition-all cursor-pointer"
        >
          <Send className="w-5 h-5" />
          <span>{t.submitBtn}</span>
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted transmission to Dr. Sharma’s OPD Console.</span>
        </div>
      </div>
    </div>
  );
};
