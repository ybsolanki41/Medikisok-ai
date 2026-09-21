/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppLanguage, MedicalDocument } from '../../types';
import { TRANSLATIONS, DEMO_DOCUMENTS } from '../../data/mockData';
import { 
  Camera, 
  Upload, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Scan, 
  CornerDownRight, 
  SkipForward, 
  Maximize2 
} from 'lucide-react';

interface DocumentScanUploadScreenProps {
  language: AppLanguage;
  onDocumentCaptured: (doc: MedicalDocument) => void;
  onSkip: () => void;
  onBack: () => void;
}

export const DocumentScanUploadScreen: React.FC<DocumentScanUploadScreenProps> = ({
  language,
  onDocumentCaptured,
  onSkip,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedDocType, setSelectedDocType] = useState<'Prescription' | 'Laboratory Report' | 'Discharge Summary'>('Prescription');
  const [viewMode, setViewMode] = useState<'scanner' | 'upload'>('scanner');
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number>(0);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const activeDemoDoc = DEMO_DOCUMENTS[selectedDemoIndex];

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      onDocumentCaptured(activeDemoDoc);
    }, 600);
  };

  const handleDocTypeChange = (type: 'Prescription' | 'Laboratory Report' | 'Discharge Summary') => {
    setSelectedDocType(type);
    if (type === 'Prescription') setSelectedDemoIndex(0);
    if (type === 'Laboratory Report') setSelectedDemoIndex(1);
    if (type === 'Discharge Summary') setSelectedDemoIndex(2);
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

        <button
          type="button"
          onClick={onSkip}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition-colors"
        >
          <span>{t.skip}</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2 border border-teal-200/60">
            <Scan className="w-4 h-4 text-teal-600" />
            <span>Module B • Medical Document Digitization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t.docScanTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {t.docScanSubtitle}
          </p>
        </div>

        {/* Document Type Selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleDocTypeChange('Prescription')}
            className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedDocType === 'Prescription'
                ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Prescription (Rx)
          </button>

          <button
            type="button"
            onClick={() => handleDocTypeChange('Laboratory Report')}
            className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedDocType === 'Laboratory Report'
                ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Laboratory Report
          </button>

          <button
            type="button"
            onClick={() => handleDocTypeChange('Discharge Summary')}
            className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedDocType === 'Discharge Summary'
                ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Discharge Summary
          </button>
        </div>

        {/* Mode Switch: Camera Viewfinder vs File Upload */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('scanner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'scanner'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Digital Scanner Viewfinder</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'upload'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Document File</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Active: {activeDemoDoc.title}
          </span>
        </div>

        {viewMode === 'scanner' ? (
          /* Camera-like viewfinder frame with alignment guides */
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[380px] bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner flex flex-col items-center justify-between p-4 sm:p-6 mb-6">
            {/* Viewfinder Corner Overlays */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-teal-400 pointer-events-none" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal-400 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-teal-400 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-teal-400 pointer-events-none" />

            {/* Document Frame Mock Preview */}
            <div className="w-[85%] max-w-md h-[80%] bg-slate-100 rounded-xl shadow-2xl p-4 sm:p-6 text-slate-800 text-xs font-mono flex flex-col justify-between border border-slate-300 relative overflow-hidden my-auto select-none">
              <div className="flex items-center justify-between border-b pb-2 border-slate-300">
                <span className="font-bold text-slate-900 tracking-wider text-[11px]">
                  {activeDemoDoc.facility}
                </span>
                <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-bold">
                  {activeDemoDoc.date}
                </span>
              </div>

              <div className="py-2 text-[11px] leading-relaxed text-slate-700 whitespace-pre-line line-clamp-6">
                {activeDemoDoc.rawTextPreview}
              </div>

              <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500">
                <span>Doctor: {activeDemoDoc.doctor}</span>
                <span className="font-bold text-teal-700">Ready for capture</span>
              </div>

              {/* Flash effect on capture */}
              {isCapturing && (
                <div className="absolute inset-0 bg-white/90 animate-fade-in" />
              )}
            </div>

            {/* Viewfinder Guidance Label */}
            <div className="bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full border border-white/20">
              Align document inside the green corners and tap Capture
            </div>
          </div>
        ) : (
          /* File Upload Box */
          <div className="w-full py-12 px-6 border-2 border-dashed border-teal-300 rounded-2xl bg-teal-50/40 text-center mb-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Drag and drop your report or prescription here</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Supports PDF, PNG, JPG files up to 15MB. Fictional file pre-loaded for demonstration.
            </p>
            <div className="mt-4 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700">
              {activeDemoDoc.title} ({activeDemoDoc.date})
            </div>
          </div>
        )}

        {/* Capture Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500">
            Selected document will be processed through simulated OCR and clinical entity extraction.
          </div>

          <button
            id="capture-document-btn"
            type="button"
            onClick={handleCapture}
            className="py-4 px-8 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>{t.capturePhoto}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
