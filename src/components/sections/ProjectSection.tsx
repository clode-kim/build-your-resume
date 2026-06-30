"use client";

import { useState } from "react";
import { Project } from "@/types/resume";

interface Props {
  data: Project[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Project>) => void;
  onDelete: (id: string) => void;
}

export default function ProjectSection({ data, onAdd, onUpdate, onDelete }: Props) {
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const handleTechKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    project: Project
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = (techInputs[project.id] || "").trim();
      if (val && !project.techStack.includes(val)) {
        onUpdate(project.id, { techStack: [...project.techStack, val] });
      }
      setTechInputs((prev) => ({ ...prev, [project.id]: "" }));
    }
  };

  const removeTech = (project: Project, tech: string) => {
    onUpdate(project.id, {
      techStack: project.techStack.filter((t) => t !== tech),
    });
  };

  return (
    <div className="space-y-4">
      {data.map((proj) => (
        <div
          key={proj.id}
          className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                프로젝트명
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="프로젝트 이름"
                value={proj.name}
                onChange={(e) => onUpdate(proj.id, { name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                GitHub
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="github.com/..."
                value={proj.github}
                onChange={(e) => onUpdate(proj.id, { github: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                시작일
              </label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={proj.startDate}
                onChange={(e) =>
                  onUpdate(proj.id, { startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                종료일
              </label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={proj.endDate}
                onChange={(e) =>
                  onUpdate(proj.id, { endDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                링크
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="https://..."
                value={proj.link}
                onChange={(e) => onUpdate(proj.id, { link: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              기술 스택 (Enter 또는 쉼표로 추가)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {proj.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                >
                  {tech}
                  <button
                    onClick={() => removeTech(proj, tech)}
                    className="hover:text-indigo-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="React, TypeScript, ..."
              value={techInputs[proj.id] || ""}
              onChange={(e) =>
                setTechInputs((prev) => ({ ...prev, [proj.id]: e.target.value }))
              }
              onKeyDown={(e) => handleTechKeyDown(e, proj)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              설명
            </label>
            <textarea
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={3}
              placeholder="프로젝트 설명 및 주요 기능"
              value={proj.description}
              onChange={(e) =>
                onUpdate(proj.id, { description: e.target.value })
              }
            />
          </div>
          <button
            onClick={() => onDelete(proj.id)}
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            삭제
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
      >
        + 프로젝트 추가
      </button>
    </div>
  );
}
