import styled from "@emotion/styled";
import { useRef, useState } from "react";

const testData = {
  introduce: `졸업작품 어플리케이션 개발에 매일 3시간만 자며 매달렸을 만큼 아무리 사소한 문제라도 시간이 얼마나 걸리든 꼭 해결해야 직성이 풀리는 성격입니다.

효율적인 워크플로우를 추구합니다.
SVG 파일을 반복적으로 import 해야 하는 상황에서 자동으로 코드를 생성하는 node script를 작성해 npm 명령어만으로 간단하게 해결할 수 있도록 했으며, 블로그의 썸네일을 자동으로 생성하는 API를 개발하는 등 반복적인 작업을 최소화하는 것을 좋아합니다.

더 좋은 커뮤니케이션 방법, 협력 방법을 항상 고민합니다.
졸업작품시 Git-flow 기반의 협업을 제안해 적용하고, 멋쟁이사자처럼 프론트엔드 스쿨의 회고조 조장, 스터디 장, 팀 프로젝트 팀장으로 활동하며 칭칭이(도움이 필요한 동료를 적극적으로 서포트하는 활동) 스터디, 팀 프로젝트 등을 이끈 바 있습니다.`,

  skills: `JavaScript,TypeScript,React.js,Next.js,Flutter,HTML,CSS,Sass,Tailwind`,

  experience: `- 학부생 연구원(2021.06 ~), 서울시립대학교 공간 데이터베이스 연구실에서`,

  projects: `(1)
- 프로젝트명: Snappy
- 팀 구성: 4인 팀프로젝트 - FE 4인, 기여도 40%
- 프로젝트 설명: 스냅 사진사와 이용자를 매칭하는 SNS 서비스입니다.
- 사용한 스택: React.js, JavaScript, styled-components
- 성과:
  a. Backend API 호출이 용이한 useAPI Custom Hook 개발
  a-1. 서버와의 비동기 통신시 사용되는 반복되는 패턴을 공통 훅으로 분리, State로서 응답과 에러를 헨들링할 수 있도록 개발
  a-2. API를 객체로 관리해 편리한 API 호출이 가능하게끔 설계
  b. 유연한 컴포넌트 설계를 위해 Compound Component 패턴 활용
  b-1. 로직은 Custom Hook 패턴으로 분리하는 등 유지보수가 용이한 컴포넌트 디자인
  c. JSDoc을 적극적으로 활용해 개발 경험 향상
  d. SVG 파일 import문을 자동으로 생성해주는 node script 작성
  e. 팀 리더로서 참여
  e-1. eslint, prettier, Live Share 등 다양한 툴을 활용해 코드 품질 향상 도모
  e-2. Git-flow 활용, issue, commit message, PR 컨벤션 확립 등의 방법으로 협업 효율화
(2)
- 프로젝트명: 기술 블로그
- 팀 구성: 개인 프로젝트
- 프로젝트 설명: 하나부터 열까지 직접 개발하는 기술 블로그입니다.
- 사용한 스택: Next.js, TypeScript, styled-components, Node.js, Firebase
- 성과:
  a. 빌드 후 바뀔 필요가 없는 점을 감안해, remark 를 활용 Markdown으로 작성한 포스팅을 정적 웹사이트로 빌드 (Static Site Generation)
  b. SEO를 고려한 시멘틱 웹 개발, Google 총 노출 수 2430회, 평균 게재순위 17.8위
  c. Express.js를 활용해 Thumbnail과 Open Graph Image 생성 자동화
  d. 블로그 내 게시물 검색용 엔드포인트 구현 및 debouncing 기법 활용해 API Call 최적화
(3)
- 프로젝트명: 착한 이륜차 운전자 평가 모델 개발용 설문 폼 개발
- 팀 구성: 개인 프로젝트 - 서울시립대학교 공간 데이터베이스 연구실 연구과제
- 프로젝트 설명: AHP 분석법에 기반해 사용자가 슬라이더를 움직이면 실시간으로 유효성을 검증하는 복잡한 로직의 웹 설문지를 개발했습니다.
- 사용한 스택: Next.js, TypeScript, Recoil, Cypress, Tailwind,
- 성과:
  a. Python으로 개발된 유효성 검증 로직을 TypeScript로 마이그레이션
  b. 비효율적인 로직 개선 및 리팩토링 병행
  c. 복잡한 로직의 동작 확인을 위해 Cypress 활용해 e2e 테스트 코드 작성
  d. 사용자가 슬라이더를 움직일 때마다 실시간 유효성 검증 구현을 위해 recoil 사용
  d-1. selector 를 활용해 검증 계산의 결과를 여러 컴포넌트에서 구독할 수 있도록 개발
  d-2. 모든 문제의 유효성이 통과되었는지 여부를 확인하고, 통과하지 못한 문제는 Global Navigation Bar에서 확인 가능하도록 상태관리 플로우 구축
  g. Backend 엔드포인트 명세 설계`,
};

