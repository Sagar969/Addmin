import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AdminPanelRouter from "./client/routers/AdminPanelRouter";
import { ConfigProvider } from "antd";

const router = createBrowserRouter([
  { path: "*", element: <AdminPanelRouter /> },
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
