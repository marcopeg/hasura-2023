// import {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   cloneElement
// } from "react";
// import {
//   Toolbar,
//   Box,
//   Stack,
//   List,
//   ListSubheader,
//   useMediaQuery,
//   useTheme
// } from "@mui/material";

// import Drawer from "./Drawer";
// import AppBar from "./AppBar";

// const drawerWidth = 250;
// const collapsedDrawerWidth = 60;

// const BasicLayoutContext = createContext();

// const BasicLayout = ({
//   title,
//   subtitle,
//   children,
//   drawerContents = [],
//   drawerUtils = []
// }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [open, setOpen] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
//   const showDetails = isMobile ? true : !collapsed;

//   // Restore drawer collapsed state from LocalStorage:
//   useEffect(() => {
//     const value = localStorage.getItem("drawer-collapsed");
//     if (value !== null) setCollapsed(value === "true" ? true : false);
//   }, []);

//   // Save & persist collapsed state:
//   const toggleCollapsed = () => {
//     localStorage.setItem("drawer-collapsed", !collapsed);
//     setCollapsed(!collapsed);
//   };

//   const toggleDrawer = () => setOpen(!open);

//   return (
//     <BasicLayoutContext.Provider
//       value={{
//         showDetails,
//         toggleCollapsed
//       }}
//     >
//       <Box sx={{ display: "flex" }}>
//         <AppBar title={title} subtitle={subtitle} toggleDrawer={toggleDrawer} />
//         <Drawer
//           width={collapsed ? collapsedDrawerWidth : drawerWidth}
//           open={open}
//           collapsed={collapsed}
//           toggleCollapsed={toggleCollapsed}
//           onClose={toggleDrawer}
//         >
//           <Stack justifyContent="space-between" flexGrow={1}>
//             <Box>
//               {drawerContents.map((item, key) => cloneElement(item, { key }))}
//             </Box>
//             {drawerUtils.length && (
//               <List
//                 subheader={
//                   showDetails && <ListSubheader>Utilities:</ListSubheader>
//                 }
//               >
//                 {drawerUtils.map((item, key) => cloneElement(item, { key }))}
//               </List>
//             )}
//           </Stack>
//         </Drawer>
//         <Box
//           component="main"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             height: "100vh",
//             width: "100%"
//           }}
//         >
//           {isDesktop && <Toolbar />}
//           {children}
//           {isMobile && <Toolbar />}
//         </Box>
//       </Box>
//     </BasicLayoutContext.Provider>
//   );
// };

// export const useBasicLayout = () => useContext(BasicLayoutContext);

// export default BasicLayout;

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

import Drawer from "./Drawer";
import AppBar from "./AppBar";

const drawerWidth = 250;
const collapsedDrawerWidth = 60;

interface BasicLayoutProps {
  title: string;
  subtitle: string;
  drawerContents?: React.ReactElement[];
  drawerUtils?: React.ReactElement[];
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
  title,
  subtitle,
  children,
  drawerContents = [],
  drawerUtils = []
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

  const toggleDrawer = () => setOpen(!open);

  return (
    <BasicLayoutContext.Provider
      value={{
        showDetails,
        toggleCollapsed
      }}
    >
      <Box sx={{ display: "flex" }}>
        <AppBar title={title} subtitle={subtitle} toggleDrawer={toggleDrawer} />
        <Drawer
          width={collapsed ? collapsedDrawerWidth : drawerWidth}
          open={open}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          onClose={toggleDrawer}
        >
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
