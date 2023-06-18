import { useState, useEffect } from "react";
import {
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListSubheader,
  useMediaQuery,
  useTheme
} from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import { useThemeSwitcher } from "../../utils/with-mui";

import Drawer from "./CollapsibleDrawer";
import TopBar from "./TopBar";

const drawerWidth = 250;
const collapsedDrawerWidth = 60;

const BasicLayout = ({ title, subtitle, children }) => {
  const { switchTheme } = useThemeSwitcher();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const showDetails = isMobile ? true : !collapsed;

  // Restore drawer collapsed state from LocalStorage:
  useEffect(() => {
    const value = localStorage.getItem("drawer-collapsed");
    if (value !== null) setCollapsed(value === "true" ? true : false);
  }, []);

  // Save & persist collapsed state:
  const toggleCollapsed = () => {
    localStorage.setItem("drawer-collapsed", !collapsed);
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar title={title} subtitle={subtitle} toggleDrawer={toggleDrawer} />
      <Drawer
        width={collapsed ? collapsedDrawerWidth : drawerWidth}
        open={open}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        onClose={toggleDrawer}
      >
        <List subheader={showDetails && <ListSubheader>Mode:</ListSubheader>}>
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
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default BasicLayout;
