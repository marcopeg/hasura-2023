import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../state/with-authorization";
import { useBasicLayout } from "../layouts/BasicLayout";

const Logout = () => {
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
