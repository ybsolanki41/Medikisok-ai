/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PatientCase, MedicalDocument, TimelineEvent } from '../types';

export const DEMO_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-1',
    title: 'Outpatient Prescription Slip',
    type: 'Prescription',
    date: '12 Aug 2026',
    facility: 'Sterling Multispeciality Clinic, Ahmedabad',
    doctor: 'Dr. Sameer Mehta, MD (Internal Medicine)',
    thumbnailColor: 'emerald',
    extractedMedicines: [
      'Metformin 500 mg - 1 tab twice daily with meals',
      'Amlodipine 5 mg - 1 tab once daily in the morning'
    ],
    extractedDiagnosis: [
      'Type 2 Diabetes Mellitus',
      'Essential Hypertension (Grade 2)'
    ],
    extractedInvestigations: [
      {
        id: 'inv-1',
        testName: 'Blood Pressure',
        value: '148/92',
        unit: 'mmHg',
        referenceRange: '< 120/80',
        abnormal: true,
        clinicalNote: 'Hypertension Stage 2 - Requires ongoing titration'
      },
      {
        id: 'inv-2',
        testName: 'Fasting Plasma Glucose',
        value: '154',
        unit: 'mg/dL',
        referenceRange: '70 - 100',
        abnormal: true,
        clinicalNote: 'Above target glycemic control'
      }
    ],
    rawTextPreview: `STERLING HEALTH CLINIC - DR. SAMEER MEHTA, MD
Patient: Rahul Patel (42M) | Date: 12-08-2026
Rx:
1. Tab Amlodipine 5mg PO OD morning #30
2. Tab Metformin 500mg PO BD with breakfast & dinner #60
BP: 148/92 mmHg | Pulse: 78/min
Advised: Low sodium diet, 45 min walk, repeat HbA1c in 3 months.`
  },
  {
    id: 'doc-2',
    title: 'Comprehensive Diagnostic Laboratory Report',
    type: 'Laboratory Report',
    date: '04 Jun 2026',
    facility: 'Metro Diagnostics & Clinical Pathology Center',
    doctor: 'Dr. Ananya Iyer, MD (Pathology)',
    thumbnailColor: 'sky',
    extractedMedicines: [],
    extractedDiagnosis: ['Impaired Glycemic Control', 'Dyslipidemia'],
    extractedInvestigations: [
      {
        id: 'inv-3',
        testName: 'Glycated Hemoglobin (HbA1c)',
        value: '7.4',
        unit: '%',
        referenceRange: '< 5.7 (Normal), 5.7-6.4 (Prediabetic)',
        abnormal: true,
        clinicalNote: 'Flagged for physician attention: Elevated risk of microvascular complications.'
      },
      {
        id: 'inv-4',
        testName: 'Estimated Average Glucose (eAG)',
        value: '166',
        unit: 'mg/dL',
        referenceRange: '< 117',
        abnormal: true,
        clinicalNote: 'Correlates with HbA1c 7.4%'
      },
      {
        id: 'inv-5',
        testName: 'Serum Creatinine',
        value: '0.9',
        unit: 'mg/dL',
        referenceRange: '0.7 - 1.3',
        abnormal: false,
        clinicalNote: 'Normal renal clearance profile'
      },
      {
        id: 'inv-6',
        testName: 'Total Cholesterol',
        value: '215',
        unit: 'mg/dL',
        referenceRange: '< 200',
        abnormal: true,
        clinicalNote: 'Borderline elevated'
      }
    ],
    rawTextPreview: `METRO PATHOLOGY LABS - REPORT #MPL-883921
Patient: Rahul Patel | Age: 42 | Gender: Male | Date: 04-Jun-2026
TEST RESULTS:
- HbA1c (HPLC method): 7.4 % [ABNORMAL] (Ref: <5.7%)
- eAG: 166 mg/dL [ABNORMAL]
- Total Cholesterol: 215 mg/dL [ABNORMAL] (Ref: <200)
- Triglycerides: 168 mg/dL (Ref: <150)
- Serum Creatinine: 0.9 mg/dL (Ref: 0.7 - 1.3)`
  },
  {
    id: 'doc-3',
    title: 'Discharge Summary & Post-Operative Notes',
    type: 'Discharge Summary',
    date: '09 Jan 2026',
    facility: 'City Health General Hospital',
    doctor: 'Dr. Rajesh Kothari, MS (General Surgery)',
    thumbnailColor: 'amber',
    extractedMedicines: [
      'Paracetamol 650 mg - As needed for pain (completed)',
      'Pantoprazole 40 mg - OD for 14 days (completed)'
    ],
    extractedDiagnosis: [
      'Acute Cholecystitis with Cholelithiasis',
      'Status Post Laparoscopic Cholecystectomy'
    ],
    extractedInvestigations: [
      {
        id: 'inv-7',
        testName: 'Post-Op Hemoglobin',
        value: '13.8',
        unit: 'g/dL',
        referenceRange: '13.0 - 17.0',
        abnormal: false,
        clinicalNote: 'Stable surgical recovery'
      }
    ],
    rawTextPreview: `CITY HEALTH HOSPITAL - DISCHARGE SUMMARY
Admission: 06-Jan-2026 | Discharge: 09-Jan-2026
Diagnosis: Symptomatic Gallstone Disease
Procedure: Elective Laparoscopic Cholecystectomy uneventful.
Histopathology: Chronic follicular cholecystitis with gallstones.
Discharge vitals stable: BP 130/84, HR 72, SpO2 99% on room air.`
  }
];

