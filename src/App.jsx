import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AdminPanelRouter from "./routers/AdminPanelRouter";
import { ConfigProvider } from "antd";
import { createContext } from "react";
import { AdminContextProvider } from "./contexts/AdminContext";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <AdminContextProvider>
        <AdminPanelRouter />
      </AdminContextProvider>
    ),
  },
]);

function App() {
  return (
    <>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
