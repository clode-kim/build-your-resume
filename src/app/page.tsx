"use client";

import { useState } from "react";
import { useResume } from "@/hooks/useResume";
import ProfileSection from "@/components/sections/ProfileSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectSection from "@/components/sections/ProjectSection";
import SkillSection from "@/components/sections/SkillSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationSection from "@/components/sections/CertificationSection";
import LanguageSection from "@/components/sections/LanguageSection";
import TrainingSection from "@/components/sections/TrainingSection";
import ResumePreview from "@/components/ResumePreview";

type SectionKey =
  | "profile"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "languages"
  | "trainings";

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: "profile", label: "기본 정보", icon: "👤" },
  { key: "experience", label: "경력", icon: "💼" },
  { key: "projects", label: "프로젝트", icon: "🚀" },
  { key: "skills", label: "기술", icon: "⚡" },
  { key: "education", label: "학력", icon: "🎓" },
  { key: "certifications", label: "자격증", icon: "📜" },
  { key: "languages", label: "어학", icon: "🌐" },
  { key: "trainings", label: "교육수강", icon: "📚" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");
  const [showPreview, setShowPreview] = useState(true);
  const resume = useResume();

  const renderEditor = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection data={resume.data.profile} onChange={resume.updateProfile} />;
      case "experience":
        return <ExperienceSection data={resume.data.experiences} onAdd={resume.addExperience} onUpdate={resume.updateExperience} onDelete={resume.deleteExperience} />;
      case "projects":
        return <ProjectSection data={resume.data.projects} onAdd={resume.addProject} onUpdate={resume.updateProject} onDelete={resume.deleteProject} />;
      case "skills":
        return <SkillSection data={resume.data.skills} onAdd={resume.addSkillCategory} onUpdate={resume.updateSkill} onDelete={resume.deleteSkill} />;
      case "education":
        return <EducationSection data={resume.data.education} onAdd={resume.addEducation} onUpdate={resume.updateEducation} onDelete={resume.deleteEducation} />;
      case "certifications":
        return <CertificationSection data={resume.data.certifications} onAdd={resume.addCertification} onUpdate={resume.updateCertification} onDelete={resume.deleteCertification} />;
      case "languages":
        return <LanguageSection data={resume.data.languages} onAdd={resume.addLanguage} onUpdate={resume.updateLanguage} onDelete={resume.deleteLanguage} />;
      case "trainings":
        return <TrainingSection data={resume.data.trainings} onAdd={resume.addTraining} onUpdate={resume.updateTraining} onDelete={resume.deleteTraining} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-slate-200 flex flex-col shrink-0 no-print">
        <div className="px-5 py-4 border-b border-slate-100">
          <h1 className="text-sm font-bold text-slate-900">Build Your Resume</h1>
          <p className="text-xs text-slate-400 mt-0.5">자동 저장됨</p>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {SECTIONS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                activeSection === key
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => window.print()}
            className="w-full py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
          >
            PDF 저장
          </button>
        </div>
      </aside>

      {/* Editor */}
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto no-print">
          <div className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-800">
                {SECTIONS.find((s) => s.key === activeSection)?.label}
              </h2>
              {!showPreview && (
                <button
                  onClick={() => setShowPreview(true)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 border border-indigo-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  미리보기 열기
                </button>
              )}
            </div>
            {renderEditor()}
          </div>
        </div>

        {/* Preview panel */}
        <div
          className={`w-[480px] shrink-0 overflow-y-auto border-l border-slate-200 bg-slate-50 ${
            showPreview ? "block" : "hidden"
          }`}
        >
          <div className="sticky top-0 bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between z-10 no-print">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              미리보기
            </span>
            <button
              onClick={() => setShowPreview(false)}
              className="text-slate-400 hover:text-slate-700 transition-colors p-0.5"
              aria-label="미리보기 닫기"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <ResumePreview data={resume.data} />
          </div>
        </div>
      </main>
    </div>
  );
}