export const DEMO_TIMELINE: TimelineEvent[] = [
  {
    id: 'time-1',
    date: '12 Aug 2026',
    type: 'prescription',
    title: 'Prescription Review - Cardiology & General Medicine',
    provider: 'Dr. Sameer Mehta (Sterling Clinic)',
    summary: 'Hypertension and glycemic management. Rx: Amlodipine 5mg OD, Metformin 500mg BD. BP recorded 148/92 mmHg.',
    highlightBadge: 'BP Flagged 148/92',
    documentId: 'doc-1'
  },
  {
    id: 'time-2',
    date: '04 Jun 2026',
    type: 'lab',
    title: 'Diagnostic Blood Chemistry & Lipid Profile',
    provider: 'Metro Diagnostics & Clinical Pathology',
    summary: 'Elevated HbA1c at 7.4% and borderline elevated total cholesterol at 215 mg/dL. Normal renal indices.',
    highlightBadge: 'HbA1c 7.4% Elevated',
    documentId: 'doc-2'
  },
  {
    id: 'time-3',
    date: '18 Mar 2026',
    type: 'consultation',
    title: 'Quarterly Chronic Disease Follow-up',
    provider: 'Dr. Sameer Mehta (Sterling Clinic)',
    summary: 'Routine review of diabetes control and blood pressure monitoring. Advised lifestyle modifications.',
    highlightBadge: 'Routine Review'
  },
  {
    id: 'time-4',
    date: '09 Jan 2026',
    type: 'discharge',
    title: 'Discharge Summary - Laparoscopic Cholecystectomy',
    provider: 'City Health General Hospital',
    summary: 'Uneventful recovery following elective gallbladder resection. Histopathology confirmed benign gallstone disease.',
    highlightBadge: 'Surgical Recovery Stable',
    documentId: 'doc-3'
  }
];

export const INITIAL_DEMO_PATIENT: PatientCase = {
  profile: {
    id: 'MK-10482',
    name: 'Rahul Patel',
    age: 42,
    gender: 'Male',
    preferredLanguage: 'gu',
    abhaId: '91-4820-1928-3019',
    contactNumber: '+91 98250 14820',
    emergencyContact: 'Meera Patel (Spouse) - +91 98250 14821'
  },
  chiefComplaint: 'Chest discomfort',
  adaptiveAnswers: {
    onset: 'Yesterday',
    character: 'Pressure / Tightness',
    aggravating: 'Activity',
    associated: ['Shortness of breath', 'Sweating']
  },
  isPriorityRedFlag: true,
  priorityReason: 'Acute retrosternal chest pressure worsening with exertion, accompanied by diaphoresis and exertional shortness of breath in a patient with diagnosed hypertension and type 2 diabetes.',
  existingConditions: ['Hypertension (Stage 2)', 'Type 2 Diabetes Mellitus'],
  previousSurgeries: ['Laparoscopic Cholecystectomy (Jan 2026)', 'Appendectomy (2014)'],
  currentMedications: [
    {
      name: 'Amlodipine',
      dosage: '5 mg',
      frequency: 'Once daily (morning)',
      indication: 'Hypertension'
    },
    {
      name: 'Metformin',
      dosage: '500 mg',
      frequency: 'Twice daily with meals',
      indication: 'Type 2 Diabetes'
    }
  ],
  drugAllergies: ['No known drug allergies (NKDA)'],
  familyHistory: ['Father: Coronary artery disease / MI at age 56', 'Mother: Type 2 diabetes mellitus'],
  personalHistory: [
    'Non-smoker',
    'No alcohol consumption',
    'Vegetarian diet with moderate dairy intake',
    'Sedentary desk profession (IT Operations)'
  ],
  reviewOfSystems: [
    'Cardiovascular: Exertional chest tightness, diaphoresis reported.',
    'Respiratory: Mild dyspnea on walking uphill.',
    'Gastrointestinal: No nausea, vomiting, or epigastric burning.',
    'Neurological: No dizziness or syncope.'
  ],
  ayushAssessment: {
    prakriti: 'Pitta-Kapha (Predominant Pitta with secondary Kapha)',
    vikriti: 'Vata aggravation (Prana & Vyana Vayu imbalance)',
    agni: 'Mandagni (Sub-optimal digestive fire)',
    koshta: 'Madhyama (Regular, non-constipated)',
    aharaShakti: 'Madhyama (Moderate dietary capacity)',
    vaya: 'Madhyama Vaya (Pravriddha - 42 years)',
    satmya: 'Mishra Satmya (Mixed regional vegetarian adaptation)',
    satva: 'Madhyama Satva (Moderate mental fortitude)'
  },
  documents: DEMO_DOCUMENTS,
  timeline: DEMO_TIMELINE,
  consentGranted: true,
  consentTimestamp: '17 Sep 2026, 09:12 AM IST',
  consentPurpose: 'Pre-consultation clinical history capture, OCR document structuring, and physician intake review under ABDM guidelines.',
  submissionStatus: 'submitted',
  tokenNumber: 'A-14',
  doctorNotes: 'Patient present at Kiosk with acute exertional chest pressure. Vitals flagged for immediate triage. Instructed nursing station to obtain STAT 12-lead ECG and bedside troponin.',
  physicianConfirmedDate: undefined
};

