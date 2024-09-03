import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled/macro";
import { getCharts } from "../../api/votesImageChart";
import Tabs from "./Tabs";
import Chart from "./Chart";
import VoteButton from "../BoxButton";
import chartIcon from "../../assets/icon/chart.svg";
import VoteModal from "../Modal/VoteModal";

const MonthChart = () => {
  // VoteModal 상태값
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevGenderRef = useRef("");
  const [activeTapValue, setActiveTabValue] = useState({
    gender: "female",
    cursor: 0,
    pageSize: window.innerWidth >= 1200 ? 10 : 5,
  });
  const [nextCursor, setNextCursor] = useState();
  const [list, setList] = useState([]);

  const activeTapValueHandler = (inputValue) => {
    setActiveTabValue({
      gender: inputValue,
      cursor: 0,
      pageSize: window.innerWidth >= 1200 ? 10 : 5,
    });
  };

  const handleLoadMore = async () => {
    setActiveTabValue((prevValue) => ({
      ...prevValue,
      cursor: nextCursor,
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      const newPageSize = window.innerWidth >= 1200 ? 10 : 5;

      setActiveTabValue((prevValue) => {
        if (prevValue.pageSize !== newPageSize) {
          // pageSize가 변경된 경우에만 초기화
          setList([]);
          return {
            ...prevValue,
            pageSize: newPageSize,
            cursor: 0,
          };
        }
        return prevValue;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleLoad = async () => {
      const result = await getCharts(activeTapValue);

      if (!result.success) {
        console.error(result.message);
        return;
      }

      const { idols, nextCursor } = result;

      if (Array.isArray(idols)) {
        // idols가 배열인지 확인
        if (prevGenderRef.current === activeTapValue.gender) {
          setList((prevValue) => [...prevValue, ...idols]);
        } else {
          setList(idols);
          prevGenderRef.current = activeTapValue.gender;
        }
        setNextCursor(nextCursor);
      } else {
        console.error("배열이 아닙니다.", idols);
      }
    };

    handleLoad();
  }, [activeTapValue]);

  // VoteModal 클릭 핸들러
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Section>
      <Header>
        <H2>이달의 차트</H2>

        <VoteButton size={"small"} icon={chartIcon} onClick={handleOpenModal}>
          차트 투표하기
        </VoteButton>
        {isModalOpen && (
          <VoteModal
            activeTapValue={activeTapValue}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </Header>
      <Tabs activeTapValue={activeTapValue} onClick={activeTapValueHandler} />
      <Ul>
        {list.map((item, index) => (
          <Chart
            key={item.id}
            item={item}
            isLast={index === list.length - 1}
            order={index + 1}
          />
        ))}
        ;
      </Ul>
      <MoreView disabled={!nextCursor} onClick={handleLoadMore}>
        더 보기
      </MoreView>
    </Section>
  );
};

const Section = styled.section`
  width: 327px;
  margin: 0 auto;
  background-color: var(--black-200);

  @media (min-width: 768px) {
    width: 700px;
  }

  @media (min-width: 1200px) {
    width: 1200px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const H2 = styled.h2`
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 26px;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
    line-height: 26px;
  }
`;

const Ul = styled.ul`
  margin-bottom: 33px;

  @media (min-width: 768px) {
    margin-bottom: 27px;
  }

  @media (min-width: 1200px) {
    margin-bottom: 51px;
    display: grid;
    gap: 0;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, auto);
    grid-column-gap: 16px;
  }
`;

const MoreView = styled.button`
  display: block;
  margin: 0 auto 70px;
  width: 326px;
  height: 42px;
  border-radius: 3px;
  border: 1px solid #f1eef9;
  background-color: var(--black-100);
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;

  &:active {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px, inset 2px 2px 5px rgba(0, 0, 0, 0.3),
      inset -2px -2px 5px rgba(255, 255, 255, 0.1);
    transform: translateY(2px); /* 버튼이 눌린 것 같은 효과 */
  }

  &:disabled {
    background-color: var(--gray-200);
    border: none;
    cursor: unset;
  }
  &:disabled:active {
    box-shadow: none;
    transform: none; /* :active 효과 막기 */
  }
`;

export default MonthChart;
