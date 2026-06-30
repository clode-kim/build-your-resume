"use client";

import { Training } from "@/types/resume";

interface Props {
  data: Training[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Training>) => void;
  onDelete: (id: string) => void;
}

export default function TrainingSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {data.map((tr) => (
        <div key={tr.id} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">교육명</label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="AWS Solutions Architect 과정"
                value={tr.name}
                onChange={(e) => onUpdate(tr.id, { name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">기관</label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="패스트캠퍼스, 부스트코스..."
                value={tr.institution}
                onChange={(e) => onUpdate(tr.id, { institution: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">시작일</label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={tr.startDate}
                onChange={(e) => onUpdate(tr.id, { startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">종료일</label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={tr.endDate}
                onChange={(e) => onUpdate(tr.id, { endDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">설명 (선택)</label>
            <textarea
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={2}
              placeholder="교육 내용 또는 수료 사항"
              value={tr.description}
              onChange={(e) => onUpdate(tr.id, { description: e.target.value })}
            />
          </div>
          <button onClick={() => onDelete(tr.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">
            삭제
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
      >
        + 교육 추가
      </button>
    </div>
  );
}
