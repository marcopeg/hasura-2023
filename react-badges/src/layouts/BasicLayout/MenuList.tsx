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

import { useBasicLayout } from ".";

interface MenuButtonProps {
  showDetails: boolean;
  icon: ReactNode;
  text: string;
  link?: string;
  onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  showDetails,
  icon,
  text,
  link,
  onClick
}) => {
  const props = onClick ? { onClick } : { component: Link, to: link };

  const btn = (
    <ListItemButton {...props} alignItems="center">
      <ListItemIcon
        sx={
          {
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center"
          }
        }
      >
        {icon}
      </ListItemIcon>
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
  withDivider?: boolean;
  title?: string;
  items: any[];
}

const MenuList: React.FC<MenuListProps> = ({
  withDivider = true,
  title,
  items
}) => {
  const { showDetails } = useBasicLayout();
  return (
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
};

export default MenuList;
