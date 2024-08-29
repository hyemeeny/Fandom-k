import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import LogoImg from "../assets/img/logo.svg";
import TopDesign from "../assets/img/top_design.svg";
import MainTopImg from "../assets/img/top_home.svg";
import BackgroundImg1 from "../assets/img/girlsgeneration.svg";
import BackgroundImg2 from "../assets/img/newjeans.svg";
import BackgroundImg3 from "../assets/img/nct.svg";
import DescriptionImg1 from "../assets/img/home_1.svg";
import DescriptionImg2 from "../assets/img/home_2.svg";
import DescriptionImg3 from "../assets/img/home_3.svg";
import BoxButton from "../components/BoxButton";
import DescriptionContent from "./components/DescriptionContent";

const Landing = () => {
  const { target1, target2, target3 } = useScrollAnimation();

  return (
    <>
      <Container className="TopDesign">
        <BackgroundImg
          src={MainTopImg}
          alt="Idol"
          className="TopImg"
          opacity="main"
        />
        <BackgroundGradient className="TopGradient" />
        <TitleWrap>
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
            <Title>
              내가 좋아하는 아이돌을
              <br /> 가장 <span>쉽게 덕질</span> 하는 방법
            </Title>
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
            <Logo src={LogoImg} alt="FANDOM-K" />
          </motion.div>
        </TitleWrap>
        <Link to="/list" className="link-button">
          <BoxButton size="large">지금 시작하기</BoxButton>
        </Link>
      </Container>
      <DescriptionContent
        ref={target1}
        title={"좋아하는 아이돌에게\n 쉽게 조공해 보세요"}
        subtitle="후원하기"
        descriptionImg={DescriptionImg1}
        backgroundImg={BackgroundImg1}
      />
      <DescriptionContent
        ref={target2}
        title={"내 아티스트에게 1등의\n 영예를 선물하세요"}
        subtitle="이달의 아티스트"
        descriptionImg={DescriptionImg2}
        backgroundImg={BackgroundImg2}
      />
      <DescriptionContent
        ref={target3}
        title={"좋아하는 아티스트들의\n 소식을 모아보세요"}
        subtitle="나만의 아티스트"
        descriptionImg={DescriptionImg3}
        backgroundImg={BackgroundImg3}
      />
    </>
  );
};

export default Landing;

export const Container = styled.section`
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rem 0;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 0;
  }

  .link-button {
    position: absolute;
    bottom: 15%;
    text-decoration-line: none;

    @media (max-width: 744px) {
      & > button {
        width: 230px;
      }
    }
  }

  &.TopDesign {
    background: url(${TopDesign}) left top no-repeat;
    padding: 0;

    .TopImg,
    .TopGradient {
      width: 1080px;
      height: 1080px;
      @media (max-width: 1200px) {
        width: 744px;
        height: 744px;
      }
      @media (max-width: 744px) {
        width: 375px;
        height: 375px;
      }
    }
  }
`;

export const BackgroundImg = styled.img`
  position: absolute;
  width: 1200px;
  height: 1200px;
  object-fit: cover;
  z-index: 0;
  opacity: ${({ opacity }) => (opacity === "main" ? "70%" : "20%")};

  @media (max-width: 1200px) {
    width: 744px;
    height: 744px;
  }
`;

export const BackgroundGradient = styled.div`
  position: absolute;
  width: 1200px;
  height: 1200px;

  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(2, 0, 14, 0) 0%,
    rgba(2, 0, 14, 0.180099) 37.5%,
    rgba(2, 0, 14, 0.5) 79.5%,
    var(--black-200) 100%
  );

  @media (max-width: 1200px) {
    width: 744px;
    height: 744px;
  }
`;

export const Title = styled.h2`
  font-family: Pretendard;
  font-size: ${({ size }) => (size === "small" ? "2.4rem" : "2.6rem")};
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  white-space: pre-line;

  @media (max-width: 1200px) {
    font-size: 2rem;
  }

  span {
    color: var(--coralpink);
  }
`;

const Logo = styled.img`
  width: 509px;
  margin-top: 3rem;
  @media (max-width: 1200px) {
    width: 325px;
  }

  @media (max-width: 744px) {
    width: 236px;
  }
`;

const TitleWrap = styled.div`
  position: absolute;
  top: 0;
  padding-top: 140px;
`;
