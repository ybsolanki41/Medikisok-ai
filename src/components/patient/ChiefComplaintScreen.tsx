/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, stopSpeaking, startSpeechRecognition, stopSpeechRecognition } from '../../utils/speech';
import { 
  Heart, 
  Thermometer, 
  Wind, 
  Activity, 
  Bone, 
  HelpCircle, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface ChiefComplaintScreenProps {
  language: AppLanguage;
  selectedComplaint: string;
  onSelectComplaint: (complaint: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const ChiefComplaintScreen: React.FC<ChiefComplaintScreenProps> = ({
  language,
  selectedComplaint,
  onSelectComplaint,
  onContinue,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulatedTranscript, setSimulatedTranscript] = useState('');

  const complaintsList = [
    {
      id: 'Chest discomfort',
      title: t.complaints.chest,
      subtitle: 'Pressure, tightness, squeezing pain in chest',
      icon: Heart,
      color: 'rose',
      recommended: true
    },
    {
      id: 'Fever / Chills',
      title: t.complaints.fever,
      subtitle: 'High temperature, shivering, sweating',
      icon: Thermometer,
      color: 'amber'
    },
    {
      id: 'Cough / Cold',
      title: t.complaints.cough,
      subtitle: 'Persistent cough, sore throat, congestion',
      icon: Wind,
      color: 'sky'
    },
    {
      id: 'Stomach Problem',
      title: t.complaints.stomach,
      subtitle: 'Abdominal pain, indigestion, vomiting, acidity',
      icon: Activity,
      color: 'emerald'
    },
    {
      id: 'Body Pain / Joint Pain',
      title: t.complaints.pain,
      subtitle: 'Backache, muscle soreness, joint swelling',
      icon: Bone,
      color: 'indigo'
    },
    {
      id: 'Other Condition',
      title: t.complaints.other,
      subtitle: 'Skin rash, headache, weakness, checkup',
      icon: HelpCircle,
      color: 'slate'
    }
  ];

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      const speech = `${t.chiefComplaintTitle}. ${t.chiefComplaintSubtitle}`;
      speakText(
        speech,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopSpeechRecognition();
      setIsListening(false);
    } else {
      setIsListening(true);
      setSimulatedTranscript(language === 'hi' ? 'आपकी आवाज सुनी जा रही है...' : language === 'gu' ? 'તમારો અવાજ સાંભળી રહ્યા છીએ...' : 'Listening for your voice...');

      startSpeechRecognition({
        lang: language,
        onStart: () => {
          setIsListening(true);
        },
        onResult: (transcript, isFinal) => {
          setSimulatedTranscript(`"${transcript}"`);

          const lower = transcript.toLowerCase();
          // Smart AI/NLP matching for chief complaints across English, Hindi, Gujarati
          if (
            lower.includes('chest') ||
            lower.includes('छाती') ||
            lower.includes('सीना') ||
            lower.includes('સીના') ||
            lower.includes('heart') ||
            lower.includes('pressure') ||
            lower.includes('દુખાવો') ||
            lower.includes('भारीपन') ||
            lower.includes('दर्द')
          ) {
            onSelectComplaint('Chest discomfort');
          } else if (
            lower.includes('fever') ||
            lower.includes('बुखार') ||
            lower.includes('તાવ') ||
            lower.includes('temperature') ||
            lower.includes('chills')
          ) {
            onSelectComplaint('Fever / Chills');
          } else if (
            lower.includes('cough') ||
            lower.includes('खांसी') ||
            lower.includes('cold') ||
            lower.includes('उધરસ') ||
            lower.includes('શરદી') ||
            lower.includes('throat')
          ) {
            onSelectComplaint('Cough / Cold');
          } else if (
            lower.includes('stomach') ||
            lower.includes('पेट') ||
            lower.includes('પેટ') ||
            lower.includes('acidity') ||
            lower.includes('vomit')
          ) {
            onSelectComplaint('Stomach Problem');
          } else if (
            lower.includes('pain') ||
            lower.includes('body') ||
            lower.includes('joint') ||
            lower.includes('कमर') ||
            lower.includes('સાંધા')
          ) {
            onSelectComplaint('Body Pain / Joint Pain');
          }

          if (isFinal) {
            setIsListening(false);
          }
        },
        onError: () => {
          setIsListening(false);
        },
        onEnd: () => {
          setIsListening(false);
        },
      });
    }
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAudioToggle}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
          >
            {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isPlaying ? t.stop : t.listen}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
            Step 2 of 5 • Primary Reason for Visit
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {t.chiefComplaintTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {t.chiefComplaintSubtitle}
          </p>
        </div>

        {/* Voice Input Assist Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="voice-mic-btn"
              type="button"
              onClick={handleMicToggle}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-md ring-4 ring-rose-200'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
              }`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                {isListening ? 'Listening to patient speech...' : 'Tap Mic to Speak Complaint'}
              </span>
              <p className="text-xs text-slate-500 font-medium">
                {simulatedTranscript || 'Supports Hindi, Gujarati, and Indian English voice.'}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Multimodal Voice + Touch Input
          </div>
        </div>

        {/* Large Touch Complaint Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {complaintsList.map((item) => {
            const isSelected = selectedComplaint === item.id;
            const Icon = item.icon;

            return (
              <button
                id={`complaint-btn-${item.id.toLowerCase().replace(/\s+/g, '-')}`}
                key={item.id}
                type="button"
                onClick={() => onSelectComplaint(item.id)}
                className={`p-5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between min-h-[130px] cursor-pointer ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs ring-1 ring-teal-600'
                    : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        isSelected
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {item.recommended && (
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                        Demo Focus
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-400">
                    {isSelected ? 'Selected' : 'Tap to select'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-teal-600 bg-teal-600 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          id="proceed-adaptive-questions-btn"
          type="button"
          disabled={!selectedComplaint}
          onClick={onContinue}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            selectedComplaint
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue with {selectedComplaint || 'Selected Complaint'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
