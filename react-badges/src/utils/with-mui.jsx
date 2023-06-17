import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const withMui =
  (Component, theme = {}) =>
  (props) =>
    (
      <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );

export default withMui;
