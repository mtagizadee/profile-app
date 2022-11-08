import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAppSelector } from "./redux/hooks";
import { selectIsAuth } from "./redux/slices/authSlice";
import AlertMessage from "./components/AlertMessage";
import SignupPage from "./pages/SignupPage";
import { privateRoutes, publicRoutes } from "./routes";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const routes = isAuth ? privateRoutes : publicRoutes;

  return (
    <>
      <AlertMessage />
      <BrowserRouter>
        <Routes>
          {routes.map(route => <Route
            path={route.path}
            element={<route.element />}
          />)}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;