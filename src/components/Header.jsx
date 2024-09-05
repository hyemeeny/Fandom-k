import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import LogoImg from "../assets/img/logo.svg";
import UserImg from "../assets/img/userIcon.svg";
import { useCredit } from "../hooks/useLocalStorage";
import { ReactComponent as CreditIcon } from "../assets/icon/credit_icon.svg";
import CreditRechargeModal from "../components/Modal/CreditRechargeModal";
import AudioControlButton from "../components/AudioControlButton";

const Header = () => {
  const [credit] = useCredit(0); // 현재 크레딧을 가져옴
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [isCreditVisible, setIsCreditVisible] = useState(true); // Credit 가시성 상태 관리
  const creditRef = useRef(null); // Credit 컴포넌트의 참조값을 저장할 Ref

  const openModal = () => setIsModalOpen(true); // 모달 열기
  const closeModal = () => setIsModalOpen(false); // 모달 닫기

  useEffect(() => {
    const handleScroll = () => {
      if (creditRef.current) {
        const rect = creditRef.current.getBoundingClientRect();
        const isVisible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth;
        setIsCreditVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HeaderStyle>
        <Container>
          <AudioControlButton />
          <LogoWrap>
            <Link to="/">
              <Logo src={LogoImg} alt="FAMDOM-K" />
            </Link>
          </LogoWrap>
          {!isCreditVisible && (
            <CreditWrap onClick={openModal}>
              <CreditIcon />
              <CreditText>{credit}</CreditText>
            </CreditWrap>
          )}
          <Link to="/myPage">
            <User src={UserImg} alt="프로필 이미지" />
          </Link>
        </Container>
      </HeaderStyle>
      <div ref={creditRef} /> {/* Credit 컴포넌트 위치 추적용 */}
      <CreditRechargeModal isOpen={isModalOpen} onClose={closeModal} />
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
  position: relative;
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

const CreditWrap = styled.div`
  position: absolute; /* 다른 요소에 영향을 주지 않도록 절대 위치로 설정 */
  right: 65px; /* 오른쪽 여백 설정 */
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const CreditText = styled.span`
  color: var(--white);
  font-size: 16px;
  font-weight: 700;

  @media (max-width: 744px) {
    font-size: 12px;
  }
`;
