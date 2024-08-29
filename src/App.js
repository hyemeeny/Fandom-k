/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";

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
