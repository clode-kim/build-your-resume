"use client";

import { useState, useEffect, useCallback } from "react";
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
} from "@/types/resume";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "resume_data";

export function useResume() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData({ ...defaultResumeData, ...parsed });
      } catch {
        setData(defaultResumeData);
      }
    }
  }, []);

  const save = useCallback((next: ResumeData) => {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<ResumeData["profile"]>) => {
      save({ ...data, profile: { ...data.profile, ...updates } });
    },
    [data, save]
  );

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

  const addProject = useCallback(() => {
    const item: Project = { id: uuidv4(), name: "", description: "", techStack: [], link: "", github: "", startDate: "", endDate: "" };
    save({ ...data, projects: [...data.projects, item] });
    return item.id;
  }, [data, save]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    save({ ...data, projects: data.projects.map((p) => p.id === id ? { ...p, ...updates } : p) });
  }, [data, save]);

  const deleteProject = useCallback((id: string) => {
    save({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  }, [data, save]);

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

  const addEducation = useCallback(() => {
    const item: Education = { id: uuidv4(), school: "", degree: "", major: "", startDate: "", endDate: "", current: false, description: "" };
    save({ ...data, education: [...data.education, item] });
    return item.id;
  }, [data, save]);

  const updateEducation = useCallback((id: string, updates: Partial<Education>) => {
    save({ ...data, education: data.education.map((e) => e.id === id ? { ...e, ...updates } : e) });
  }, [data, save]);

  const deleteEducation = useCallback((id: string) => {
    save({ ...data, education: data.education.filter((e) => e.id !== id) });
  }, [data, save]);

  const addCertification = useCallback(() => {
    const item: Certification = { id: uuidv4(), name: "", issuer: "", date: "", expiry: "" };
    save({ ...data, certifications: [...data.certifications, item] });
    return item.id;
  }, [data, save]);

  const updateCertification = useCallback((id: string, updates: Partial<Certification>) => {
    save({ ...data, certifications: data.certifications.map((c) => c.id === id ? { ...c, ...updates } : c) });
  }, [data, save]);

  const deleteCertification = useCallback((id: string) => {
    save({ ...data, certifications: data.certifications.filter((c) => c.id !== id) });
  }, [data, save]);

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

  return {
    data,
    updateProfile,
    addExperience, updateExperience, deleteExperience,
    addProject, updateProject, deleteProject,
    addSkillCategory, updateSkill, deleteSkill,
    addEducation, updateEducation, deleteEducation,
    addCertification, updateCertification, deleteCertification,
    addLanguage, updateLanguage, deleteLanguage,
    addTraining, updateTraining, deleteTraining,
  };
}
