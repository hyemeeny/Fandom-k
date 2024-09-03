import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { ReactComponent as Credit } from "../../assets/icon/credit_icon.svg";
import BoxButton from "../../components/BoxButton";
import { ReactComponent as close } from "../../assets/btn/close_window.svg";
import { toSponDonation } from "../../api/donations";
import { useCredit } from "../hooks/useLocalStorage";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--black-100);
  padding: 24px 16px 32px 16px;
  border-radius: 8px;
  max-width: 327px;
  width: 100%;
  color: var(--white);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const CloseButton = styled(close)``;

const Profile = styled.div`
  margin: auto;
`;

const ProfileImage = styled.img`
  width: 158px;
  border-radius: 8px;
`;

const Subtitle = styled.h3`
  font-size: 12px;
  color: var(--gray-200);
  text-align: left;
  width: 100%;
  margin: 12px 0 10px 0;
`;

const Title = styled.h2`
  font-size: 14px;
  margin-bottom: 16px;
  text-align: left;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  margin: 10px 0;
  border: 1px solid ${(props) => (props.isInvalid ? "red" : "var(--white)")};
  border-radius: 8px;
  background-color: #272f3d;
  color: var(--gray-300);
  font-size: 20px;
  font-weight: 700;

  /* number 스핀 버튼 제거 스타일 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 25px;
  right: 15px;
  pointer-events: none;
`;

const StyledBoxButton = styled(BoxButton)`
  width: 100%;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: center;
`;

function DonationModal({ isOpen, onClose, selectedItem }) {
  const [credit, setCredit] = useCredit(0);
  const [inputCredit, setInputCredit] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);

  // 입력된 크레딧이 유효하고 현재 크레딧보다 작으면 버튼 활성화
  useEffect(() => {
    const donationAmount = parseInt(inputCredit, 10);
    if (!inputCredit || donationAmount === 0) {
      setIsButtonDisabled(true);
      setIsInvalid(false); // 빈 값이나 0일 때는 경고 메시지가 뜨지 않음
    } else {
      setIsInvalid(donationAmount > credit || isNaN(donationAmount));
      setIsButtonDisabled(donationAmount > credit || isNaN(donationAmount));
    }
  }, [inputCredit, credit]);

  const handleDonate = async () => {
    // 입력된 크레딧이 유효한지 확인
    const donationAmount = parseInt(inputCredit, 10);
    if (donationAmount > 0 && donationAmount <= credit) {
      try {
        // API 호출하여 후원 진행
        await toSponDonation(selectedItem.id, { amount: donationAmount });

        // 후원이 성공하면 크레딧을 업데이트하고 모달을 닫음
        setCredit((prevCredit) => prevCredit - donationAmount);
        setInputCredit("");
        onClose();
        alert("후원이 완료되었습니다!");
        window.location.reload(); // 페이지 강제 새로고침
      } catch (error) {
        console.error("후원 중 오류가 발생했습니다:", error);
        alert("후원 중 문제가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  // 모달이 열려 있을 때 JSX 렌더링
  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>후원하기</ModalTitle>
          <CloseButton onClick={onClose} />
        </ModalHeader>
        <Profile>
          <ProfileImage
            src={selectedItem.idol.profilePicture}
            alt={selectedItem.idol.name}
          />
          <Subtitle>{selectedItem.subtitle}</Subtitle>
          <Title>{selectedItem.title}</Title>
        </Profile>
        <InputWrapper>
          <Input
            type="number"
            placeholder="크레딧 입력"
            value={inputCredit}
            onChange={(e) => setInputCredit(e.target.value)}
            min="0"
            isInvalid={isInvalid}
          />
          <IconWrapper>
            <Credit />
          </IconWrapper>
          {isInvalid && (
            <ErrorMessage>
              갖고 있는 크레딧보다 더 많이 후원할 수 없어요
            </ErrorMessage>
          )}
        </InputWrapper>
        <StyledBoxButton onClick={handleDonate} disabled={isButtonDisabled}>
          후원하기
        </StyledBoxButton>
      </ModalContent>
    </ModalOverlay>,
    document.body,
  );
}

export default DonationModal;
