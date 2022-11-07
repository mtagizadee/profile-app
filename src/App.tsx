import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;