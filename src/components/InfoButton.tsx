import styled from "@emotion/styled";
import Image from "next/image";
import { useCallback, useState } from "react";
import InformationIconSrc from "svgs/information.svg";
import InfoModal from "./InfoModal";

const InfoButton = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);

  return (
    <Wrapper>
      <Button type="button" onClick={toggleModal}>
        <Image
          src={InformationIconSrc}
          width={17}
          height={17}
          alt="도움말"
          color="white"
        />
      </Button>
      <InfoModal isOpened={showModal} toggleModal={toggleModal} />
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

export default InfoButton;
