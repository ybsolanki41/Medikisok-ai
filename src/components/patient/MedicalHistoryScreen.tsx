/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppLanguage, PatientCase, AyushAssessment } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, stopSpeaking } from '../../utils/speech';
import { 
  ArrowLeft, 
  ArrowRight, 
  Pill, 
  Activity, 
  Scissors, 
  AlertCircle, 
  Users, 
  HeartHandshake, 
  Leaf, 
  Plus, 
  Check, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

interface MedicalHistoryScreenProps {
  language: AppLanguage;
  patientCase: PatientCase;
  onUpdateCase: (updated: Partial<PatientCase>) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const MedicalHistoryScreen: React.FC<MedicalHistoryScreenProps> = ({
  language,
  patientCase,
  onUpdateCase,
  onContinue,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'allopathic' | 'ayush'>('allopathic');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      const speech = `${t.medHistoryTitle}. ${t.medHistorySubtitle}`;
      speakText(
        speech,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

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

        <div className="flex items-center gap-2">
          {/* AYUSH Branch Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('allopathic')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'allopathic'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standard Clinical
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ayush')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'ayush'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>AYUSH Assessment</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleAudioToggle}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
          >
            {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isPlaying ? t.stop : t.listen}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
            Step 3 of 5 • Background & Chronic Health Profile
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {activeTab === 'allopathic' ? t.medHistoryTitle : 'AYUSH Holistic Case-Taking Matrix'}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {activeTab === 'allopathic'
              ? t.medHistorySubtitle
              : 'Ayurvedic assessment of Prakriti, Vikriti, Agni, and constitutional parameters.'}
          </p>
        </div>

        {activeTab === 'allopathic' ? (
          <div className="space-y-6 mb-8">
            {/* 1. Existing Diagnosed Conditions */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  <h4 className="text-sm font-bold text-slate-900">{t.existingConditions}</h4>
                </div>
                <span className="text-xs text-slate-500 font-medium">Recorded from OPD records</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {patientCase.existingConditions.map((cond, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>{cond}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Current Medications with Dosage */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-teal-600" />
                  <h4 className="text-sm font-bold text-slate-900">{t.currentMeds}</h4>
                </div>
                <span className="text-xs text-slate-500 font-medium">Active prescriptions</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {patientCase.currentMedications.map((med, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-lg border border-slate-200 flex items-start justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{med.name} {med.dosage}</span>
                      <span className="text-[11px] text-slate-500">{med.frequency}</span>
                    </div>
                    {med.indication && (
                      <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        {med.indication}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Surgeries & Allergies Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex items-center gap-2 mb-2">
                  <Scissors className="w-4 h-4 text-teal-600" />
                  <h4 className="text-sm font-bold text-slate-900">{t.surgeries}</h4>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  {patientCase.previousSurgeries.map((surg, idx) => (
                    <li key={idx}>{surg}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">{t.allergies}</h4>
                </div>
                <div className="text-xs text-emerald-800 bg-emerald-50/80 border border-emerald-200 p-2.5 rounded-lg font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{patientCase.drugAllergies[0] || 'No known drug allergies (NKDA)'}</span>
                </div>
              </div>
            </div>

            {/* 4. Family History & Lifestyle */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-teal-600" />
                <h4 className="text-sm font-bold text-slate-900">{t.familyHistory} & Personal Profile</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {patientCase.familyHistory.map((item, idx) => (
                  <div key={idx} className="bg-white p-2 rounded border border-slate-200">
                    {item}
                  </div>
                ))}
                {patientCase.personalHistory.map((item, idx) => (
                  <div key={idx} className="bg-white p-2 rounded border border-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* AYUSH Mode View - Specified in Problem Statement 26047 */
          <div className="space-y-4 mb-8">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <Leaf className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>AYUSH Module Activated:</strong> Captures traditional clinical parameters (Prakriti, Vikriti, Dhatu Sara, Samhanana, Agni, Koshta, Satva, and Vaya) to assist Ayurvedic / Integrated medicine consultants.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Prakriti (Constitutional Archetype)
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {patientCase.ayushAssessment?.prakriti || 'Pitta-Kapha'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Vikriti (Current Morbid Imbalance)
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {patientCase.ayushAssessment?.vikriti || 'Vata aggravation'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Agni (Digestive Fire)
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {patientCase.ayushAssessment?.agni || 'Mandagni (Sluggish digestion)'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Koshta (Bowel Tendency)
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {patientCase.ayushAssessment?.koshta || 'Madhyama (Regular)'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ahara Shakti & Satmya
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {patientCase.ayushAssessment?.aharaShakti || 'Madhyama (Moderate)'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Satva (Mental Resilience) & Vaya
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {patientCase.ayushAssessment?.satva || 'Madhyama Satva'} (42 Yrs)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          id="proceed-documents-btn"
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>Proceed to Document Digitization</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
