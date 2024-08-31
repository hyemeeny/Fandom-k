import styled from "@emotion/styled/macro";
import Avatar from "../Avatar";

const Chart = ({ item, isLast, order }) => {
  return (
    <Li isLast={isLast}>
      <ProfileWrap>
        <ProfileDiv>
          <Avatar imageUrl={item.profilePicture} />
        </ProfileDiv>
        <OrderSmall>{order}</OrderSmall>
        <GroupNameWrap>
          <TextDiv>{item.group}</TextDiv>
          <TextDiv>{item.name}</TextDiv>
        </GroupNameWrap>
      </ProfileWrap>
      <TotalVoteDiv>{item.totalVotes}표</TotalVoteDiv>
    </Li>
  );
};

const Li = styled.li`
  height: 90px;
  border-radius: 8px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 375px) {
    ${(props) =>
      props.isLast
        ? "border: none"
        : "border-bottom: 1px solid var(--black-100)"}
  }

  @media (min-width: 768px) {
    ${(props) =>
      props.isLast
        ? "border: none"
        : "border-bottom: 1px solid var(--black-100)"}
  }

  @media (min-width: 1200px) {
    border-bottom: 1px solid var(--black-100);

    &:nth-last-child(1),
    &:nth-last-child(2) {
      border-bottom: 0;
    }
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ProfileDiv = styled.div`
  width: 70px;
  height: 70px;
`;

const OrderSmall = styled.small`
  font-weight: 400;
  font-size: 14px;
  color: var(--coralpink);

  @media (min-width: 1200px) {
    font-size: 16px;
  }
`;

const GroupNameWrap = styled.div`
  display: flex;
  gap: 5px;
`;

const TextDiv = styled.div`
  font-weight: 500px;
  font-size: 14px;

  @media (min-width: 1200px) {
    font-weight: 500px;
    font-size: 16px;
  }
`;

const TotalVoteDiv = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: var(--gray-200);

  @media (min-width: 1200px) {
    font-weight: 400;
    font-size: 16px;
  }
`;

export default Chart;