export const OTHER_QUEUE_PATIENTS: Array<{
  id: string;
  name: string;
  age: number;
  gender: string;
  complaint: string;
  status: 'Priority' | 'Ready' | 'In Intake';
  timeWaiting: string;
  token: string;
}> = [
  {
    id: 'MK-10482',
    name: 'Rahul Patel',
    age: 42,
    gender: 'Male',
    complaint: 'Chest discomfort (Exertional pressure)',
    status: 'Priority',
    timeWaiting: '4 mins ago',
    token: 'A-14'
  },
  {
    id: 'MK-10483',
    name: 'Sunita Rao',
    age: 36,
    gender: 'Female',
    complaint: 'Persistent dry cough & low fever (5 days)',
    status: 'Ready',
    timeWaiting: '12 mins ago',
    token: 'A-15'
  },
  {
    id: 'MK-10484',
    name: 'Amit Verma',
    age: 58,
    gender: 'Male',
    complaint: 'Joint stiffness & chronic knee pain',
    status: 'Ready',
    timeWaiting: '18 mins ago',
    token: 'A-16'
  },
  {
    id: 'MK-10485',
    name: 'Kavita Dave',
    age: 29,
    gender: 'Female',
    complaint: 'Abdominal cramps following food intake',
    status: 'In Intake',
    timeWaiting: '2 mins ago',
    token: 'A-17'
  }
];

