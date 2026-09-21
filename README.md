# MediVedah - Multimodal Clinical Intake & Case-Taking System

> **Smart India Hackathon (SIH) Problem Statement 26047 Prototype**  
> AI-powered multimodal patient case-taking portal with native multilingual voice assistance, document OCR digitizer, and a real-time physician intake summary console for hospital outpatient departments (OPDs).

---

## 🌟 Key Features

1. **Multimodal Patient Dashboard (`/`)**:
   - **Zero-Secret Native Voice Assist**: Powered by the browser's native Web Speech API (`SpeechSynthesis` & `SpeechRecognition`), allowing patients to listen and speak in English, Hindi, or Gujarati with **no external paid API keys or cloud secrets needed**.
   - **Demographic & ABHA Identification**: Supports ABHA ID (14-digit), Hospital UHID, and phone number lookup.
   - **Adaptive Clinical Branching**: Dynamic questionnaire evaluating onset, pain character, aggravating triggers, and associated symptoms.
   - **Instant Red Flag Alert**: Automated triage detecting chest tightness with exertional triggers or diaphoresis, alerting patients and prioritizing them immediately in the doctor's queue.
   - **Medical Document OCR Scanner**: Upload and extract structured clinical data from lab reports, prescriptions, discharge summaries, and ECG scans with flagged abnormal values.
   - **Longitudinal Clinical Timeline**: Chronological interactive visual timeline of past episodes, hospitalizations, and diagnostic reports.
   - **ABDM Digital Consent**: Compliant, time-bound access audit trail with OTP authorization simulation.

2. **Doctor Clinical Console (`/` - Mode Switcher)**:
   - **Live OPD Queue**: Interactive case queue showcasing:
     - **1st**: YUG SOLANKI (`MK-10482`, Token #A-14) - Priority Alert
     - **2nd**: AAKARSH DUBEY (`MK-10483`, Token #A-15) - Ready
     - **3rd**: VAIBHAV UPADYEY (`MK-10484`, Token #A-16) - Ready
     - **Last**: AKASH (`MK-10485`, Token #A-17) - Triage Review
   - **AI Clinical Intake Summary**: Automatically synthesized chief complaint, HPI, vitals, medications, and allergies for any clicked case.
   - **Investigation Alerts**: Abnormal lab flags (e.g. HbA1c, BP, AEC, IgE, Uric Acid) with direct document inspection links.
   - **Physician Review & Sign-Off**: Edit draft case notes and electronically confirm clinical summaries.

---

## 🔒 Security & Privacy (GitHub Safe)

- **Zero Secret API Keys Required**: All voice synthesis, speech recognition, and clinical extraction workflows function client-side in the browser.
- **Git Protection**: `.gitignore` is pre-configured to exclude all `.env`, `.env.*`, keys, and certificates from being pushed to version control.

---

## 🚀 Publishing to GitHub Pages (Via GitHub Actions)

To deploy MediVedah to GitHub Pages automatically:

1. **Push this repository to GitHub** (branch `main` or `master`).
2. On your GitHub repository page:
   - Go to **Settings** &rarr; **Pages** (under "Code and automation" in the left sidebar).
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) will automatically trigger, build the project, and publish it live!
4. Your website will be available at: `https://<your-username>.github.io/<your-repo-name>/`.

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
