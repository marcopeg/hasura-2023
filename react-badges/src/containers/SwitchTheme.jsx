import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListSubheader
} from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import { useThemeSwitcher } from "../state/with-mui";
import { useBasicLayout } from "../layouts/BasicLayout";

const SwitchTheme = () => {
  const { switchTheme } = useThemeSwitcher();
  const { showDetails } = useBasicLayout();

  return (
    <List
      subheader={showDetails && <ListSubheader>Switch Theme:</ListSubheader>}
    >
      <ListItem disablePadding>
        <ListItemButton onClick={() => switchTheme("light")}>
          <ListItemIcon>
            <LightMode />
          </ListItemIcon>
          {showDetails && <ListItemText primary="Light mode" />}
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => switchTheme("dark")}>
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          {showDetails && <ListItemText primary="Dark mode" />}
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SwitchTheme;
