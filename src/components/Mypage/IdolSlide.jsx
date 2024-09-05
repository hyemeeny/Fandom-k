import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeftArrowButton, RightArrowButton } from "../ArrowButton";
import IdolList from "./IdolList";
import styled from "@emotion/styled/macro";

export default function IdolSlide({
  currentIdols,
  favoriteIdols,
  selectedIdols,
  currentPageIndex,
  onSelect,
  onLeftClick,
  onRightClick,
  isDisabled,
}) {
  const [isRight, setIsRight] = useState(true);

  function handleLeftClick() {
    setIsRight(false);
    onLeftClick();
  }

  function handleRightClick() {
    setIsRight(true);
    onRightClick();
  }

  const slideVariants = {
    enter: (isRight) => ({
      opacity: 0,
      x: isRight ? 300 : -300, // 오른쪽으로 이동 시 왼쪽에서 나타남, 왼쪽으로 이동 시 오른쪽에서 나타남
      transition: { duration: 0.4, ease: "easeOut" },
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: (isRight) => ({
      opacity: 0,
      x: isRight ? -300 : 300, // 오른쪽으로 이동 시 왼쪽으로 사라짐, 왼쪽으로 이동 시 오른쪽으로 사라짐
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  return (
    <SlideContainer>
      <ArrowWarpper direction="left">
        <LeftArrowButton onClick={handleLeftClick} />
      </ArrowWarpper>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPageIndex}
          custom={isRight}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
        >
          <SlideContent>
            <IdolList
              currentIdols={currentIdols}
              favoriteIdols={favoriteIdols}
              selectedIdols={selectedIdols}
              onSelect={onSelect}
            />
          </SlideContent>
        </motion.div>
      </AnimatePresence>

      <ArrowWarpper direction="right" isDisabled={isDisabled}>
        <RightArrowButton onClick={handleRightClick} />
      </ArrowWarpper>
    </SlideContainer>
  );
}

const SlideContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SlideContent = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, auto);
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

const ArrowWarpper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.direction === "left" ? "-5%" : "")};
  right: ${(props) => (props.direction === "right" ? "-5%" : "")};

  @media (max-width: 1024px) {
    left: ${(props) => (props.direction === "left" ? "-10%" : "")};
    right: ${(props) => (props.direction === "right" ? "-10%" : "")};
  }

  @media (max-width: 768px) {
    left: ${(props) => (props.direction === "left" ? "-15%" : "")};
    right: ${(props) => (props.direction === "right" ? "-15%" : "")};
  }
`;
