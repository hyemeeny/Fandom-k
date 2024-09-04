/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import emptyicon from "../assets/icon/empty_icon.png";

import checkIcon from "../assets/icon/check_icon.svg";

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

  background: linear-gradient(
    45deg,
    rgba(249, 109, 105, 0.5),
    /* coralpink */ rgba(254, 84, 147, 0.5) /* hotpink */
  );
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 4%;
  left: 4%;
  width: 92%;
  height: 92%;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    rgba(249, 109, 105, 0.5),
    /* coralpink */ rgba(254, 84, 147, 0.5) /* hotpink */
  );
  opacity: ${(props) => (props.isSelected ? 0.5 : 0)};
  pointer-events: none;
  z-index: 2;
`;
const SelectedImage = styled.img`
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

function Avatar({ imageUrl, isSelected }) {
  const displayImageUrl =
    imageUrl === "https://example.com/profile.jpg" ? emptyicon : imageUrl;

  return (
    <AvatarWrapper>
      <AvatarImage src={displayImageUrl} alt="Avatar" isSelected={isSelected} />
      {isSelected && (
        <>
          <GradientOverlay isSelected={isSelected} />
          <SelectedImage src={checkIcon} alt="Selected Icon" />
        </>
      )}
    </AvatarWrapper>
  );
}

Avatar.propTypes = {
  imageUrl: PropTypes.string.isRequired, // 이미지 URL을 문자열로 받습니다.
};

export default Avatar;
