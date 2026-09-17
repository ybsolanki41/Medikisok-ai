/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PatientCase } from '../../types';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  KeyRound, 
  FileCheck, 
  Clock, 
  Building 
} from 'lucide-react';

interface AbdmConsentModalProps {
  patientCase: PatientCase;
  onClose: () => void;
}

export const AbdmConsentModal: React.FC<AbdmConsentModalProps> = ({
  patientCase,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-teal-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                ABDM Consent & Security Audit Artifact
              </h3>
              <p className="text-xs text-teal-800 font-medium mt-0.5">
                Ayushman Bharat Digital Mission • Standard Consent Flow (Demo Linked)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-teal-100/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Status summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-bold block mb-1">Consent Status</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> Granted (Revocable)
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-bold block mb-1">Session Status</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                <Clock className="w-3.5 h-3.5" /> Active Consultation
              </span>
            </div>
          </div>

          {/* Detailed consent table */}
          <div className="border border-slate-200 rounded-xl divide-y divide-slate-200">
            <div className="p-3 flex justify-between bg-slate-50/50">
              <span className="font-bold text-slate-700">Patient Identifier</span>
              <span className="font-mono text-slate-900 font-semibold">{patientCase.profile.id} ({patientCase.profile.name})</span>
            </div>

            <div className="p-3 flex justify-between">
              <span className="font-bold text-slate-700">ABHA Address</span>
              <span className="font-mono text-teal-800 font-semibold">{patientCase.profile.abhaId}@abdm</span>
            </div>

            <div className="p-3 flex justify-between bg-slate-50/50">
              <span className="font-bold text-slate-700">Clinical Purpose</span>
              <span className="text-slate-800 text-right max-w-xs">{patientCase.consentPurpose}</span>
            </div>

            <div className="p-3 flex justify-between">
              <span className="font-bold text-slate-700">Treating Healthcare Professional</span>
              <span className="text-slate-900 font-semibold">Dr. Sharma (Internal Medicine, Reg #GMC-49201)</span>
            </div>

            <div className="p-3 flex justify-between bg-slate-50/50">
              <span className="font-bold text-slate-700">Consent Timestamp</span>
              <span className="font-mono text-slate-700">{patientCase.consentTimestamp}</span>
            </div>

            <div className="p-3 flex justify-between">
              <span className="font-bold text-slate-700">Cryptographic Artifact Hash</span>
              <span className="font-mono text-[10px] text-slate-500 break-all">
                SHA256: 8f4b10e39a7d21c0...3e41b9
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            <strong>ABDM Interoperability Note:</strong> Demonstrated in sandbox compliance mode. No real national Aadhaar or confidential PII data was queried or stored.
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer"
          >
            Close Audit Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
