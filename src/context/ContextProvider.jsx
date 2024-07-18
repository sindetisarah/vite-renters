import React, { createContext, useContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const initialState = {
  theme: "system",
  setTheme: () => null,
};

// create context
const StateContext = createContext(initialState);

export const ContextProvider = ({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}) => {
  /**
   * Sidebar States
   */
  let isTabletMid = useMediaQuery({ query: `(max-width: 768px)` });

  const [checked, setChecked] = useState([]);
  const [hover, setHover] = useState(false);
  const [activeMenu, setActiveMenu] = useState(isTabletMid ? false : true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [config, setConfig] = useState({
    style: "new-york",
    theme: "slate",
    radius: 0.5,
  });

  const [currentColor, setCurrentColor] = useState(`hsl(101.2 83.2% 53.3%)`);
  // const [theme, setTheme] = useState(defaultTheme);
  const [theme, setTheme] = useState(() => {
    // Get the theme from local storage or default to the specified default theme
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  function toggleSidebar() {
    setActiveMenu(!activeMenu);
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   *  Theme and Background color States
   */

  // set theme color-mode
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const updateThemeMode = (mode) => {
    localStorage.setItem("vite-ui-theme", mode);
    localStorage.setItem("themeMode", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      // setTheme(systemTheme);
      // localStorage.setItem("vite-ui-theme", mode);
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);

    const currentThemeColor = localStorage.getItem("colorMode");
    // const themeColorFromStorage = localStorage.getItem("vite-ui-theme");
    if (currentThemeColor) {
      // use stored color
      setCurrentColor(currentThemeColor);
    }
    // if (themeColorFromStorage) {
    //   // use stored Theme
    //   setTheme(themeColorFromStorage);
    // }
  }, [theme, currentColor]);

  /**
   *  Value passed
   */
  const value = {
    updateThemeMode,
    isTabletMid,
    toggleSidebar,
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    hover,
    setHover,
    currentColor,
    setCurrentColor,
    setColor,
    config,
    setConfig,
    theme,
    setTheme: (theme) => {
      localStorage.setItem("vite-ui-theme", theme);
      setTheme(theme);
    },
  };

  return (
    <StateContext.Provider {...props} value={value}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (context === undefined)
    throw new Error("useStateContext must be used within a Context-Provider");

  return context;
};
