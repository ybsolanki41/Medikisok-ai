# MediKiosk - Multimodal Clinical Intake & Case-Taking System

> **Smart India Hackathon (SIH) Problem Statement 26047 Prototype**  
> AI-powered multimodal patient case-taking kiosk with native multilingual voice assistance, document OCR digitizer, and a real-time physician intake summary console for hospital outpatient departments (OPDs).

---

## 🌟 Key Features

1. **Multimodal Patient Kiosk (`/`)**:
   - **Zero-Secret Native Voice Assist**: Powered by the browser's native Web Speech API (`SpeechSynthesis` & `SpeechRecognition`), allowing patients to listen and speak in Hindi, Gujarati, or Indian English with **no external paid API keys or cloud secrets needed**.
   - **Demographic & ABHA Identification**: Supports ABHA ID (14-digit), Hospital UHID, and phone number lookup.
   - **Adaptive Clinical Branching**: Dynamic questionnaire evaluating onset, pain character, aggravating triggers, and associated symptoms.
   - **Instant Red Flag Alert**: Automated triage detecting chest tightness with exertional triggers or diaphoresis, alerting patients and prioritizing them immediately in the doctor's queue.
   - **Medical Document OCR Scanner**: Upload and extract structured clinical data from lab reports, prescriptions, discharge summaries, and ECG scans with flagged abnormal values.
   - **Longitudinal Clinical Timeline**: Chronological interactive visual timeline of past episodes, hospitalizations, and diagnostic reports.
   - **ABDM Digital Consent**: Compliant, time-bound access audit trail with OTP authorization simulation.

2. **Doctor Clinical Console (`/` - Mode Switcher)**:
   - **Live OPD Queue**: Real-time triage badges (`RED FLAG - STAT`, `HIGH`, `ROUTINE`) with one-click patient selection.
   - **AI Clinical Intake Summary**: Automatically synthesized chief complaint, HPI, vital history, and medication reconciliation.
   - **Document Inspector**: Side-by-side digitized record viewer with full lab extraction details.
   - **Physician Review & Sign-Off**: Quick action buttons for electronic prescription, ordering investigations, and referral.

---

## 🔒 Security & Privacy (GitHub Safe)

- **Zero Secret API Keys Required**: All voice synthesis, speech recognition, and clinical extraction workflows function client-side in the browser.
- **Git Protection**: `.gitignore` is pre-configured to exclude all `.env`, `.env.*`, keys, and certificates from being pushed to version control.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### Production Build
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Motion
- **Speech & Audio**: Browser Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)
