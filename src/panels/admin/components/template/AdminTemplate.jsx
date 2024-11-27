import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  LuChevronLeft,
  LuHeadphones,
  LuLayoutDashboard,
  LuMenu,
  LuPlus,
  LuSearch,
  LuX,
} from "react-icons/lu";
const { Sider, Content, Header } = Layout;
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "../../../../lib/utils/cn";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import Loading from "../../../../components/ui/Loading";

export const TemplateContext = createContext(null);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export function AdminTemplate({ accounts, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [utils, setUtils] = useState({
    isSidebarCollapsed: false,
    openedKeys: [],
    currentPath: "",
    activeNavItem: "",
  });

  const updateUtils = (newUtils) =>
    setUtils((prev) => ({ ...prev, ...newUtils }));

  const { screenSizeFactor } = useGlobalContext();

  useLayoutEffect(() => {
    const cookieValue = getCookie("react-resizable-panels:collapsed");
    updateUtils({
      isSidebarCollapsed: cookieValue === "true",
    });
  }, []);

  function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  const handleCollapse = () => {
    document.cookie = `react-resizable-panels:collapsed=true`;
    updateUtils({ isSidebarCollapsed: true });
  };

  const handleExpand = () => {
    document.cookie = `react-resizable-panels:collapsed=false`;
    updateUtils({ isSidebarCollapsed: false });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case "ArrowRight":
            if (utils.isSidebarCollapsed) {
              handleExpand();
            }
            break;
          case "ArrowLeft":
            if (!utils.isSidebarCollapsed) {
              handleCollapse();
            }
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [utils.isSidebarCollapsed]);

  const handleSelectMenuItem = (item) => {
    if (utils.currentPath !== item.key && item.key) {
      navigate(item.key);
    }
    if (screenSizeFactor < 6) updateUtils({ isSidebarCollapsed: true });
  };

  const menuItems = useMemo(
    () => [
      {
        key: "/dashboard",
        icon: <LuLayoutDashboard />,
        label: "Dashboard",
      },
      {
        key: "/modules",
        icon: <LuHeadphones />,
        label: <WithAddIcon label="Modules" to="/modules/new" />,
      },
    ],
    [utils.isSidebarCollapsed]
  );

  const getKeys = (menuItem) => {
    if (menuItem.children?.length)
      return menuItem.children.map((item) => getKeys(item));
    else if (menuItem.key) return menuItem.key;
  };

  useEffect(() => {
    const navKeys = menuItems.map((item) => getKeys(item)).flat(Infinity);

    updateUtils({
      openedKeys: pathname.split("/").reduce((acc, cur, i, arr) => {
        if (i === arr.length || !cur) return acc;
        acc.push(arr.slice(0, i + 1).join("/"));
        return acc;
      }, []),
      currentPath: pathname,
      activeNavItem: navKeys.find((key) => pathname.includes(key)),
    });
    const activeElement = document.activeElement;
    if (activeElement) {
      activeElement.blur();
    }
    if (screenSizeFactor < 6 && !utils.isSidebarCollapsed)
      updateUtils({ isSidebarCollapsed: true });
  }, [pathname]);

  useEffect(() => {
    if (screenSizeFactor < 6) {
      if (!utils.isSidebarCollapsed) updateUtils({ isSidebarCollapsed: true });
    } else {
      const isCollapsed = getCookie("react-resizable-panels:collapsed");
      updateUtils({ isSidebarCollapsed: isCollapsed === "true" });
    }
  }, [screenSizeFactor]);

  return (
    <Layout className="bg-background h-[100vh] overflow-hidden">
      <Sider
        collapsed={utils.isSidebarCollapsed}
        collapsible
        width={screenSizeFactor < 5 ? "100%" : 260}
        collapsedWidth={screenSizeFactor < 6 ? 0 : 60}
        trigger={null}
        breakpoint="lg"
        className="bg-background border-r border-accent lg:relative absolute w-full z-[1000] flex flex-col"
      >
        <div
          className={cn(
            "logo flex h-[50px] border-b border-accent items-center bg-background px-2",
            utils.isSidebarCollapsed
              ? "justify-center"
              : screenSizeFactor < 6
              ? "justify-between"
              : "justify-center"
          )}
        >
          <h2 className="text-lg font-semibold text-center">
            {utils.isSidebarCollapsed ? "W" : "WEGODIGITAL"}
          </h2>
          {screenSizeFactor < 6 && (
            <Button
              size="small"
              className="px-0"
              onClick={handleCollapse}
              icon={<LuX />}
            />
          )}
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hidden border-0 relative">
          {utils.isSidebarCollapsed ? (
            <Menu
              mode="inline"
              defaultSelectedKeys={[utils.activeNavItem]}
              className="border-0 mb-0"
              items={menuItems}
              selectedKeys={[utils.activeNavItem]}
              onClick={handleSelectMenuItem}
            />
          ) : (
            <Menu
              mode="inline"
              defaultSelectedKeys={[utils.activeNavItem]}
              className="border-0 mb-0"
              items={menuItems}
              selectedKeys={[utils.activeNavItem]}
              openKeys={
                screenSizeFactor < 6 && utils.isSidebarCollapsed
                  ? null
                  : utils.openedKeys
              }
              onOpenChange={(openKeys) => {
                updateUtils({ openedKeys: openKeys });
              }}
              onClick={handleSelectMenuItem}
            />
          )}
        </div>
      </Sider>
      <Layout className="h-[100vh] overflow-hidden flex flex-col">
        <Header className="m-0 p-0 h-[50px] flex items-center border-b border-accent px-2 justify-between">
          {screenSizeFactor < 6 ? (
            <Button
              size="small"
              className="rounded-md"
              onClick={utils.isSidebarCollapsed ? handleExpand : handleCollapse}
            >
              <LuMenu />
            </Button>
          ) : (
            <>
              <Button
                size="small"
                className="rounded-md"
                onClick={() => {
                  if (utils.isSidebarCollapsed) {
                    handleExpand();
                  } else {
                    handleCollapse();
                  }
                }}
              >
                <LuChevronLeft
                  className={cn(
                    "transition-all duration-300",
                    utils.isSidebarCollapsed ? "rotate-180" : ""
                  )}
                />
              </Button>
            </>
          )}
        </Header>

        <Content className="bg-background m-0 p-0 flex-1 flex flex-col scrollbar">
          <TemplateContext.Provider
            value={{
              isSidebarCollapsed: utils.isSidebarCollapsed,
            }}
          >
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </TemplateContext.Provider>
        </Content>
      </Layout>
    </Layout>
  );
}

export const useTemplateContext = () => useContext(TemplateContext);

const WithAddIcon = ({ label, to }) => {
  const { pathname } = useLocation();
  const isAdd = pathname === to;
  const isSameModule = pathname.includes(to.split("/").slice(0, -1).join("/"));
  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <span>{label}</span>
      <Link
        to={to}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "p-[2px] group rounded-md relative border hover:border-antdPrimary transition-all duration-300",
          isAdd ? "bg-antdPrimary" : "hover:bg-antdPrimary",
          isSameModule ? "border-antdPrimary" : ""
        )}
      >
        <LuPlus
          className={cn(
            "transition-all duration-300",
            isAdd ? "text-white" : "group-hover:text-white",
            isSameModule ? (isAdd ? "" : "text-antdPrimary") : ""
          )}
        />
      </Link>
    </div>
  );
};

const AddFormLink = ({ to }) => {
  const { pathname } = useLocation();
  const isAdd = pathname === to;
  const isSameModule = pathname.includes(to.split("/").slice(0, -1).join("/"));
  return (
    <Link
      to={to}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "p-[2px] group rounded-md relative border hover:border-antdPrimary transition-all duration-300",
        isAdd ? "bg-antdPrimary" : "hover:bg-antdPrimary",
        isSameModule ? "border-antdPrimary" : ""
      )}
    >
      <LuPlus
        className={cn(
          "transition-all duration-300",
          isAdd ? "text-white" : "group-hover:text-white",
          isSameModule ? (isAdd ? "" : "text-antdPrimary") : ""
        )}
      />
    </Link>
  );
};
