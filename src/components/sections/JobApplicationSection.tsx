"use client";

import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  JobApplication,
  JobAttachment,
  JobStatus,
  JOB_STATUS_LABEL,
  JOB_STATUS_COLOR,
} from "@/types/resume";

interface Props {
  data: JobApplication[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<JobApplication>) => void;
  onDelete: (id: string) => void;
}

function getDday(deadline: string): { label: string; color: string } {
  if (!deadline) return { label: "", color: "" };
  const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
  if (diff < 0) return { label: "마감", color: "text-slate-400" };
  if (diff === 0) return { label: "D-Day", color: "text-red-600 font-bold" };
  if (diff <= 3) return { label: `D-${diff}`, color: "text-red-500 font-semibold" };
  if (diff <= 7) return { label: `D-${diff}`, color: "text-orange-500" };
  return { label: `D-${diff}`, color: "text-slate-500" };
}

// ── 상세 뷰 ────────────────────────────────────────────────────────────────

function JobDetail({
  job,
  onUpdate,
  onBack,
}: {
  job: JobApplication;
  onUpdate: (updates: Partial<JobApplication>) => void;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState<JobApplication>(job);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDirty = JSON.stringify(draft) !== JSON.stringify(job);
  const set = (u: Partial<JobApplication>) => setDraft((p) => ({ ...p, ...u }));

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        set({ jdImages: [...draft.jdImages, ev.target?.result as string] });
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const att: JobAttachment = {
          id: uuidv4(),
          name: file.name,
          data: ev.target?.result as string,
          mimeType: file.type,
        };
        set({ attachments: [...draft.attachments, att] });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleSave = () => onUpdate(draft);

  return (
    <div className="space-y-5">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-sm font-semibold text-slate-800 truncate">
          {draft.company || "회사명 없음"}{draft.position ? ` · ${draft.position}` : ""}
        </h3>
      </div>

      {/* 기본 정보 */}
      <div className="border-2 border-indigo-200 rounded-xl p-4 bg-indigo-50/30 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">회사명</label>
            <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              placeholder="카카오" value={draft.company} onChange={(e) => set({ company: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">포지션</label>
            <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              placeholder="프론트엔드 개발자" value={draft.position} onChange={(e) => set({ position: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">마감일</label>
            <input type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              value={draft.deadline} onChange={(e) => set({ deadline: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">상태</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              value={draft.status} onChange={(e) => set({ status: e.target.value as JobStatus })}>
              {(Object.keys(JOB_STATUS_LABEL) as JobStatus[]).map((s) => (
                <option key={s} value={s}>{JOB_STATUS_LABEL[s]}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">공고 URL</label>
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            placeholder="https://..." value={draft.url} onChange={(e) => set({ url: e.target.value })} />
        </div>
      </div>

      {/* 자소서 */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2">자기소개서</label>
        <textarea
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          rows={8}
          placeholder="자기소개서 내용을 작성하세요..."
          value={draft.coverLetter}
          onChange={(e) => set({ coverLetter: e.target.value })}
        />
      </div>

      {/* JD 이미지 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-slate-500">JD 이미지</label>
          <button onClick={() => imageInputRef.current?.click()}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">+ 이미지 추가</button>
        </div>
        <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageAdd} />
        {draft.jdImages.length > 0 ? (
          <div className="space-y-2">
            {draft.jdImages.map((img, i) => (
              <div key={i} className="relative group">
                <img src={img} alt={`JD ${i + 1}`} className="w-full rounded-xl border border-slate-200 object-contain max-h-96" />
                <button
                  onClick={() => set({ jdImages: draft.jdImages.filter((_, j) => j !== i) })}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >×</button>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={() => imageInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-sm cursor-pointer hover:border-indigo-300 hover:text-indigo-400 transition-colors"
          >
            클릭해서 JD 이미지 업로드
          </div>
        )}
      </div>

      {/* 첨부파일 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-slate-500">첨부파일 (지원서 등)</label>
          <button onClick={() => fileInputRef.current?.click()}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">+ 파일 추가</button>
        </div>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileAdd} />
        {draft.attachments.length > 0 ? (
          <div className="space-y-1.5">
            {draft.attachments.map((att) => (
              <div key={att.id} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <a href={att.data} download={att.name} className="text-sm text-slate-700 hover:text-indigo-600 truncate">{att.name}</a>
                </div>
                <button onClick={() => set({ attachments: draft.attachments.filter((a) => a.id !== att.id) })}
                  className="text-xs text-red-400 hover:text-red-600 shrink-0 ml-2">삭제</button>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center text-slate-400 text-sm cursor-pointer hover:border-indigo-300 hover:text-indigo-400 transition-colors"
          >
            클릭해서 파일 첨부 (PDF, Word 등)
          </div>
        )}
      </div>

      {/* 메모 */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">메모</label>
        <textarea
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          rows={3}
          placeholder="인터뷰 후기, 연락 일정 등..."
          value={draft.notes}
          onChange={(e) => set({ notes: e.target.value })}
        />
      </div>

      {/* 저장 */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`text-xs px-4 py-2 rounded-lg font-medium transition-colors ${
            isDirty ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-100 text-slate-400 cursor-default"
          }`}
        >
          저장
        </button>
      </div>
    </div>
  );
}

// ── 목록 뷰 ────────────────────────────────────────────────────────────────

export default function JobApplicationSection({ data, onAdd, onUpdate, onDelete }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = data.find((j) => j.id === selectedId);

  if (selected) {
    return (
      <JobDetail
        job={selected}
        onUpdate={(updates) => { onUpdate(selected.id, updates); setSelectedId(null); }}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <div className="space-y-3">
      {data.map((job) => {
        const dday = getDday(job.deadline);
        return (
          <div
            key={job.id}
            className="border border-slate-200 rounded-xl p-4 bg-white hover:border-indigo-200 transition-colors cursor-pointer"
            onClick={() => setSelectedId(job.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800 text-sm">
                    {job.company || "회사명 없음"}
                  </span>
                  {job.position && (
                    <span className="text-slate-500 text-sm">{job.position}</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${JOB_STATUS_COLOR[job.status]}`}>
                    {JOB_STATUS_LABEL[job.status]}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  {job.deadline && (
                    <span className="text-xs text-slate-400">
                      마감 {job.deadline} <span className={`ml-1 ${dday.color}`}>{dday.label}</span>
                    </span>
                  )}
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-indigo-500 hover:text-indigo-700 underline"
                    >
                      공고 보기
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(job.id); }}
                className="text-xs text-red-400 hover:text-red-600 shrink-0"
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={onAdd}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
      >
        + 채용 공고 추가
      </button>
    </div>
  );
}
