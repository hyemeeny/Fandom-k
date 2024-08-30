import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";
import List from "./pages/List";
import Header from "./components/Header";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Header />}>
          <Route path="/list" element={<List />} />
          <Route path="/mypage" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
