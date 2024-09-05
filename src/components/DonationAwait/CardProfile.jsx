import React, { useState } from "react";
import styled from "@emotion/styled";
import BoxButton from "../BoxButton";
import { ReactComponent as CoverDonation } from "../../assets/img/cover_donation.svg";
import { ReactComponent as Credit } from "../../assets/img/credit.svg";
import DonationModal from "../Modal/DonationModal";
import { ToastModal } from "../Modal/ToastModal";

const CardWrapper = styled.div`
  width: 282px;
  margin: 0 10px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    width: auto;
  }

  @media (max-width: 744px) {
    margin: 0 8px 0 0;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: inherit;
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: inherit;
`;

const Overlay = styled(CoverDonation)`
  position: absolute;
  top: 0px;
  width: 150%;
  height: 105%;
`;

const StyledBoxButton = styled(BoxButton)`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;

  @media (max-width: 744px) {
    width: 128px;
    height: 32px;
    bottom: 5px; /* 하단에서 5px 위로 */
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 10px;
  text-align: left;
  color: var(--white);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;

  @media (max-width: 744px) {
    font-size: 14px;
    height: 33.6px; // 두 줄까지 보이게 함

    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2; // 두 줄까지 표시하고 나머지는 생략
  }
`;

const Subtitle = styled.h3`
  font-size: 16px;
  color: var(--gray-200);
  margin: 5px 0;

  @media (max-width: 744px) {
    font-size: 12px;
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: 10px;
  color: var(--white);
`;

const DonationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CreditIcon = styled(Credit)``;

const DonationDetails = styled.div`
  display: flex;
  align-items: center;
  color: var(--coralpink);
  font-size: 14px;
`;

const DonationAmount = styled.span`
  font-size: 12px;
  margin-left: 1px; /* 아이콘과 텍스트 사이의 간격 */
`;

const DaysLeft = styled.span`
  font-size: 12px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: var(--white); /* 배경 색 */
  border-radius: 5px; /* 둥근 모서리 */
  height: 1px; /* 프로그레스 바 높이 */
  margin: 5px 0;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.percentage}%; /* 진행률에 따라 동적으로 너비 설정 */
  background-color: var(--coralpink); /* 진행된 부분 색 */
  height: 100%;
`;

function CardProfile({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [isToastMoalOpen, setIsToastMoalOpen] = useState(false);

  const percentage = Math.min(
    (item.receivedDonations / item.targetDonation) * 100,
    100,
  ); // 진행률 계산

  const openModal = () => setIsModalOpen(true); // 모달 열기
  const closeModal = () => setIsModalOpen(false); // 모달 닫기

  return (
    <>
      <CardWrapper key={item.id}>
        <ImageWrapper>
          <CardImage src={item.idol.profilePicture} alt={item.idol.name} />
          <Overlay preserveAspectRatio="none" />
          <StyledBoxButton size="medium" onClick={openModal}>
            후원하기
          </StyledBoxButton>
        </ImageWrapper>
        <Content>
          <Subtitle>{item.subtitle}</Subtitle>
          <Title>{item.title}</Title>
        </Content>
        <Footer>
          <DonationInfo>
            <DonationDetails>
              <CreditIcon width="14px" height="14px" />
              <DonationAmount>
                {item.receivedDonations.toLocaleString()}
              </DonationAmount>
            </DonationDetails>
            <DaysLeft>
              {Math.ceil(
                (new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24),
              )}
              일 남음
            </DaysLeft>
          </DonationInfo>
          <ProgressBarContainer>
            <ProgressBar percentage={percentage} />
          </ProgressBarContainer>
        </Footer>
      </CardWrapper>
      <DonationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedItem={item}
        setIsToastMoalOpen={setIsToastMoalOpen}
      />
      {isToastMoalOpen && (
        <ToastModal
          isOpen={isToastMoalOpen}
          onClose={() => setIsToastMoalOpen(false)}
        >
          후원이 완료되었습니다!
        </ToastModal>
      )}
    </>
  );
}

export default CardProfile;
