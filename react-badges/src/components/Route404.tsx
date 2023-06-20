import React from "react";
import { Link } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenteredLayout from "../layouts/CenteredLayout";

const Route404: React.FC = () => {
  return (
    <CenteredLayout>
      <Typography variant="h3" component="h1" align="center">
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1" align="center">
        The page you requested does not exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        sx={{ mt: 2 }}
      >
        Go Back
      </Button>
    </CenteredLayout>
  );
};

export default Route404;
