"use client";

import { useState } from "react";
import { Award } from "@/types/resume";

interface Props {
  data: Award[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Award>) => void;
  onDelete: (id: string) => void;
}

function formatDate(d: string) {
  if (!d) return "";
  const parts = d.split("-");
  if (parts.length === 3) return `${parts[0]}.${parts[1]}.${parts[2]}`;
  if (parts.length === 2) return `${parts[0]}.${parts[1]}`;
  return d;
}

function AwardCard({ award, onUpdate, onDelete }: {
  award: Award;
  onUpdate: (id: string, updates: Partial<Award>) => void;
  onDelete: (id: string) => void;
}) {
  const isEmpty = !award.title;
  const [isEditing, setIsEditing] = useState(isEmpty);
  const [draft, setDraft] = useState<Award>(award);
  const set = (u: Partial<Award>) => setDraft((p) => ({ ...p, ...u }));

  const handleSave = () => { onUpdate(award.id, draft); setIsEditing(false); };
  const handleCancel = () => { setDraft(award); setIsEditing(false); };

  if (!isEditing) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-semibold text-slate-800">{award.title || "수상명 없음"}</span>
              {award.organization && <span className="text-slate-500 text-sm">{award.organization}</span>}
              {award.date && <span className="text-xs text-slate-400">{formatDate(award.date)}</span>}
            </div>
            {award.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{award.description}</p>}
          </div>
          <div className="flex gap-2 ml-3 shrink-0">
            <button onClick={() => { setDraft(award); setIsEditing(true); }} className="text-xs text-blue-500 hover:text-blue-700 font-medium">수정</button>
            <button onClick={() => onDelete(award.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50/30 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">수상명</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="대통령상, 우수상 등" value={draft.title} onChange={(e) => set({ title: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">수여기관</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="과학기술정보통신부" value={draft.organization} onChange={(e) => set({ organization: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">수상일</label>
        <input type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={draft.date} onChange={(e) => set({ date: e.target.value })} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">설명 (선택)</label>
        <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-white" rows={2} placeholder="수상 내용 간략 설명" value={draft.description} onChange={(e) => set({ description: e.target.value })} />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">취소</button>
        <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">저장</button>
      </div>
    </div>
  );
}

export default function AwardSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {data.map((award) => <AwardCard key={award.id} award={award} onUpdate={onUpdate} onDelete={onDelete} />)}
      <button onClick={onAdd} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
        + 수상경력 추가
      </button>
    </div>
  );
}
