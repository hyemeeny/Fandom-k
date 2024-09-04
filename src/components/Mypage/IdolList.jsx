import React from "react";
import Avatar from "../Avatar";
import { ProfileWrapper, Name, Group } from "./CommonStyle";

export default function IdolList({
  currentIdols = [], // 기본값을 빈 배열로 설정
  selectedIdols,
  favoriteIdols,
  onSelect,
}) {
  const filteredIdols = currentIdols.filter(
    (idol) => !favoriteIdols.some((favIdol) => favIdol.id === idol.id),
  );

  return (
    <>
      {filteredIdols.map((idol) => {
        const isSelected = selectedIdols.includes(idol.id);

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
