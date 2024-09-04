import React from "react";
import Avatar from "../Avatar";
import { ProfileWrapper, Name, Group } from "./CommonStyle";

export default function IdolList({
  currentIdols = [], // 기본값을 빈 배열로 설정
  selectedIdols,
  favoriteIdols,
  onSelect,
}) {
  return (
    <>
      {currentIdols.map((idol) => {
        const isSelected = selectedIdols.includes(idol.id);
        const isFavorite = favoriteIdols.some(
          (favIdol) => favIdol.id === idol.id,
        );

        return (
          <ProfileWrapper key={idol.id} onClick={() => onSelect(idol.id)}>
            <Avatar
              imageUrl={idol.profilePicture}
              isSelected={isSelected}
              isFavorite={isFavorite}
            />
            <Name>{idol.name}</Name>
            <Group>{idol.group}</Group>
          </ProfileWrapper>
        );
      })}
    </>
  );
}
