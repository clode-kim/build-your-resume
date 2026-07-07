"use client";

import { useState } from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  onConfirm: (filtered: ResumeData) => void;
  onClose: () => void;
}

interface Selection {
  profile: boolean;
  experiences: string[];
  projects: string[];
  skills: string[];
  education: string[];
  certifications: string[];
  languages: string[];
  trainings: string[];
}

function initSelection(data: ResumeData): Selection {
  return {
    profile: true,
    experiences: data.experiences.map((e) => e.id),
    projects: data.projects.map((p) => p.id),
    skills: data.skills.map((s) => s.id),
    education: data.education.map((e) => e.id),
    certifications: data.certifications.map((c) => c.id),
    languages: data.languages.map((l) => l.id),
    trainings: data.trainings.map((t) => t.id),
  };
}

type ListKey = Exclude<keyof Selection, "profile">;

const LIST_SECTIONS: { key: ListKey; label: string; icon: string; getLabel: (item: any) => string }[] = [
  {
    key: "experiences",
    label: "경력",
    icon: "💼",
    getLabel: (e) => [e.company, e.position].filter(Boolean).join(" · ") || "경력 항목",
  },
  {
    key: "projects",
    label: "프로젝트",
    icon: "🚀",
    getLabel: (p) => p.name || "프로젝트",
  },
  {
    key: "skills",
    label: "기술",
    icon: "⚡",
    getLabel: (s) => s.category || "기술 항목",
  },
  {
    key: "education",
    label: "학력",
    icon: "🎓",
    getLabel: (e) => [e.school, e.major].filter(Boolean).join(" · ") || "학교",
  },
  {
    key: "certifications",
    label: "자격증",
    icon: "📜",
    getLabel: (c) => c.name || "자격증",
  },
  {
    key: "languages",
    label: "어학",
    icon: "🌐",
    getLabel: (l) => l.language || "언어",
  },
  {
    key: "trainings",
    label: "교육수강",
    icon: "📚",
    getLabel: (t) => [t.name, t.institution].filter(Boolean).join(" · ") || "교육",
  },
];

function Checkbox({ checked, onChange, label, bold }: { checked: boolean; onChange: () => void; label: string; bold?: boolean }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-slate-300 accent-indigo-600 cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <span className={`text-sm select-none ${bold ? "font-semibold text-slate-800" : "text-slate-600"} group-hover:text-indigo-700 transition-colors`}>
        {label}
      </span>
    </label>
  );
}

export default function PrintModal({ data, onConfirm, onClose }: Props) {
  const [sel, setSel] = useState<Selection>(() => initSelection(data));

  const toggleItem = (key: ListKey, id: string) => {
    setSel((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id],
      };
    });
  };

  const toggleSection = (key: ListKey, allIds: string[]) => {
    setSel((prev) => {
      const arr = prev[key] as string[];
      const allSelected = allIds.every((id) => arr.includes(id));
      return { ...prev, [key]: allSelected ? [] : [...allIds] };
    });
  };

  const selectAll = () => {
    setSel(initSelection(data));
  };

  const deselectAll = () => {
    setSel({
      profile: false,
      experiences: [],
      projects: [],
      skills: [],
      education: [],
      certifications: [],
      languages: [],
      trainings: [],
    });
  };

  const handleConfirm = () => {
    const filtered: ResumeData = {
      profile: sel.profile ? data.profile : {
        name: "", title: "", email: "", phone: "", location: "",
        website: "", linkedin: "", github: "", summary: "", photo: "",
      },
      experiences: data.experiences.filter((e) => sel.experiences.includes(e.id)),
      projects: data.projects.filter((p) => sel.projects.includes(p.id)),
      skills: data.skills.filter((s) => sel.skills.includes(s.id)),
      education: data.education.filter((e) => sel.education.includes(e.id)),
      certifications: data.certifications.filter((c) => sel.certifications.includes(c.id)),
      languages: data.languages.filter((l) => sel.languages.includes(l.id)),
      trainings: data.trainings.filter((t) => sel.trainings.includes(t.id)),
      jobApplications: [],
    };
    onConfirm(filtered);
  };

  const totalSelected =
    (sel.profile ? 1 : 0) +
    sel.experiences.length +
    sel.projects.length +
    sel.skills.length +
    sel.education.length +
    sel.certifications.length +
    sel.languages.length +
    sel.trainings.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 flex flex-col max-h-[85vh]">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-slate-900">PDF 항목 선택</h2>
            <p className="text-xs text-slate-400 mt-0.5">포함할 항목을 선택하세요</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 전체 선택/해제 */}
        <div className="flex gap-2 px-5 py-2.5 border-b border-slate-100 shrink-0">
          <button onClick={selectAll} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">전체 선택</button>
          <span className="text-slate-200">|</span>
          <button onClick={deselectAll} className="text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors">전체 해제</button>
        </div>

        {/* 항목 목록 */}
        <div className="overflow-y-auto flex-1 px-5 py-3 space-y-4">
          {/* 기본 정보 */}
          <div>
            <Checkbox
              checked={sel.profile}
              onChange={() => setSel((p) => ({ ...p, profile: !p.profile }))}
              label="👤 기본 정보"
              bold
            />
          </div>

          {/* 리스트 섹션들 */}
          {LIST_SECTIONS.map(({ key, label, icon, getLabel }) => {
            const items = (data[key] as any[]);
            const selectedArr = sel[key] as string[];
            const allSelected = items.length > 0 && items.every((item) => selectedArr.includes(item.id));

            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 accent-indigo-600 cursor-pointer"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate = selectedArr.length > 0 && !allSelected && items.some((i) => selectedArr.includes(i.id));
                        }
                      }}
                      onChange={() => toggleSection(key, items.map((i) => i.id))}
                    />
                    <span className="text-sm font-semibold text-slate-800">{icon} {label}</span>
                  </div>
                  {items.length > 1 && (
                    <span className="text-xs text-slate-400">{selectedArr.length}/{items.length}</span>
                  )}
                </div>

                {items.length === 0 ? (
                  <p className="text-xs text-slate-300 ml-6">항목 없음</p>
                ) : (
                  <div className="ml-6 space-y-1.5">
                    {items.map((item) => (
                      <Checkbox
                        key={item.id}
                        checked={selectedArr.includes(item.id)}
                        onChange={() => toggleItem(key, item.id)}
                        label={getLabel(item)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 shrink-0">
          <span className="text-xs text-slate-400">{totalSelected}개 항목 선택됨</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="text-xs px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              취소
            </button>
            <button
              onClick={handleConfirm}
              disabled={totalSelected === 0}
              className="text-xs px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
            >
              PDF 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
