import React from "react";
import styled from "@emotion/styled";
import BoxButton from "./BoxButton";
import errorimg from "../assets/img/error-img.svg";

function ErrorBox({ error }) {
  return (
    <ErrorContainer>
      <img src={errorimg} alt="에러이미지" />
      <ErrorMessage>{error}</ErrorMessage>
      <RefreshButton size="small" onClick={() => window.location.reload()}>
        새로고침
      </RefreshButton>
    </ErrorContainer>
  );
}
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 16px;
  background-color: #eee;
  color: #000;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 70px;

  img {
    max-width: 600px;
    margin-right: -30px;
  }
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const RefreshButton = styled(BoxButton)`
  margin: 0 auto;
  background: var(--black-100);
`;
export default ErrorBox;
