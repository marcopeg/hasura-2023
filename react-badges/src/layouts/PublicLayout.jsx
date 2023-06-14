import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Toolbar, Box, Stack, Typography, Button } from "@mui/material";
import { usePubSub } from "../utils/use-pubsub";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

const PublicLayout = () => {
  const { publish } = usePubSub();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Liste123
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button color="inherit" component="label">
                Import
                <input
                  type="file"
                  hidden
                  onChange={(evt) => publish("import::file", evt)}
                />
              </Button>
              <Button color="inherit" onClick={() => publish("export::json")}>
                Download
              </Button>
              <Button
                color="inherit"
                onClick={() => publish("export::clipboard")}
              >
                Copy
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default PublicLayout;
