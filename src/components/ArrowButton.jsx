/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import slideLeft from "../assets/btn/slide_left.svg";
import slideRight from "../assets/btn/slide_right.svg";

const Button = styled.button`
  background: none;
  border: none;
  border-radius: 6.67px;
  padding: 0;
  cursor: pointer;

  // 버튼이 이미지로 동작하도록 이미지 크기를 버튼 크기로 설정
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &:focus {
    outline: none; // 포커스 시 생기는 기본 윤곽선 제거
  }
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
`;

export function LeftArrowButton({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      <img src={slideLeft} alt="왼쪽 슬라이드 버튼" />
    </Button>
  );
}

export function RightArrowButton({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      <img src={slideRight} alt="오른쪽 슬라이드 버튼" />
    </Button>
  );
}
