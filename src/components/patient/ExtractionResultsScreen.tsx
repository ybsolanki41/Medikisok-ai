/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MedicalDocument, AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { 
  Check, 
  Edit3, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Calendar, 
  Pill, 
  Activity, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

interface ExtractionResultsScreenProps {
  language: AppLanguage;
  document: MedicalDocument;
  onConfirm: () => void;
  onBack: () => void;
}

export const ExtractionResultsScreen: React.FC<ExtractionResultsScreenProps> = ({
  language,
  document,
  onConfirm,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [isEditing, setIsEditing] = useState(false);
  const [docDate, setDocDate] = useState(document.date || '12 Aug 2026');
  const [medicines, setMedicines] = useState<string[]>([
    'Metformin 500 mg (twice daily)',
    'Amlodipine 5 mg (once daily)'
  ]);
  const [diagnoses, setDiagnoses] = useState<string[]>([
    'Type 2 Diabetes Mellitus',
    'Essential Hypertension'
  ]);
  const [investigations, setInvestigations] = useState([
    { name: 'HbA1c', value: '7.4%', flag: 'Elevated (Ref: <5.7%)' },
    { name: 'Blood Pressure', value: '148/92 mmHg', flag: 'High (Stage 2 HTN)' }
  ]);

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
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

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200/70">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Extracted Entities Ready</span>
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
              Module B • Digitized Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Extracted Clinical Information
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Review information extracted from your document. You can edit any field before saving.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Done Editing' : 'Edit Fields'}</span>
          </button>
        </div>

        {/* Fictional Demo Banner */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-6 flex items-start gap-2.5 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <strong>Verified Extraction:</strong> Source document matched with hospital formulary. Values will seamlessly link into your chronological timeline and the doctor’s consultation summary.
          </div>
        </div>

        {/* Extracted Details Cards */}
        <div className="space-y-4 mb-8">
          {/* Document Date & Facility */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Document Record Date</span>
                <span className="text-sm font-bold text-slate-900">{docDate}</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Source: Sterling Health Clinic (Dr. S. Mehta)
            </div>
          </div>

          {/* Extracted Medicines */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Pill className="w-4 h-4 text-teal-600" />
              <h4 className="text-sm font-bold text-slate-900">Extracted Medications & Dosages</h4>
            </div>
            <div className="space-y-2">
              {medicines.map((med, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span>{med}</span>
                  <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
                    Identified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Diagnosis */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-teal-600" />
              <h4 className="text-sm font-bold text-slate-900">Extracted Diagnoses & Indications</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {diagnoses.map((diag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>{diag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Extracted Investigations with Abnormal Flags */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <h4 className="text-sm font-bold text-slate-900">Investigation Flags for Doctor Review</h4>
              </div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                2 Values Flagged
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {investigations.map((inv, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-rose-200 bg-rose-50/40 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{inv.name}</span>
                    <span className="text-rose-700 font-mono text-sm">{inv.value}</span>
                  </div>
                  <span className="text-[11px] text-rose-800 font-medium block mt-1">
                    {inv.flag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirm and Proceed Action */}
        <button
          id="confirm-extraction-btn"
          type="button"
          onClick={onConfirm}
          className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>Confirm Information & View Timeline</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
