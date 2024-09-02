import styled from "@emotion/styled/macro";
import creditIcon from "../assets/icon/credit_icon.svg";
import { useEffect, useState } from "react";
import CreditRechargeModal from "./Modal/CreditRechargeModal";

const Credit = () => {
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [myCredit, setMyCredit] = useState();

  const handleOpenRechargeModal = () => {
    setIsRechargeModalOpen(true);
  };

  const handleCloseRechargeModal = () => {
    setIsRechargeModalOpen(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("credit");

    if (data) {
      setMyCredit(data);
    } else {
      setMyCredit(0);
    }
  }, []);

  return (
    <div>
      <CreditBoxDiv>
        <CreditWrap>
          <HeadText>내 크레딧</HeadText>
          <IconCreditWrap>
            <img src={creditIcon} />
            <CreditDiv>{myCredit}</CreditDiv>
          </IconCreditWrap>
        </CreditWrap>
        <ChargeButton onClick={handleOpenRechargeModal}>충전하기</ChargeButton>
      </CreditBoxDiv>
      <CreditRechargeModal
        isOpen={isRechargeModalOpen}
        onClose={handleCloseRechargeModal}
      />
    </div>
  );
};

const CreditBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px auto 40px;
  padding: 0 20px 0;
  width: 327px;
  height: 87px;
  border: 1px solid #f1eef9;
  border-radius: 8px;
  background-color: var(--black-200);

  @media (min-width: 768px) {
    width: 696px;
    height: 131px;
    margin: 17px auto 64px;
    padding: 0 64px 0;
  }

  @media (min-width: 1200px) {
    width: 1200px;
    margin: 70px auto 50px;
    padding: 0 78px 0;
  }
`;

const CreditWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    gap: 14.13px;
  }
`;

const HeadText = styled.h2`
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
  color: var(--gray-300);

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 19.09px;
  }
`;

const CreditDiv = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const ChargeButton = styled.button`
  font-weight: 700;
  font-size: 13px;
  line-height: 26px;
  background-color: var(--black-200);
  color: var(--coralpink);
  border: none;
  cursor: pointer;

  &:active {
    box-shadow: inset -2px -2px 5px var(--black-200);
    transform: translateY(2px); /* 버튼이 눌린 것 같은 효과 */
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const IconCreditWrap = styled.div`
  display: flex;
  gap: 4px;
`;

export default Credit;
