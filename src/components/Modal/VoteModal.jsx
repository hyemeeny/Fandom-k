import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { getCharts, postVotes } from "../../api/votesImageChart";
import { useCredit } from "../../hooks/useLocalStorage";
import styled from "@emotion/styled/macro";
import Avatar from "../Avatar";
import RadioButton from "../RadioButton/RadioButton";
import BoxButton from "../BoxButton";
import closedWindow from "../../assets/btn/close_window.svg";
import ArrowLeft from "../../assets/icon/arrow_left.svg";

const VoteModal = ({
  isOpen,
  onClose,
  activeTapValue,
  setVoteCompleteModal,
  setShowShortageModal,
}) => {
  const target = useRef(null);
  const [credit, setCredit] = useCredit();
  const [idolList, setIdolList] = useState([]);
  const [selectedVote, setSelectedVote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(0);
  const [genderValue, setGenderValue] = useState({
    gender: activeTapValue.gender,
    cursor: 0,
  });

  // 옵저버 콜백함수
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && nextCursor !== null) {
        setGenderValue((prevValue) => ({
          ...prevValue,
          cursor: nextCursor,
        }));
      }
    },
    [isLoading, nextCursor],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    if (target.current) observer.observe(target.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // 아이돌 차트 조회
  useEffect(() => {
    const handleChartLoad = async () => {
      setIsLoading(true);
      try {
        const chart = await getCharts(genderValue);
        if (chart.idols) {
          setIdolList((prevValue) => [...prevValue, ...chart.idols]);
          setNextCursor(chart.nextCursor);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    handleChartLoad();
  }, [genderValue]);

  // 투표할 아이돌 선택
  const handleSelectVote = (vote) => {
    setSelectedVote(vote);
  };

  // 투표하기 버튼 클릭
  const handleVoteLoad = async () => {
    if (selectedVote) {
      if (credit >= 1000) {
        await postVotes(selectedVote);
        const newCredit = Number(credit) - 1000;
        setCredit(newCredit);
        onClose();
        if (onClose) {
          setVoteCompleteModal(true);
        }
      } else {
        onClose();
        if (onClose) {
          setShowShortageModal(true);
        }
      }
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalLabel>
          {genderValue.gender === "female"
            ? "이달의 여자 아이돌"
            : "이달의 남자 아이돌"}
        </ModalLabel>
        <VoteWrap>
          <VoteBox>
            {idolList &&
              idolList.map((item, index) => (
                <VoteList
                  // 마지막 아이템에만 ref를 설정하여 IntersectionObserver가 작동하게 한다.
                  ref={index === idolList.length - 1 ? target : null}
                  key={item.id}
                  onClick={() => handleSelectVote(item.id)}
                >
                  <ProfileDiv>
                    <AvatarDiv>
                      <Avatar
                        isSelected={selectedVote === item.id}
                        imageUrl={item.profilePicture}
                      />
                    </AvatarDiv>
                    <Rank>{index + 1}</Rank>
                    <div>
                      <Group>{item.group}</Group>
                      <Name>{item.name}</Name>
                      <TotalVotes>{item.totalVotes}표</TotalVotes>
                    </div>
                  </ProfileDiv>
                  <RadioButton
                    value={item.id}
                    name={item.name}
                    id={item.id}
                    checked={selectedVote === item.id}
                    onChange={() => handleSelectVote(item.id)}
                  />
                </VoteList>
              ))}
          </VoteBox>
          <BoxButton size="modal" onClick={handleVoteLoad}>
            투표하기
          </BoxButton>
          <Description>
            투표하는 데 <span>1000 크레딧</span>이 소모됩니다.
          </Description>
        </VoteWrap>
      </Modal>
    </div>
  );
};

const VoteWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoteBox = styled.ul`
  width: 100%;
  height: 514px;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 744px) {
    height: 600px;
  }
`;

const VoteList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
  cursor: pointer;
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AvatarDiv = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
`;

const Rank = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--coralpink);
`;

const Group = styled.h3`
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  color: #ffffff;
`;

const Name = styled(Group)`
  margin-left: 5px;
`;

const TotalVotes = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-top: 4px;
  color: #ffffff;
  opacity: 0.6;
`;

const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  margin-top: 1rem;

  span {
    color: var(--coralpink);
  }
`;

export default VoteModal;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <motion.aside
        style={{ width: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalCloseButton onClick={onClose} />
          {children}
        </ModalContent>
      </motion.aside>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  color: #f7f7f8;
  background-color: #181d26;
  padding: 30px 24px 24px 24px;
  border-radius: 12px;
  position: relative;
  width: 525px;
  margin: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 744px) {
    width: 100%;
    height: 100vh;
  }
`;

const ModalCloseButton = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 24px;
  right: 28px;
  background: none;
  border: none;
  cursor: pointer;
  background: url(${closedWindow}) center center no-repeat;

  @media (max-width: 744px) {
    top: 25px;
    left: 28px;
    background: url(${ArrowLeft}) center center no-repeat;
  }
`;

const ModalLabel = styled.h2`
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  padding-bottom: 24px;

  @media (max-width: 744px) {
    font-size: 14px;
    text-align: center;
  }
`;
