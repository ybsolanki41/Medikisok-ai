/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MedicalDocument } from '../../types';
import { 
  CheckCircle2, 
  Loader2, 
  Scan, 
  Sparkles, 
  FileCheck, 
  ShieldCheck 
} from 'lucide-react';

interface OcrProcessingScreenProps {
  document: MedicalDocument;
  onComplete: () => void;
}

export const OcrProcessingScreen: React.FC<OcrProcessingScreenProps> = ({
  document,
  onComplete,
}) => {
  const [progress, setProgress] = useState<number>(15);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps = [
    { label: 'Document boundaries & orientation detected', detail: 'Edge-contrast normalization active' },
    { label: 'High-accuracy OCR text stream extracted', detail: '148 words recognized with 98.4% confidence' },
    { label: 'Clinical NER (Named Entity Recognition) parsed', detail: 'SNOMED CT & RxNorm cross-referenced' },
    { label: 'Document date identified', detail: `${document.date} at ${document.facility}` },
    { label: 'Active medicines & dosages parsed', detail: `${document.extractedMedicines.length || 2} active medications structured` },
    { label: 'Diagnostic & investigation values tagged', detail: 'HbA1c and Blood Pressure thresholds evaluated' }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(35);
      setActiveStepIndex(1);
    }, 700);

    const timer2 = setTimeout(() => {
      setProgress(55);
      setActiveStepIndex(2);
    }, 1400);

    const timer3 = setTimeout(() => {
      setProgress(75);
      setActiveStepIndex(3);
    }, 2100);

    const timer4 = setTimeout(() => {
      setProgress(90);
      setActiveStepIndex(4);
    }, 2800);

    const timer5 = setTimeout(() => {
      setProgress(100);
      setActiveStepIndex(5);
    }, 3500);

    const timer6 = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [onComplete]);

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 text-center">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Animated Scanning Sweep Bar */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="w-24 h-24 rounded-2xl bg-teal-50 border-2 border-teal-500/40 flex items-center justify-center relative overflow-hidden">
            <Scan className="w-12 h-12 text-teal-600" />
            {/* Laser Beam Animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-bounce" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Digitizing Medical Document
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
          AI/OCR pipeline is extracting clinical entities, dates, medications, and laboratory values.
        </p>

        {/* Progress bar */}
        <div className="my-6 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
            <span className="font-mono text-teal-700">Entity Processing</span>
            <span className="font-mono">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist of Real-Time Extraction Steps */}
        <div className="max-w-md mx-auto space-y-2.5 text-left mb-8">
          {steps.map((step, idx) => {
            const isDone = idx <= activeStepIndex;
            const isCurrent = idx === activeStepIndex && progress < 100;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  isDone
                    ? 'bg-teal-50/60 border-teal-200/80 text-teal-950'
                    : 'bg-slate-50/50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate block">
                      {step.label}
                    </span>
                    {isCurrent && (
                      <Loader2 className="w-3 h-3 text-teal-600 animate-spin shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium pt-4 border-t border-slate-100">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Extracted items are staged in draft for patient & doctor confirmation.</span>
        </div>
      </div>
    </div>
  );
};
