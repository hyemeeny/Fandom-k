import styled from "@emotion/styled/macro";
import React, { useState, useEffect } from "react";
import { LeftArrowButton, RightArrowButton } from "../components/ArrowButton";
import BoxButton from "../components/BoxButton";
import addIcon from "../assets/icon/add_icon.svg";
import { getIdols } from "../api/idols";
import Avatar from "../components/Avatar";

const storedIds = JSON.parse(localStorage.getItem("addedIdols")) || [];
// const storedIdols = storedIds.map((id)) 받아온 데이터랑 사용.

export default function MyPage() {
  // storedIds 하나 , 선택돼서 저장된 아이돌 하나, 선택 상태인 아이돌들 하나
  const [selectedIdols, setSelectedIdols] = useState([]);
  const [addedIdols, setAddedIdols] = useState([]);
  const [idols, setIdols] = useState([]);
  const [cursor, setCursor] = useState(null);

  // 1. idols를 데이터로 받아아온다.

  // Idol 호출 함수
  const handleLoadIdols = async ({ option }) => {
    let result;
    try {
      result = await getIdols(option);
    } catch (e) {
      console.log(e);
      return;
    }

    const { list, nextCursor } = result;
    setIdols(list);
    setCursor(nextCursor);
  };

  useEffect(() => {
    handleLoadIdols({ cursor: 0, keyword: "" });
  }, []);
  // 2. 'selectedIodls' 에 로컬 스토리지에 저장되어있는지 확인
  // 3. 저장되어 있다면 ? -> 선택된, 저장이 안되어 있다면 ? -> 선택 가능한.
  // 4. 흠...

  function handleLeftClick() {
    console.log("click");
  }

  function handleRightClick() {
    console.log("click");
  }

  function handleSelect(id) {
    console.log(id);
    // 만약 이미 데이터가 저장된 상태면 빼버리기 기능 추가
    setSelectedIdols((prevList) => [...prevList, id]);
  }

  function handleAdd() {
    const newList = addedIdols.concat(selectedIdols);
    setAddedIdols(newList);
  }

  // 저장된것 분기처리
  return (
    <Container>
      <AddedWrapper>
        <Title> 내가 관심있는 아이돌</Title>
        <FavoriteWrapper>
          {idols.map((idol) => {
            if (addedIdols.includes(idol.id)) {
              return (
                <ProfileWrapper
                  key={idol.id}
                  onClick={() => handleSelect(idol.id)}
                >
                  <Avatar imageUrl={idol.profilePicture} />
                  <Name>{idol.name}</Name>
                  <Group>{idol.group}</Group>
                </ProfileWrapper>
              );
            }
          })}
        </FavoriteWrapper>
      </AddedWrapper>
      <AddWrapper>
        <Title>관심 있는 아이돌을 추가해보세요.</Title>
        <Slide>
          <ArrowWarpper direction="left">
            <LeftArrowButton onClick={handleLeftClick} />
          </ArrowWarpper>
          {idols.map((idol) => {
            if (selectedIdols.includes(idol.id)) {
              return (
                <ProfileWrapper
                  key={idol.id}
                  onClick={() => handleSelect(idol.id)}
                >
                  <Avatar imageUrl={idol.profilePicture} />
                  <Name>{idol.name}</Name>
                  <Group>{idol.group}</Group>
                </ProfileWrapper>
              );
            }
            return (
              <ProfileWrapper
                key={idol.id}
                onClick={() => handleSelect(idol.id)}
              >
                <Avatar imageUrl={idol.profilePicture} />
                <Name>{idol.name}</Name>
                <Group>{idol.group}</Group>
              </ProfileWrapper>
            );
          })}
          <ArrowWarpper direction="right">
            <RightArrowButton onClick={handleRightClick} />
          </ArrowWarpper>
        </Slide>
        <BoxButton
          size="medium"
          onClick={handleAdd}
          isRound={true}
          icon={addIcon}
        >
          추가하기
        </BoxButton>
      </AddWrapper>
    </Container>
  );
}

const AddedWrapper = styled.section``;

const AddWrapper = styled.section`
  width: 1200px;
  margin-top: 40px;
`;

const FavoriteWrapper = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  row-gap: 16px;
  gap: 16px;
  margin-top: 32px;
`;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: var(--white-darker);
`;

const Slide = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  position: relative;
  row-gap: 16px;
  gap: 16px;
  margin-top: 32px;
`;

const ArrowWarpper = styled.div`
  position: absolute;
  top: 40%;
  left: ${(props) => (props.direction === "left" ? "-4%" : "")};
  right: ${(props) => (props.direction === "right" ? "-4%" : "")};
`;

const ProfileWrapper = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
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
