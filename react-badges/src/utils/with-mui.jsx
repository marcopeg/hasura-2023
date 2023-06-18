import { useState, createContext, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeSwitcher = createContext();

const withMui =
  (Component, { startWith = "auto", ...avaliableThemes } = {}) =>
  (props) => {
    const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [theme, setTheme] = useState(null);

    // Load initial theme:
    useEffect(() => {
      if (startWith === "auto" && localStorage.getItem("mui-theme")) {
        setTheme(localStorage.getItem("mui-theme"));
        return;
      }

      if (startWith === "auto") {
        setTheme(isDarkMode ? "dark" : "light");
        return;
      }

      setTheme(startWith);
    }, []);

    // Prevent rendering without a theme:
    if (!theme) return null;

    const switchTheme = (to) => {
      localStorage.setItem("mui-theme", to);
      setTheme(to);
    };

    return (
      <ThemeSwitcher.Provider value={{ avaliableThemes, theme, switchTheme }}>
        <ThemeProvider theme={createTheme(avaliableThemes[theme])}>
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </ThemeSwitcher.Provider>
    );
  };

export const useThemeSwitcher = () => useContext(ThemeSwitcher);

export default withMui;
