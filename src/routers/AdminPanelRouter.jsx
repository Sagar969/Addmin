import { Route, Routes } from "react-router-dom";
import { AdminTemplate } from "../panels/admin/components/template/AdminTemplate";
import PageNotFound from "../components/template/PageNotFound";

export default function AdminPanelRouter() {
  return (
    <>
      <Routes>
        <Route path="dashboard">
          <Route
            index
            element={
              <AdminTemplate>
                <div>Dashboard</div>
              </AdminTemplate>
            }
          />
        </Route>
        <Route path="modules">
          <Route index element={<AdminTemplate>modules</AdminTemplate>} />
          <Route path="new" element={<AdminTemplate>new</AdminTemplate>} />
        </Route>
        <Route
          path="*"
          element={
            <AdminTemplate>
              <PageNotFound />
            </AdminTemplate>
          }
        />
      </Routes>
    </>
  );
}