export const TRANSLATIONS = {
  en: {
    appTitle: 'MediKiosk',
    appSubtitle: 'AI-assisted clinical history before consultation',
    startConsultation: 'Start Consultation',
    selectLanguage: 'Select Language',
    language: 'Language',
    audioAssistance: 'Audio assistance available',
    privacyProtected: 'Privacy & consent protected',
    listen: 'Listen',
    stop: 'Stop Audio',
    repeat: 'Repeat',
    continue: 'Continue',
    back: 'Back',
    edit: 'Edit',
    save: 'Save Changes',
    confirm: 'Confirm & Proceed',
    skip: 'Skip this step',
    resetDemo: 'Reset Demo Data',
    prototypeNotice: 'Prototype / Fictional Demo Data Only',
    rolePatient: 'Patient Kiosk',
    roleDoctor: 'Doctor Dashboard',
    
    // Welcome & Identification
    welcomeGreeting: 'Welcome to MediKiosk Digital Intake',
    welcomeDesc: 'Please take a few moments to share your health details and scan past prescriptions before seeing the doctor. This saves consultation time and ensures accurate care.',
    patientIdTitle: 'Patient Identification',
    patientIdSubtitle: 'Select how you would like to begin your session. (No real Aadhaar collected in prototype)',
    useAbha: 'Verify with ABHA ID',
    useAadhaar: 'Verify with Aadhaar OTP (Demo)',
    useNewPatient: 'Register as New Patient',
    useExistingPatient: 'Quick Demo: Load Rahul Patel (MK-10482)',
    
    // Consent
    consentTitle: 'Consent & Privacy Reassurance',
    consentSubtitle: 'Your health data is safe, encrypted, and shared exclusively with your treating clinical team.',
    consentPoint1: 'History Capture: Recording symptoms through touch and voice conversation.',
    consentPoint2: 'Document Digitization: Scanning prescriptions and lab tests to extract key values.',
    consentPoint3: 'Physician Review: Generating a structured clinical summary for Dr. Sharma.',
    consentRevocable: 'Consent is fully revocable at any time during your hospital visit.',
    consentAgreeCheckbox: 'I explicitly consent to providing my medical history and scanning records for my consultation today.',
    giveConsentBtn: 'Give Consent & Continue',
    
    // Profile
    profileTitle: 'Confirm Patient Profile',
    profileSubtitle: 'Please review your basic identification details before beginning health history.',
    patientId: 'Patient ID',
    fullName: 'Full Name',
    ageGender: 'Age & Gender',
    contactNumber: 'Contact Number',
    preferredLang: 'Preferred Language',
    abhaNumber: 'ABHA Health Number',
    
    // AI Intro
    aiIntroTitle: 'Conversational Health Intake',
    aiIntroSubtitle: 'Your AI clinical intake assistant will guide you through a few friendly questions.',
    aiIntroSpeech: 'Hello! I am your intake assistant. You can speak naturally or tap your choices on the screen. Let’s prepare a structured summary so your doctor has all the facts ready.',
    
    // Complaint
    chiefComplaintTitle: 'What is your primary reason for visiting today?',
    chiefComplaintSubtitle: 'Tap your main complaint or speak using the microphone.',
    complaints: {
      fever: 'Fever / Chills',
      cough: 'Cough / Cold',
      chest: 'Chest Discomfort',
      stomach: 'Stomach Problem',
      pain: 'Body Pain / Joint Pain',
      other: 'Other Condition'
    },
    
    // Adaptive
    adaptiveTitle: 'A Few Questions About Your Chest Discomfort',
    qOnset: 'When did this discomfort begin?',
    qCharacter: 'How would you describe the feeling?',
    qAggravating: 'Does anything make the discomfort worse?',
    qAssociated: 'Are you experiencing any associated symptoms?',
    
    // Red flag
    redFlagTitle: 'Priority Clinical Attention Required',
    redFlagMessage: 'Your responses indicate symptoms that may require immediate clinical attention. Please remain at the kiosk. A member of the clinical team has been notified.',
    redFlagDisclaimer: 'Clinical Safety Notice: MediKiosk does NOT provide an AI diagnosis. This is an automated priority safety escalation for prompt physician evaluation.',
    redFlagStaffNotified: 'OPD Nursing Desk alerted for Patient Token A-14 (Rahul Patel)',
    
    // History
    medHistoryTitle: 'Your Past Medical History',
    medHistorySubtitle: 'Existing conditions and chronic medications help the doctor choose safe treatments.',
    existingConditions: 'Existing Diagnosed Conditions',
    currentMeds: 'Current Medications',
    allergies: 'Drug Allergies',
    surgeries: 'Past Surgeries & Procedures',
    familyHistory: 'Family Medical History',
    
    // Document
    docScanTitle: 'Scan or Upload Medical Documents',
    docScanSubtitle: 'Digitize your previous prescriptions, lab reports, or discharge summaries using the scanner.',
    scanPrescription: 'Scan Prescription',
    uploadLab: 'Upload Lab Report',
    uploadDischarge: 'Scan Discharge Summary',
    capturePhoto: 'Capture Document',
    analyzingDoc: 'Analyzing medical document with OCR & Clinical Entity Extraction...',
    
    // Timeline
    timelineTitle: 'Chronological Medical Timeline',
    timelineSubtitle: 'Your past consultations and diagnostic records arranged chronologically.',
    
    // Review & Submit
    reviewTitle: 'Review Summary Before Submission',
    reviewSubtitle: 'Please verify all captured information before sending it to the doctor.',
    submitBtn: 'Submit History to Doctor',
    submissionSuccessTitle: 'Clinical History Submitted Successfully!',
    submissionSuccessDesc: 'Your structured case record has been transmitted directly to Dr. Sharma’s consultation desk.',
    tokenNumberLabel: 'Your Token Number',
    proceedToOpd: 'Please proceed to OPD Room 4 (Internal Medicine). Your name will be announced shortly.'
  },
  
  hi: {
    appTitle: 'मेडीकिओस्क (MediKiosk)',
    appSubtitle: 'डॉक्टर से परामर्श से पहले एआई-सहायता प्राप्त केस-टेकिंग',
    startConsultation: 'परामर्श शुरू करें',
    selectLanguage: 'भाषा चुनें',
    language: 'भाषा',
    audioAssistance: 'ऑडियो सहायता उपलब्ध है',
    privacyProtected: 'गोपनीयता और सहमति सुरक्षित',
    listen: 'सुनें',
    stop: 'ऑडियो रोकें',
    repeat: 'दोहराएं',
    continue: 'आगे बढ़ें',
    back: 'पीछे जाएं',
    edit: 'संपादित करें',
    save: 'बदलाव सहेजें',
    confirm: 'पुष्टि करें और आगे बढ़ें',
    skip: 'यह चरण छोड़ें',
    resetDemo: 'डेमो डेटा रीसेट करें',
    prototypeNotice: 'प्रोटोटाइप / केवल काल्पनिक डेमो डेटा',
    rolePatient: 'मरीज़ कियोस्क मोड',
    roleDoctor: 'डॉक्टर डैशबोर्ड',
    
    welcomeGreeting: 'मेडीकिओस्क डिजिटल इनटेक में आपका स्वागत है',
    welcomeDesc: 'डॉक्टर से मिलने से पहले कृपया अपनी स्वास्थ्य जानकारी दर्ज करें और पिछली पर्चियां स्कैन करें। इससे समय की बचत होती है और सटीक इलाज सुनिश्चित होता है।',
    patientIdTitle: 'मरीज़ की पहचान',
    patientIdSubtitle: 'अपना सत्र शुरू करने का तरीका चुनें। (प्रोटोटाइप में कोई वास्तविक आधार नहीं लिया जाता)',
    useAbha: 'आभा (ABHA) आईडी से सत्यापित करें',
    useAadhaar: 'आधार ओटीपी से सत्यापित करें (डेमो)',
    useNewPatient: 'नए मरीज़ के रूप में पंजीकरण',
    useExistingPatient: 'त्वरित डेमो: राहुल पटेल (MK-10482) लोड करें',
    
    consentTitle: 'सहमति और गोपनीयता आश्वासन',
    consentSubtitle: 'आपका स्वास्थ्य डेटा सुरक्षित, एन्क्रिप्टेड है और केवल आपकी देखभाल करने वाले डॉक्टरों के साथ साझा किया जाएगा।',
    consentPoint1: 'इतिहास रिकॉर्डिंग: बोलकर या स्क्रीन छूकर लक्षणों की जानकारी देना।',
    consentPoint2: 'दस्तावेज़ डिजिटलीकरण: पुरानी पर्चियों और लैब रिपोर्ट से मुख्य मान निकालना।',
    consentPoint3: 'डॉक्टर समीक्षा: डॉक्टर शर्मा के लिए एक संरचित नैदानिक सारांश तैयार करना।',
    consentRevocable: 'अस्पताल में किसी भी समय आपकी सहमति वापस ली जा सकती है।',
    consentAgreeCheckbox: 'मैं आज के परामर्श के लिए अपनी स्वास्थ्य जानकारी देने और दस्तावेज़ स्कैन करने की स्पष्ट सहमति देता हूँ।',
    giveConsentBtn: 'सहमति दें और आगे बढ़ें',
    
    profileTitle: 'मरीज़ प्रोफ़ाइल की पुष्टि करें',
    profileSubtitle: 'स्वास्थ्य इतिहास शुरू करने से पहले अपनी बुनियादी जानकारी की जांच करें।',
    patientId: 'मरीज़ आईडी',
    fullName: 'पूरा नाम',
    ageGender: 'उम्र और लिंग',
    contactNumber: 'संपर्क नंबर',
    preferredLang: 'पसंदीदा भाषा',
    abhaNumber: 'आभा (ABHA) नंबर',
    
    aiIntroTitle: 'संवादात्मक स्वास्थ्य इनटेक',
    aiIntroSubtitle: 'आपका एआई इनटेक सहायक आपसे कुछ सरल प्रश्न पूछेगा।',
    aiIntroSpeech: 'नमस्ते! मैं आपका डिजिटल सहायक हूँ। आप बोलकर या स्क्रीन पर छूकर उत्तर दे सकते हैं। आइए डॉक्टर के लिए सभी महत्वपूर्ण जानकारी तैयार करें।',
    
    chiefComplaintTitle: 'आज आपके आने का मुख्य कारण क्या है?',
    chiefComplaintSubtitle: 'अपनी मुख्य समस्या चुनें या माइक्रोफ़ोन से बोलें।',
    complaints: {
      fever: 'बुखार / ठंड लगना',
      cough: 'खांसी / जुकाम',
      chest: 'छाती में तकलीफ / भारीपन',
      stomach: 'पेट की समस्या',
      pain: 'बदन दर्द / जोड़ों का दर्द',
      other: 'अन्य समस्या'
    },
    
    adaptiveTitle: 'छाती में तकलीफ से जुड़े कुछ प्रश्न',
    qOnset: 'यह तकलीफ कब शुरू हुई?',
    qCharacter: 'आप इस महसूस को कैसे वर्णित करेंगे?',
    qAggravating: 'क्या किसी गतिविधि से यह बढ़ जाता है?',
    qAssociated: 'क्या कोई अन्य लक्षण भी महसूस हो रहा है?',
    
    redFlagTitle: 'प्राथमिकता नैदानिक ध्यान आवश्यक',
    redFlagMessage: 'आपके उत्तर उन लक्षणों की ओर संकेत करते हैं जिन पर तत्काल डॉक्टर का ध्यान आवश्यक है। कृपया कियोस्क के पास ही रहें। क्लिनिकल टीम को सूचित कर दिया गया है।',
    redFlagDisclaimer: 'सुरक्षा सूचना: मेडीकिओस्क कोई कृत्रिम बुद्धिमत्ता रोग निदान (Diagnosis) नहीं देता। यह त्वरित डॉक्टर मूल्यांकन के लिए स्वचालित सुरक्षा अलर्ट है।',
    redFlagStaffNotified: 'मरीज़ टोकन A-14 (राहुल पटेल) के लिए ओपीडी नर्सिंग डेस्क को अलर्ट भेजा गया',
    
    medHistoryTitle: 'आपका पिछला मेडिकल इतिहास',
    medHistorySubtitle: 'पुरानी बीमारियां और दवाएं डॉक्टर को सुरक्षित उपचार तय करने में मदद करती हैं।',
    existingConditions: 'पहले से ज्ञात बीमारियां',
    currentMeds: 'वर्तमान दवाएं',
    allergies: 'दवाओं से एलर्जी',
    surgeries: 'पिछली सर्जरी',
    familyHistory: 'पारिवारिक स्वास्थ्य इतिहास',
    
    docScanTitle: 'दस्तावेज़ स्कैन या अपलोड करें',
    docScanSubtitle: 'अपनी पिछली पर्चियां, लैब टेस्ट रिपोर्ट या डिस्चार्ज समरी स्कैन करें।',
    scanPrescription: 'पर्ची स्कैन करें',
    uploadLab: 'लैब रिपोर्ट अपलोड करें',
    uploadDischarge: 'डिस्चार्ज समरी स्कैन करें',
    capturePhoto: 'दस्तावेज़ कैप्चर करें',
    analyzingDoc: 'ओसीआर और क्लिनिकल एंटिटी एक्सट्रैक्शन द्वारा विश्लेषण जारी...',
    
    timelineTitle: 'कालानुक्रमिक मेडिकल टाइमलाइन',
    timelineSubtitle: 'आपके पिछले परामर्श और रिपोर्ट समय क्रम में व्यवस्थित।',
    
    reviewTitle: 'जमा करने से पहले सारांश की समीक्षा करें',
    reviewSubtitle: 'डॉक्टर को भेजने से पहले कृपया सभी दर्ज जानकारी की पुष्टि करें।',
    submitBtn: 'डॉक्टर को इतिहास भेजें',
    submissionSuccessTitle: 'क्लिनिकल इतिहास सफलतापूर्वक जमा हुआ!',
    submissionSuccessDesc: 'आपका संरचित विवरण सीधे डॉ. शर्मा के कंसल्टेशन डेस्क पर भेज दिया गया है।',
    tokenNumberLabel: 'आपका टोकन नंबर',
    proceedToOpd: 'कृपया ओपीडी कमरा नं. 4 (इंटरनल मेडिसिन) की ओर प्रस्थान करें। शीघ्र ही आपका नाम पुकारा जाएगा।'
  },
  
  gu: {
    appTitle: 'મેડિકિઓસ્ક (MediKiosk)',
    appSubtitle: 'ડોક્ટરની મુલાકાત પહેલાં એઆઈ-સહાયિત કેસ-ટેકિંગ',
    startConsultation: 'તપાસ શરૂ કરો',
    selectLanguage: 'ભાષા પસંદ કરો',
    language: 'ભાષા',
    audioAssistance: 'ઑડિઓ સહાય ઉપલબ્ધ છે',
    privacyProtected: 'ગોપનીયતા અને સંમતિ સુરક્ષિત',
    listen: 'સાંભળો',
    stop: 'ઑડિઓ બંધ કરો',
    repeat: 'ફરી સાંભળો',
    continue: 'આગળ વધો',
    back: 'પાછળ જાઓ',
    edit: 'ફેરફાર કરો',
    save: 'ફેરફારો સાચવો',
    confirm: 'ખાતરી કરો અને આગળ વધો',
    skip: 'આ પગલું છોડો',
    resetDemo: 'ડેમો ડેટા રીસેટ કરો',
    prototypeNotice: 'પ્રોટોટાઇપ / ફક્ત કાલ્પનિક ડેમો ડેટા',
    rolePatient: 'દર્દી કિઓસ્ક મોડ',
    roleDoctor: 'ડૉક્ટર ડૅશબોર્ડ',
    
    welcomeGreeting: 'મેડિકિઓસ્ક ડિજિટલ ઇનટેકમાં આપનું સ્વાગત છે',
    welcomeDesc: 'ડૉક્ટરને મળતાં પહેલાં આપની તબિયતની વિગતો આપો અને જૂની દવાઓની ચિઠ્ઠીઓ સ્કેન કરો. આનાથી સમય બચે છે અને યોગ્ય સારવાર મળે છે.',
    patientIdTitle: 'દર્દીની ઓળખ',
    patientIdSubtitle: 'આપનું સત્ર શરૂ કરવાની પદ્ધતિ પસંદ કરો. (પ્રોટોટાઇપમાં કોઈ વાસ્તવિક આધાર લેવામાં આવતો નથી)',
    useAbha: 'આભા (ABHA) આઈડી દ્વારા ચકાસો',
    useAadhaar: 'આધાર ઓટીપી દ્વારા ચકાસો (ડેમો)',
    useNewPatient: 'નવા દર્દી તરીકે નોંધણી',
    useExistingPatient: 'ઝડપી ડેમો: રાહુલ પટેલ (MK-10482) લોડ કરો',
    
    consentTitle: 'સંમતિ અને ગોપનીયતા ખાતરી',
    consentSubtitle: 'આપનો સ્વાસ્થ્ય ડેટા સુરક્ષિત, એન્ક્રિપ્ટેડ છે અને માત્ર આપના ડૉક્ટર સાથે શેર થશે.',
    consentPoint1: 'ઇતિહાસ રેકોર્ડિંગ: બોલીને કે સ્ક્રીન સ્પર્શ કરીને લક્ષણો જણાવવા.',
    consentPoint2: 'દસ્તાવેજ ડિજિટાઇઝેશન: જૂના પ્રિસ્ક્રિપ્શન અને રિપોર્ટ સ્કેન કરી મુખ્ય વિગતો મેળવવી.',
    consentPoint3: 'ડૉક્ટર સમીક્ષા: ડૉક્ટર શર્મા માટે સુવ્યવસ્થિત ક્લિનિકલ સારાંશ તૈયાર કરવો.',
    consentRevocable: 'હોસ્પિટલ મુલાકાત દરમિયાન આપ ગમે ત્યારે સંમતિ પાછી ખેંચી શકો છો.',
    consentAgreeCheckbox: 'હું આજના કન્સલ્ટેશન માટે મારો સ્વાસ્થ્ય ઇતિહાસ આપવા અને દસ્તાવેજો સ્કેન કરવા સ્પષ્ટ સંમતિ આપું છું.',
    giveConsentBtn: 'સંમતિ આપો અને આગળ વધો',
    
    profileTitle: 'દર્દી પ્રોફાઇલની ખાતરી કરો',
    profileSubtitle: 'સ્વાસ્થ્ય વિગતો શરૂ કરતાં પહેલાં આપની મૂળભૂત ઓળખ ચકાસી લો.',
    patientId: 'દર્દી આઈડી',
    fullName: 'પૂરું નામ',
    ageGender: 'ઉંમર અને લિંગ',
    contactNumber: 'સંપર્ક નંબર',
    preferredLang: 'પસંદગીની ભાષા',
    abhaNumber: 'આભા (ABHA) નંબર',
    
    aiIntroTitle: 'વાતચીત આધારિત સ્વાસ્થ્ય ઇનટેક',
    aiIntroSubtitle: 'આપનો એઆઈ ઇનટેક સહાયક આપને કેટલાક સરળ પ્રશ્નો પૂછશે.',
    aiIntroSpeech: 'નમસ્તે! હું આપનો ડિજિટલ સહાયક છું. આપ બોલીને અથવા સ્ક્રીન પર સ્પર્શ કરીને ઉત્તર આપી શકો છો. ચાલો ડૉક્ટર માટે બધી જરૂરી માહિતી તૈયાર કરીએ.',
    
    chiefComplaintTitle: 'આજે હોસ્પિટલ આવવાનું મુખ્ય કારણ શું છે?',
    chiefComplaintSubtitle: 'આપની મુખ્ય ફરિયાદ પસંદ કરો અથવા માઇક્રોફોન વડે બોલો.',
    complaints: {
      fever: 'તાવ / ઠંડી લાગવી',
      cough: 'ખાંસી / શરદી',
      chest: 'છાતીમાં અસ્વસ્થતા / દબાણ',
      stomach: 'પેટની તકલીફ',
      pain: 'શરીરનો દુખાવો / સાંધાનો દુખાવો',
      other: 'અન્ય તકલીફ'
    },
    
    adaptiveTitle: 'છાતીમાં અસ્વસ્થતા વિશે થોડા પ્રશ્નો',
    qOnset: 'આ તકલીફ ક્યારે શરૂ થઈ?',
    qCharacter: 'આ દુખાવો કેવો લાગે છે?',
    qAggravating: 'કોઈ ચોક્કસ કામ કરવાથી દુખાવો વધે છે?',
    qAssociated: 'સાથે અન્ય કોઈ લક્ષણ અનુભવાય છે?',
    
    redFlagTitle: 'તાત્કાલિક ક્લિનિકલ ધ્યાનની જરૂરિયાત',
    redFlagMessage: 'આપના જવાબો એવા લક્ષણો દર્શાવે છે જેના માટે તાત્કાલિક ડૉક્ટરનું ધ્યાન જરૂરી છે. કૃપા કરીને કિઓસ્ક પાસે જ રહો. ક્લિનિકલ ટીમને જાણ કરવામાં આવી છે.',
    redFlagDisclaimer: 'સુરક્ષા સૂચના: મેડિકિઓસ્ક કોઈ એઆઈ રોગ નિદાન આપતું નથી. આ તાત્કાલિક તબીબી મૂલ્યાંકન માટે સુરક્ષા ચેતવણી છે.',
    redFlagStaffNotified: 'દર્દી ટોકન A-14 (રાહુલ પટેલ) માટે નર્સિંગ ડેસ્કને એલર્ટ મોકલાયેલ છે',
    
    medHistoryTitle: 'આપનો ભૂતકાળનો તબીબી ઇતિહાસ',
    medHistorySubtitle: 'જૂની બીમારીઓ અને નિયમિત દવાઓ ડૉક્ટરને સુરક્ષિત સારવાર નક્કી કરવામાં મદદ કરે છે.',
    existingConditions: 'પહેલેથી જાણીતી બીમારીઓ',
    currentMeds: 'હાલમાં ચાલતી દવાઓ',
    allergies: 'દવાઓની એલર્જી',
    surgeries: 'અગાઉ થયેલ સર્જરી',
    familyHistory: 'કૌટુંબિક સ્વાસ્થ્ય ઇતિહાસ',
    
    docScanTitle: 'દસ્તાવેજ સ્કેન અથવા અપલોડ કરો',
    docScanSubtitle: 'આપના જૂના પ્રિસ્ક્રિપ્શન, લેબ રિપોર્ટ અથવા ડિસ્ચાર્જ સમરી સ્કેન કરો.',
    scanPrescription: 'પ્રિસ્ક્રિપ્શન સ્કેન કરો',
    uploadLab: 'લેબ રિપોર્ટ અપલોડ કરો',
    uploadDischarge: 'ડિસ્ચાર્જ સમરી સ્કેન કરો',
    capturePhoto: 'દસ્તાવેજ કેપ્ચર કરો',
    analyzingDoc: 'ઓસીઆર અને ક્લિનિકલ એન્ટિટી એક્સટ્રેક્શન દ્વારા વિશ્લેષણ ચાલુ છે...',
    
    timelineTitle: 'સમયાનુક્રમિક તબીબી ટાઇમલાઇન',
    timelineSubtitle: 'આપની અગાઉની મુલાકાતો અને રિપોર્ટ્સ ક્રમબદ્ધ ગોઠવાયેલ છે.',
    
    reviewTitle: 'સબમિટ કરતાં પહેલાં સમીક્ષા કરો',
    reviewSubtitle: 'ડૉક્ટરને મોકલતાં પહેલાં આપે આપેલી માહિતી ચકાસી લો.',
    submitBtn: 'ડૉક્ટરને માહિતી મોકલો',
    submissionSuccessTitle: 'ક્લિનિકલ ઇતિહાસ સફળતાપૂર્વક સબમિટ થયો!',
    submissionSuccessDesc: 'આપનો સુવ્યવસ્થિત કેસ સીધો ડૉ. શર્માના કન્સલ્ટેશન ટેબલ પર મોકલી દેવાયો છે.',
    tokenNumberLabel: 'આપનો ટોકન નંબર',
    proceedToOpd: 'કૃપા કરીને ઓપીડી રૂમ નં. 4 (ઇન્ટરનલ મેડિસિન) તરફ આગળ વધો. ટૂંક સમયમાં આપનું નામ બોલાવવામાં આવશે.'
  }
};
