/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";
import RadioButton from "./components/RadioButton";

function App() {
  return (
    <>
      <GlobalStyles />
      {/* <Routes>
        <Route path="/" />
        <Route path="/list" />
        <Route path="/mypage" />
      </Routes> */}
      <RadioButton />
    </>
  );
}

export default App;
