/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  AppMode, 
  PatientStep, 
  AppLanguage, 
  PatientCase, 
  MedicalDocument, 
  PatientProfile, 
  AdaptiveAnswer 
} from './types';
import { INITIAL_DEMO_PATIENT, DEMO_DOCUMENTS } from './data/mockData';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/patient/WelcomeScreen';
import { IdentificationScreen } from './components/patient/IdentificationScreen';
import { ConsentScreen } from './components/patient/ConsentScreen';
import { ProfileScreen } from './components/patient/ProfileScreen';
import { AiIntroScreen } from './components/patient/AiIntroScreen';
import { ChiefComplaintScreen } from './components/patient/ChiefComplaintScreen';
import { AdaptiveQuestionsScreen } from './components/patient/AdaptiveQuestionsScreen';
import { RedFlagAlert } from './components/patient/RedFlagAlert';
import { MedicalHistoryScreen } from './components/patient/MedicalHistoryScreen';
import { DocumentScanUploadScreen } from './components/patient/DocumentScanUploadScreen';
import { OcrProcessingScreen } from './components/patient/OcrProcessingScreen';
import { ExtractionResultsScreen } from './components/patient/ExtractionResultsScreen';
import { TimelineScreen } from './components/patient/TimelineScreen';
import { ReviewSubmissionScreen } from './components/patient/ReviewSubmissionScreen';
import { SubmissionSuccessScreen } from './components/patient/SubmissionSuccessScreen';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { DocumentViewerModal } from './components/common/DocumentViewerModal';
import { AbdmConsentModal } from './components/common/AbdmConsentModal';
import { stopSpeaking } from './utils/speech';

