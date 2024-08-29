/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const AvatarWrapper = styled.div`
  width: 100%; /* 부모 요소의 너비에 따라 너비가 결정됨 */
  aspect-ratio: 1 / 1; /* 1:1 비율로 높이를 너비와 동일하게 설정 */
  border-radius: 50%; /* 원형 모양 */
  overflow: hidden;
  border: 1.31px solid #f96868; /* 테두리 색상과 두께 */
  position: relative; /* 자식 요소의 절대 위치를 위해 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.img`
  width: 92%;
  height: 92%;
  border-radius: 50%;
  object-fit: cover;
`;
function Avatar({ imageUrl }) {
  return (
    <AvatarWrapper>
      <AvatarImage src={imageUrl} alt="Avatar" />
    </AvatarWrapper>
  );
}

Avatar.propTypes = {
  imageUrl: PropTypes.string.isRequired, // 이미지 URL을 문자열로 받습니다.
};

export default Avatar;
