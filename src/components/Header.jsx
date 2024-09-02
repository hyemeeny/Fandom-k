import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import LogoImg from "../assets/img/logo.svg";
import UserImg from "../assets/img/userIcon.svg";

const Header = () => {
  return (
    <>
      <HeaderStyle>
        <Container>
          <LogoWrap>
            <Link to="/">
              <Logo src={LogoImg} alt="FAMDOM-K" />
            </Link>
          </LogoWrap>
          <Link to="/myPage">
            <User src={UserImg} alt="프로필 이미지" />
          </Link>
        </Container>
      </HeaderStyle>
      <Outlet />
    </>
  );
};

export default Header;

const HeaderStyle = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--black-200);
  z-index: 1000;

  @media (max-width: 744px) {
    height: 44px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
    padding: 0 24px;
  }
`;

const LogoWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-right: -32px;
`;

const Logo = styled.img`
  width: 167px;
  @media (max-width: 744px) {
    width: 120px;
  }
  @media (max-width: 744px) {
    width: 108px;
  }
`;

const User = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
