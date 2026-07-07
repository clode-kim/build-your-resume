"use client";

import { useState } from "react";
import { Education } from "@/types/resume";

interface Props {
  data: Education[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Education>) => void;
  onDelete: (id: string) => void;
}

function formatDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${y}.${m}`;
}

function EducationCard({ edu, onUpdate, onDelete }: {
  edu: Education;
  onUpdate: (id: string, updates: Partial<Education>) => void;
  onDelete: (id: string) => void;
}) {
  const isEmpty = !edu.school;
  const [isEditing, setIsEditing] = useState(isEmpty);
  const [draft, setDraft] = useState<Education>(edu);
  const set = (u: Partial<Education>) => setDraft((p) => ({ ...p, ...u }));

  const handleSave = () => { onUpdate(edu.id, draft); setIsEditing(false); };
  const handleCancel = () => { setDraft(edu); setIsEditing(false); };

  if (!isEditing) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-semibold text-slate-800">{edu.school || "학교명 없음"}</span>
              {(edu.degree || edu.major) && (
                <span className="text-slate-500 text-sm">{[edu.degree, edu.major].filter(Boolean).join(" ")}</span>
              )}
              {edu.minor && <span className="text-xs text-slate-400">부전공: {edu.minor}</span>}
              {edu.startDate && (
                <span className="text-xs text-slate-400">
                  {formatDate(edu.startDate)} — {edu.current ? "재학 중" : formatDate(edu.endDate)}
                </span>
              )}
            </div>
            {edu.gpa && (
              <p className="text-xs text-slate-400 mt-1">학점 {edu.gpa} / {edu.gpaMax}</p>
            )}
          </div>
          <div className="flex gap-2 ml-3 shrink-0">
            <button onClick={() => { setDraft(edu); setIsEditing(true); }} className="text-xs text-blue-500 hover:text-blue-700 font-medium">수정</button>
            <button onClick={() => onDelete(edu.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50/30 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">학교명</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="OO대학교" value={draft.school} onChange={(e) => set({ school: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">학위</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={draft.degree} onChange={(e) => set({ degree: e.target.value })}>
            <option value="">선택</option>
            <option value="학사">학사</option>
            <option value="석사">석사</option>
            <option value="박사">박사</option>
            <option value="전문학사">전문학사</option>
            <option value="수료">수료</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">전공</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="컴퓨터공학과" value={draft.major} onChange={(e) => set({ major: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">부전공 (선택)</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="경영학과" value={draft.minor} onChange={(e) => set({ minor: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">학점</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="3.8" value={draft.gpa} onChange={(e) => set({ gpa: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">만점</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={draft.gpaMax} onChange={(e) => set({ gpaMax: e.target.value })}>
            <option value="4.5">4.5</option>
            <option value="4.3">4.3</option>
            <option value="4.0">4.0</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">입학</label>
          <input type="month" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={draft.startDate} onChange={(e) => set({ startDate: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">졸업</label>
          <input type="month" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white disabled:bg-slate-100" value={draft.endDate} disabled={draft.current} onChange={(e) => set({ endDate: e.target.value })} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" className="accent-blue-500" checked={draft.current} onChange={(e) => set({ current: e.target.checked, endDate: "" })} />
        재학 중
      </label>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">취소</button>
        <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">저장</button>
      </div>
    </div>
  );
}

export default function EducationSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {data.map((edu) => <EducationCard key={edu.id} edu={edu} onUpdate={onUpdate} onDelete={onDelete} />)}
      <button onClick={onAdd} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
        + 학력 추가
      </button>
    </div>
  );
}
