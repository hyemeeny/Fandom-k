import React from "react";
import deleteIcon from "../assets/icon/delete_icon.svg";
import styled from "@emotion/styled/macro";
import Avatar from "./Avatar";

export default function FavoriteIdolList({ idols, onDelete }) {
  return (
    <FavoriteWrapper>
      {idols?.map((idol) => (
        <ProfileWrapper key={idol.id}>
          <DeleteButton onClick={() => onDelete(idol.id)} src={deleteIcon} />
          <Avatar imageUrl={idol.profilePicture} />
          <Name>{idol.name}</Name>
          <Group>{idol.group}</Group>
        </ProfileWrapper>
      ))}
    </FavoriteWrapper>
  );
}

const FavoriteWrapper = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  row-gap: 16px;
  gap: 16px;
  margin-top: 32px;
`;

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

const DeleteButton = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 3px;
  z-index: 1;
`;
