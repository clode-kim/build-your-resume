"use client";

import { useState } from "react";
import { Skill } from "@/types/resume";

interface Props {
  data: Skill[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}

export default function SkillSection({ data, onAdd, onUpdate, onDelete }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    skill: Skill
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = (inputs[skill.id] || "").trim();
      if (val && !skill.items.includes(val)) {
        onUpdate(skill.id, { items: [...skill.items, val] });
      }
      setInputs((prev) => ({ ...prev, [skill.id]: "" }));
    }
  };

  const removeItem = (skill: Skill, item: string) => {
    onUpdate(skill.id, { items: skill.items.filter((i) => i !== item) });
  };

  return (
    <div className="space-y-4">
      {data.map((skill) => (
        <div
          key={skill.id}
          className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white"
        >
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              카테고리
            </label>
            <input
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="예: Frontend, Backend, DevOps"
              value={skill.category}
              onChange={(e) => onUpdate(skill.id, { category: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              기술 목록 (Enter 또는 쉼표로 추가)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                >
                  {item}
                  <button
                    onClick={() => removeItem(skill, item)}
                    className="hover:text-slate-900 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="React, TypeScript, ..."
              value={inputs[skill.id] || ""}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, [skill.id]: e.target.value }))
              }
              onKeyDown={(e) => handleKeyDown(e, skill)}
            />
          </div>
          <button
            onClick={() => onDelete(skill.id)}
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
        + 기술 카테고리 추가
      </button>
    </div>
  );
}
