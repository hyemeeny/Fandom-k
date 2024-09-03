import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ReactComponent as Credit } from "../../assets/icon/credit_icon.svg";
import BoxButton from "../../components/BoxButton";
import { toSponDonation } from "../../api/donations";
import { useCredit } from "../../hooks/useLocalStorage";
import Modal from "./BaseModal";

const ModalLabel = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-align: left;
  padding-bottom: 24px;
`;

const Profile = styled.div`
  position: relative;
  margin: 0 auto;
  height: 230px;
`;
const ProfielWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 158px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
`;

const Subtitle = styled.h3`
  font-size: 12px;
  color: var(--gray-200);
  text-align: left;
  margin: 12px 0 10px 0;
`;

const Title = styled.h2`
  font-size: 14px;
  margin-bottom: 16px;
  text-align: left;
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

function DonationModal({ isOpen, onClose, selectedItem, setIsToastMoalOpen }) {
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
        setIsToastMoalOpen(true);
        // window.location.reload(); // 페이지 강제 새로고침
      } catch (error) {
        console.error("후원 중 오류가 발생했습니다:", error);
        alert("후원 중 문제가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  // 모달이 열려 있을 때 JSX 렌더링
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalLabel>후원하기</ModalLabel>
      <Profile>
        <ProfielWrap>
          <ProfileImage
            src={selectedItem.idol.profilePicture}
            alt={selectedItem.idol.name}
          />
          <Subtitle>{selectedItem.subtitle}</Subtitle>
          <Title>{selectedItem.title}</Title>
        </ProfielWrap>
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
    </Modal>
  );
}

export default DonationModal;
