"use client";

import { useState } from "react";
import { Training } from "@/types/resume";

interface Props {
  data: Training[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Training>) => void;
  onDelete: (id: string) => void;
}

function formatDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${y}.${m}`;
}

function TrainingCard({ tr, onUpdate, onDelete }: {
  tr: Training;
  onUpdate: (id: string, updates: Partial<Training>) => void;
  onDelete: (id: string) => void;
}) {
  const isEmpty = !tr.name;
  const [isEditing, setIsEditing] = useState(isEmpty);
  const [draft, setDraft] = useState<Training>(tr);
  const set = (u: Partial<Training>) => setDraft((p) => ({ ...p, ...u }));

  const handleSave = () => { onUpdate(tr.id, draft); setIsEditing(false); };
  const handleCancel = () => { setDraft(tr); setIsEditing(false); };

  if (!isEditing) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-semibold text-slate-800">{tr.name || "교육명 없음"}</span>
              {tr.institution && <span className="text-slate-500 text-sm">{tr.institution}</span>}
              {tr.startDate && (
                <span className="text-xs text-slate-400">
                  {formatDate(tr.startDate)}{tr.endDate ? ` — ${formatDate(tr.endDate)}` : ""}
                </span>
              )}
            </div>
            {tr.description && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{tr.description}</p>}
          </div>
          <div className="flex gap-2 ml-3 shrink-0">
            <button onClick={() => { setDraft(tr); setIsEditing(true); }} className="text-xs text-blue-500 hover:text-blue-700 font-medium">수정</button>
            <button onClick={() => onDelete(tr.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50/30 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">교육명</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="AWS Solutions Architect 과정" value={draft.name} onChange={(e) => set({ name: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">기관</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="패스트캠퍼스, 부스트코스..." value={draft.institution} onChange={(e) => set({ institution: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">시작일</label>
          <input type="month" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={draft.startDate} onChange={(e) => set({ startDate: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">종료일</label>
          <input type="month" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={draft.endDate} onChange={(e) => set({ endDate: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">설명 (선택)</label>
        <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-white" rows={2} placeholder="교육 내용 또는 수료 사항" value={draft.description} onChange={(e) => set({ description: e.target.value })} />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">취소</button>
        <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">저장</button>
      </div>
    </div>
  );
}

export default function TrainingSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {data.map((tr) => <TrainingCard key={tr.id} tr={tr} onUpdate={onUpdate} onDelete={onDelete} />)}
      <button onClick={onAdd} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
        + 교육 추가
      </button>
    </div>
  );
}
