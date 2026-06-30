"use client";

import { useState } from "react";
import { Language } from "@/types/resume";

interface Props {
  data: Language[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Language>) => void;
  onDelete: (id: string) => void;
}

const LEVELS = ["원어민", "비즈니스 상급", "비즈니스 중급", "일상 회화", "기초"];

function LanguageCard({ lang, onUpdate, onDelete }: {
  lang: Language;
  onUpdate: (id: string, updates: Partial<Language>) => void;
  onDelete: (id: string) => void;
}) {
  const isEmpty = !lang.language;
  const [isEditing, setIsEditing] = useState(isEmpty);
  const [draft, setDraft] = useState<Language>(lang);
  const set = (u: Partial<Language>) => setDraft((p) => ({ ...p, ...u }));

  const handleSave = () => { onUpdate(lang.id, draft); setIsEditing(false); };
  const handleCancel = () => { setDraft(lang); setIsEditing(false); };

  if (!isEditing) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-semibold text-slate-800">{lang.language || "언어 없음"}</span>
              {lang.level && <span className="text-slate-500 text-sm">{lang.level}</span>}
              {(lang.test || lang.score) && (
                <span className="text-xs text-slate-400">{[lang.test, lang.score].filter(Boolean).join(" ")}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2 ml-3 shrink-0">
            <button onClick={() => { setDraft(lang); setIsEditing(true); }} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">수정</button>
            <button onClick={() => onDelete(lang.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-indigo-200 rounded-xl p-4 bg-indigo-50/30 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">언어</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" placeholder="영어" value={draft.language} onChange={(e) => set({ language: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">수준</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" value={draft.level} onChange={(e) => set({ level: e.target.value })}>
            <option value="">선택</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">시험명 (선택)</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" placeholder="TOEIC, IELTS, JLPT..." value={draft.test} onChange={(e) => set({ test: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">점수/등급 (선택)</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" placeholder="900, 7.5, N2..." value={draft.score} onChange={(e) => set({ score: e.target.value })} />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">취소</button>
        <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium">저장</button>
      </div>
    </div>
  );
}

export default function LanguageSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {data.map((lang) => <LanguageCard key={lang.id} lang={lang} onUpdate={onUpdate} onDelete={onDelete} />)}
      <button onClick={onAdd} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors">
        + 어학 추가
      </button>
    </div>
  );
}
