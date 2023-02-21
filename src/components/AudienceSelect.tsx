import styled from "@emotion/styled";
import { forwardRef } from "react";

const AudienceSelect = forwardRef<HTMLSelectElement>((_, ref) => {
  return (
    <Select name="audience" id="audience" ref={ref}>
      <option value="Frontend Developer">프론트엔드 개발자</option>
      <option value="Backend Developer">백엔드 개발자</option>
      <option value="Writer">작가</option>
      <option value="Designer">디자이너</option>
      <option value="Project Manager">프로젝트 매니저</option>
      <option value="Marketer">마케터</option>
      <option value="Software Engineer">소프트웨어 엔지니어</option>
      <option value="Data Analyst">데이터 분석가</option>
      <option value="Marketing Manager">마케팅 매니저</option>
      <option value="Sales">영업 대표</option>
      <option value="UX Designer">사용자 경험 디자이너(UX Designer)</option>
      <option value="UI Designer">
        사용자 인터페이스 디자이너(UI Designer)
      </option>
      <option value="Graphic Designer">그래픽 디자이너</option>
      <option value="Content Writer">콘텐츠 작가</option>
      <option value="Social Media Manager">소셜 미디어 매니저</option>
      <option value="Human Resources Manager">인사 매니저</option>
      <option value="Accountant">회계사</option>
      <option value="Lawyer">변호사</option>
      <option value="Doctor">의사</option>
      <option value="Nurse">간호사</option>
      <option value="Teacher">교사</option>
      <option value="Korean Essay Teacher">국어논술 강사</option>
    </Select>
  );
});

const Select = styled.select`
  padding: 0.2rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
`;

export default AudienceSelect;
