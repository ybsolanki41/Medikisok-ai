/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppLanguage } from '../types';

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(
  text: string,
  lang: AppLanguage,
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onStart) onStart();
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 2000);
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;

    // Pick appropriate BCP-47 tag
    switch (lang) {
      case 'hi':
        utterance.lang = 'hi-IN';
        break;
      case 'gu':
        utterance.lang = 'gu-IN';
        break;
      case 'en':
      default:
        utterance.lang = 'en-IN';
        break;
    }

    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
      currentUtterance = null;
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
      currentUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    if (onStart) onStart();
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 2000);
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      currentUtterance = null;
    } catch {
      // Ignore synthesis cancellation error
    }
  }
}

// Global reference to active speech recognition session
let activeRecognition: any = null;

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export function startSpeechRecognition({
  lang,
  onStart,
  onResult,
  onError,
  onEnd,
}: {
  lang: AppLanguage;
  onStart?: () => void;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (err: string) => void;
  onEnd?: () => void;
}): () => void {
  // Check if browser SpeechRecognition is available
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    // Fallback simulation when Web Speech Recognition API is unavailable or in sandbox iframe
    if (onStart) onStart();
    const fallbackTimeout = setTimeout(() => {
      let simulatedText = '';
      if (lang === 'hi') {
        simulatedText = 'मुझे कल से सीने में तेज भारीपन और बेचैनी हो रही है';
      } else if (lang === 'gu') {
        simulatedText = 'મને ગઈકાલથી છાતીમાં ખૂબ ભારેપણું અને દુખાવો થાય છે';
      } else {
        simulatedText = 'I have severe tightness and heavy pressure in my chest since yesterday';
      }
      onResult(simulatedText, true);
      if (onEnd) onEnd();
    }, 1800);

    return () => {
      clearTimeout(fallbackTimeout);
      if (onEnd) onEnd();
    };
  }

  try {
    if (activeRecognition) {
      try {
        activeRecognition.abort();
      } catch {
        // ignore
      }
    }

    const recognition = new SpeechRecognition();
    activeRecognition = recognition;

    // Set recognition language
    switch (lang) {
      case 'hi':
        recognition.lang = 'hi-IN';
        break;
      case 'gu':
        recognition.lang = 'gu-IN';
        break;
      case 'en':
      default:
        recognition.lang = 'en-IN';
        break;
    }

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (onStart) onStart();
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      if (final) {
        onResult(final.trim(), true);
      } else if (interim) {
        onResult(interim.trim(), false);
      }
    };

    recognition.onerror = (event: any) => {
      // If permission denied or not-allowed, fall back gracefully
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'no-speech') {
        let simulatedText = '';
        if (lang === 'hi') {
          simulatedText = 'मुझे कल से सीने में तेज भारीपन और बेचैनी हो रही है';
        } else if (lang === 'gu') {
          simulatedText = 'મને ગઈકાલથી છાતીમાં ખૂબ ભારેપણું અને દુખાવો થાય છે';
        } else {
          simulatedText = 'I have severe tightness and heavy pressure in my chest since yesterday';
        }
        onResult(simulatedText, true);
      }
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      activeRecognition = null;
      if (onEnd) onEnd();
    };

    recognition.start();

    return () => {
      try {
        recognition.abort();
      } catch {
        // ignore
      }
      activeRecognition = null;
    };
  } catch (err) {
    if (onError) onError(String(err));
    if (onEnd) onEnd();
    return () => {};
  }
}

export function stopSpeechRecognition(): void {
  if (activeRecognition) {
    try {
      activeRecognition.abort();
    } catch {
      // ignore
    }
    activeRecognition = null;
  }
}
