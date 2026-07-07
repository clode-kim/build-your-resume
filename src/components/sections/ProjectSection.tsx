"use client";

import { useState, useRef } from "react";
import { Project } from "@/types/resume";

interface Props {
  data: Project[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Project>) => void;
  onDelete: (id: string) => void;
}

function ProjectCard({ proj, onUpdate, onDelete }: {
  proj: Project;
  onUpdate: (id: string, updates: Partial<Project>) => void;
  onDelete: (id: string) => void;
}) {
  const isEmpty = !proj.name;
  const [isEditing, setIsEditing] = useState(isEmpty);
  const [draft, setDraft] = useState<Project>(proj);
  const [techInput, setTechInput] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const set = (u: Partial<Project>) => setDraft((p) => ({ ...p, ...u }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set({ architectureImage: ev.target?.result as string });
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = techInput.trim();
      if (val && !draft.techStack.includes(val)) set({ techStack: [...draft.techStack, val] });
      setTechInput("");
    }
  };

  const handleSave = () => { onUpdate(proj.id, draft); setIsEditing(false); };
  const handleCancel = () => { setDraft(proj); setIsEditing(false); };

  if (!isEditing) {
    return (
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        {proj.architectureImage && (
          <img
            src={proj.architectureImage}
            alt="아키텍처"
            className="w-full object-contain max-h-64 bg-slate-50 border-b border-slate-100"
          />
        )}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-semibold text-slate-800">{proj.name || "프로젝트명 없음"}</span>
                {proj.link && <span className="text-xs text-blue-500">{proj.link}</span>}
                {proj.startDate && (
                  <span className="text-xs text-slate-400">
                    {proj.startDate.replace("-", ".")} — {proj.endDate ? proj.endDate.replace("-", ".") : "진행 중"}
                  </span>
                )}
              </div>
              {proj.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {proj.techStack.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">{t}</span>
                  ))}
                </div>
              )}
              {proj.description && <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{proj.description}</p>}
            </div>
            <div className="flex gap-2 ml-3 shrink-0">
              <button onClick={() => { setDraft(proj); setIsEditing(true); }} className="text-xs text-blue-500 hover:text-blue-700 font-medium">수정</button>
              <button onClick={() => onDelete(proj.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50/30 space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">프로젝트명</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="프로젝트 이름" value={draft.name} onChange={(e) => set({ name: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">링크 (선택)</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="https://..." value={draft.link} onChange={(e) => set({ link: e.target.value })} />
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
        <label className="block text-xs font-medium text-slate-500 mb-1">기술 스택 (Enter 또는 쉼표로 추가)</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {draft.techStack.map((tech) => (
            <span key={tech} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
              {tech}<button onClick={() => set({ techStack: draft.techStack.filter((t) => t !== tech) })} className="hover:text-blue-900">×</button>
            </span>
          ))}
        </div>
        <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" placeholder="React, TypeScript, ..." value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={handleTechKeyDown} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">아키텍처 이미지 (선택)</label>
        <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        {draft.architectureImage ? (
          <div className="relative group">
            <img
              src={draft.architectureImage}
              alt="아키텍처"
              className="w-full object-contain max-h-48 rounded-lg border border-slate-200 bg-slate-50"
            />
            <button
              onClick={() => set({ architectureImage: "" })}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >×</button>
          </div>
        ) : (
          <div
            onClick={() => imageInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-slate-400 text-sm cursor-pointer hover:border-blue-300 hover:text-blue-400 transition-colors"
          >
            클릭해서 아키텍처 이미지 업로드
          </div>
        )}
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">설명</label>
        <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-white" rows={3} placeholder="프로젝트 설명 및 주요 기능" value={draft.description} onChange={(e) => set({ description: e.target.value })} />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">취소</button>
        <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">저장</button>
      </div>
    </div>
  );
}

export default function ProjectSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {data.map((proj) => <ProjectCard key={proj.id} proj={proj} onUpdate={onUpdate} onDelete={onDelete} />)}
      <button onClick={onAdd} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
        + 프로젝트 추가
      </button>
    </div>
  );
}
