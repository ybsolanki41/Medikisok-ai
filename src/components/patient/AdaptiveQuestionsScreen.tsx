/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppLanguage, AdaptiveAnswer } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, stopSpeaking } from '../../utils/speech';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Volume2, 
  VolumeX, 
  HeartHandshake, 
  Mic, 
  Sparkles 
} from 'lucide-react';

interface AdaptiveQuestionsScreenProps {
  language: AppLanguage;
  answers: AdaptiveAnswer;
  onUpdateAnswers: (updated: AdaptiveAnswer) => void;
  onComplete: (isRedFlag: boolean) => void;
  onBack: () => void;
}

export const AdaptiveQuestionsScreen: React.FC<AdaptiveQuestionsScreenProps> = ({
  language,
  answers,
  onUpdateAnswers,
  onComplete,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [localAnswers, setLocalAnswers] = useState<AdaptiveAnswer>({ ...answers });

  const questions = [
    {
      id: 'onset',
      title: t.qOnset,
      speechText: t.qOnset,
      helper: 'Helps distinguish acute episodes from chronic conditions.',
      options: ['Today', 'Yesterday', 'A few days ago', 'More than a week ago', 'Not sure']
    },
    {
      id: 'character',
      title: t.qCharacter,
      speechText: t.qCharacter,
      helper: 'Character of pain indicates underlying organ system involvement.',
      options: ['Pressure / Tightness', 'Burning', 'Sharp pain', 'Dull ache', 'Other']
    },
    {
      id: 'aggravating',
      title: t.qAggravating,
      speechText: t.qAggravating,
      helper: 'Triggers provide essential clues for the physician.',
      options: ['Activity / Exertion', 'Deep Breathing', 'Eating food', 'Nothing specific', 'Not sure']
    },
    {
      id: 'associated',
      title: t.qAssociated,
      speechText: t.qAssociated,
      helper: 'Select all that apply. Multiple selections allowed.',
      multiple: true,
      options: ['Shortness of breath', 'Sweating', 'Dizziness', 'Nausea', 'None']
    }
  ];

  const currentQ = questions[currentStep];

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      speakText(
        currentQ.speechText,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  const handleSelectOption = (option: string) => {
    if (currentQ.multiple) {
      let nextAssociated = [...localAnswers.associated];
      if (option === 'None') {
        nextAssociated = ['None'];
      } else {
        nextAssociated = nextAssociated.filter((item) => item !== 'None');
        if (nextAssociated.includes(option)) {
          nextAssociated = nextAssociated.filter((item) => item !== option);
        } else {
          nextAssociated.push(option);
        }
      }
      const updated = { ...localAnswers, associated: nextAssociated };
      setLocalAnswers(updated);
      onUpdateAnswers(updated);
    } else {
      let updated = { ...localAnswers };
      if (currentQ.id === 'onset') updated.onset = option;
      if (currentQ.id === 'character') updated.character = option;
      if (currentQ.id === 'aggravating') updated.aggravating = option;
      setLocalAnswers(updated);
      onUpdateAnswers(updated);

      // Auto-advance for single-choice to make intake snappy
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }, 350);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Evaluate Red Flag logic
      // Chest pressure/tightness + exertional trigger OR shortness of breath/sweating = Red Flag
      const isTightness = localAnswers.character.includes('Pressure') || localAnswers.character.includes('Tightness');
      const isExertional = localAnswers.aggravating.includes('Activity') || localAnswers.aggravating.includes('Exertion');
      const hasRedFlagSymptoms = localAnswers.associated.includes('Shortness of breath') || localAnswers.associated.includes('Sweating');
      const isRedFlag = isTightness && (isExertional || hasRedFlagSymptoms);

      onComplete(isRedFlag);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const isCurrentStepAnswered = () => {
    if (currentQ.id === 'onset') return !!localAnswers.onset;
    if (currentQ.id === 'character') return !!localAnswers.character;
    if (currentQ.id === 'aggravating') return !!localAnswers.aggravating;
    if (currentQ.id === 'associated') return localAnswers.associated.length > 0;
    return false;
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
      {/* Top bar with back and audio */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          type="button"
          onClick={handleAudioToggle}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
        >
          {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isPlaying ? t.stop : t.listen}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span>Adaptive Branching Questionnaire</span>
            <span className="text-teal-700">Question {currentStep + 1} of {questions.length}</span>
          </div>

          {/* Stepper bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex gap-1">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-full flex-1 transition-all ${
                  idx <= currentStep ? 'bg-teal-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {currentQ.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentQ.helper}
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((option) => {
            let isSelected = false;
            if (currentQ.id === 'onset') isSelected = localAnswers.onset === option;
            if (currentQ.id === 'character') isSelected = localAnswers.character === option;
            if (currentQ.id === 'aggravating') isSelected = localAnswers.aggravating === option;
            if (currentQ.id === 'associated') isSelected = localAnswers.associated.includes(option);

            return (
              <button
                id={`adaptive-option-${option.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                key={option}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`w-full p-4 rounded-xl border-2 text-left font-semibold text-base transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/70 text-teal-950 shadow-xs ring-1 ring-teal-600'
                    : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50 bg-white text-slate-800'
                }`}
              >
                <span>{option}</span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Branching dynamically based on patient responses</span>
          </div>

          <button
            id="adaptive-next-btn"
            type="button"
            disabled={!isCurrentStepAnswered()}
            onClick={handleNext}
            className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all ${
              isCurrentStepAnswered()
                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === questions.length - 1 ? 'Complete Evaluation' : t.continue}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
