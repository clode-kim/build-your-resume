"use client";

import { useState } from "react";
import { CoverLetterItem } from "@/types/resume";

interface Props {
  data: CoverLetterItem[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<CoverLetterItem>) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_OPTIONS = ["성장과정", "지원동기", "직무역량", "성격·강점", "입사 후 포부", "기타"];

function ItemCard({
  item,
  onUpdate,
  onDelete,
}: {
  item: CoverLetterItem;
  onUpdate: (updates: Partial<CoverLetterItem>) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(!item.question && !item.answer);
  const [draft, setDraft] = useState(item);
  const set = (u: Partial<CoverLetterItem>) => setDraft((p) => ({ ...p, ...u }));

  const handleSave = () => {
    onUpdate(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(item);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50/30 space-y-3">
        <div className="flex items-center gap-2">
          <select
            className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-600"
            value={draft.category}
            onChange={(e) => set({ category: e.target.value })}
          >
            <option value="">카테고리 선택</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">질문</label>
          <input
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            placeholder="ex) 지원 동기를 작성해 주세요"
            value={draft.question}
            onChange={(e) => set({ question: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">답변</label>
          <textarea
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={8}
            placeholder="자기소개 내용을 작성하세요..."
            value={draft.answer}
            onChange={(e) => set({ answer: e.target.value })}
          />
          <p className="text-xs text-slate-400 mt-1 text-right">{draft.answer.length}자</p>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={handleCancel} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
            취소
          </button>
          <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
            저장
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-blue-200 transition-colors group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditing(true)}>
          <div className="flex items-center gap-2 mb-1.5">
            {item.category && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                {item.category}
              </span>
            )}
            <span className="text-xs text-slate-400">{item.answer.length}자</span>
          </div>
          <p className="text-sm font-semibold text-slate-800 mb-1 truncate">
            {item.question || "질문 없음"}
          </p>
          <p className="text-xs text-slate-500 line-clamp-2 whitespace-pre-line leading-relaxed">
            {item.answer || "답변을 입력하세요..."}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditing(true)} className="text-xs text-blue-500 hover:text-blue-700">
            편집
          </button>
          <button onClick={onDelete} className="text-xs text-red-400 hover:text-red-600">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoverLetterSection({ data, onAdd, onUpdate, onDelete }: Props) {
  const categories = Array.from(new Set(data.map((d) => d.category).filter(Boolean)));

  return (
    <div className="space-y-3">
      {data.length > 0 && categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-1">
          {categories.map((cat) => (
            <span key={cat} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
              {cat} {data.filter((d) => d.category === cat).length}개
            </span>
          ))}
        </div>
      )}

      {data.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onUpdate={(updates) => onUpdate(item.id, updates)}
          onDelete={() => onDelete(item.id)}
        />
      ))}

      <button
        onClick={onAdd}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        + 자기소개 항목 추가
      </button>
    </div>
  );
}
