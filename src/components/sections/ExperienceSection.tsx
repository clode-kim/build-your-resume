"use client";

import { Experience } from "@/types/resume";

interface Props {
  data: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Experience>) => void;
  onDelete: (id: string) => void;
}

export default function ExperienceSection({
  data,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <div className="space-y-4">
      {data.map((exp) => (
        <div
          key={exp.id}
          className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                회사명
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="(주)회사이름"
                value={exp.company}
                onChange={(e) => onUpdate(exp.id, { company: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                직책
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Software Engineer"
                value={exp.position}
                onChange={(e) =>
                  onUpdate(exp.id, { position: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                시작일
              </label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={exp.startDate}
                onChange={(e) =>
                  onUpdate(exp.id, { startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                종료일
              </label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-slate-100"
                value={exp.endDate}
                disabled={exp.current}
                onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600 pb-2">
              <input
                type="checkbox"
                className="accent-indigo-500"
                checked={exp.current}
                onChange={(e) =>
                  onUpdate(exp.id, { current: e.target.checked, endDate: "" })
                }
              />
              재직 중
            </label>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              업무 설명
            </label>
            <textarea
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={3}
              placeholder="주요 업무 및 성과를 입력해주세요"
              value={exp.description}
              onChange={(e) =>
                onUpdate(exp.id, { description: e.target.value })
              }
            />
          </div>
          <button
            onClick={() => onDelete(exp.id)}
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
        + 경력 추가
      </button>
    </div>
  );
}
