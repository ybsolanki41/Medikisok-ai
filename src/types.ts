/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppMode = 'patient' | 'doctor';

export type PatientStep =
  | 'welcome'
  | 'language'
  | 'identification'
  | 'consent'
  | 'profile'
  | 'ai-intro'
  | 'complaint'
  | 'adaptive-questions'
  | 'red-flag'
  | 'medical-history'
  | 'ayush-assessment'
  | 'document-upload'
  | 'document-scanner'
  | 'ocr-processing'
  | 'extraction-results'
  | 'timeline'
  | 'review'
  | 'submission';

export type AppLanguage = 'en' | 'hi' | 'gu';

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  preferredLanguage: AppLanguage;
  abhaId: string;
  contactNumber: string;
  emergencyContact: string;
}

export interface AdaptiveAnswer {
  onset: string;
  character: string;
  aggravating: string;
  associated: string[];
}

export interface AyushAssessment {
  prakriti: string;
  vikriti: string;
  agni: string;
  koshta: string;
  aharaShakti: string;
  vaya: string;
  satmya: string;
  satva: string;
  samhanana?: string;
  pramana?: string;
  sara?: string;
}

export interface ExtractedInvestigation {
  id: string;
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  abnormal: boolean;
  clinicalNote: string;
}

export interface MedicalDocument {
  id: string;
  title: string;
  type: 'Prescription' | 'Laboratory Report' | 'Discharge Summary' | 'Radiology';
  date: string;
  facility: string;
  doctor: string;
  fileUrl?: string;
  thumbnailColor: string;
  extractedMedicines: string[];
  extractedDiagnosis: string[];
  extractedInvestigations: ExtractedInvestigation[];
  rawTextPreview: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'prescription' | 'lab' | 'consultation' | 'discharge';
  title: string;
  provider: string;
  summary: string;
  highlightBadge?: string;
  documentId?: string;
}

export interface PatientCase {
  profile: PatientProfile;
  chiefComplaint: string;
  adaptiveAnswers: AdaptiveAnswer;
  isPriorityRedFlag: boolean;
  priorityReason?: string;
  existingConditions: string[];
  previousSurgeries: string[];
  currentMedications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    indication?: string;
  }>;
  drugAllergies: string[];
  familyHistory: string[];
  personalHistory: string[];
  reviewOfSystems: string[];
  ayushAssessment?: AyushAssessment;
  documents: MedicalDocument[];
  timeline: TimelineEvent[];
  consentGranted: boolean;
  consentTimestamp: string;
  consentPurpose: string;
  submissionStatus: 'in_progress' | 'submitted' | 'confirmed_by_doctor';
  tokenNumber: string;
  doctorNotes?: string;
  physicianConfirmedDate?: string;
}
