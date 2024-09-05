import styled from "@emotion/styled/macro";

const Tabs = ({ activeTapValue, onClick, disabled }) => {
  const tabChange = (e) => {
    if (disabled) return;
    onClick(e.target.value);
  };

  return (
    <Div>
      <TabWrapper>
        <TabButton
          isActive={activeTapValue.gender === "female"}
          onClick={tabChange}
          value="female"
          disabled={disabled}
        >
          이달의 여자 아이돌
        </TabButton>
        <TabButton
          isActive={activeTapValue.gender === "male"}
          onClick={tabChange}
          value="male"
          disabled={disabled}
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
  cursor: ${(props) =>
    props.disabled ? "not-allowed" : "pointer"}; // disabled 상태에서 커서 변경
  transition: background-color 0.5s ease, color 0.5s ease;
  opacity: ${(props) =>
    props.disabled ? 0.5 : 1}; // disabled 상태에서 투명도 적용

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
