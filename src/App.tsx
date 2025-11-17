import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { queryConfig } from "./api/queryConfig.ts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ModalProvider } from "./context/modal-context.tsx";
import { UserContextProvider } from "./context/user-context.tsx";
import { ErrorPage } from "./pages/ErrorPage";
import { MainPage } from "./pages/MainPage";
import { UserTextsPage } from "./pages/UserTextsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { GlobalStyles } from "./style/globalStyles.ts";

export const App = () => {
  return (
    <QueryClientProvider client={queryConfig}>
      <UserContextProvider>
        <ModalProvider>
          <BrowserRouter>
            <GlobalStyles />
            <Header />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/history" element={<UserTextsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ModalProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};
