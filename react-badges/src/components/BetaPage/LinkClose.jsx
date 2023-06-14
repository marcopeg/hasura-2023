import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export const LinkClose = ({ to }) => (
  <IconButton component={Link} to={to} size="large">
    <CloseIcon fontSize="inherit" />
  </IconButton>
);
