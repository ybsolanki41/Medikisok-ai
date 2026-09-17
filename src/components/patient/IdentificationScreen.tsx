/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppLanguage, PatientProfile } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, stopSpeaking } from '../../utils/speech';
import { 
  CreditCard, 
  UserPlus, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  CheckCircle,
  QrCode
} from 'lucide-react';

interface IdentificationScreenProps {
  language: AppLanguage;
  onSelectPatient: (patient: PatientProfile) => void;
  onBack: () => void;
}

export const IdentificationScreen: React.FC<IdentificationScreenProps> = ({
  language,
  onSelectPatient,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedMethod, setSelectedMethod] = useState<'demo' | 'abha' | 'aadhaar' | 'new'>('demo');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      const speech = `${t.patientIdTitle}. ${t.patientIdSubtitle}`;
      speakText(
        speech,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  const handleProceed = () => {
    // In accordance with prototype rules, loads fictional demo patient Rahul Patel MK-10482
    onSelectPatient({
      id: 'MK-10482',
      name: 'Rahul Patel',
      age: 42,
      gender: 'Male',
      preferredLanguage: language,
      abhaId: '91-4820-1928-3019',
      contactNumber: '+91 98250 14820',
      emergencyContact: 'Meera Patel (+91 98250 14821)'
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
      {/* Navigation Header */}
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
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
            Step 1 of 5 • Identification
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {t.patientIdTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {t.patientIdSubtitle}
          </p>
        </div>

        {/* Prototype Safety Notice Box */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 mb-6">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">SIH Jury Sandbox Protocol:</span> Real Aadhaar or national biometric identifiers are strictly NOT collected or transmitted. For testing and demonstration, selecting any card pre-loads the fictional patient profile (<strong>Rahul Patel, 42M, ID: MK-10482</strong>).
          </div>
        </div>

        {/* 4 Method Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Fictional Preloaded Patient (Recommended) */}
          <button
            type="button"
            onClick={() => setSelectedMethod('demo')}
            className={`p-5 rounded-xl border-2 text-left transition-all relative ${
              selectedMethod === 'demo'
                ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              {selectedMethod === 'demo' && (
                <CheckCircle className="w-5 h-5 text-teal-600" />
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Quick Demo Patient
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Rahul Patel (42M) • History of HTN, Type 2 Diabetes, Chest discomfort.
            </p>
            <span className="inline-block mt-3 text-[11px] font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
              Recommended for presentation
            </span>
          </button>

          {/* ABHA ID Card */}
          <button
            type="button"
            onClick={() => setSelectedMethod('abha')}
            className={`p-5 rounded-xl border-2 text-left transition-all ${
              selectedMethod === 'abha'
                ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-teal-700 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              {selectedMethod === 'abha' && (
                <CheckCircle className="w-5 h-5 text-teal-600" />
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {t.useAbha}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Scan ABHA QR code from Ayushman Bharat app or enter 14-digit ABHA number.
            </p>
          </button>

          {/* Aadhaar Demo */}
          <button
            type="button"
            onClick={() => setSelectedMethod('aadhaar')}
            className={`p-5 rounded-xl border-2 text-left transition-all ${
              selectedMethod === 'aadhaar'
                ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-teal-700 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              {selectedMethod === 'aadhaar' && (
                <CheckCircle className="w-5 h-5 text-teal-600" />
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {t.useAadhaar}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Simulated OTP verification for demographic pre-fill (fictional mock).
            </p>
          </button>

          {/* New Patient Registration */}
          <button
            type="button"
            onClick={() => setSelectedMethod('new')}
            className={`p-5 rounded-xl border-2 text-left transition-all ${
              selectedMethod === 'new'
                ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-teal-700 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              {selectedMethod === 'new' && (
                <CheckCircle className="w-5 h-5 text-teal-600" />
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {t.useNewPatient}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Create a new outpatient hospital record for first-time visitors.
            </p>
          </button>
        </div>

        {/* Action Button */}
        <button
          id="confirm-patient-id-btn"
          type="button"
          onClick={handleProceed}
          className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>Continue with Selected Method</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
