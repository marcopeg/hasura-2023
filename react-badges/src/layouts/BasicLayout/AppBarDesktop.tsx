import React, { FC } from "react";
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

import { useThemeSwitcher } from "../../state/with-mui";

interface AppBarDesktopProps {
  title: string;
  subtitle: string;
}

const AppBarDesktop: FC<AppBarDesktopProps> = ({ title, subtitle }) => {
  const theme = useTheme<Theme>();
  const { switchTheme } = useThemeSwitcher();

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <MUIAppBar position="fixed">
      <Toolbar>
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
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBarDesktop;
