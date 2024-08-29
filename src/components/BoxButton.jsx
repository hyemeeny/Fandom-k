/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ButtonWrapper = styled.button`
  width: ${(props) => props.size.width || "auto"};
  height: ${(props) => props.size.height || "auto"};
  background: linear-gradient(90deg, var(--coralpink) 0%, var(--hotpink) 100%);
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center; /* 아이콘과 텍스트를 수직으로 가운데 정렬 */
  justify-content: center; /* 아이콘과 텍스트를 수평으로 가운데 정렬 */

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px, inset 2px 2px 5px rgba(0, 0, 0, 0.3),
      inset -2px -2px 5px rgba(255, 255, 255, 0.1);
    transform: translateY(2px); /* 버튼이 눌린 것 같은 효과 */
  }

  img {
    margin-right: 4px;
    height: 20px; /* 아이콘 크기를 설정합니다 */
  }

  &:disabled {
    background: #828282; /* 비활성화 시 배경색 변경 */
    cursor: unset;
    box-shadow: none;
  }
  &:disabled:active {
    box-shadow: none;
    transform: none; /* :active 효과 막기 */
  }
`;

function BoxButton({ size, children, icon, disabled }) {
  const getSize = () => {
    switch (size) {
      case "small":
        return { width: "128px", height: "32px" };
      case "medium":
        return { width: "234px", height: "40px" };
      case "large":
        return { width: "477px", height: "48px" };
      case "modal":
        return { width: "295px", height: "42px" };
      default:
        return "auto";
    }
  };
  return (
    <ButtonWrapper size={getSize()} disabled={disabled}>
      {icon && <img src={icon} alt="icon" />}
      {children}
    </ButtonWrapper>
  );
}

BoxButton.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["small", "medium", "large", "modal"]),
    PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
    }),
  ]),
  children: PropTypes.node.isRequired,
  icon: PropTypes.string, // 아이콘 경로를 문자열로 받습니다.
  disabled: PropTypes.bool, // 버튼 비활성화를 위한 속성
};

BoxButton.defaultProps = {
  size: "medium",
};
export default BoxButton;
