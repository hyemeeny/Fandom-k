import styled from "@emotion/styled/macro";
import React, { useState, useEffect } from "react";
import { LeftArrowButton, RightArrowButton } from "../components/ArrowButton";
import BoxButton from "../components/BoxButton";
import addIcon from "../assets/icon/add_icon.svg";
import { getIdols } from "../api/idols";
import Avatar from "../components/Avatar";
import FavoriteIdolList from "../components/FavoriteIdolList";
import IdolList from "../components/IdolList";

export default function MyPage() {
  const [favoriteIdols, setFavoriteIdols] = useState([]); // 관심있는 아이돌
  const [selectedIdols, setSelectedIdols] = useState([]); // 추가 전 선택된 아이돌
  const [pages, setPages] = useState([]); // 페이지별 데이터 저장
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 현재 페이지 인덱스
  const [cursor, setCursor] = useState(0);

  const loadIdols = async (cursor, pageSize, isInitial = false) => {
    try {
      const result = await getIdols(cursor, pageSize);
      const { list, nextCursor } = result;

      setPages((prevPages) => {
        return isInitial ? [list] : [...prevPages, list];
      });
      // 초기 로드시 현재 페이지 인덱스를 0으로 설정, 그 외에는 인덱스 증가
      setCurrentPageIndex((prevIndex) => (isInitial ? 0 : prevIndex + 1));
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("favoriteIdols")) || [];
    setFavoriteIdols([...new Set(storedIdols.map((idol) => idol))]);
    loadIdols(0, 16, true);
  }, []);

  function handleLeftClick() {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
    }
  }

  function handleRightClick() {
    if (cursor === null && currentPageIndex === pages.length - 1) return;

    if (currentPageIndex === pages.length - 1) {
      loadIdols(cursor, 16);
    } else {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    }
  }

  function handleSelect(id) {
    if (selectedIdols.includes(id)) {
      setSelectedIdols((prevList) => prevList.filter((item) => item !== id));
      return;
    }
    setSelectedIdols((prevList) => [...prevList, id]);
  }

  function handleAdd() {
    const idolsToAdd = pages
      .flat()
      .filter((idol) => selectedIdols.includes(idol.id));

    // 중복제거
    const idolMap = new Map(favoriteIdols.map((idol) => [idol.id, idol]));
    idolsToAdd.forEach((idol) => idolMap.set(idol.id, idol));
    const newFavoriteIdols = Array.from(idolMap.values());

    setFavoriteIdols(newFavoriteIdols);
    setSelectedIdols([]);
    localStorage.setItem("favoriteIdols", JSON.stringify(newFavoriteIdols));
  }

  function handleDelete(id) {
    const newList = favoriteIdols.filter((idol) => idol.id !== id);
    setFavoriteIdols(newList);
    localStorage.setItem("favoriteIdols", JSON.stringify(newList));
  }

  const currentIdols = pages[currentPageIndex] || [];

  const isLoadDisabled = cursor === null;

  return (
    <Container>
      <AddedWrapper>
        <Title> 내가 관심있는 아이돌</Title>
        <FavoriteIdolList idols={favoriteIdols} onDelete={handleDelete} />
      </AddedWrapper>
      <Divider />
      <AddWrapper>
        <Title>관심 있는 아이돌을 추가해보세요.</Title>
        <Slide>
          <ArrowWarpper direction="left">
            <LeftArrowButton onClick={handleLeftClick} />
          </ArrowWarpper>
          <IdolList
            currentIdols={currentIdols}
            favoriteIdols={favoriteIdols}
            selectedIdols={selectedIdols}
            onSelect={handleSelect}
          />
          <ArrowWarpper direction="right" isDisabled={isLoadDisabled}>
            <RightArrowButton onClick={handleRightClick} />
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

const BoxButtonWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
`;
