import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "./CollapsibleDrawer";

import FakeContent from "./FakeContent";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const BasicLayout = ({ title, subtitle, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Stack flexGrow={1}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="caption">{subtitle}</Typography>
          </Stack>
          {isMobile && (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        width={collapsed ? collapsedDrawerWidth : drawerWidth}
        open={open}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onClose={toggleDrawer}
      >
        <FakeContent />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default BasicLayout;
