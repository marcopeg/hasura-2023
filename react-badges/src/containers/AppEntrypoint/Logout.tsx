import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../state/with-auth";
import { useBasicLayout } from "../../layouts/BasicLayout";

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const { showDetails } = useBasicLayout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleClick}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ListItemIcon sx={showDetails ? {} : { minWidth: "auto" }}>
          <LogoutIcon />
        </ListItemIcon>
        {showDetails && <ListItemText primary={"Logout"} />}
      </ListItemButton>
    </ListItem>
  );
};

export default Logout;
