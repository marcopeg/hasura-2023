import React, { FC } from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
  Theme
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import { useThemeSwitcher } from "../../state/with-mui";

interface TopBarProps {
  toggleDrawer: () => void;
  title: string;
  subtitle: string;
}

const TopBar: FC<TopBarProps> = ({ toggleDrawer, title, subtitle }) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const { switchTheme } = useThemeSwitcher();

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <MUIAppBar position="fixed" sx={isMobile ? { top: "auto", bottom: 0 } : {}}>
      <Toolbar>
        <Stack flexGrow={1}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="caption">{subtitle}</Typography>
        </Stack>

        {isDesktop && (
          <IconButton
            color="inherit"
            onClick={() => switchTheme(isDarkMode ? "light" : "dark")}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        )}

        {isMobile && (
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </MUIAppBar>
  );
};

export default TopBar;
