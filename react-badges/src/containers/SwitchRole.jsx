import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListSubheader
} from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

import { useAuth } from "../utils/with-authorization";
import { useBasicLayout } from "../layouts/BasicLayout";

const rolesToIcons = {
  backoffice: <AdminPanelSettingsIcon />,
  manager: <SupervisorAccountIcon />,
  engineer: <LocalPoliceIcon />
};

const SwitchRole = () => {
  const { roles, switchRole } = useAuth();
  const { showDetails } = useBasicLayout();

  // Hide if no multiple roles are available:
  if (roles.length === 1) return null;

  return (
    <List
      subheader={showDetails && <ListSubheader>Switch Role:</ListSubheader>}
    >
      {roles.map((role) => (
        <ListItem key={role} disablePadding>
          <ListItemButton onClick={() => switchRole(role)}>
            <ListItemIcon>{rolesToIcons[role]}</ListItemIcon>
            {showDetails && <ListItemText primary={role} />}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SwitchRole;
