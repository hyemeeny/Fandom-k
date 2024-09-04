import React from "react";
import styled from "@emotion/styled";
import credit from "../../assets/img/credit.svg";
import BoxButton from "../BoxButton";
import Modal from "./BaseModal";

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

export function ToastModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreditShortageWarning>
        <img src={credit} alt="크레딧아이콘" />
        <p>{children}</p>
      </CreditShortageWarning>
      <BoxButton size="modal" onClick={onClose}>
        확인
      </BoxButton>
    </Modal>
  );
}
