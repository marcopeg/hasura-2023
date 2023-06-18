import { useState, createContext, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeSwitcher = createContext();

const withMui =
  (Component, { startWith = "auto", ...avaliableThemes } = {}) =>
  (props) => {
    const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [currentTheme, setCurrentTheme] = useState(null);

    // Load initial theme:
    useEffect(() => {
      if (startWith === "auto" && localStorage.getItem("mui-theme")) {
        setCurrentTheme(localStorage.getItem("mui-theme"));
        return;
      }

      if (startWith === "auto") {
        setCurrentTheme(isDarkMode ? "dark" : "light");
        return;
      }

      setCurrentTheme(startWith);
    }, []);

    // Prevent rendering without a theme:
    if (!currentTheme) return null;

    const switchTheme = (to) => {
      localStorage.setItem("mui-theme", to);
      setCurrentTheme(to);
    };

    return (
      <ThemeSwitcher.Provider
        value={{ avaliableThemes, currentTheme, switchTheme }}
      >
        <ThemeProvider theme={createTheme(avaliableThemes[currentTheme])}>
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </ThemeSwitcher.Provider>
    );
  };

export const useThemeSwitcher = () => useContext(ThemeSwitcher);

export default withMui;
