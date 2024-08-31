import React, { useState } from "react";
import styled from "@emotion/styled";
import closedWindow from "../../assets/btn/close_window.svg";
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

const CloseWindow = styled.img`
  width: 24px;
  height: 24px;
`;

const CreditShortageWarning = styled.div`
  img {
    width: 113px;
  }
  span {
    color: var(--coralpink);
  }
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  padding-bottom: 20px;
`;

function CreditShortageModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleOpenModal}>크레딧 부족</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreditShortageWarning>
          <img src={credit} alt="크레딧아이콘" />
          <p>
            앗! 투표하기 위한 <span>크레딧</span>이 부족해요
          </p>
        </CreditShortageWarning>
        <BoxButton size="modal" onClick={handleCloseModal}>
          확인
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

export default CreditShortageModal;
