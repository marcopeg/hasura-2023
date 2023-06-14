import { useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Stack,
  Alert,
  IconButton,
  Popover
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const ProjectItem = ({ project, showOwner, onDeleteRequest }) => {
  const [popoverRef, setPopoverRef] = useState(null);
  const { uuid: projectId, title, uname, updated_at } = project;

  const formatDate = (_date) => {
    if (!_date) return "n/a";
    try {
      return formatDistance(new Date(_date), new Date(), { addSuffix: true });
    } catch (err) {
      console.log(err.message, _date);
    }
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (
      confirm(`Please confirm you really want to delete project:\n"${title}"`)
    ) {
      onDeleteRequest(projectId);
    }
  };
  const handleDeleteForced = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    onDeleteRequest(projectId);
  };

  // Project Not Found
  if (!updated_at)
    return (
      <ListItem>
        <Alert severity="warning" sx={{ flex: 1 }} onClose={handleDeleteForced}>
          {"404 - Project not found"}
        </Alert>
      </ListItem>
    );

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          onClick={(evt) => {
            evt.preventDefault();
            setPopoverRef(evt.currentTarget);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton to={projectId} component={Link}>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.default)
          }}
          secondary={
            <Stack component="span">
              {showOwner && (
                <Typography component="span">
                  shared by: <i>{uname}</i>
                </Typography>
              )}
              <Typography component="span">
                last updated: <i>{formatDate(updated_at)}</i>
              </Typography>
            </Stack>
          }
        />
      </ListItemButton>
      <Popover
        open={Boolean(popoverRef)}
        anchorEl={popoverRef}
        onClose={() => setPopoverRef(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </ListItem>
  );
};
