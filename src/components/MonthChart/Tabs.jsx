import styled from "@emotion/styled/macro";

const Tabs = ({ activeTapValue, onClick }) => {
  const tabChange = (e) => {
    onClick(e.target.value);
  };

  return (
    <Div>
      <FemaleTab
        disabled={activeTapValue.gender === "female"}
        onClick={tabChange}
        value="female"
        activeTapValue={activeTapValue.gender}
      >
        이달의 여자 아이돌
      </FemaleTab>
      <MaleTab
        disabled={activeTapValue.gender === "male"}
        onClick={tabChange}
        value="male"
        activeTapValue={activeTapValue.gender}
      >
        이달의 남자 아이돌
      </MaleTab>
    </Div>
  );
};

const Div = styled.div`
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const FemaleTab = styled.button`
  display: inline-block;
  width: 163.5px;
  height: 42px;
  border: none;
  border-bottom: ${(props) =>
    props.activeTapValue === "female" ? "1px solid #ffffff" : "none"};
  background-color: ${(props) =>
    props.activeTapValue === "female"
      ? "var(--black-100)"
      : "var(--black-200)"};
  color: ${(props) =>
    props.activeTapValue === "female" ? "#ffffff" : "var(--gray-200)"};
  padding: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 348px;
  }

  @media (min-width: 1200px) {
    width: 600px;
  }
`;

const MaleTab = styled.button`
  display: inline-block;
  width: 163.5px;
  height: 42px;
  border: none;
  border-bottom: ${(props) =>
    props.activeTapValue === "male" ? "1px solid #ffffff" : "none"};
  background-color: ${(props) =>
    props.activeTapValue === "male" ? "var(--black-100)" : "var(--black-200)"};
  color: ${(props) =>
    props.activeTapValue === "male" ? "#ffffff" : "var(--gray-200)"};
  padding: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 348px;
  }

  @media (min-width: 1200px) {
    width: 600px;
  }
`;

export default Tabs;
