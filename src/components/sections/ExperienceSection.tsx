"use client";

import { useState } from "react";
import { Experience } from "@/types/resume";

interface Props {
  data: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Experience>) => void;
  onDelete: (id: string) => void;
}

function formatDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${y}.${m}`;
}

function ExperienceCard({ exp, onUpdate, onDelete }: {
  exp: Experience;
  onUpdate: (id: string, updates: Partial<Experience>) => void;
  onDelete: (id: string) => void;
}) {
  const isEmpty = !exp.company && !exp.position;
  const [isEditing, setIsEditing] = useState(isEmpty);
  const [draft, setDraft] = useState<Experience>(exp);
  const set = (u: Partial<Experience>) => setDraft((p) => ({ ...p, ...u }));

  const handleSave = () => {
    onUpdate(exp.id, draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(exp);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white group">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-semibold text-slate-800">{exp.position || "직책 없음"}</span>
              {exp.company && <span className="text-slate-500 text-sm">{exp.company}</span>}
              {(exp.startDate || exp.endDate || exp.current) && (
                <span className="text-xs text-slate-400">
                  {formatDate(exp.startDate)} — {exp.current ? "현재" : formatDate(exp.endDate)}
                </span>
              )}
            </div>
            {exp.description && (
              <p className="text-sm text-slate-500 mt-1 line-clamp-2 whitespace-pre-line">{exp.description}</p>
            )}
          </div>
          <div className="flex gap-2 ml-3 shrink-0">
            <button onClick={() => { setDraft(exp); setIsEditing(true); }} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">수정</button>
            <button onClick={() => onDelete(exp.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-indigo-200 rounded-xl p-4 bg-indigo-50/30 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">회사명</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" placeholder="(주)회사이름" value={draft.company} onChange={(e) => set({ company: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">직책</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" placeholder="Software Engineer" value={draft.position} onChange={(e) => set({ position: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">시작일</label>
          <input type="month" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" value={draft.startDate} onChange={(e) => set({ startDate: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">종료일</label>
          <input type="month" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white disabled:bg-slate-100" value={draft.endDate} disabled={draft.current} onChange={(e) => set({ endDate: e.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600 pb-2">
          <input type="checkbox" className="accent-indigo-500" checked={draft.current} onChange={(e) => set({ current: e.target.checked, endDate: "" })} />
          재직 중
        </label>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">업무 설명</label>
        <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none bg-white" rows={3} placeholder="주요 업무 및 성과를 입력해주세요" value={draft.description} onChange={(e) => set({ description: e.target.value })} />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">취소</button>
        <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium">저장</button>
      </div>
    </div>
  );
}

export default function ExperienceSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {data.map((exp) => <ExperienceCard key={exp.id} exp={exp} onUpdate={onUpdate} onDelete={onDelete} />)}
      <button onClick={onAdd} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors">
        + 경력 추가
      </button>
    </div>
  );
}
