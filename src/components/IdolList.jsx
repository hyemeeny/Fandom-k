import React from "react";
import Avatar from "../components/Avatar";
import styled from "@emotion/styled/macro";

export default function IdolList({
  currentIdols = [], // 기본값을 빈 배열로 설정
  selectedIdols,
  favoriteIdols,
  onSelect,
}) {
  return (
    <>
      {currentIdols.map((idol) => {
        const isSelected =
          selectedIdols.includes(idol.id) && !favoriteIdols.includes(idol.id);
        return (
          <ProfileWrapper key={idol.id} onClick={() => onSelect(idol.id)}>
            <Avatar imageUrl={idol.profilePicture} isSelected={isSelected} />
            <Name>{idol.name}</Name>
            <Group>{idol.group}</Group>
          </ProfileWrapper>
        );
      })}
    </>
  );
}

const ProfileWrapper = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 9999;
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: white;
  padding: 8px;
`;

const Group = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #ffffff99;
`;
