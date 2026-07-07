"use client";

import { useState } from "react";
import { Skill } from "@/types/resume";

interface Props {
  data: Skill[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}

function SkillCard({ skill, onUpdate, onDelete }: {
  skill: Skill;
  onUpdate: (id: string, updates: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}) {
  const isEmpty = !skill.category && skill.items.length === 0;
  const [isEditing, setIsEditing] = useState(isEmpty);
  const [draft, setDraft] = useState<Skill>(skill);
  const [input, setInput] = useState("");
  const set = (u: Partial<Skill>) => setDraft((p) => ({ ...p, ...u }));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = input.trim();
      if (val && !draft.items.includes(val)) set({ items: [...draft.items, val] });
      setInput("");
    }
  };

  const handleSave = () => { onUpdate(skill.id, draft); setIsEditing(false); };
  const handleCancel = () => { setDraft(skill); setIsEditing(false); };

  if (!isEditing) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            {skill.category && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{skill.category}</p>}
            <div className="flex flex-wrap gap-1.5">
              {skill.items.map((item) => (
                <span key={item} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">{item}</span>
              ))}
              {skill.items.length === 0 && <span className="text-sm text-slate-400">항목 없음</span>}
            </div>
          </div>
          <div className="flex gap-2 ml-3 shrink-0">
            <button onClick={() => { setDraft(skill); setIsEditing(true); }} className="text-xs text-blue-500 hover:text-blue-700 font-medium">수정</button>
            <button onClick={() => onDelete(skill.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50/30 space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">카테고리</label>
        <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="예: Frontend, Backend, DevOps" value={draft.category} onChange={(e) => set({ category: e.target.value })} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">기술 목록 (Enter 또는 쉼표로 추가)</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {draft.items.map((item) => (
            <span key={item} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
              {item}<button onClick={() => set({ items: draft.items.filter((i) => i !== item) })} className="hover:text-slate-900 ml-0.5">×</button>
            </span>
          ))}
        </div>
        <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="React, TypeScript, ..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">취소</button>
        <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">저장</button>
      </div>
    </div>
  );
}

export default function SkillSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {data.map((skill) => <SkillCard key={skill.id} skill={skill} onUpdate={onUpdate} onDelete={onDelete} />)}
      <button onClick={onAdd} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
        + 기술 카테고리 추가
      </button>
    </div>
  );
}
