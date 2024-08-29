/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";
import RadioButtonGroup from "./components/RadioButton/RadioButtonGroup";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" />
        <Route path="/list" />
        <Route path="/mypage" />
      </Routes>
    </>
  );
}

export default App;
