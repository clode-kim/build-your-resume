"use client";

import { Language } from "@/types/resume";

interface Props {
  data: Language[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Language>) => void;
  onDelete: (id: string) => void;
}

const LEVELS = ["원어민", "비즈니스 상급", "비즈니스 중급", "일상 회화", "기초"];

export default function LanguageSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {data.map((lang) => (
        <div key={lang.id} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">언어</label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="영어"
                value={lang.language}
                onChange={(e) => onUpdate(lang.id, { language: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">수준</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={lang.level}
                onChange={(e) => onUpdate(lang.id, { level: e.target.value })}
              >
                <option value="">선택</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">시험명 (선택)</label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="TOEIC, IELTS, JLPT..."
                value={lang.test}
                onChange={(e) => onUpdate(lang.id, { test: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">점수/등급 (선택)</label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="900, 7.5, N2..."
                value={lang.score}
                onChange={(e) => onUpdate(lang.id, { score: e.target.value })}
              />
            </div>
          </div>
          <button onClick={() => onDelete(lang.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">
            삭제
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
      >
        + 어학 추가
      </button>
    </div>
  );
}
