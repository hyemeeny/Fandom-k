import styled from "@emotion/styled/macro";
import React, { useState, useEffect } from "react";
import { LeftArrowButton, RightArrowButton } from "../components/ArrowButton";
import BoxButton from "../components/BoxButton";
import addIcon from "../assets/icon/add_icon.svg";
import deleteIcon from "../assets/icon/delete_icon.svg";
import { getIdols } from "../api/idols";
import Avatar from "../components/Avatar";

const storedIds = JSON.parse(localStorage.getItem("addedIdols")) || [];

export default function MyPage() {
  const [addedIdols, setAddedIdols] = useState(storedIds); // 관심있는 아이돌
  const [selectedIdols, setSelectedIdols] = useState([]); // 추가 전 선택된 아이돌
  const [idols, setIdols] = useState([]);
  const [cursor, setCursor] = useState(0);

  // size에 따라 다르게  Iodls 불러오기
  // Left, Right Click 시 전환 (리액트 - 슬릭 사용 ?)
  //
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
    handleLoadIdols({ cursor, keyword: "", pageSize: 10 });
  }, []);

  function handlePrev() {}
  function handleNext() {}

  function handleSelect(id) {
    if (selectedIdols.includes(id)) {
      setSelectedIdols((prevList) => prevList.filter((item) => item !== id));
      return;
    }
    setSelectedIdols((prevList) => [...prevList, id]);
  }

  function handleAdd() {
    const newList = addedIdols.concat(selectedIdols);
    setAddedIdols(newList);
    setSelectedIdols([]);
    localStorage.setItem("addedIdols", JSON.stringify(newList));
  }

  function handleDelete(id) {
    if (addedIdols.includes(id)) {
      const newList = addedIdols.filter((idol) => idol !== id);
      // setAddedIdols((prevList) => prevList.filter((item) => item !== id));
      setAddedIdols(newList);
      localStorage.setItem("addedIdols", JSON.stringify(newList));
    }
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
                <ProfileWrapper key={idol.id}>
                  <DeleteButton
                    onClick={() => handleDelete(idol.id)}
                    src={deleteIcon}
                  />
                  <Avatar imageUrl={idol.profilePicture} />
                  <Name>{idol.name}</Name>
                  <Group>{idol.group}</Group>
                </ProfileWrapper>
              );
            }
          })}
        </FavoriteWrapper>
      </AddedWrapper>
      <Divider />
      <AddWrapper>
        <Title>관심 있는 아이돌을 추가해보세요.</Title>
        <Slide>
          <ArrowWarpper direction="left">
            <LeftArrowButton onClick={handlePrev} />
          </ArrowWarpper>
          {idols.map((idol) => {
            const isSelected =
              selectedIdols.includes(idol.id) && !addedIdols.includes(idol.id);
            return (
              <ProfileWrapper
                key={idol.id}
                onClick={() => handleSelect(idol.id)}
              >
                <Avatar
                  imageUrl={idol.profilePicture}
                  isSelected={isSelected}
                />
                <Name>{idol.name}</Name>
                <Group>{idol.group}</Group>
              </ProfileWrapper>
            );
          })}
          <ArrowWarpper direction="right">
            <RightArrowButton onClick={handleNext} />
          </ArrowWarpper>
        </Slide>
        <BoxButtonWrapper>
          <BoxButton
            size="medium"
            onClick={handleAdd}
            isRound={true}
            icon={addIcon}
          >
            추가하기
          </BoxButton>
        </BoxButtonWrapper>
      </AddWrapper>
    </Container>
  );
}

const AddedWrapper = styled.section``;

const AddWrapper = styled.section`
  width: 1200px;
  margin-top: 40px;
  margin: 0 auto;
`;

const Divider = styled.div`
  width: 1200px;
  border-top: 1px solid var(--gray-300);
  margin: 30px 0;
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
  top: 25%;
  left: ${(props) => (props.direction === "left" ? "-5%" : "")};
  right: ${(props) => (props.direction === "right" ? "-5%" : "")};
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

const BoxButtonWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 3px;
  z-index: 1;
`;
