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
  startDate: string;
  endDate: string;
  architectureImage: string;  // base64 data URL
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
  minor: string;
  gpa: string;
  gpaMax: string;
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
  certNumber: string;
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

export type JobStatus =
  | "planned"
  | "applied"
  | "doc_passed"
  | "aptitude"
  | "interview1"
  | "interview2"
  | "final_interview"
  | "offered"
  | "rejected";

export type ApplicationType = "entry" | "career" | "";

export interface JobAttachment {
  id: string;
  name: string;
  data: string;   // base64
  mimeType: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  applicationType: ApplicationType;
  url: string;
  deadline: string;          // YYYY-MM-DD
  status: JobStatus;
  coverLetter: string;
  jdText: string;
  jdImages: string[];        // base64 data URLs
  attachments: JobAttachment[];
  notes: string;
}

export const JOB_STATUS_LABEL: Record<JobStatus, string> = {
  planned:         "지원 예정",
  applied:         "지원 완료",
  doc_passed:      "서류 합격",
  aptitude:        "인성·적성검사",
  interview1:      "1차 면접",
  interview2:      "2차 면접",
  final_interview: "최종 면접",
  offered:         "최종 합격",
  rejected:        "불합격",
};

export const JOB_STATUS_COLOR: Record<JobStatus, string> = {
  planned:         "bg-slate-100 text-slate-600",
  applied:         "bg-blue-100 text-blue-700",
  doc_passed:      "bg-cyan-100 text-cyan-700",
  aptitude:        "bg-purple-100 text-purple-700",
  interview1:      "bg-yellow-100 text-yellow-700",
  interview2:      "bg-amber-100 text-amber-700",
  final_interview: "bg-orange-100 text-orange-700",
  offered:         "bg-green-100 text-green-700",
  rejected:        "bg-red-100 text-red-600",
};

export interface CoverLetterItem {
  id: string;
  question: string;
  answer: string;
  category: string;
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
  jobApplications: JobApplication[];
  coverLetterBank: CoverLetterItem[];
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
  jobApplications: [],
  coverLetterBank: [],
};
