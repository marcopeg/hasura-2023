import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  cloneElement,
  FC,
  ReactNode
} from "react";

import {
  Toolbar,
  Box,
  Stack,
  List,
  ListSubheader,
  useMediaQuery,
  useTheme,
  Theme
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import ErrorBoundary from "../../utils/ErrorBoundary";
import Drawer from "./Drawer";
import AppBarDesktop from "./AppBarDesktop";
import AppBarMobile, { AppBarActionType } from "./AppBarMobile";

const drawerWidth = 250;
const collapsedDrawerWidth = 70;

interface BasicLayoutProps {
  icon?: React.ReactElement;
  title: string;
  subtitle: string;
  drawerContents?: React.ReactElement[];
  drawerUtils?: React.ReactElement[];
  mobileUtils?: AppBarActionType[];
  children?: ReactNode;
}

interface BasicLayoutContextProps {
  showDetails: boolean;
  toggleCollapsed: () => void;
}

const BasicLayoutContext = createContext<BasicLayoutContextProps>(
  {} as BasicLayoutContextProps
);

const BasicLayout: FC<BasicLayoutProps> = ({
  icon,
  title,
  subtitle,
  children,
  drawerContents = [],
  drawerUtils = [],
  mobileUtils = []
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const showDetails = isMobile ? true : !collapsed;

  // Restore drawer collapsed state from LocalStorage:
  useEffect(() => {
    const value = localStorage.getItem("drawer-collapsed");
    if (value !== null) setCollapsed(value === "true" ? true : false);
  }, []);

  // Save & persist collapsed state:
  const toggleCollapsed = () => {
    localStorage.setItem("drawer-collapsed", !collapsed ? "true" : "false");
    setCollapsed(!collapsed);
  };

  return (
    <BasicLayoutContext.Provider
      value={{
        showDetails,
        toggleCollapsed
      }}
    >
      <Box sx={{ display: "flex" }}>
        {isMobile ? (
          <AppBarMobile
            options={[
              ...mobileUtils,
              {
                icon: <MenuIcon />,
                text: "menu",
                onClick: () => setOpen(true)
              }
            ]}
          />
        ) : (
          <AppBarDesktop icon={icon} title={title} subtitle={subtitle} />
        )}
        <Drawer
          width={collapsed ? collapsedDrawerWidth : drawerWidth}
          open={open}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          onClose={() => setOpen(false)}
        >
          <ErrorBoundary>
            <Stack justifyContent="space-between" flexGrow={1}>
              <Box>
                {drawerContents.map((item, key) => cloneElement(item, { key }))}
              </Box>
              {drawerUtils.length > 0 && (
                <List
                  subheader={
                    showDetails && <ListSubheader>Utilities:</ListSubheader>
                  }
                >
                  {drawerUtils.map((item, key) => cloneElement(item, { key }))}
                </List>
              )}
            </Stack>
          </ErrorBoundary>
        </Drawer>
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%"
          }}
        >
          {isDesktop && <Toolbar />}
          {children}
          {isMobile && <Toolbar />}
        </Box>
      </Box>
    </BasicLayoutContext.Provider>
  );
};

export const useBasicLayout = () => useContext(BasicLayoutContext);

export default BasicLayout;
