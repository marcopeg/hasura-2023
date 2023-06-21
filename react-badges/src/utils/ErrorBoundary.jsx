import React from "react";
import ErrorView from "../views/ErrorView";

import { Box, Typography } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      // return <ErrorView error={this.state.error} />;
      return (
        <Box
          sx={{
            pt: 1,
            pl: 1,
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            backgroundColor: "#FF4B5C",
            color: "#FFF"
          }}
        >
          <Typography variant="h4">Oooooops!</Typography>
          <Typography variant="body1">{this.state.error.message}</Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
