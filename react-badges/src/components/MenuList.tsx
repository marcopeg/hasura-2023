import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  Tooltip
} from "@mui/material";
import { ReactNode } from "react";

interface MenuButtonProps {
  showDetails: boolean;
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
  text: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  showDetails,
  icon,
  to,
  onClick,
  text
}) => {
  const props = onClick ? { onClick } : { component: Link, to };

  const btn = (
    <ListItemButton {...props}>
      <ListItemIcon>{icon}</ListItemIcon>
      {showDetails && <ListItemText primary={text} />}
    </ListItemButton>
  );

  return (
    <ListItem disablePadding>
      {showDetails ? (
        btn
      ) : (
        <Tooltip title={text} placement="right">
          {btn}
        </Tooltip>
      )}
    </ListItem>
  );
};

interface MenuListProps {
  showDetails: boolean;
  withDivider?: boolean;
  title?: string;
  items: MenuButtonProps[];
}

const MenuList: React.FC<MenuListProps> = ({
  showDetails,
  withDivider = true,
  title,
  items
}) => (
  <>
    <List subheader={showDetails && <ListSubheader>{title}</ListSubheader>}>
      {items.map((item) => (
        <MenuButton
          {...item}
          showDetails={showDetails}
          key={item.text + item.to}
        />
      ))}
    </List>
    {withDivider && <Divider />}
  </>
);

export default MenuList;
