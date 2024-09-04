import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";
import List from "./pages/List";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Header />}>
          <Route path="/list" element={<List />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
