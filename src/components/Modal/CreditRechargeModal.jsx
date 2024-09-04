import React, { useState } from "react";
import styled from "@emotion/styled";
import RadioButton from "../RadioButton/RadioButton";
import icon from "../../assets/icon/white_credit_icon.svg";
import credit from "../../assets/img/credit.svg";
import BoxButton from "../BoxButton";
import { useCredit } from "../../hooks/useLocalStorage";
import Modal from "./BaseModal";

const ModalLabel = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-align: left;
  padding-bottom: 24px;
`;

const CreditValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #02000e;
  border: 1px solid ${(props) => (props.checked ? "#f96d69" : "#7d7d7d")};
  width: 295px;
  height: 62px;
  gap: 0px;
  margin-bottom: 8px;
  padding: 0px 10px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => (props.checked ? "#f7f7f8" : "#7d7d7d")};
  cursor: pointer;

  img {
    width: 20px;
  }
  div {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const CreditsWrapper = styled.div`
  padding-bottom: 20px;
`;

function CreditRechargeModal({ isOpen, onClose }) {
  const [selectedCredit, setSelectedCredit] = useState(100);
  const [credit, setCredit] = useCredit();

  const creditOptions = [100, 500, 1000, 2000, 9000000]; // 배열에 숫자를 넣으면 많은 값도 충전 가능
  const handleRecharge = () => {
    setCredit(credit + selectedCredit); // 선택된 크레딧 값을 현재 크레딧에 더하여 저장
    onClose(); // 모달 닫기
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalLabel>크레딧 충전하기</ModalLabel>
        <CreditsWrapper>
          {creditOptions.map((value) => (
            <CreditOption
              key={value}
              value={value}
              selectedCredit={selectedCredit}
              onCreditChange={setSelectedCredit}
            />
          ))}
        </CreditsWrapper>

        <BoxButton size="modal" icon={icon} onClick={handleRecharge}>
          충전하기
        </BoxButton>
      </Modal>
    </div>
  );
}

const CreditOption = ({ value, selectedCredit, onCreditChange }) => (
  <CreditValueWrapper
    checked={selectedCredit === value}
    onClick={() => onCreditChange(value)}
  >
    <RadioButton
      value={value}
      name="credit"
      id={`credit-${value}`}
      checked={selectedCredit === value}
      onChange={() => onCreditChange(value)}
    >
      <div>
        <img src={credit} alt="크레딧" />
        {value}
      </div>
    </RadioButton>
  </CreditValueWrapper>
);

export default CreditRechargeModal;
