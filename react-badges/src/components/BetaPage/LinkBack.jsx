import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

export const LinkBack = ({ to }) => (
  <IconButton component={Link} to={to} size="small">
    <ArrowBackIosIcon fontSize="inherit" />
  </IconButton>
);
