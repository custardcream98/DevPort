import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpened: boolean;
  toggleModal: () => void;
};

const InfoModal = ({ isOpened, toggleModal }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (mounted) {
      return;
    }
    setMounted(true);
  }, [mounted]);

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    if (isOpened) {
      dialogRef.current.showModal();
    }
  }, [isOpened]);

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.addEventListener("close", toggleModal);

    return () => dialogRef.current?.removeEventListener("close", toggleModal);
  }, []);

  const handleCloseModal = () => {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.close();
  };

  return mounted ? (
    createPortal(
      <Dialog ref={dialogRef}>
        <button
          className="close-button"
          type="button"
          onClick={handleCloseModal}
        >
          닫기
        </button>
        <strong>⚠️ 유의사항</strong>
        <ul>
          <li>
            MVP 버전으로, 불안정할 수 있습니다. (영문 번역 거치기 옵션은 거의
            항상 켜주셔야 합니다.)
          </li>
          <li>
            지나친 사용이 계속된다면 배포가 중지될 수 있습니다. (OpenAI API에서
            제공하는 무료 크레딧의 한계로 인한 것으로, 양해 부탁드립니다 🥲)
            조절을 위해 매 생성당 1분의 딜레이를 두었습니다.
          </li>
          <li>
            더 빠르고 풍부한 응답을 위해 Google Cloud Translate API를 활용,
            영문으로 번역 후 ChatGPT로 보내집니다. 이후 다시 응답을 한국어로
            번역합니다. 따라서 내용이 일부 불확실할 수 있습니다.
          </li>
          <li>이력서의 내용이 지나치게 길면 응답이 거절될 수 있습니다.</li>
        </ul>
      </Dialog>,
      document.querySelector("#modal-root") as HTMLDivElement,
    )
  ) : (
    <></>
  );
};

const Dialog = styled.dialog`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 1rem 2rem;

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

  ul {
    list-style: disc;
    padding-left: 1rem;
    line-height: 1.3;
    li {
      margin: 0.8rem 0;
    }
  }
`;

export default InfoModal;
