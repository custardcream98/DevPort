import styled from "@emotion/styled";

const Footer = () => {
  return (
    <StyledFooter>
      <small>&copy; 2023 custardcream98. All rights reserved.</small>
      <address>
        <ul className="address-list">
          <li>
            <a href="https://github.com/custardcream98" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a href="https://custardcream.vercel.app/" target="_blank">
              Blog
            </a>
          </li>
          <li>
            <a href="mailto:custardcream@kakao.com" target="_blank">
              Email
            </a>
          </li>
        </ul>
      </address>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  text-align: center;
  color: #707070;

  .address-list {
    display: flex;
    justify-content: center;
    gap: 0.7rem;

    margin: 0.5rem;

    a {
      transition: all 0.2s ease-in-out;
    }
    a:hover {
      color: #009753;
    }
  }
`;

export default Footer;
