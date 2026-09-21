/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PatientCase, MedicalDocument } from '../../types';
import { OTHER_QUEUE_PATIENTS, DEMO_PATIENT_CASES } from '../../data/mockData';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  User, 
  ShieldCheck, 
  Edit3, 
  Save, 
  Check, 
  Eye, 
  FileSignature 
} from 'lucide-react';

interface DoctorDashboardProps {
  patientCase: PatientCase;
  onUpdateCase: (updated: Partial<PatientCase>) => void;
  onOpenDocumentModal: (doc: MedicalDocument) => void;
  onOpenConsentModal: () => void;
  onSwitchToPatientDashboard: () => void;
}

interface PatientPreset {
  hpi: string;
  plan: string;
  alerts: Array<{
    name: string;
    badge: string;
    val: string;
    desc: string;
    docIndex: number;
    btnText: string;
  }>;
}

const PATIENT_CLINICAL_PRESETS: Record<string, PatientPreset> = {
  'MK-10482': {
    hpi: 'Patient presents with acute-onset retrosternal chest pressure beginning yesterday. Symptoms worsen significantly with physical exertion/activity and are associated with diaphoresis (sweating) and mild dyspnea. Background history significant for Stage 2 Essential Hypertension and Type 2 Diabetes Mellitus with sub-optimal glycemic control.',
    plan: '1. STAT 12-lead Electrocardiogram (ECG)\n2. High-sensitivity Cardiac Troponin I (hs-cTnI)\n3. Titrate antihypertensive therapy (BP 148/92 mmHg)\n4. Reinforce glycemic management (HbA1c 7.4% flagged)',
    alerts: [
      {
        name: 'Glycated Hemoglobin (HbA1c)',
        badge: 'Elevated',
        val: '7.4 %',
        desc: 'Reference: < 5.7% (Normal). Indicates uncontrolled diabetes mellitus over past 90 days. Estimated average glucose: 166 mg/dL.',
        docIndex: 1,
        btnText: 'View Original Lab Report (04 Jun 2026)'
      },
      {
        name: 'Resting Blood Pressure',
        badge: 'Stage 2 HTN',
        val: '148/92 mmHg',
        desc: 'Reference: < 120/80 mmHg. Recorded at Sterling Clinic. Patient currently on Amlodipine 5mg OD; titration recommended.',
        docIndex: 0,
        btnText: 'View Original Prescription (12 Aug 2026)'
      }
    ]
  },
  'MK-10483': {
    hpi: 'Patient reports persistent spasmodic nocturnal dry cough and low-grade evening feverishness for past 5 days. Aggravated by cold air, ambient dust, and central air conditioning. Known history of allergic bronchitis and seasonal hyper-reactive airway disease.',
    plan: '1. Continue Budesonide 200 mcg inhaler with spacer (2 puffs twice daily)\n2. Tab Levocetirizine 5 mg + Montelukast 10 mg at bedtime for 15 days\n3. Peak expiratory flow rate (PEFR) daily monitoring diary\n4. Review in 10 days; avoid cold aerosol and dust exposures',
    alerts: [
      {
        name: 'Absolute Eosinophil Count (AEC)',
        badge: 'Elevated',
        val: '580 /uL',
        desc: 'Reference: 40 - 450 /uL. Significant peripheral eosinophilia correlating with acute allergic airway inflammation and bronchial hyper-reactivity.',
        docIndex: 1,
        btnText: 'View Allergy Lab Panel (10 Sep 2026)'
      },
      {
        name: 'Serum Total IgE',
        badge: 'Atopic Elevation',
        val: '310 IU/mL',
        desc: 'Reference: < 100 IU/mL. High total atopic immunoglobulin level confirming extrinsic allergic respiratory diathesis.',
        docIndex: 1,
        btnText: 'View Pathology Hemogram (10 Sep 2026)'
      }
    ]
  },
  'MK-10484': {
    hpi: '58-year-old male presenting with chronic progressive bilateral knee joint stiffness and deep aching pain, aggravated over past 3 days. Morning stiffness ~25 minutes with palpable crepitus during stair ascent. Radiographs demonstrate Grade 2 Kellgren-Lawrence medial joint compartment narrowing.',
    plan: '1. Tab Paracetamol 650 mg TDS SOS for acute joint discomfort\n2. Glucosamine Sulfate 1500 mg OD after lunch\n3. Continue Allopurinol 100 mg OD for serum uric acid control\n4. Referral for quadriceps-strengthening physiotherapy & weight management',
    alerts: [
      {
        name: 'Serum Uric Acid',
        badge: 'Elevated',
        val: '7.8 mg/dL',
        desc: 'Reference: 3.5 - 7.2 mg/dL. Hyperuricemia detected. Correlate with crystal deposition arthropathy overlap in degenerative knee joints.',
        docIndex: 1,
        btnText: 'View Rheumatology Panel (28 Aug 2026)'
      },
      {
        name: 'Bilateral Medial Joint Space',
        badge: 'Grade 2 OA',
        val: 'Narrowed (R > L)',
        desc: 'Digital standing bilateral knee radiograph confirms asymmetric medial joint narrowing and small marginal tibial osteophytes.',
        docIndex: 0,
        btnText: 'View Digital X-Ray Report (02 Sep 2026)'
      }
    ]
  },
  'MK-10485': {
    hpi: '24-year-old student presenting with acute sharp retrosternal and epigastric burning pain starting 8 hours ago following late-night street food. Associated with acid regurgitation, sour belching, and abdominal fullness. Abdomen soft, non-tender; liver and gallbladder ultrasonography normal.',
    plan: '1. Cap Pantoprazole 40 mg once daily 30 minutes before breakfast for 14 days\n2. Magaldrate + Simethicone Oral Suspension 10 mL TDS after meals SOS\n3. Dietary counseling: strictly avoid late-night spicy street food, acidic beverages, and caffeine\n4. Emergency review if melena, vomiting, or persistent pain occurs',
    alerts: [
      {
        name: 'Gastric Antral Mucosa',
        badge: 'Acute Dyspepsia',
        val: 'Prominent Rugae',
        desc: 'Ultrasonography demonstrates mild acute gastric antral fold congestion. Gallbladder and biliary channels are completely normal without calculi.',
        docIndex: 0,
        btnText: 'View Upper Abdomen USG (18 Sep 2026)'
      },
      {
        name: 'Serum Amylase & Lipase',
        badge: 'Normal / Ruled Out',
        val: '52 & 28 U/L',
        desc: 'Pancreatic enzymes well within normal reference ranges, successfully ruling out acute pancreatitis or systemic biliary colic.',
        docIndex: 1,
        btnText: 'View Emergency Biochemistry (18 Sep 2026)'
      }
    ]
  }
};

