import styled from "@emotion/styled";
import { forwardRef } from "react";

import AudienceSelect from "./AudienceSelect";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Saperator = styled.div`
  flex: 1;
`;

const ShouldTranslateCheckbox = forwardRef<HTMLInputElement, {}>(
  function ShouldTranslateCheckboxForwarded(_, ref) {
    return (
      <label>
        <input
          ref={ref}
          type="checkbox"
          name="translate"
          id="translate"
          defaultChecked
        />
        영문 번역 거치기
      </label>
    );
  },
);

const Button = styled.button`
  display: inline-block;
  background-color: teal;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  color: white;
  font-weight: 500;

  transition: background-color 0.1s ease-in-out;
  :hover {
    background-color: #007272;
  }
`;

const Toolbar = {
  Wrapper,
  Saperator,
  ShouldTranslateCheckbox,
  Button,
  AudienceSelect,
};

export default Toolbar;
