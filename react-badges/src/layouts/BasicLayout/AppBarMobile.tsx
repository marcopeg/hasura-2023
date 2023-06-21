import React, { FC } from "react";
import { Link } from "react-router-dom";

import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton
} from "@mui/material";

import ErrorBoundary from "../../utils/ErrorBoundary";

export interface AppBarActionType {
  icon: any;
  text: string;
  link?: string;
  onClick?: any;
}

export interface AppBarMobileProps {
  options: AppBarActionType[];
}

const AppBarMobile: FC<AppBarMobileProps> = ({ options }) => (
  <MUIAppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
    <Toolbar>
      <ErrorBoundary>
        <Stack flexGrow={1} direction={"row"} justifyContent={"space-around"}>
          {options.map((item) => {
            const props = item.onClick
              ? { onClick: item.onClick }
              : { component: Link, to: item.link };

            return (
              <Stack alignItems={"center"} key={item.text}>
                <IconButton color="inherit" onClick={item.onClick} {...props}>
                  {item.icon}
                </IconButton>
                <Typography variant="caption">{item.text}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </ErrorBoundary>
    </Toolbar>
  </MUIAppBar>
);

export default AppBarMobile;
