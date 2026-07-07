"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ResumeData,
  defaultResumeData,
  Experience,
  Project,
  Skill,
  Education,
  Certification,
  Language,
  Training,
  JobApplication,
  CoverLetterItem,
} from "@/types/resume";
import { v4 as uuidv4 } from "uuid";

interface ResumeListItem {
  id: string;
  updatedAt: string;
}

interface ResumeDocument {
  id: string;
  data: ResumeData;
}

export function useResume() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [loading, setLoading] = useState(true);
  const resumeIdRef = useRef<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const listRes = await fetch("/api/resumes");
        const list: ResumeListItem[] = await listRes.json();

        if (list.length > 0) {
          const detailRes = await fetch(`/api/resumes/${list[0].id}`);
          const doc: ResumeDocument = await detailRes.json();
          resumeIdRef.current = doc.id;
          setData({ ...defaultResumeData, ...doc.data });
        } else {
          // 최초 진입 시 빈 이력서 생성
          const createRes = await fetch("/api/resumes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: defaultResumeData }),
          });
          const doc: ResumeDocument = await createRes.json();
          resumeIdRef.current = doc.id;
        }
      } catch {
        // 네트워크 오류 시 빈 상태로 fallback
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = useCallback((next: ResumeData) => {
    setData(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resumeIdRef.current, data: next }),
      })
        .then((r) => r.json())
        .then((doc: ResumeDocument) => {
          if (!resumeIdRef.current) resumeIdRef.current = doc.id;
        })
        .catch(() => {});
    }, 500);
  }, []);

  // ── 프로필 ────────────────────────────────────────────────────────────────

  const updateProfile = useCallback(
    (updates: Partial<ResumeData["profile"]>) => {
      save({ ...data, profile: { ...data.profile, ...updates } });
    },
    [data, save]
  );

  // ── 경력 ──────────────────────────────────────────────────────────────────

  const addExperience = useCallback(() => {
    const item: Experience = { id: uuidv4(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" };
    save({ ...data, experiences: [...data.experiences, item] });
    return item.id;
  }, [data, save]);

  const updateExperience = useCallback((id: string, updates: Partial<Experience>) => {
    save({ ...data, experiences: data.experiences.map((e) => e.id === id ? { ...e, ...updates } : e) });
  }, [data, save]);

  const deleteExperience = useCallback((id: string) => {
    save({ ...data, experiences: data.experiences.filter((e) => e.id !== id) });
  }, [data, save]);

  // ── 프로젝트 ──────────────────────────────────────────────────────────────

  const addProject = useCallback(() => {
    const item: Project = { id: uuidv4(), name: "", description: "", techStack: [], link: "", startDate: "", endDate: "", architectureImage: "" };
    save({ ...data, projects: [...data.projects, item] });
    return item.id;
  }, [data, save]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    save({ ...data, projects: data.projects.map((p) => p.id === id ? { ...p, ...updates } : p) });
  }, [data, save]);

  const deleteProject = useCallback((id: string) => {
    save({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  }, [data, save]);

  // ── 기술 ──────────────────────────────────────────────────────────────────

  const addSkillCategory = useCallback(() => {
    const item: Skill = { id: uuidv4(), category: "", items: [] };
    save({ ...data, skills: [...data.skills, item] });
    return item.id;
  }, [data, save]);

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    save({ ...data, skills: data.skills.map((s) => s.id === id ? { ...s, ...updates } : s) });
  }, [data, save]);

  const deleteSkill = useCallback((id: string) => {
    save({ ...data, skills: data.skills.filter((s) => s.id !== id) });
  }, [data, save]);

  // ── 학력 ──────────────────────────────────────────────────────────────────

  const addEducation = useCallback(() => {
    const item: Education = { id: uuidv4(), school: "", degree: "", major: "", minor: "", gpa: "", gpaMax: "4.5", startDate: "", endDate: "", current: false, description: "" };
    save({ ...data, education: [...data.education, item] });
    return item.id;
  }, [data, save]);

  const updateEducation = useCallback((id: string, updates: Partial<Education>) => {
    save({ ...data, education: data.education.map((e) => e.id === id ? { ...e, ...updates } : e) });
  }, [data, save]);

  const deleteEducation = useCallback((id: string) => {
    save({ ...data, education: data.education.filter((e) => e.id !== id) });
  }, [data, save]);

  // ── 자격증 ────────────────────────────────────────────────────────────────

  const addCertification = useCallback(() => {
    const item: Certification = { id: uuidv4(), name: "", issuer: "", date: "", expiry: "", certNumber: "" };
    save({ ...data, certifications: [...data.certifications, item] });
    return item.id;
  }, [data, save]);

  const updateCertification = useCallback((id: string, updates: Partial<Certification>) => {
    save({ ...data, certifications: data.certifications.map((c) => c.id === id ? { ...c, ...updates } : c) });
  }, [data, save]);

  const deleteCertification = useCallback((id: string) => {
    save({ ...data, certifications: data.certifications.filter((c) => c.id !== id) });
  }, [data, save]);

  // ── 어학 ──────────────────────────────────────────────────────────────────

  const addLanguage = useCallback(() => {
    const item: Language = { id: uuidv4(), language: "", level: "", test: "", score: "" };
    save({ ...data, languages: [...data.languages, item] });
    return item.id;
  }, [data, save]);

  const updateLanguage = useCallback((id: string, updates: Partial<Language>) => {
    save({ ...data, languages: data.languages.map((l) => l.id === id ? { ...l, ...updates } : l) });
  }, [data, save]);

  const deleteLanguage = useCallback((id: string) => {
    save({ ...data, languages: data.languages.filter((l) => l.id !== id) });
  }, [data, save]);

  // ── 교육수강 ──────────────────────────────────────────────────────────────

  const addTraining = useCallback(() => {
    const item: Training = { id: uuidv4(), name: "", institution: "", startDate: "", endDate: "", description: "" };
    save({ ...data, trainings: [...data.trainings, item] });
    return item.id;
  }, [data, save]);

  const updateTraining = useCallback((id: string, updates: Partial<Training>) => {
    save({ ...data, trainings: data.trainings.map((t) => t.id === id ? { ...t, ...updates } : t) });
  }, [data, save]);

  const deleteTraining = useCallback((id: string) => {
    save({ ...data, trainings: data.trainings.filter((t) => t.id !== id) });
  }, [data, save]);

  // ── 채용 공고 ──────────────────────────────────────────────────────────────

  const addJobApplication = useCallback(() => {
    const item: JobApplication = {
      id: uuidv4(), company: "", position: "", applicationType: "", url: "", deadline: "",
      status: "planned", coverLetter: "", jdText: "", jdImages: [], attachments: [], notes: "",
    };
    save({ ...data, jobApplications: [...(data.jobApplications ?? []), item] });
    return item.id;
  }, [data, save]);

  const updateJobApplication = useCallback((id: string, updates: Partial<JobApplication>) => {
    save({ ...data, jobApplications: (data.jobApplications ?? []).map((j) => j.id === id ? { ...j, ...updates } : j) });
  }, [data, save]);

  const deleteJobApplication = useCallback((id: string) => {
    save({ ...data, jobApplications: (data.jobApplications ?? []).filter((j) => j.id !== id) });
  }, [data, save]);

  // ── 자기소개서 ────────────────────────────────────────────────────────────

  const addCoverLetterItem = useCallback(() => {
    const item: CoverLetterItem = { id: uuidv4(), question: "", answer: "", category: "" };
    save({ ...data, coverLetterBank: [...(data.coverLetterBank ?? []), item] });
    return item.id;
  }, [data, save]);

  const updateCoverLetterItem = useCallback((id: string, updates: Partial<CoverLetterItem>) => {
    save({ ...data, coverLetterBank: (data.coverLetterBank ?? []).map((c) => c.id === id ? { ...c, ...updates } : c) });
  }, [data, save]);

  const deleteCoverLetterItem = useCallback((id: string) => {
    save({ ...data, coverLetterBank: (data.coverLetterBank ?? []).filter((c) => c.id !== id) });
  }, [data, save]);

  return {
    data,
    loading,
    updateProfile,
    addExperience, updateExperience, deleteExperience,
    addProject, updateProject, deleteProject,
    addSkillCategory, updateSkill, deleteSkill,
    addEducation, updateEducation, deleteEducation,
    addCertification, updateCertification, deleteCertification,
    addLanguage, updateLanguage, deleteLanguage,
    addTraining, updateTraining, deleteTraining,
    addJobApplication, updateJobApplication, deleteJobApplication,
    addCoverLetterItem, updateCoverLetterItem, deleteCoverLetterItem,
  };
}
