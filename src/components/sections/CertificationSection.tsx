"use client";

import { Certification } from "@/types/resume";

interface Props {
  data: Certification[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Certification>) => void;
  onDelete: (id: string) => void;
}

export default function CertificationSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {data.map((cert) => (
        <div key={cert.id} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">자격증명</label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="정보처리기사"
                value={cert.name}
                onChange={(e) => onUpdate(cert.id, { name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">발급기관</label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="한국산업인력공단"
                value={cert.issuer}
                onChange={(e) => onUpdate(cert.id, { issuer: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">취득일</label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={cert.date}
                onChange={(e) => onUpdate(cert.id, { date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">만료일 (선택)</label>
              <input
                type="month"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={cert.expiry}
                onChange={(e) => onUpdate(cert.id, { expiry: e.target.value })}
              />
            </div>
          </div>
          <button onClick={() => onDelete(cert.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">
            삭제
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
      >
        + 자격증 추가
      </button>
    </div>
  );
}
