/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TimelineEvent, AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { 
  Clock, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  FileCheck2, 
  Calendar, 
  Building2 
} from 'lucide-react';

interface TimelineScreenProps {
  language: AppLanguage;
  timeline: TimelineEvent[];
  onOpenDocument: (docId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const TimelineScreen: React.FC<TimelineScreenProps> = ({
  language,
  timeline,
  onOpenDocument,
  onContinue,
  onBack,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
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

        <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
          Module B • Longitudinal Case Graph
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2 border border-teal-200/60">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Chronological Patient Timeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t.timelineTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {t.timelineSubtitle}
          </p>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 mb-8">
          {timeline.map((event) => (
            <div key={event.id} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full border-2 border-white bg-teal-600 shadow-xs ring-4 ring-teal-50" />

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-teal-300 transition-all shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
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

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.provider}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.summary}
                </p>

                {event.documentId && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Attached Record Available
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenDocument(event.documentId!)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Source Record</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Continue to Final Review */}
        <button
          id="proceed-review-btn"
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>Review Summary Before Submission</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
