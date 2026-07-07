"use client";

import { ResumeData } from "@/types/resume";

function formatMonth(date: string) {
  if (!date) return "";
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

interface Props {
  data: ResumeData;
}

function formatDate(date: string) {
  if (!date) return "";
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

function DateRange({
  start,
  end,
  current,
}: {
  start: string;
  end: string;
  current: boolean;
}) {
  if (!start) return null;
  return (
    <span className="text-slate-400 text-xs">
      {formatDate(start)} — {current ? "현재" : formatDate(end)}
    </span>
  );
}

export default function ResumePreview({ data }: Props) {
  const { profile, experiences, projects, skills, education, certifications, languages, trainings } = data;

  return (
    <div className="bg-white text-slate-800 p-8 shadow-sm text-[13px] leading-relaxed min-h-full" style={{ fontFamily: '"Pretendard Variable", Pretendard, sans-serif' }}>
      {/* Header */}
      {profile.name && (
        <div className="mb-6 pb-5 border-b border-slate-200 flex gap-4 items-start">
          {profile.photo && (
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover shrink-0"
            />
          )}
          <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
          {profile.title && (
            <p className="text-slate-500 mt-0.5">{profile.title}</p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-slate-500 text-xs">
            {profile.email && <span>{profile.email}</span>}
            {profile.phone && <span>{profile.phone}</span>}
            {profile.location && <span>{profile.location}</span>}
            {profile.website && <span>{profile.website}</span>}
            {profile.linkedin && <span>{profile.linkedin}</span>}
            {profile.github && <span>{profile.github}</span>}
          </div>
          {profile.summary && (
            <p className="mt-3 text-slate-600 text-xs leading-relaxed whitespace-pre-line">
              {profile.summary}
            </p>
          )}
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
            경력
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-slate-900">
                      {exp.position || "직책"}
                    </span>
                    {exp.company && (
                      <span className="text-slate-500 ml-2">{exp.company}</span>
                    )}
                  </div>
                  <DateRange
                    start={exp.startDate}
                    end={exp.endDate}
                    current={exp.current}
                  />
                </div>
                {exp.description && (
                  <p className="mt-1 text-slate-600 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
            프로젝트
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">
                      {proj.name || "프로젝트명"}
                    </span>
                    {proj.link && (
                      <span className="text-indigo-500 text-xs">{proj.link}</span>
                    )}
                  </div>
                  <DateRange
                    start={proj.startDate}
                    end={proj.endDate}
                    current={false}
                  />
                </div>
                {proj.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {proj.description && (
                  <p className="mt-1 text-slate-600 whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
            기술
          </h2>
          <div className="space-y-1.5">
            {skills.map((skill) => (
              <div key={skill.id} className="flex gap-3">
                {skill.category && (
                  <span className="font-medium text-slate-700 w-24 shrink-0">
                    {skill.category}
                  </span>
                )}
                <span className="text-slate-600">
                  {skill.items.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
            학력
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-slate-900">
                      {edu.school || "학교명"}
                    </span>
                    {(edu.degree || edu.major) && (
                      <span className="text-slate-500 ml-2">
                        {[edu.degree, edu.major].filter(Boolean).join(" ")}
                      </span>
                    )}
                  </div>
                  <DateRange
                    start={edu.startDate}
                    end={edu.endDate}
                    current={edu.current}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">자격증</h2>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-500 ml-2">{cert.issuer}</span>}
                </div>
                <span className="text-slate-400 text-xs">
                  {formatMonth(cert.date)}{cert.expiry ? ` — ${formatMonth(cert.expiry)}` : ""}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">어학</h2>
          <div className="space-y-1.5">
            {languages.map((lang) => (
              <div key={lang.id} className="flex items-baseline gap-3">
                <span className="font-semibold text-slate-900 w-16 shrink-0">{lang.language}</span>
                {lang.level && <span className="text-slate-600">{lang.level}</span>}
                {(lang.test || lang.score) && (
                  <span className="text-slate-400 text-xs">
                    {[lang.test, lang.score].filter(Boolean).join(" ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trainings */}
      {trainings.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">교육수강</h2>
          <div className="space-y-3">
            {trainings.map((tr) => (
              <div key={tr.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-slate-900">{tr.name}</span>
                    {tr.institution && <span className="text-slate-500 ml-2">{tr.institution}</span>}
                  </div>
                  {tr.startDate && (
                    <span className="text-slate-400 text-xs">
                      {formatMonth(tr.startDate)}{tr.endDate ? ` — ${formatMonth(tr.endDate)}` : ""}
                    </span>
                  )}
                </div>
                {tr.description && <p className="mt-0.5 text-slate-600 whitespace-pre-line">{tr.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {!profile.name &&
        experiences.length === 0 &&
        projects.length === 0 &&
        skills.length === 0 &&
        education.length === 0 &&
        certifications.length === 0 &&
        languages.length === 0 &&
        trainings.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-300">
            <svg
              className="w-12 h-12 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm">왼쪽에서 정보를 입력하면 여기에 표시됩니다</p>
          </div>
        )}
    </div>
  );
}
