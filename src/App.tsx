import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAppSelector } from "./redux/hooks";
import { selectIsAuth } from "./redux/slices/authSlice";
import AlertMessage from "./components/AlertMessage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <>
      <AlertMessage />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;