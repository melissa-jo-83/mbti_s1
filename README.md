# 쓸데없는 초능력 연구소

12개의 실험으로 나만의 하찮고 특별한 초능력을 발견하는 코믹 성향테스트입니다. React 19, Vite 6, TypeScript, Tailwind CSS 4로 구현했습니다. 로그인·서버·API 키 없이 실행됩니다.

## 실행

Node.js 22 이상을 권장합니다.

```bash
npm ci
npm run dev
npm test
npm run build
```

Vite 개발 서버에서 16종 캐릭터와 테스트 기능을 볼 수 있습니다. `share/유형/` 정적 공유 페이지는 프로덕션 빌드 때 생성됩니다. 개발 중에는 `/?result=INTP`로 확인하세요.

## 구현 파일

- `src/app/App.tsx`: 홈, 12문항 검사, 분석, 결과, 16종 도감과 상태 복원
- `src/data/questions.ts`: 명세에 따른 12문항·48개 선택지
- `src/data/characters.ts`: 16종 캐릭터 콘텐츠·궁합·소개
- `src/lib/calculateResult.ts`: UI와 분리된 순수 판정 함수
- `src/lib/shareResult.ts`: Web Share 및 클립보드 어댑터. 카카오 SDK 연결은 이 모듈에서 확장
- `src/lib/exportImage.ts`: 로컬 한글 폰트 로딩 후 1080×1350 PNG를 생성·다운로드
- `src/components/CharacterVisual.tsx`: 캐릭터 에셋 경로 분리
- `public/characters/researchers.png`: 첨부 이미지를 바탕으로 정리한 16종 3D 캐릭터 아틀라스
- `src/data/characterVisuals.ts`: MBTI별 4×4 캐릭터 좌표 매핑. 홈·도감·결과·PNG 내보내기에서 공유
- `public/fonts/`: Pretendard Variable 및 SIL OFL 라이선스
- `src/styles/globals.css`: 반응형·접근성·모션 감소 스타일
- `scripts/postbuild.mjs`: 유형별 정적 공유 HTML 16개 및 1200×630 OG PNG 16개 생성
- `.github/workflows/pages.yml`: 신규 저장소용 GitHub Pages 자동 배포
- `vercel.json`: Vercel 정적 배포 설정

## 판정·상태·공유

Q1/5/9는 EI, Q2/6/10은 SN, Q3/7/11은 TF, Q4/8/12는 JP 지표입니다. 각 선택지는 한쪽에 1점만 부여하며, 3문항 다수결로 판정합니다. 전체 12개 응답을 검증한 뒤에만 결과를 계산합니다. 이전 답변은 누적하지 않고 교체합니다.

`sessionStorage`에 현재 화면, 질문 번호, 답변을 보관합니다. 새로고침과 이전 질문 수정이 가능하며, 브라우저 뒤로 가기는 `history`의 상태로 처리합니다. 브라우저 설정으로 저장소를 차단해도 테스트는 동작하지만 새로고침 복원은 보장되지 않습니다.

공유 URL `?result=INTP`는 정적 호스팅에서 새로고침해도 해당 결과가 열립니다. 공유 버튼은 OG가 포함된 `share/INTP/` 주소를 생성하며 방문자는 `?result=INTP`로 자동 이동합니다. 공유 URL에는 응답을 넣지 않으므로 다른 사람에게 개인 성향 비율을 보여주지 않습니다. 잘못된 유형은 안내와 함께 홈으로 돌아갑니다.

Web Share API를 지원하지 않으면 링크 복사를 사용합니다. 사용자가 공유 창을 취소하면 별도의 작업을 하지 않습니다. 클립보드는 HTTPS 보안 환경을 권장하며, 예외 발생 시 화면에 오류를 표시합니다. 카카오 전용 SDK는 연결하지 않았으며, 임의 키는 포함하지 않습니다.

모든 결과는 오락용이며, 비율은 응답 선택 비율입니다. 궁합 역시 세계관을 위한 창작 설정입니다. 개인정보·답변을 별도 서버로 전송하지 않습니다.

## GitHub Pages 배포

기존 `/mbti/` 저장소를 수정하지 마세요. 새 `useless-power-lab` 저장소를 만들고 이 소스를 `main` 브랜치에 올립니다. 저장소 Settings → Pages → Source를 **GitHub Actions**로 지정하면 포함된 워크플로가 테스트·빌드·배포를 수행합니다.

결과 주소: `https://계정.github.io/useless-power-lab/`

수동 빌드 예시:

```bash
VITE_BASE_PATH=/useless-power-lab/ VITE_SITE_URL=https://계정.github.io npm run build
```

Vite가 CSS 폰트·스크립트 경로를 하위 경로에 맞춰 처리하며 캐릭터는 `import.meta.env.BASE_URL`을 사용합니다. 정적 공유 페이지도 동일한 base를 사용합니다. 쿼리 기반 라우팅이므로 SPA용 404 우회 설정은 필요하지 않습니다. OG 미리보기 갱신 시간과 표시 여부는 각 SNS의 캐시 정책에 따릅니다.

## Vercel 배포

새 저장소를 Vercel에 Import하고 Vite 프리셋을 선택하세요. 빌드 `npm run build`, 출력 `dist`입니다. `VITE_BASE_PATH=/`, `VITE_SITE_URL=https://실제-프로덕션-도메인`을 설정한 뒤 배포합니다. 도메인을 변경하면 OG 절대주소를 위해 재빌드하세요. GitHub/Vercel 계정 연결과 실제 배포는 이 프로젝트에서 실행하지 않았습니다.

## Sites 배포

`.openai/hosting.json`의 정적 출력은 `dist`입니다. 현재 Sites 프로젝트는 별도로 생성했으며 기존 사이트를 덮어쓰지 않습니다. 신규 Sites는 기본 비공개입니다. 실제 공개 여부는 사이트의 접근 권한 설정을 따릅니다.

## 검증 결과와 한계

- Vitest: 점수·누락 방지·16유형 도달·답변 교체·파트너 참조·콘텐츠 길이 테스트
- jsdom: 12문항 전체 흐름·이전 답변 변경·새로고침 복원·공유 URL·잘못된 URL·복사·뒤로 가기 테스트
- TypeScript 검사 및 Vite 프로덕션 빌드
- `/useless-power-lab/` 하위 경로 빌드와 정적 파일 참조 검사
- 16종 캐릭터 매핑 및 OG PNG 실제 렌더링

이 환경에는 Sites에서 요구하는 브라우저 제어 도구(`cua_repl.js`)가 없어 실제 브라우저 QA를 수행하지 않았습니다. 따라서 360px에서의 실제 가로 스크롤, 키보드 포커스, 모바일 공유 시트, Canvas 다운로드 및 한글 폰트 표시, 실기기별 저장 UI는 수동 확인이 필요합니다. jsdom 테스트는 브라우저 렌더링 검증을 대체하지 않습니다. PNG 내보내기 코드는 실제 Blob을 생성한 뒤 다운로드하지만 실브라우저 저장까지 확인한 것으로 주장하지 않습니다.

공개 배포 전에는 모바일과 PC에서 검사 완주, 1080×1350 PNG 저장, 결과 링크 공유·새로고침을 확인하세요. 별도 서버·유료 서비스·카카오 앱 키는 필요하지 않습니다.
