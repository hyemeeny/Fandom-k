import React, { useState } from "react";
import SelectdButtonImg from "../assets/btn/selected_button.svg";
import UnSelectedButtonImg from "../assets/btn/unselected_button.svg";
import styled from "@emotion/styled";

//radio button과 group wrapping

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Radio = styled.input`
  // 기본 브라우저 스타일 제거
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default function RadioButton({ onClick, children }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <RadioWrapper>
      <Radio onClick={handleClick}>
        {isSelected ? (
          <img src={SelectdButtonImg} alt="선택 버튼" />
        ) : (
          <img src={UnSelectedButtonImg} alt="선택 버튼" />
        )}
      </Radio>
    </RadioWrapper>
  );
}
