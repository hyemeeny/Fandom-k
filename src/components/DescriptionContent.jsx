import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  Container,
  BackgroundImg,
  BackgroundGradient,
  Title,
} from "../pages/Landing";

const DescriptionContent = React.forwardRef(
  ({ title, subtitle, descriptionImg, backgroundImg }, ref) => {
    return (
      <Container className="Gradient-Bar">
        <BackgroundImg src={backgroundImg} alt="아이돌 사진" />
        <BackgroundGradient />
        <GradientBar />
        <DescriptionImgWrap ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 2,
              x: { duration: 1 },
            }}
          >
            <SubTitle>{subtitle}</SubTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 2,
              x: { duration: 1 },
            }}
          >
            <Title size="small">{title}</Title>
          </motion.div>
          <DescriptionImg>
            <img src={descriptionImg} alt="DescriptionImg" />
          </DescriptionImg>
        </DescriptionImgWrap>
      </Container>
    );
  },
);

export default DescriptionContent;

const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #d2c030;
  margin-bottom: 1rem;

  @media (max-width: 744px) {
    text-align: left;
    font-size: 14px;
  }
`;

const GradientBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 187px;
  height: 100%;
  z-index: 0;
  opacity: 0.8;

  @media (max-width: 1200px) {
    width: 117px;
  }

  background: linear-gradient(
    180deg,
    #030615 0%,
    #051d31 42.67%,
    #051e32 53.12%,
    #051c30 74.27%,
    #030b1c 100%
  );
`;

const DescriptionImgWrap = styled.div`
  &.show {
    opacity: 1;
    animation: fadeIn 1s ease-out forwards;
  }

  &.hide {
    opacity: 0;
    animation: fadeOut 1s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(100px);
    }
  }

  h2 {
    @media (max-width: 744px) {
      text-align: left;
    }
  }
`;

const DescriptionImg = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    width: auto;
    height: auto;
    z-index: 1;
    margin-top: 5rem;

    @media (max-width: 1200px) {
      width: 200px;
    }
    @media (max-width: 744px) {
      width: 240px;
    }
  }
`;
