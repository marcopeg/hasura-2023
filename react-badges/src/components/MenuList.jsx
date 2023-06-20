import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider
} from "@mui/material";

const MenuList = ({ showDetails, withDivider = true, title, items = [] }) => (
  <>
    <List subheader={showDetails && <ListSubheader>{title}</ListSubheader>}>
      {items.map(({ icon, to, onClick, text }) => (
        <ListItem disablePadding key={to + text}>
          <ListItemButton
            {...(onClick ? { onClick } : { component: Link, to })}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            {showDetails && <ListItemText primary={text} />}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    {withDivider && <Divider />}
  </>
);

export default MenuList;
