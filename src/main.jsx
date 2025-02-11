import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import PopModals from "./components/shared/PopModals.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <PopModals />
        <App />
      </GlobalContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
