import styled from "@emotion/styled";
import { Toolbar, Drawer, useMediaQuery, useTheme } from "@mui/material";

import DrawerToolbar from "./CollapsibleToolbar";

const DesktopDrawer = styled(Drawer)(({ width }) => ({
  width,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    overflow: "auto",
    width,
    top: "64px",
    height: "calc(100% - 64px)"
  }
}));

const MobileDrawer = styled(Drawer)(() => ({
  width: "75vw",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    overflow: "auto",
    width: "75vw"
  }
}));

const CollapsibleDrawer = ({
  children,
  width,
  collapsed,
  toggleCollapsed,
  ...props
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const Drawer = isDesktop ? DesktopDrawer : MobileDrawer;

  return (
    <Drawer
      {...props}
      desktop={isDesktop ? isDesktop.toString() : undefined}
      width={width}
      variant={isDesktop ? "permanent" : "temporary"}
      anchor={isDesktop ? "left" : "right"}
    >
      {children}
      {isDesktop && (
        <>
          <Toolbar />
          <DrawerToolbar
            width={width}
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
        </>
      )}
    </Drawer>
  );
};

export default CollapsibleDrawer;
