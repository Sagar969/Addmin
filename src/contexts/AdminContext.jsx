import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [context, setContext] = useState({ modules: [] });
  const updateContext = (data) => {
    setContext({ ...context, ...data });
  };

  return (
    <AdminContext.Provider
      value={{ ...context, updateAdminContext: updateContext }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
