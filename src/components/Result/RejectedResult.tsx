import StyledResultP from "./StyledResultP";

type Props = { message: string };

const RejectedResult = ({ message }: Props) => {
  return <StyledResultP>{message}</StyledResultP>;
};

export default RejectedResult;
