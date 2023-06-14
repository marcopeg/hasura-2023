import { useState } from "react";

import {
  Stack,
  Popover,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
  Chip
} from "@mui/material";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ExpandCircleDownSharpIcon from "@mui/icons-material/ExpandCircleDownSharp";
import LabelSharpIcon from "@mui/icons-material/LabelSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp";
import PlaylistPlaySharpIcon from "@mui/icons-material/PlaylistPlaySharp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useClipboard } from "../../../../utils/use-clipboard";
import { useScreenSize } from "../../../../utils/use-screen-size";

import { useFocus } from "../state/use-focus";
import { useStatus } from "../state/use-status";
import { useCollapse } from "../state/use-collapse";
import { useApi } from "../state/use-api";

import Title from "./Title";

export const Node = ({ node }) => {
  const { clip } = useClipboard();
  const { isBigScreen } = useScreenSize();

  const { insertNodeAfter, insertNodeInto, removeNode } = useApi();

  const { hasFocus, requestFocus } = useFocus(node);
  const { isCollapsed, toggleCollapse } = useCollapse(node);
  const { isCompleted, toggleStatus } = useStatus(node);
  const [menuTarget, setMenuTarget] = useState(null);

  const handleDelete = (e) => {
    setMenuTarget(null);
    if (
      confirm(
        `Confirm you want to delete task: ${node.id
          .slice(-3)
          .toUpperCase()}:\n${node.title}`
      )
    ) {
      removeNode(node);
    }
  };

  const handleAddAfter = () => {
    setMenuTarget(null);
    insertNodeAfter(node, {}, true);
  };

  const handleAddInto = () => {
    setMenuTarget(null);
    insertNodeInto(node, {}, true);
  };

  return (
    <Stack
      direction={"row"}
      spacing={1}
      onClick={requestFocus}
      alignItems={"center"}
      className={[
        "treetable-item",
        "treetable-item-node",
        ...[hasFocus ? "treetable-item-focus" : null]
      ].join(" ")}
    >
      {node.children.length === 0 ? (
        <IconButton onClick={(e) => toggleStatus(e, !isCompleted)} size="small">
          {isCompleted ? <TaskAltIcon /> : <RadioButtonUncheckedSharpIcon />}
        </IconButton>
      ) : (
        <IconButton onClick={toggleCollapse} size="small">
          {isCollapsed ? (
            isCompleted ? (
              <ExpandCircleDownSharpIcon />
            ) : (
              <ExpandMoreIcon />
            )
          ) : isCompleted ? (
            <ExpandCircleDownSharpIcon sx={{ transform: "rotate(180deg)" }} />
          ) : (
            <ExpandLessIcon />
          )}
        </IconButton>
      )}
      <Title node={node} helpMode={false} />
      {isBigScreen && (
        <Chip
          label={node.id.slice(-3).toUpperCase()}
          variant="outlined"
          size="small"
          icon={<LabelSharpIcon />}
          onClick={() => clip(node.id)}
        />
      )}
      <IconButton
        size={"small"}
        onClick={(e) => setMenuTarget(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={Boolean(menuTarget)}
        anchorEl={menuTarget}
        onClose={() => setMenuTarget(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <List>
          <ListItem
            secondaryAction={
              <IconButton edge="end" onClick={() => clip(node.id)}>
                <ContentCopyIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="TaskID"
              secondary={<span onClick={() => clip(node.id)}>{node.id}</span>}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleAddAfter}>
              <ListItemIcon>
                <PlaylistAddSharpIcon />
              </ListItemIcon>
              <ListItemText primary="New task after" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleAddInto}>
              <ListItemIcon>
                <PlaylistPlaySharpIcon />
              </ListItemIcon>
              <ListItemText primary="New task inside" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete Item" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Stack>
  );
};
