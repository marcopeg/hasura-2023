import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "./CollapsibleDrawer";

import FakeContent from "./FakeContent";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const BasicLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const currWidth = collapsed ? collapsedDrawerWidth : drawerWidth;

  const handleDrawerToggle = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            MyApp
          </Typography>
          {isMobile && (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        width={currWidth}
        open={open}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onClose={handleDrawerToggle}
      >
        <FakeContent />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <FakeContent />
      </Box>
    </Box>
  );
};

export default BasicLayout;
