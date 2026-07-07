"use client";

import { useState } from "react";
import { Certification } from "@/types/resume";

interface Props {
  data: Certification[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Certification>) => void;
  onDelete: (id: string) => void;
}

function formatDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${y}.${m}`;
}

function CertCard({ cert, onUpdate, onDelete }: {
  cert: Certification;
  onUpdate: (id: string, updates: Partial<Certification>) => void;
  onDelete: (id: string) => void;
}) {
  const isEmpty = !cert.name;
  const [isEditing, setIsEditing] = useState(isEmpty);
  const [draft, setDraft] = useState<Certification>(cert);
  const set = (u: Partial<Certification>) => setDraft((p) => ({ ...p, ...u }));

  const handleSave = () => { onUpdate(cert.id, draft); setIsEditing(false); };
  const handleCancel = () => { setDraft(cert); setIsEditing(false); };

  if (!isEditing) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-semibold text-slate-800">{cert.name || "자격증명 없음"}</span>
              {cert.issuer && <span className="text-slate-500 text-sm">{cert.issuer}</span>}
              {cert.date && (
                <span className="text-xs text-slate-400">
                  {formatDate(cert.date)}{cert.expiry ? ` — ${formatDate(cert.expiry)}` : ""}
                </span>
              )}
            </div>
            {cert.certNumber && <p className="text-xs text-slate-400 mt-1">인증번호: {cert.certNumber}</p>}
          </div>
          <div className="flex gap-2 ml-3 shrink-0">
            <button onClick={() => { setDraft(cert); setIsEditing(true); }} className="text-xs text-blue-500 hover:text-blue-700 font-medium">수정</button>
            <button onClick={() => onDelete(cert.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50/30 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">자격증명</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="정보처리기사" value={draft.name} onChange={(e) => set({ name: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">발급기관</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="한국산업인력공단" value={draft.issuer} onChange={(e) => set({ issuer: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">취득일</label>
          <input type="month" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={draft.date} onChange={(e) => set({ date: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">만료일 (선택)</label>
          <input type="month" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={draft.expiry} onChange={(e) => set({ expiry: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">인증번호 (선택)</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="12345-67890" value={draft.certNumber} onChange={(e) => set({ certNumber: e.target.value })} />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">취소</button>
        <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">저장</button>
      </div>
    </div>
  );
}

export default function CertificationSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {data.map((cert) => <CertCard key={cert.id} cert={cert} onUpdate={onUpdate} onDelete={onDelete} />)}
      <button onClick={onAdd} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
        + 자격증 추가
      </button>
    </div>
  );
}
