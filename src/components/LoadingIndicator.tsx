import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const LoadingIndicator = () => <StyledLoadingIndicator />;

const dualRingKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoadingIndicator = styled.div`
  margin: 20px auto;
  border-radius: 50%;

  transform: translate(-50%, -50%);
  animation: ${dualRingKeyframes} 1.2s linear infinite;

  width: 25px;
  height: 25px;
  border: 3px solid;
  border-color: #ccc transparent #ccc transparent;
`;

export default LoadingIndicator;
