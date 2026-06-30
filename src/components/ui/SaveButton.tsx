"use client";

import { useState } from "react";

interface Props {
  onSave: () => void;
  isDirty?: boolean;
}

export default function SaveButton({ onSave, isDirty = true }: Props) {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (saved) {
    return (
      <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        저장됨
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
        isDirty
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "bg-slate-100 text-slate-400 cursor-default"
      }`}
    >
      저장
    </button>
  );
}