export default function Home() {
  const [response, setResponse] = useState("");
  const shouldTranslateCheckboxRef = useRef<HTMLInputElement>(null);
  const audienceSelectRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");

    const data: Record<string, unknown> = {};
    new FormData(event.currentTarget).forEach(
      (value, key) => (data[key] = value),
    );
    console.log(data);

    setResponse("답변 생성중");

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          shouldTranslate: shouldTranslateCheckboxRef.current?.checked,
          audience: audienceSelectRef.current?.value,
        }),
      });

      const result: { response: string } = await response.json();
      console.log(result);

      setResponse(result.response);
    } catch (e) {
      console.error(e);
      setResponse("답변 생성 실패");
    }
  };

  const handleTestDataButton: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();

    const introduce = document.querySelector(
      "textarea[name=introduce]",
    ) as HTMLTextAreaElement;
    const skills = document.querySelector(
      "textarea[name=skills]",
    ) as HTMLTextAreaElement;
    const experience = document.querySelector(
      "textarea[name=experience]",
    ) as HTMLTextAreaElement;
    const projects = document.querySelector(
      "textarea[name=projects]",
    ) as HTMLTextAreaElement;

    introduce.value = testData.introduce;

    skills.value = testData.skills;

    experience.value = testData.experience;

    projects.value = testData.projects;

    if (!audienceSelectRef.current) {
      return;
    }
    audienceSelectRef.current.value = "Junior Frontend Developer";
  };

  return (
    <>
      <label>
        <input
          ref={shouldTranslateCheckboxRef}
          type="checkbox"
          name="translate"
          id="translate"
          defaultChecked
        />
        영문 번역 거치기
      </label>
      <StyledButton type="button" onClick={handleTestDataButton}>
        테스트 데이터 입력
      </StyledButton>
      <select name="audience" id="audience" ref={audienceSelectRef}>
        <option value="Junior Frontend Developer">프론트엔드 개발자</option>
        <option value="Junior Backend Developer">백엔드 개발자</option>
        <option value="Writer">작가</option>
        <option value="Designer">디자이너</option>
        <option value="Project Manager">프로젝트 매니저</option>
        <option value="Marketer">마케터</option>
        <option value="Korean Essay Teacher">국어논술 강사</option>
      </select>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="자기소개" name="introduce" />
        <textarea placeholder="기술" name="skills" />
        <textarea placeholder="경력" name="experience" />
        <textarea placeholder="프로젝트" name="projects" />
        <StyledButton>입력</StyledButton>
      </form>
      <StyledP>{response}</StyledP>
    </>
  );
}

const StyledP = styled.p`
  white-space: pre-wrap;
  line-height: 1.5;
`;
const StyledButton = styled.button`
  background-color: teal;
  margin: 0 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  color: white;
  font-weight: 500;

  cursor: pointer;
`;