const QUEUE_ORDER = [
  { rank: '1st', id: 'MK-10482', label: '1st: YUG SOLANKI' },
  { rank: '2nd', id: 'MK-10483', label: '2nd: AAKARSH DUBEY' },
  { rank: '3rd', id: 'MK-10484', label: '3rd: VAIBHAV UPADYEY' },
  { rank: 'Last', id: 'MK-10485', label: 'Last: AKASH' }
];

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  patientCase,
  onUpdateCase,
  onOpenDocumentModal,
  onOpenConsentModal,
  onSwitchToPatientDashboard,
}) => {
  const [selectedTab, setSelectedTab] = useState<'summary' | 'alerts' | 'documents' | 'timeline' | 'edit'>('summary');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patientCase.profile.id);
  const [isEditingDraft, setIsEditingDraft] = useState(false);

  // Active patient case selection
  const activeCase: PatientCase = selectedPatientId === patientCase.profile.id
    ? patientCase
    : (DEMO_PATIENT_CASES.find((c) => c.profile.id === selectedPatientId) || patientCase);

  const initialPreset = PATIENT_CLINICAL_PRESETS[selectedPatientId] || PATIENT_CLINICAL_PRESETS['MK-10482'];
  const [editableHpi, setEditableHpi] = useState<string>(initialPreset.hpi);
  const [editablePlan, setEditablePlan] = useState<string>(initialPreset.plan);

  const [signedOffMap, setSignedOffMap] = useState<Record<string, boolean>>({
    'MK-10482': patientCase.submissionStatus === 'confirmed_by_doctor'
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectPatient = (id: string) => {
    setSelectedPatientId(id);
    setIsEditingDraft(false);
    const preset = PATIENT_CLINICAL_PRESETS[id] || PATIENT_CLINICAL_PRESETS['MK-10482'];
    setEditableHpi(preset.hpi);
    setEditablePlan(preset.plan);
    showToast(`Switched to case: ${preset === PATIENT_CLINICAL_PRESETS[id] ? id : 'Default'}`);
  };

  const handleSaveDraft = () => {
    setIsEditingDraft(false);
    if (selectedPatientId === patientCase.profile.id) {
      onUpdateCase({
        doctorNotes: `${editableHpi}\n\nClinical Orders:\n${editablePlan}`
      });
    }
    showToast(`Physician edits saved to clinical draft for ${activeCase.profile.name}.`);
  };

  const handleConfirmSummary = () => {
    setSignedOffMap((prev) => ({ ...prev, [selectedPatientId]: true }));
    if (selectedPatientId === patientCase.profile.id) {
      onUpdateCase({
        submissionStatus: 'confirmed_by_doctor',
        physicianConfirmedDate: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        doctorNotes: `${editableHpi}\n\nOrders Confirmed:\n${editablePlan}`
      });
    }
    showToast(`Summary officially confirmed and signed off for ${activeCase.profile.name} by Dr. Sharma.`);
  };

  const activePreset = PATIENT_CLINICAL_PRESETS[selectedPatientId] || PATIENT_CLINICAL_PRESETS['MK-10482'];
  const isCurrentSignedOff = !!signedOffMap[selectedPatientId];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Doctor Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Stethoscope className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Dr. Sharma, MD</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
                OPD Room 4 • Internal Medicine
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Civil Hospital & Multispeciality Health Center • MediVedah Intake Console
            </p>
          </div>
        </div>

        {/* ABDM & Consent Quick Status Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenConsentModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>ABDM Consent: Granted</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToPatientDashboard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 text-teal-600" />
            <span>Switch to Patient Dashboard</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Left Waiting Queue | Right Hero Case Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Patient Waiting Queue (1st: YUG SOLANKI, 2nd: AAKARSH DUBEY, 3rd: VAIBHAV UPADYEY, Last: AKASH) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Patient Intake Queue</h3>
                <span className="text-xs text-slate-500">4 Patients Active • Click to Inspect</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                1 Priority
              </span>
            </div>

            <div className="space-y-2.5">
              {OTHER_QUEUE_PATIENTS.map((pt, idx) => {
                const isSelected = selectedPatientId === pt.id;
                const orderInfo = QUEUE_ORDER[idx] || { rank: `${idx + 1}`, label: pt.name };

                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => handleSelectPatient(pt.id)}
                    className={`w-full p-3.5 rounded-xl border-2 text-left transition-all relative cursor-pointer ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/60 shadow-xs ring-1 ring-teal-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            {orderInfo.rank}
                          </span>
                          <span className="font-bold text-sm text-slate-900">{pt.name}</span>
                          <span className="text-xs text-slate-500">{pt.age}{pt.gender === 'Male' ? 'M' : 'F'}</span>
                        </div>
                        <span className="text-[11px] font-mono text-teal-700 block font-semibold mt-0.5">
                          {pt.id} • Token #{pt.token}
                        </span>
                      </div>

                      {pt.status === 'Priority' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                          Priority Attention
                        </span>
                      ) : (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pt.status === 'Ready'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {pt.status}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-slate-600 font-medium line-clamp-1">
                      {pt.complaint}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {pt.status === 'Ready' || pt.status === 'Priority' ? 'History Digitized' : 'Waiting in Queue'}
                      </span>
                      <span className={`font-bold ${isSelected ? 'text-teal-700' : 'text-slate-400'}`}>
                        {isSelected ? 'Active Case • Reviewing' : 'Inspect Case &rarr;'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Hero Patient Summary Screen */}
        <div className="lg:col-span-8 space-y-5">
          {/* Hero Banner: Patient Header & Priority Red Flag */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            {/* Priority Attention Strip */}
            {activeCase.isPriorityRedFlag && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 mb-5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
                <div className="text-xs leading-relaxed">
                  <div className="font-bold text-sm text-rose-900 mb-0.5">
                    CLINICAL PRIORITY ATTENTION: Acute Exertional Symptoms Flagged
                  </div>
                  {activeCase.priorityReason}
                </div>
              </div>
            )}

            {/* Patient Hero Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-xl shadow-xs">
                  {activeCase.profile.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {activeCase.profile.name}
                    </h2>
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-mono">
                      #{activeCase.tokenNumber}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                    <span>{activeCase.profile.age} Years</span>
                    <span>•</span>
                    <span>{activeCase.profile.gender}</span>
                    <span>•</span>
                    <span className="font-mono text-teal-700 font-bold">{activeCase.profile.id}</span>
                    <span>•</span>
                    <span>ABHA: {activeCase.profile.abhaId}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Edit / Confirm */}
              <div className="flex items-center gap-2">
                {isCurrentSignedOff ? (
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <Check className="w-4 h-4" />
                    <span>Summary Signed Off ({activeCase.physicianConfirmedDate || 'Today'})</span>
                  </div>
                ) : (
                  <>
                    <button
                      id="doctor-edit-summary-btn"
                      type="button"
                      onClick={() => setIsEditingDraft(!isEditingDraft)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                      <span>{isEditingDraft ? 'Cancel Edit' : 'Edit Draft'}</span>
                    </button>

                    <button
                      id="doctor-confirm-summary-btn"
                      type="button"
                      onClick={handleConfirmSummary}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <FileSignature className="w-4 h-4" />
                      <span>Confirm & Sign Off</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* AI Draft Disclaimer Mandate */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-700">
                AI-generated summary — Draft for physician review.
              </span>
              <span className="text-[11px] font-mono text-teal-700">
                Confidence: 98.6% • Source Validated via MediVedah
              </span>
            </div>

            {/* Sub Tabs: Summary, Investigation Alerts, Documents, Full Timeline */}
            <div className="flex items-center gap-2 border-b border-slate-200 mt-5 overflow-x-auto">
              <button
                type="button"
                onClick={() => setSelectedTab('summary')}
                className={`py-2.5 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTab === 'summary'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Structured Clinical Summary
              </button>

              <button
                type="button"
                onClick={() => setSelectedTab('alerts')}
                className={`py-2.5 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
                  selectedTab === 'alerts'
                    ? 'border-rose-600 text-rose-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>Investigation Alerts ({activePreset.alerts.length} Flagged)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTab('documents')}
                className={`py-2.5 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTab === 'documents'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Digitized Documents ({activeCase.documents.length})
              </button>

              <button
                type="button"
                onClick={() => setSelectedTab('timeline')}
                className={`py-2.5 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTab === 'timeline'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Full Medical Timeline
              </button>
            </div>

            {/* Tab 1: Structured Clinical Summary */}
            {selectedTab === 'summary' && (
              <div className="pt-5 space-y-4">
                {isEditingDraft ? (
                  <div className="p-4 rounded-xl border border-teal-300 bg-teal-50/40 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                      Edit Draft Clinical Case Notes for {activeCase.profile.name}
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        History of Present Illness (HPI)
                      </label>
                      <textarea
                        rows={4}
                        value={editableHpi}
                        onChange={(e) => setEditableHpi(e.target.value)}
                        className="w-full p-3 rounded-lg border border-slate-300 text-xs font-sans leading-relaxed focus:ring-2 focus:ring-teal-500 focus:outline-hidden bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Physician Action Orders & Prescriptions
                      </label>
                      <textarea
                        rows={3}
                        value={editablePlan}
                        onChange={(e) => setEditablePlan(e.target.value)}
                        className="w-full p-3 rounded-lg border border-slate-300 text-xs font-sans leading-relaxed focus:ring-2 focus:ring-teal-500 focus:outline-hidden bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Draft Changes</span>
                    </button>
                  </div>
                ) : (
                  <>
                    {/* HPI Block */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        History of Present Illness (HPI)
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {editableHpi}
                      </p>
                    </div>

                    {/* Vitals & Background Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Past Medical History & Surgeries */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-white">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                          Past History & Surgeries
                        </span>
                        <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                          {activeCase.existingConditions.map((cond, i) => (
                            <li key={i}><strong className="text-slate-900">{cond}</strong></li>
                          ))}
                          {activeCase.previousSurgeries.map((surg, i) => (
                            <li key={i}>{surg}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Active Medications & Allergies */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-white">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                          Current Medications & Allergies
                        </span>
                        <div className="space-y-1.5 text-xs text-slate-700 mb-3">
                          {activeCase.currentMedications.map((med, i) => (
                            <div key={i} className="flex justify-between items-center bg-slate-50 p-1.5 rounded">
                              <span className="font-bold text-slate-900">{med.name} {med.dosage}</span>
                              <span className="text-slate-500 text-[11px]">{med.frequency}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded font-semibold border border-emerald-200">
                          Allergies: {activeCase.drugAllergies.join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Review of Systems & Family/Social */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Review of Systems (ROS)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        {activeCase.reviewOfSystems.map((ros, i) => (
                          <div key={i} className="bg-slate-50 p-2 rounded border border-slate-100">
                            {ros}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clinical Orders Box */}
                    <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-xs text-teal-950">
                      <span className="font-bold block mb-1 uppercase tracking-wider text-teal-900">
                        Physician Action Orders & Recommendations
                      </span>
                      <pre className="font-sans whitespace-pre-line leading-relaxed text-slate-800">
                        {editablePlan}
                      </pre>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Tab 2: Investigation Alerts */}
            {selectedTab === 'alerts' && (
              <div className="pt-5 space-y-4">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Flagged for Physician Attention ({activeCase.profile.name}):</strong> Key diagnostic clinical indices surpass established thresholds and warrant treatment evaluation.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activePreset.alerts.map((alert, idx) => (
                    <div key={idx} className="p-5 rounded-xl border-2 border-rose-200 bg-white shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {alert.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">
                          {alert.badge}
                        </span>
                      </div>

                      <div className="text-3xl font-extrabold font-mono text-rose-700 my-2">
                        {alert.val}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {alert.desc}
                      </p>

                      {activeCase.documents[alert.docIndex] && (
                        <button
                          type="button"
                          onClick={() => onOpenDocumentModal(activeCase.documents[alert.docIndex])}
                          className="w-full py-2 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{alert.btnText}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Documents */}
            {selectedTab === 'documents' && (
              <div className="pt-5 space-y-3">
                <span className="text-xs text-slate-500 font-medium block">
                  Showing digitized source documents for <strong>{activeCase.profile.name}</strong>. Click any record to inspect OCR highlights and laboratory values.
                </span>

                <div className="space-y-3">
                  {activeCase.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{doc.title}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {doc.type}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.facility}</span>
                            <span>•</span>
                            <span>Clinician: {doc.doctor}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenDocumentModal(doc)}
                        className="py-2 px-3.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Open Document</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Full Medical Timeline */}
            {selectedTab === 'timeline' && (
              <div className="pt-5">
                <span className="text-xs text-slate-500 font-medium block mb-4">
                  Longitudinal chronological medical history for <strong>{activeCase.profile.name}</strong>.
                </span>
                <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {activeCase.timeline.map((event) => (
                    <div key={event.id} className="relative group">
                      <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full border-2 border-white bg-teal-600 shadow-xs ring-4 ring-teal-50" />

                      <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-300 transition-all shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60 font-mono">
                              {event.date}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900">
                              {event.title}
                            </h4>
                          </div>

                          {event.highlightBadge && (
                            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 self-start sm:self-auto">
                              {event.highlightBadge}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-500 mb-1.5">
                          {event.provider}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {event.summary}
                        </p>

                        {event.documentId && (
                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                const doc = activeCase.documents.find((d) => d.id === event.documentId);
                                if (doc) onOpenDocumentModal(doc);
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Inspect Scanned Source ({event.date})</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
