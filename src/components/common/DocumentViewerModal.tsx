/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MedicalDocument } from '../../types';
import { 
  X, 
  FileText, 
  Calendar, 
  User, 
  Building2, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles 
} from 'lucide-react';

interface DocumentViewerModalProps {
  document: MedicalDocument | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  onClose,
}) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{document.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span>{document.date}</span>
                <span>•</span>
                <span>{document.facility}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Fictional Digitized Document Canvas */}
          <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50/50 shadow-inner font-mono text-xs text-slate-800 relative">
            <div className="flex items-center justify-between border-b pb-3 border-slate-300 mb-4">
              <div>
                <span className="font-bold text-sm tracking-wide text-slate-900 block">{document.facility}</span>
                <span className="text-[11px] text-slate-500">Clinician: {document.doctor}</span>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 bg-teal-100 text-teal-800 font-bold rounded text-[10px]">
                  ORIGINAL RECORD
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Date: {document.date}</span>
              </div>
            </div>

            {/* Document Content */}
            <div className="whitespace-pre-line leading-relaxed text-slate-700 bg-white p-4 rounded-lg border border-slate-200">
              {document.rawTextPreview}
            </div>

            {/* Simulated OCR Bounding Overlay Indicator */}
            <div className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 text-teal-700 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OCR Pipeline: 100% Entity Confidence</span>
              </div>
              <span className="font-sans text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                Simulated Source Document
              </span>
            </div>
          </div>

          {/* Extracted Clinical Structured Entities */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Extracted Clinical Entities (Cross-Referenced)
            </h4>

            {document.extractedMedicines.length > 0 && (
              <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 text-xs">
                <span className="font-bold text-teal-900 block mb-1">Medications:</span>
                <ul className="list-disc list-inside space-y-1 text-teal-950 font-medium">
                  {document.extractedMedicines.map((med, idx) => (
                    <li key={idx}>{med}</li>
                  ))}
                </ul>
              </div>
            )}

            {document.extractedInvestigations.length > 0 && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-800 block mb-2">Investigation Values:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {document.extractedInvestigations.map((inv, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded border ${
                        inv.abnormal
                          ? 'border-rose-200 bg-rose-50/70 text-rose-950'
                          : 'border-slate-200 bg-white text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{inv.testName}</span>
                        <span className="font-mono">{inv.value} {inv.unit}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Ref: {inv.referenceRange} {inv.abnormal && '• Abnormal'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            MediVedah Document Vault (ABDM Health Record Token #MK-DOC-{document.id})
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
