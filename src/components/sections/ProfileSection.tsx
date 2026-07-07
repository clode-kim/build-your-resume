"use client";

import { useRef, useState, useEffect } from "react";
import { Profile } from "@/types/resume";

interface Props {
  data: Profile;
  onChange: (updates: Partial<Profile>) => void;
}

export default function ProfileSection({ data, onChange }: Props) {
  const [draft, setDraft] = useState<Profile>(data);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDirty = JSON.stringify(draft) !== JSON.stringify(data);

  useEffect(() => {
    setDraft(data);
  }, [data]);

  const update = (updates: Partial<Profile>) => setDraft((prev) => ({ ...prev, ...updates }));

  const handleSave = () => onChange(draft);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update({ photo: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const field = (label: string, key: keyof Profile, placeholder?: string, type = "text") => (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      {key === "summary" ? (
        <textarea
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={4}
          placeholder={placeholder}
          value={draft[key]}
          onChange={(e) => update({ [key]: e.target.value })}
        />
      ) : (
        <input
          type={type}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder={placeholder}
          value={draft[key]}
          onChange={(e) => update({ [key]: e.target.value })}
        />
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Photo upload */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400 transition-colors shrink-0"
        >
          {draft.photo ? (
            <img src={draft.photo} alt="프로필" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
        <div>
          <button onClick={() => fileInputRef.current?.click()} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            사진 업로드
          </button>
          {draft.photo && (
            <button onClick={() => update({ photo: "" })} className="ml-3 text-sm text-red-400 hover:text-red-600">
              삭제
            </button>
          )}
          <p className="text-xs text-slate-400 mt-0.5">JPG, PNG 권장</p>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {field("이름", "name", "홍길동")}
        {field("직함", "title", "Frontend Developer")}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field("이메일", "email", "example@email.com", "email")}
        {field("전화번호", "phone", "010-0000-0000", "tel")}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field("위치", "location", "서울, 대한민국")}
        {field("웹사이트", "website", "https://mysite.com", "url")}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field("LinkedIn", "linkedin", "linkedin.com/in/username")}
        {field("GitHub", "github", "github.com/username")}
      </div>
      {field("자기소개", "summary", "간단한 자기소개를 작성해주세요...")}

      <div className="flex justify-end pt-1">
        <button
          onClick={handleSave}
          className={`text-xs px-4 py-2 rounded-lg font-medium transition-colors ${
            isDirty
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-100 text-slate-400 cursor-default"
          }`}
        >
          저장
        </button>
      </div>
    </div>
  );
}
