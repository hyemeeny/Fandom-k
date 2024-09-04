import styled from "@emotion/styled";
import closedWindow from "../../assets/btn/close_window.svg";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

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
  text-align: center;
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

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalCloseButton onClick={onClose}>
            <CloseWindow src={closedWindow} alt="Close" />
          </ModalCloseButton>
          {children}
        </ModalContent>
      </motion.aside>
    </ModalOverlay>,
    document.body,
  );
};

export default Modal;
