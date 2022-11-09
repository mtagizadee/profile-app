import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { logOut, selectIsAuth, setIsAuth } from "./redux/slices/authSlice";
import AlertMessage from "./components/AlertMessage";
import { privateRoutes, publicRoutes } from "./routes";
import ErrorPage from "./pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { addRequestInterceptors, addResponseInterceptors } from "./helpers";
import Loader from "./components/Loader";

const queryClient = new QueryClient()

const App = () => {
  const [isAxiosLoading, setIsAxiosLoading] = useState(true);

  const isAuth = useAppSelector(selectIsAuth);
  const routes = isAuth ? privateRoutes : publicRoutes;
  const dispatch = useAppDispatch();

  useEffect(() => {
    addRequestInterceptors();
    addResponseInterceptors(() => dispatch(logOut()));
    setIsAxiosLoading(false);
  }, []);

  if (isAxiosLoading) return <Loader />

  return (
    <QueryClientProvider client={queryClient}>
      <AlertMessage />
      <BrowserRouter>
        <Routes>
          {routes.map(route => <Route
            path={route.path}
            element={<route.element />}
            key={route.id}
          />)}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to='/error' />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;