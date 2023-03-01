import styled from "@emotion/styled";
import LoadingIndicator from "components/LoadingIndicator";

type Props = { message: string };

const LoadingResult = ({ message }: Props) => {
  return (
    <>
      <LoadingIndicator />
      <StyledLoadingP>{message}</StyledLoadingP>
    </>
  );
};

const StyledLoadingP = styled.p`
  margin: 1rem 0 2rem;
  text-align: center;

  color: #9b9b9b;

  font-weight: 500;
`;

export default LoadingResult;
