import styled from "@emotion/styled/macro";

const Tabs = ({ activeTapValue, onClick }) => {
  const tabChange = (e) => {
    onClick(e.target.value);
  };

  return (
    <Div>
      <TabWrapper>
        <TabButton
          isActive={activeTapValue.gender === "female"}
          onClick={tabChange}
          value="female"
        >
          이달의 여자 아이돌
        </TabButton>
        <TabButton
          isActive={activeTapValue.gender === "male"}
          onClick={tabChange}
          value="male"
        >
          이달의 남자 아이돌
        </TabButton>
        <TabIndicator activeTapValue={activeTapValue.gender} />
      </TabWrapper>
    </Div>
  );
};

const Div = styled.div`
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const TabWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TabButton = styled.button`
  display: inline-block;
  width: 163.5px;
  height: 42px;
  background-color: ${(props) =>
    props.isActive ? "var(--black-100)" : "var(--black-200)"};
  color: ${(props) => (props.isActive ? "#ffffff" : "var(--gray-200)")};
  border: none;
  padding: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease;

  &:hover {
    color: #ffffff;
  }

  @media (min-width: 768px) {
    width: 348px;
  }

  @media (min-width: 1200px) {
    width: 600px;
  }
`;

const TabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => (props.activeTapValue === "female" ? "0%" : "50%")};
  width: 50%;
  height: 1px;
  background-color: #ffffff;
  transition: left 0.5s ease;
`;

export default Tabs;
