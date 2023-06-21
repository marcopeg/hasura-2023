import React from "react";
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

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={logout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        {showDetails && <ListItemText primary={"Logout"} />}
      </ListItemButton>
    </ListItem>
  );
};

export default Logout;
