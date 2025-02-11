import { Route, Routes } from "react-router-dom";
import { AdminTemplate } from "../panels/admin/components/ui/template/AdminTemplate";
import PageNotFound from "../components/template/PageNotFound";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { getAdminById } from "../api/panels/admin/adminUser";
import { useQuery } from "react-query";
import ModuleIndex from "../panels/admin/screens/DynamicModule/ModuleIndex";
import ModulesIndex from "../panels/admin/screens/Modules/ModulesIndex";
import ModuleManage from "../panels/admin/screens/Modules/ModuleManage";
import Loading from "../components/ui/Loading";
import { useAdminContext } from "../contexts/AdminContext";

export const adminFunction = {
  getModuleByKey: () => {},
};

export default function AdminPanelRouter() {
  const { modules, updateAdminContext } = useAdminContext();

  const admin = useQuery("admin", getAdminById);

  adminFunction.getModuleByKey = (key) => {
    return modules.find((mod) => mod.moduleKey === key);
  };

  useEffect(() => {
    if (admin.data)
      updateAdminContext({
        modules:
          admin.data.data.modules?.length > 0 ? admin.data.data.modules : [],
      });
  }, [admin.data]);

  return (
    <>
      {admin.isLoading ? (
        <Loading />
      ) : (
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
          {modules.map((module, i) => (
            <Route key={i} path={module.moduleKey}>
              <Route
                index
                element={
                  <AdminTemplate>
                    <ModuleIndex moduleKey={module.moduleKey} />
                  </AdminTemplate>
                }
              />
            </Route>
          ))}
          <Route path="modules">
            <Route
              index
              element={
                <AdminTemplate>
                  <ModulesIndex />
                </AdminTemplate>
              }
            />
            <Route
              path="new"
              element={
                <AdminTemplate>
                  <ModuleManage />
                </AdminTemplate>
              }
            />
            <Route
              path="edit/:moduleKey"
              element={
                <AdminTemplate>
                  <ModuleManage />
                </AdminTemplate>
              }
            />
            <Route
              path="view/:moduleKey"
              element={
                <AdminTemplate>
                  <ModuleManage />
                </AdminTemplate>
              }
            />
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
      )}
    </>
  );
}
