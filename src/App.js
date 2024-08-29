import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";
import MonthChart from "./components/MonthChart/MonthChart";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" />
        <Route path="/list" element={<MonthChart />} />
        <Route path="/mypage" />
      </Routes>
    </>
  );
}

export default App;
