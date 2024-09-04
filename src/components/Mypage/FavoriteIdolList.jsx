import React from "react";
import deleteIcon from "../../assets/icon/delete_icon.svg";
import styled from "@emotion/styled/macro";
import Avatar from "../Avatar";
import { ProfileWrapper, Name, Group } from "./CommonStyle";

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
  row-gap: 16px;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 1024px) {
    width: 524px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    width: 328px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DeleteButton = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 3px;
  z-index: 1;
`;
