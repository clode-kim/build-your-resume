export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photo: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  github: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry: string;
}

export interface Language {
  id: string;
  language: string;
  level: string;
  test: string;
  score: string;
}

export interface Training {
  id: string;
  name: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
  trainings: Training[];
}

export const defaultResumeData: ResumeData = {
  profile: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    photo: "",
  },
  experiences: [],
  projects: [],
  skills: [],
  education: [],
  certifications: [],
  languages: [],
  trainings: [],
};
