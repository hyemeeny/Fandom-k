import React, { useState } from "react";
import SelectedButtonImg from "../../assets/btn/selected_button.svg";
import UnSelectedButtonImg from "../../assets/btn/unselected_button.svg";
import styled from "@emotion/styled";

//radio button과 group wrapping

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 300px;
  :hover {
    cursor: pointer;
  }

  background-color: red;
`;

const Radio = styled.input`
  // 기본 브라우저 스타일 제거
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  cursor: pointer;

  // 배경 이미지 관련 설정
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${(props) =>
    `url(${props.checked ? SelectedButtonImg : UnSelectedButtonImg})`};
`;

export default function RadioButton({
  children,
  value,
  name,
  id,
  checked,
  onChange,
}) {
  return (
    <RadioWrapper onClick={onChange}>
      {children}
      <Radio
        type="radio"
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        checked={checked}
      />
    </RadioWrapper>
  );
}
