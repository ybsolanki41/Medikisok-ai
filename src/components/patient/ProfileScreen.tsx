/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PatientProfile, AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Edit3, 
  Check, 
  Phone, 
  Globe2, 
  ShieldCheck, 
  QrCode 
} from 'lucide-react';

interface ProfileScreenProps {
  patient: PatientProfile;
  language: AppLanguage;
  onUpdatePatient: (updated: PatientProfile) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  patient,
  language,
  onUpdatePatient,
  onConfirm,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PatientProfile>({ ...patient });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePatient(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8 px-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          Identity Verified
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
              Demographic Confirmation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              {t.profileTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t.profileSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Info'}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Language</label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value as AppLanguage })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              >
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="en">English</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        ) : (
          <div className="space-y-3 mb-8">
            {/* Primary Profile Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{patient.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{patient.age} yrs</span>
                    <span>•</span>
                    <span>{patient.gender}</span>
                    <span>•</span>
                    <span className="font-mono text-teal-700 font-bold">{patient.id}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5" /> Matched Record
                </span>
              </div>
            </div>

            {/* ABHA & Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <QrCode className="w-4 h-4 text-teal-600" />
                  <span>ABHA Number</span>
                </div>
                <div className="font-mono font-bold text-slate-800 text-sm tracking-wide">
                  {patient.abhaId}
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Globe2 className="w-4 h-4 text-teal-600" />
                  <span>Consultation Language</span>
                </div>
                <div className="font-bold text-slate-800 text-sm">
                  {patient.preferredLanguage === 'gu'
                    ? 'ગુજરાતી (Gujarati)'
                    : patient.preferredLanguage === 'hi'
                    ? 'हिन्दी (Hindi)'
                    : 'English'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Button */}
        <button
          id="confirm-profile-btn"
          type="button"
          onClick={onConfirm}
          className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>Confirm & Start Clinical Questions</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
