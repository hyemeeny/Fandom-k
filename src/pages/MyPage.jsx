import styled from "@emotion/styled/macro";
import React, { useState, useEffect } from "react";
import BoxButton from "../components/BoxButton";
import addIcon from "../assets/icon/add_icon.svg";
import FavoriteIdolList from "../components/Mypage/FavoriteIdolList";
import { useIdols } from "../hooks/useIdols";
import { usePageSize } from "../hooks/usePageSize";
import IdolSlide from "../components/Mypage/IdolSlide";

export default function MyPage() {
  const { pages, cursor, currentPageIndex, setCurrentPageIndex, loadIdols } =
    useIdols(0);
  const pageSize = usePageSize();
  const [favoriteIdols, setFavoriteIdols] = useState([]); // 관심있는 아이돌
  const [selectedIdols, setSelectedIdols] = useState([]); // 추가 전 선택된 아이돌

  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("favoriteIdols")) || [];
    setFavoriteIdols(storedIdols);
    loadIdols(0, pageSize, true);
  }, [pageSize]);

  // 스크롤 삭제
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  function handleLeftClick() {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
    }
  }

  function handleRightClick() {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    } else if (cursor !== null) {
      loadIdols(cursor, pageSize);
    }
  }

  function handleSelect(id) {
    if (favoriteIdols.some((idol) => idol.id === id)) {
      return;
    }

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
        <IdolSlide
          currentIdols={currentIdols}
          favoriteIdols={favoriteIdols}
          selectedIdols={selectedIdols}
          currentPageIndex={currentPageIndex}
          onSelect={handleSelect}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          isDisabled={isLoadDisabled}
        />
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

const AddedWrapper = styled.section`
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;

  @media (max-width: 1024px) {
    width: 524px;
  }

  @media (max-width: 768px) {
    width: 328px;
  }
`;

const AddWrapper = styled.section`
  width: 1200px;
  margin-top: 40px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 524px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    width: 328px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Divider = styled.div`
  width: 1200px;
  border-top: 1px solid var(--gray-300);
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    width: 524px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    width: 328px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 1024px) {
    width: 524px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    width: 328px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: var(--white-darker);

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BoxButtonWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
`;