export default function App() {
  const [mode, setMode] = useState<AppMode>('patient');
  const [currentStep, setCurrentStep] = useState<PatientStep>('welcome');
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [patientCase, setPatientCase] = useState<PatientCase>({ ...INITIAL_DEMO_PATIENT });
  const [activeDocument, setActiveDocument] = useState<MedicalDocument>(DEMO_DOCUMENTS[0]);
  const [viewerModalDoc, setViewerModalDoc] = useState<MedicalDocument | null>(null);
  const [showConsentModal, setShowConsentModal] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Stop any active speech on step/mode unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [currentStep, mode]);

  const handleModeChange = (newMode: AppMode) => {
    stopSpeaking();
    setMode(newMode);
  };

  const handleLanguageChange = (newLang: AppLanguage) => {
    setLanguage(newLang);
    setPatientCase((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        preferredLanguage: newLang
      }
    }));
  };

  const handleResetDemo = () => {
    stopSpeaking();
    setPatientCase({ ...INITIAL_DEMO_PATIENT });
    setCurrentStep('welcome');
    setMode('patient');
    setLanguage('en');
  };

  const handleQuickDemoLoad = () => {
    setPatientCase({ ...INITIAL_DEMO_PATIENT });
    setCurrentStep('profile');
  };

  const handlePatientIdentified = (profile: PatientProfile) => {
    setPatientCase((prev) => ({
      ...prev,
      profile
    }));
    setCurrentStep('consent');
  };

  const handleConsentGiven = () => {
    setPatientCase((prev) => ({
      ...prev,
      consentGranted: true,
      consentTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST'
    }));
    setCurrentStep('profile');
  };

  const handleProfileConfirmed = () => {
    setCurrentStep('ai-intro');
  };

  const handleStartQuestions = () => {
    setCurrentStep('complaint');
  };

  const handleComplaintSelected = (complaint: string) => {
    setPatientCase((prev) => ({
      ...prev,
      chiefComplaint: complaint
    }));
  };

  const handleProceedFromComplaint = () => {
    setCurrentStep('adaptive-questions');
  };

  const handleAdaptiveComplete = (isRedFlag: boolean) => {
    setPatientCase((prev) => ({
      ...prev,
      isPriorityRedFlag: isRedFlag
    }));

    if (isRedFlag) {
      setCurrentStep('red-flag');
    } else {
      setCurrentStep('medical-history');
    }
  };

  const handleDocumentCaptured = (doc: MedicalDocument) => {
    setActiveDocument(doc);
    setCurrentStep('ocr-processing');
  };

  const handleOcrComplete = () => {
    setCurrentStep('extraction-results');
  };

  const handleExtractionConfirmed = () => {
    setCurrentStep('timeline');
  };

  const handleSubmitCase = () => {
    setPatientCase((prev) => ({
      ...prev,
      submissionStatus: 'submitted',
      tokenNumber: 'A-14'
    }));
    setCurrentStep('submission');
  };

  const handleOpenDocumentById = (docId: string) => {
    const doc = patientCase.documents.find((d) => d.id === docId);
    if (doc) {
      setViewerModalDoc(doc);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Universal Header with Role Switcher & Accessibility */}
      <Header
        mode={mode}
        onModeChange={handleModeChange}
        language={language}
        onLanguageChange={handleLanguageChange}
        onResetDemo={handleResetDemo}
        isAudioPlaying={isAudioPlaying}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {mode === 'patient' ? (
          <>
            {currentStep === 'welcome' && (
              <WelcomeScreen
                language={language}
                onLanguageChange={handleLanguageChange}
                onStart={() => setCurrentStep('identification')}
                onQuickDemoLoad={handleQuickDemoLoad}
              />
            )}

            {currentStep === 'identification' && (
              <IdentificationScreen
                language={language}
                onSelectPatient={handlePatientIdentified}
                onBack={() => setCurrentStep('welcome')}
              />
            )}

            {currentStep === 'consent' && (
              <ConsentScreen
                language={language}
                onConsentGiven={handleConsentGiven}
                onBack={() => setCurrentStep('identification')}
              />
            )}

            {currentStep === 'profile' && (
              <ProfileScreen
                patient={patientCase.profile}
                language={language}
                onUpdatePatient={(updated) =>
                  setPatientCase((prev) => ({ ...prev, profile: updated }))
                }
                onConfirm={handleProfileConfirmed}
                onBack={() => setCurrentStep('consent')}
              />
            )}

            {currentStep === 'ai-intro' && (
              <AiIntroScreen
                language={language}
                onStartQuestions={handleStartQuestions}
                onBack={() => setCurrentStep('profile')}
              />
            )}

            {currentStep === 'complaint' && (
              <ChiefComplaintScreen
                language={language}
                selectedComplaint={patientCase.chiefComplaint}
                onSelectComplaint={handleComplaintSelected}
                onContinue={handleProceedFromComplaint}
                onBack={() => setCurrentStep('ai-intro')}
              />
            )}

            {currentStep === 'adaptive-questions' && (
              <AdaptiveQuestionsScreen
                language={language}
                answers={patientCase.adaptiveAnswers}
                onUpdateAnswers={(answers: AdaptiveAnswer) =>
                  setPatientCase((prev) => ({ ...prev, adaptiveAnswers: answers }))
                }
                onComplete={handleAdaptiveComplete}
                onBack={() => setCurrentStep('complaint')}
              />
            )}

            {currentStep === 'red-flag' && (
              <RedFlagAlert
                language={language}
                patientName={patientCase.profile.name}
                tokenNumber={patientCase.tokenNumber}
                onContinue={() => setCurrentStep('medical-history')}
              />
            )}

            {currentStep === 'medical-history' && (
              <MedicalHistoryScreen
                language={language}
                patientCase={patientCase}
                onUpdateCase={(updated) =>
                  setPatientCase((prev) => ({ ...prev, ...updated }))
                }
                onContinue={() => setCurrentStep('document-upload')}
                onBack={() =>
                  setCurrentStep(patientCase.isPriorityRedFlag ? 'red-flag' : 'adaptive-questions')
                }
              />
            )}

            {currentStep === 'document-upload' && (
              <DocumentScanUploadScreen
                language={language}
                onDocumentCaptured={handleDocumentCaptured}
                onSkip={() => setCurrentStep('timeline')}
                onBack={() => setCurrentStep('medical-history')}
              />
            )}

            {currentStep === 'ocr-processing' && (
              <OcrProcessingScreen
                document={activeDocument}
                onComplete={handleOcrComplete}
              />
            )}

            {currentStep === 'extraction-results' && (
              <ExtractionResultsScreen
                language={language}
                document={activeDocument}
                onConfirm={handleExtractionConfirmed}
                onBack={() => setCurrentStep('document-upload')}
              />
            )}

            {currentStep === 'timeline' && (
              <TimelineScreen
                language={language}
                timeline={patientCase.timeline}
                onOpenDocument={handleOpenDocumentById}
                onContinue={() => setCurrentStep('review')}
                onBack={() => setCurrentStep('document-upload')}
              />
            )}

            {currentStep === 'review' && (
              <ReviewSubmissionScreen
                language={language}
                patientCase={patientCase}
                onNavigateToStep={(step) => setCurrentStep(step)}
                onSubmit={handleSubmitCase}
                onBack={() => setCurrentStep('timeline')}
              />
            )}

            {currentStep === 'submission' && (
              <SubmissionSuccessScreen
                language={language}
                patientCase={patientCase}
                onOpenDoctorDashboard={() => setMode('doctor')}
                onStartNewSession={() => setCurrentStep('welcome')}
              />
            )}
          </>
        ) : (
          /* Doctor Console Mode */
          <DoctorDashboard
            patientCase={patientCase}
            onUpdateCase={(updated) =>
              setPatientCase((prev) => ({ ...prev, ...updated }))
            }
            onOpenDocumentModal={(doc) => setViewerModalDoc(doc)}
            onOpenConsentModal={() => setShowConsentModal(true)}
            onSwitchToPatientDashboard={() => setMode('patient')}
          />
        )}
      </main>

      {/* High-Fidelity Document Viewer Modal */}
      <DocumentViewerModal
        document={viewerModalDoc}
        onClose={() => setViewerModalDoc(null)}
      />

      {/* ABDM Consent & Security Audit Modal */}
      {showConsentModal && (
        <AbdmConsentModal
          patientCase={patientCase}
          onClose={() => setShowConsentModal(false)}
        />
      )}
    </div>
  );
}
