"use client";

import { Education } from "@/types/resume";

interface Props {
  data: Education[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Education>) => void;
  onDelete: (id: string) => void;
}

export default function EducationSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {data.map((edu) => (
        <div
          key={edu.id}
          className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                학교명
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="OO대학교"
                value={edu.school}
                onChange={(e) => onUpdate(edu.id, { school: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                전공
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="컴퓨터공학과"
                value={edu.major}
                onChange={(e) => onUpdate(edu.id, { major: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                학위
              </label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={edu.degree}
                onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
              >
                <option value="">선택</option>
                <option value="학사">학사</option>
                <option value="석사">석사</option>
                <option value="박사">박사</option>
                <option value="전문학사">전문학사</option>
                <option value="수료">수료</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                입학
              </label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={edu.startDate}
                onChange={(e) =>
                  onUpdate(edu.id, { startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                졸업
              </label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-slate-100"
                value={edu.endDate}
                disabled={edu.current}
                onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="accent-indigo-500"
              checked={edu.current}
              onChange={(e) =>
                onUpdate(edu.id, { current: e.target.checked, endDate: "" })
              }
            />
            재학 중
          </label>
          <button
            onClick={() => onDelete(edu.id)}
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
        + 학력 추가
      </button>
    </div>
  );
}
