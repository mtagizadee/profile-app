import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { selectIsAuth } from "./redux/slices/authSlice";
import AlertMessage from "./components/AlertMessage";
import { privateRoutes, publicRoutes } from "./routes";
import ErrorPage from "./pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

const App = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const routes = isAuth ? privateRoutes : publicRoutes;


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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;