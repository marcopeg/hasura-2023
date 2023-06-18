import React, { useState } from "react";
import { Toolbar, Box } from "@mui/material";

import Drawer from "./CollapsibleDrawer";

import FakeContent from "./FakeContent";

import TopBar from "./TopBar";

const drawerWidth = 250;
const collapsedDrawerWidth = 70;

const BasicLayout = ({ title, subtitle, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar title={title} subtitle={subtitle} toggleDrawer={toggleDrawer} />
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
