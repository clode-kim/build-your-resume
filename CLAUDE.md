@AGENTS.md

# 프로젝트 현황

## 앱 개요
- **이름**: Resume
- **목적**: 개인 이력서 빌더 (프로필, 경력, 프로젝트, 기술, 학력, 자격증, 어학, 교육수강 관리)
- **언어**: 한국어 UI

## 기술 스택
- Next.js 16 (App Router, `"use client"`, static export `output: "export"`)
- Tailwind CSS v4
- TypeScript
- 데이터 저장: **Cosmos DB** (Azure Functions API 경유, 기기 간 동기화)
- UUID (`uuid` 패키지)

## 인프라 구조

```
브라우저 (SWA CDN 서빙)
  │  fetch('/api/resumes')
  ▼
Azure Static Web Apps (clode, East Asia, Free 티어)
  ├─ 정적 파일 (Next.js out/)
  └─ /api/* → Azure Functions (api/ 폴더, SWA Managed)
                  │
                  ▼
              Cosmos DB (clode-cosmos, serverless)
              └─ resume-db / resumes (파티션 키: /userId)
```

## 배포
- **플랫폼**: Azure Static Web Apps
- **리소스 이름**: `clode`
- **리소스 그룹**: `clode-llmops-rg`
- **위치**: East Asia (홍콩)
- **URL**: https://zealous-beach-0392df900.7.azurestaticapps.net
- **GitHub 레포**: https://github.com/clode-kim/build-your-resume (master 브랜치)
- **CI/CD**: `.github/workflows/azure-static-web-apps-zealous-beach-0392df900.yml`
- master 브랜치 push → GitHub Actions → `npm run build` → `out/` + `api/` 자동 배포

## 인증
- SWA 빌트인 GitHub 소셜 로그인
- `/login` → `/.auth/login/github`, `/logout` → `/.auth/logout`
- `/api/*` 라우트는 authenticated 롤 필요 (미인증 시 `/login` 리다이렉트)
- `x-ms-client-principal` 헤더에서 userId 추출 → 본인 데이터만 접근 가능
- Google 로그인은 미구현 (Google OAuth 앱 등록 필요, 나중에 추가 가능)

## Azure Functions API (`api/`)
- `POST   /api/resumes`       — 이력서 생성·갱신 (upsert, id 없으면 UUID 신규 생성)
- `GET    /api/resumes`       — 본인 이력서 목록 (id, updatedAt)
- `GET    /api/resumes/{id}`  — 단건 조회 (userId 소유권 검증)
- `DELETE /api/resumes/{id}`  — 삭제 (userId 소유권 검증)
- Functions v4 Node.js 프로그래밍 모델, TypeScript
- `COSMOS_CONNECTION_STRING` 환경변수로 Cosmos 연결 (SWA 앱 설정에 등록됨)

## 주요 파일 구조
```
src/
  types/resume.ts              # TS 인터페이스 (Profile, Experience, Project, Skill,
                               #   Education, Certification, Language, Training, ResumeData)
  hooks/
    useResume.ts               # API CRUD 훅 (GET 목록→단건 로드, POST 500ms 디바운스 저장)
    useAuth.ts                 # /.auth/me 기반 인증 상태 훅
  app/
    page.tsx                   # 메인 페이지 (로그인 화면 / 사이드바 8섹션 + 미리보기)
    layout.tsx                 # title: "Resume", lang: "ko"
    globals.css                # Tailwind + @media print
  components/
    ResumePreview.tsx          # 읽기 전용 미리보기 패널
    sections/
      ProfileSection.tsx       # 기본 정보 (항상 폼, 저장 버튼)
      ExperienceSection.tsx
      ProjectSection.tsx       # GitHub 필드 없음
      SkillSection.tsx
      EducationSection.tsx     # 부전공, 학점 포함
      CertificationSection.tsx # 인증코드 포함
      LanguageSection.tsx
      TrainingSection.tsx
api/
  package.json                 # @azure/functions, @azure/cosmos, uuid
  host.json                    # extensionBundle 4.x
  tsconfig.json                # commonjs, ES2019
  src/functions/resume.ts      # CRUD 4종 Functions
staticwebapp.config.json       # 라우팅 + 401 리다이렉트
next.config.ts                 # output: "export", trailingSlash, images unoptimized
tsconfig.json                  # exclude: ["node_modules", "api"]
```

## UX 패턴
- 각 항목 카드: **뷰 모드** (흰 테두리) / **편집 모드** (인디고 테두리) 분리
- 새 항목은 자동으로 편집 모드로 시작
- 취소 시 draft 원복, 저장 시 뷰 모드 전환
- 프로필 사진: base64 data URL로 Cosmos DB에 저장

## Terraform IaC (`infra/`)
```
infra/
  bootstrap/main.tf            # Terraform state용 Storage Account (1회 apply)
  versions.tf                  # provider 버전 핀 참고용
  modules/
    cosmosdb/                  # Cosmos 계정+DB+컨테이너, 멀티리전·AZ 토글
    static-web-app/            # SWA, SKU 변수화, app_settings 주입
  environments/prod/
    main.tf                    # 모듈 조립 + 기존 리소스 import 명령어 주석
    variables.tf
    terraform.tfvars           # enable_multi_region=false, enable_zone_redundancy=false
    backend.tf                 # azurerm backend (bootstrap 후 storage_account_name 입력)
```
- Terraform 아직 apply 안 함 (리소스는 az CLI로 수동 생성된 상태)
- `environments/prod/main.tf` 하단 주석에 기존 리소스 import 명령어 있음
- `backend.tf`의 `storage_account_name`은 bootstrap apply 후 교체 필요

## Git 계정
- 이름: clode-kim
- 이메일: hello.clode@gmail.com
