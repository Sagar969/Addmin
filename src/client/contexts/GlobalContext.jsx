import {
    createContext,
    useContext,
    useLayoutEffect,
    useMemo,
    useState,
  } from "react";
  
  const GlobalContext = createContext(null);
  
  const GlobalContextProvider = ({ children }) => {
    const [utils, setUtils] = useState({
      screenSizeFactor: 3,
    });
    const updateUtils = (newUtils) => {
      setUtils((prev) => ({ ...prev, ...newUtils }));
    };
  
    const screenSizes = useMemo(
      () =>
        Object.values(screenSizeFactors)
          .map((item) => item.maxWidth)
          .sort((a, b) => a - b),
      []
    );
  
    const handleResizeWindow = (e) => {
      const innerWidth = e?.target?.width || window.innerWidth;
      const newScreenSizeFactor =
        screenSizes.findIndex((item) => innerWidth < item) + 1;
      if (utils.screenSizeFactor !== newScreenSizeFactor)
        updateUtils({
          screenSizeFactor: newScreenSizeFactor,
        });
    };
  
    useLayoutEffect(() => {
      window.addEventListener("resize", handleResizeWindow);
  
      return () => {
        window.removeEventListener("resize", handleResizeWindow);
      };
    }, [utils.screenSizeFactor]);
  
    useLayoutEffect(() => {
      handleResizeWindow();
    }, []);
  
    return (
      <GlobalContext.Provider value={utils}>{children}</GlobalContext.Provider>
    );
  };
  
  const useGlobalContext = () => {
    return useContext(GlobalContext);
  };
  
  export { useGlobalContext, GlobalContextProvider };
  
  const screenSizeFactors = {
    1: { name: "extra small mobile", minWidth: 0, maxWidth: 320 }, // Up to 320px
    2: { name: "small mobile", minWidth: 321, maxWidth: 480 }, // 321px to 480px
    3: { name: "mobile", minWidth: 481, maxWidth: 640 }, // 481px to 640px
    4: { name: "small tablet", minWidth: 641, maxWidth: 768 }, // 641px to 768px
    5: { name: "tablet", minWidth: 769, maxWidth: 1024 }, // 769px to 1024px
    6: { name: "small laptop", minWidth: 1025, maxWidth: 1280 }, // 1025px to 1280px
    7: { name: "desktop", minWidth: 1281, maxWidth: 1536 }, // 1281px to 1440px
    8: { name: "large desktop", minWidth: 1537, maxWidth: 1920 }, // 1441px to 1920px
    9: { name: "ultra wide", minWidth: 1921, maxWidth: 1000000 }, // 1921px and above
  };
  