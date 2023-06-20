import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  SupervisorAccount as ManagersIcon,
  Engineering as EngineersIcon,
  Security as ShieldIcon
} from "@mui/icons-material";

const BackofficeMenu: React.FC = () => {
  return (
    <List disablePadding>
      <ListSubheader>Backoffice</ListSubheader>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/managers">
          <ListItemIcon>
            <ManagersIcon />
          </ListItemIcon>
          <ListItemText primary="Managers" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/engineers">
          <ListItemIcon>
            <EngineersIcon />
          </ListItemIcon>
          <ListItemText primary="Engineers" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/badges">
          <ListItemIcon>
            <ShieldIcon />
          </ListItemIcon>
          <ListItemText primary="Badges" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default BackofficeMenu;
