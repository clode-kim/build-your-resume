@AGENTS.md

# 프로젝트 현황

## 앱 개요
- **이름**: Resume
- **목적**: 개인 이력서 빌더 (프로필, 경력, 프로젝트, 기술, 학력, 자격증, 어학, 교육수강 관리)
- **언어**: 한국어 UI

## 기술 스택
- Next.js (App Router, `"use client"`, static export)
- Tailwind CSS v4
- TypeScript
- 데이터 저장: **localStorage** (서버/DB 없음)
- UUID (`uuid` 패키지)

## 배포
- **플랫폼**: Azure Static Web Apps
- **리소스 이름**: `clode`
- **리소스 그룹**: `clode-llmops-rg`
- **위치**: East Asia
- **URL**: https://zealous-beach-0392df900.7.azurestaticapps.net
- **GitHub 레포**: https://github.com/clode-kim/build-your-resume (master 브랜치)
- **CI/CD**: `.github/workflows/azure-static-web-apps-zealous-beach-0392df900.yml`
- master 브랜치에 push하면 자동 배포됨

## 주요 파일 구조
```
src/
  types/resume.ts         # 모든 TypeScript 인터페이스 (Profile, Experience, Project, Skill, Education, Certification, Language, Training, ResumeData)
  hooks/useResume.ts      # localStorage CRUD 훅
  app/
    page.tsx              # 메인 페이지 (사이드바 8섹션 + 미리보기 패널 토글)
    layout.tsx            # title: "Resume", lang: "ko"
    globals.css           # Tailwind + print 스타일
  components/
    ResumePreview.tsx     # 읽기 전용 미리보기 패널
    sections/
      ProfileSection.tsx          # 기본 정보 (항상 폼 표시, 저장 버튼)
      ExperienceSection.tsx       # 경력
      ProjectSection.tsx          # 프로젝트 (GitHub 필드 없음)
      SkillSection.tsx            # 기술
      EducationSection.tsx        # 학력 (부전공, 학점 포함)
      CertificationSection.tsx    # 자격증 (인증코드 포함)
      LanguageSection.tsx         # 어학
      TrainingSection.tsx         # 교육수강
next.config.ts            # output: "export", trailingSlash: true, images: unoptimized
```

## UX 패턴
- 각 항목 카드: **뷰 모드** (흰 테두리) / **편집 모드** (인디고 테두리) 분리
- 새 항목은 자동으로 편집 모드로 시작
- 취소 시 draft 원복, 저장 시 뷰 모드 전환
- 프로필 사진: base64로 localStorage 저장

## Git 계정
- 이름: clode-kim
- 이메일: hello.clode@gmail.com
