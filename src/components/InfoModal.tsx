import { createPortal } from "react-dom";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";

import useMountedState from "hooks/useMountedState";
import useDialog from "hooks/useDialog";

import InformationIconSrc from "svgs/information.svg";

const ANIMATION_DURATION = 300;

type DialogProps = {
  triggerClose: boolean;
};

const InfoModal = () => {
  const mounted = useMountedState();
  const { dialogRef, triggerClose, openDialog, closeDialog } = useDialog({
    dialogCloseAnimationDuration: ANIMATION_DURATION,
  });

  if (!mounted)
    return (
      <Wrapper>
        <Button type="button" onClick={openDialog}>
          <Image
            src={InformationIconSrc}
            width={17}
            height={17}
            alt="도움말"
            color="white"
          />
        </Button>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Button type="button" onClick={openDialog}>
        <Image
          src={InformationIconSrc}
          width={17}
          height={17}
          alt="도움말"
          color="white"
        />
      </Button>
      {createPortal(
        <Dialog ref={dialogRef} triggerClose={triggerClose}>
          <button className="close-button" type="button" onClick={closeDialog}>
            닫기
          </button>
          <strong>ℹ️ 참고사항</strong>
          <ul>
            <li>
              <code>테스트 데이터 입력</code> 버튼을 눌러 간단하게 시연해볼 수
              있습니다. 바로 해보세요!
            </li>
            <li>
              더 빠르고 풍부한 응답을 위해 Google Cloud Translate API를 활용,
              영문으로 번역 후 OpenAI API로 보내집니다. 이후 다시 응답을
              한국어로 번역합니다. 따라서 내용이 일부 불확실할 수 있습니다.
              (영문 번역 거치기 옵션은 거의 항상 켜주셔야 합니다.)
            </li>
          </ul>
          <strong>⚠️ 유의사항</strong>
          <ul>
            <li>MVP 버전으로, 불안정할 수 있습니다.</li>
            <li>
              지나친 사용이 계속된다면 배포가 중지될 수 있습니다. (OpenAI
              API에서 제공하는 무료 크레딧의 한계로 인한 것으로, 양해
              부탁드립니다 🥲) 조절을 위해 매 생성당 2분의 딜레이를 두었습니다.
            </li>
            <li>이력서의 내용이 지나치게 길면 응답이 거절될 수 있습니다.</li>
          </ul>
          <strong>☕ 개발자에게 커피 한 잔 사주기</strong>
          <p>
            <a href="https://www.buymeacoffee.com/shiwoo" target="_blank">
              "사줘" (링크)
            </a>
          </p>
        </Dialog>,
        document.querySelector("#modal-root") as HTMLDivElement,
      )}
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;
const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: teal;
  box-shadow: 0 0 10px 10px rgba(255, 255, 255, 0.5);

  transition: transform 0.2s ease;

  :hover {
    transform: scale(1.1);
  }
`;

const dialogKeyframes = keyframes`
  from {
    transform: translateY(-110%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const Dialog = styled.dialog<DialogProps>`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 2rem 2rem;

  width: 80%;

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;

    transition: color 0.1s ease;

    :hover {
      color: teal;
    }
  }

  strong {
    display: block;
    margin: 1rem 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
  }

  a {
    transition: all 0.2s ease;
    color: teal;
    display: inline-block;
    :hover {
      scale: 1.1;
    }
  }

  ul {
    list-style: disc;
    padding-left: 1rem;
    line-height: 1.5;
    li {
      margin: 0.8rem 0;

      code {
        display: inline-block;

        background-color: teal;
        border-radius: 5px;
        color: white;
        font-weight: 500;

        font-size: 0.8rem;
        padding: 0.1rem 0.3rem;
      }
    }
  }

  transition: all ${ANIMATION_DURATION}ms ease-in-out;
  opacity: 0;
  transform: translateY(-110%);

  &[open] {
    ${({ triggerClose }) =>
      !triggerClose &&
      css`
        opacity: 1;
        transform: none;
        animation: ${dialogKeyframes} ${ANIMATION_DURATION}ms ease-in-out;
      `}
  }
`;

export default InfoModal;
