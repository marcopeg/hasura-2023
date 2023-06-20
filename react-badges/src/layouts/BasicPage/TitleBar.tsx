import React, { FC } from "react";
import { AppBar, Toolbar, Stack, Typography } from "@mui/material";

interface TitleBarProps {
  title?: string;
  subtitle?: string;
}

const TitleBar: FC<TitleBarProps> = ({ title, subtitle }) => {
  if (!title && !subtitle) return;

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="caption">{subtitle}</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
