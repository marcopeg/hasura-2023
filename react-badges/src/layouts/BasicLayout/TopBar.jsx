import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import { useThemeSwitcher } from "../../utils/with-mui";

const TopBar = ({ toggleDrawer, title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { switchTheme } = useThemeSwitcher();

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <AppBar position="fixed">
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

        {isMobile && (
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
