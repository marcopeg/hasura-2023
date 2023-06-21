import React, { FC } from "react";
import { Box, IconButton, useMediaQuery, useTheme, Theme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import DesktopDrawer from "./styled/DesktopDrawer";
import MobileDrawer from "./styled/MobileDrawer";
import CollapsibleToolbar from "./styled/CollapsibleToolbar";

interface DrawerProps {
  children: React.ReactNode;
  width: number;
  collapsed: boolean;
  toggleCollapsed: () => void;
  // Why those MUIDrawer props are not properly bubbled out by Typescript?
  open: boolean;
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({
  children,
  width,
  collapsed,
  toggleCollapsed,
  ...props
}) => {
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const CustomDrawer = isDesktop ? DesktopDrawer : MobileDrawer;

  return (
    <CustomDrawer
      {...props}
      width={width}
      variant={isDesktop ? "permanent" : "temporary"}
      anchor={isDesktop ? "left" : "right"}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "auto"
        }}
      >
        {children}
      </Box>
      {isDesktop && (
        <CollapsibleToolbar>
          <IconButton onClick={toggleCollapsed}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </CollapsibleToolbar>
      )}
    </CustomDrawer>
  );
};

export default Drawer;
