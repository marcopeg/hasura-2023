import React, { FC, cloneElement } from "react";
import { Link } from "react-router-dom";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  Stack,
  useTheme,
  IconButton,
  Theme
} from "@mui/material";

import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import ErrorBoundary from "../../utils/ErrorBoundary";
import { useThemeSwitcher } from "../../state/with-mui";

interface AppBarDesktopProps {
  icon?: React.ReactElement;
  title: string;
  subtitle: string;
}

const AppBarDesktop: FC<AppBarDesktopProps> = ({ icon, title, subtitle }) => {
  const theme = useTheme<Theme>();
  const { switchTheme } = useThemeSwitcher();

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <MUIAppBar position="fixed">
      <Toolbar sx={{ "&.MuiToolbar-root": { paddingLeft: 1 } }}>
        {icon && (
          <IconButton component={Link} to="/" sx={{ mr: 1 }} color="inherit">
            {cloneElement(icon, { color: "inherit", fontSize: "large" })}
          </IconButton>
        )}
        <ErrorBoundary>
          <Stack flexGrow={1}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="caption">{subtitle}</Typography>
          </Stack>

          <IconButton
            color="inherit"
            onClick={() => switchTheme(isDarkMode ? "light" : "dark")}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </ErrorBoundary>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBarDesktop;
