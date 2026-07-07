"use client";

import { useState, useCallback } from "react";
import { useResume } from "@/hooks/useResume";
import { useAuth } from "@/hooks/useAuth";
import { ResumeData } from "@/types/resume";
import ProfileSection from "@/components/sections/ProfileSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectSection from "@/components/sections/ProjectSection";
import SkillSection from "@/components/sections/SkillSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationSection from "@/components/sections/CertificationSection";
import LanguageSection from "@/components/sections/LanguageSection";
import TrainingSection from "@/components/sections/TrainingSection";
import JobApplicationSection from "@/components/sections/JobApplicationSection";
import CoverLetterSection from "@/components/sections/CoverLetterSection";
import ResumePreview from "@/components/ResumePreview";
import PrintModal from "@/components/PrintModal";

type SectionKey =
  | "profile"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "languages"
  | "trainings"
  | "jobApplications"
  | "coverLetterBank";

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: "profile", label: "기본 정보", icon: "👤" },
  { key: "experience", label: "경력", icon: "💼" },
  { key: "projects", label: "프로젝트", icon: "🚀" },
  { key: "skills", label: "기술", icon: "⚡" },
  { key: "education", label: "학력", icon: "🎓" },
  { key: "certifications", label: "자격증", icon: "📜" },
  { key: "languages", label: "어학", icon: "🌐" },
  { key: "trainings", label: "교육수강", icon: "📚" },
  { key: "jobApplications", label: "채용 공고", icon: "📋" },
  { key: "coverLetterBank", label: "자기소개서", icon: "✍️" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");
  const [showPreview, setShowPreview] = useState(true);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printData, setPrintData] = useState<ResumeData | null>(null);
  const { user, loading: authLoading } = useAuth();
  const resume = useResume();

  const handlePrint = useCallback((filtered: ResumeData) => {
    setShowPrintModal(false);
    setPrintData(filtered);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintData(null), 300);
    }, 50);
  }, []);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="text-slate-500 text-sm">로딩 중...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 flex flex-col items-center gap-5 w-80">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-base font-bold text-slate-900 mb-1">Resume</h1>
            <p className="text-xs text-slate-500">로그인하면 모든 기기에서 이력서가 동기화됩니다.</p>
          </div>
          <a
            href="/login"
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-sm py-2.5 rounded-xl hover:bg-slate-700 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub으로 로그인
          </a>
        </div>
      </div>
    );
  }

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
      case "jobApplications":
        return <JobApplicationSection data={resume.data.jobApplications ?? []} onAdd={resume.addJobApplication} onUpdate={resume.updateJobApplication} onDelete={resume.deleteJobApplication} />;
      case "coverLetterBank":
        return <CoverLetterSection data={resume.data.coverLetterBank ?? []} onAdd={resume.addCoverLetterItem} onUpdate={resume.updateCoverLetterItem} onDelete={resume.deleteCoverLetterItem} />;
    }
  };

  return (
    <>
    {/* 인쇄 전용 영역 — 화면에서는 숨김, 출력 시에만 표시 */}
    <div className="print-only">
      {printData && <ResumePreview data={printData} />}
    </div>

    <div className="flex h-screen overflow-hidden bg-slate-100 no-print">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-slate-200 flex flex-col shrink-0 no-print">
        <div className="px-5 py-4 border-b border-slate-100">
          <h1 className="text-sm font-bold text-slate-900">Resume</h1>
          <p className="text-xs text-slate-400 mt-0.5">자동 저장됨</p>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {SECTIONS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                activeSection === key
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button
            onClick={() => setShowPrintModal(true)}
            className="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            PDF 저장
          </button>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 truncate">{user.userDetails}</span>
            <a href="/logout" className="text-xs text-slate-400 hover:text-red-500 transition-colors shrink-0 ml-2">
              로그아웃
            </a>
          </div>
        </div>
      </aside>

      {/* Editor */}
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto no-print">
          <div className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                {SECTIONS.find((s) => s.key === activeSection)?.label}
              </h2>
              {!showPreview && (
                <button
                  onClick={() => setShowPreview(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
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

    {showPrintModal && (
      <PrintModal
        data={resume.data}
        onConfirm={handlePrint}
        onClose={() => setShowPrintModal(false)}
      />
    )}
    </>
  );
}
