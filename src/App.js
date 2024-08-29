/** @jsxImportSource @emotion/react */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/global";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/list" />
        <Route path="/mypage" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
