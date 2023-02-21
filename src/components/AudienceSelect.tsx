import styled from "@emotion/styled";
import { forwardRef } from "react";

const AudienceSelect = forwardRef<HTMLSelectElement>((_, ref) => {
  return (
    <Select name="audience" id="audience" ref={ref}>
      <option value="Junior Frontend Developer">프론트엔드 개발자</option>
      <option value="Junior Backend Developer">백엔드 개발자</option>
      <option value="Writer">작가</option>
      <option value="Designer">디자이너</option>
      <option value="Project Manager">프로젝트 매니저</option>
      <option value="Marketer">마케터</option>
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
