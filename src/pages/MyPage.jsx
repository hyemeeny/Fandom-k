import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { LeftArrowButton, RightArrowButton } from "../components/ArrowButton";

const storedIds = JSON.parse(localStorage.getItem("selectedIdols")) || [];
// const storedIdols = storedIds.map((id)) 받아온 데이터랑 사용.

export default function MyPage() {
  // storedIds 하나 , 선택돼서 저장된 아이돌 하나, 선택 상태인 아이돌들 하나

  const [selectedIdols, setSelectedIdols] = useState([]);
  const [idols, setIdols] = useState([]);

  // 1. idols를 데이터로 받아아온다.
  // 2. 'selectedIodls' 에 로컬 스토리지에 저장되어있는지 확인
  // 3. 저장되어 있다면 ? -> 선택된, 저장이 안되어 있다면 ? -> 선택 가능한.
  // 4. 흠...

  // 저장된것 분기처리
  return (
    <Container>
      <InterestedWrappper>
        <Title> 내가 관심있는 아이돌</Title>
      </InterestedWrappper>
      <AddWrapper>
        <Title>관심 있는 아이돌을 추가해보세요.</Title>
        <Slide>
          <LeftArrowButton />
          <RightArrowButton />
        </Slide>
      </AddWrapper>
    </Container>
  );
}

const InterestedWrappper = styled.section``;

const AddWrapper = styled.section``;

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

const Slide = styled.div``;
