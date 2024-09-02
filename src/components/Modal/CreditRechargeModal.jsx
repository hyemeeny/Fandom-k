import React, { useState } from "react";
import styled from "@emotion/styled";
import closedWindow from "../../assets/btn/close_window.svg";
import RadioButton from "../RadioButton/RadioButton";
import icon from "../../assets/icon/white_credit_icon.svg";
import credit from "../../assets/img/credit.svg";
import BoxButton from "../BoxButton";

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
  color: #f7f7f8;
  background-color: #181d26;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalLabel = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-align: left;
  padding-bottom: 24px;
`;

const CloseWindow = styled.img`
  width: 24px;
  height: 24px;
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
`;

function CreditRechargeModal({ isOpen, onClose }) {
  const [selectedCredit, setSelectedCredit] = useState(100);

  const creditOptions = [100, 500, 1000, 2000, 9000000]; // 배열에 숫자를 넣으면 많은 값도 충전 가능

  return (
    <div style={{ textAlign: "center" }}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalLabel>크레딧 충전하기</ModalLabel>
        {creditOptions.map((value) => (
          <CreditOption
            key={value}
            value={value}
            selectedCredit={selectedCredit}
            onCreditChange={setSelectedCredit}
          />
        ))}
        <div>선택된 금액: {selectedCredit} 크레딧</div>
        <BoxButton size="modal" icon={icon}>
          충전하기
        </BoxButton>
      </Modal>
    </div>
  );
}

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>
          <CloseWindow src={closedWindow} alt="Close" />
        </ModalCloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

const CreditOption = ({ value, selectedCredit, onCreditChange }) => (
  <CreditValueWrapper
    checked={selectedCredit === value}
    onClick={() => onCreditChange(value)}
  >
    <img src={credit} alt="크레딧" />
    <RadioButton
      value={value}
      name="credit"
      id={`credit-${value}`}
      checked={selectedCredit === value}
      onChange={() => onCreditChange(value)}
    >
      {value}
    </RadioButton>
  </CreditValueWrapper>
);

export default CreditRechargeModal;
