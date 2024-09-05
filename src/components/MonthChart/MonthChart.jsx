import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled/macro";
import { getCharts } from "../../api/votesImageChart";
import Tabs from "./Tabs";
import Chart from "./Chart";
import VoteButton from "../BoxButton";
import chartIcon from "../../assets/icon/chart.svg";
import VoteModal from "../Modal/VoteModal";

import { ToastModal } from "../Modal/ToastModal";
import { retryRequest } from "../../api/retryApi";
import ErrorBox from "../ErrorBox";

const MonthChart = () => {
  // VoteModal 상태값
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voteCompleteModal, setVoteCompleteModal] = useState(false);
  const [showShortageModal, setShowShortageModal] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState(null);

  const prevGenderRef = useRef("");
  const [nextCursor, setNextCursor] = useState();
  const [list, setList] = useState([]);
  const [activeTapValue, setActiveTabValue] = useState({
    gender: "female",
    cursor: 0,
    pageSize: window.innerWidth >= 1200 ? 10 : 5,
  });

  // 탭 선택 시 동작
  const activeTapValueHandler = (inputValue) => {
    setActiveTabValue({
      gender: inputValue,
      cursor: 0,
      pageSize: window.innerWidth >= 1200 ? 10 : 5,
    });
  };

  // 차트 데이터를 로드하는 함수
  const fetchChartData = async (tapValue) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCharts(tapValue); // 여기서 이미 retryRequest가 적용됨

      if (result && result.idols && Array.isArray(result.idols)) {
        setList((prevList) =>
          prevGenderRef.current === tapValue.gender
            ? [...prevList, ...result.idols]
            : result.idols,
        );
        prevGenderRef.current = tapValue.gender;
        setNextCursor(result.nextCursor);
      } else {
        setError(
          "데이터 형식이 올바르지 않습니다. 페이지를 새로고침 해주세요.",
        );
      }
    } catch (error) {
      setError(
        "차트 정보를 불러오는데 오류가 발생했습니다. 페이지를 새로고침 해주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  // '더 보기' 버튼 클릭 시 더 많은 데이터를 로드
  const handleLoadMore = () => {
    if (nextCursor) {
      fetchChartData({ ...activeTapValue, cursor: nextCursor });
    }
  };

  // 윈도우 크기 변화에 따라 페이지 사이즈 업데이트
  useEffect(() => {
    const handleResize = () => {
      const newPageSize = window.innerWidth >= 1200 ? 10 : 5;
      setActiveTabValue((prevValue) => {
        if (prevValue.pageSize !== newPageSize) {
          setList([]);
          return { ...prevValue, pageSize: newPageSize, cursor: 0 };
        }
        return prevValue;
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 탭 변경 시 데이터를 로드
  useEffect(() => {
    setList([]);
    fetchChartData(activeTapValue);
  }, [activeTapValue]);

  // VoteModal 클릭 핸들러
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Section>
      <Header>
        <H2>이달의 차트</H2>

        {isModalOpen && (
          <VoteModal
            activeTapValue={activeTapValue}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            setVoteCompleteModal={setVoteCompleteModal}
            setShowShortageModal={setShowShortageModal}
          />
        )}
        {voteCompleteModal && (
          <ToastModal
            isOpen={voteCompleteModal}
            onClose={() => setVoteCompleteModal(false)}
          >
            투표가 완료되었습니다!
          </ToastModal>
        )}
        {showShortageModal && (
          <ToastModal
            isOpen={showShortageModal}
            onClose={() => setShowShortageModal(false)}
          >
            앗! 투표하기 위한 <span>크레딧</span>이 부족해요!
          </ToastModal>
        )}
        <VoteButton size={"small"} icon={chartIcon} onClick={handleOpenModal}>
          차트 투표하기
        </VoteButton>
      </Header>
      {error ? (
        <ErrorBox error={error} />
      ) : (
        <>
          <Tabs
            activeTapValue={activeTapValue}
            onClick={activeTapValueHandler}
            disabled={loading}
          />
          <Ul>
            {list.map((item, index) => (
              <Chart
                key={item.id}
                item={item}
                isLast={index === list.length - 1}
                order={index + 1}
              />
            ))}
          </Ul>
          <MoreView disabled={!nextCursor} onClick={handleLoadMore}>
            더 보기
          </MoreView>
        </>
      )}
    </Section>
  );
};

const Section = styled.section`
  width: 327px;
  margin: 0px auto;
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
  min-height: 450px;

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
