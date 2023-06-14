import { useRef } from "react";

import { QRCode } from "react-qrcode-logo";
import {
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { useClipboard } from "../../../utils/use-clipboard";
import { useKeyboardEvent } from "../../../utils/use-keyboard-event";
import BetaPage from "../../../components/BetaPage";
import AddTask from "../../../components/AddTask";
import TreeTable from "../TreeTable";

/**
 *
 * @param {*} param0
 * @returns
 */
export const BetaProjectUI = ({ projectData, onTreeTableChange }) => {
  const { clip } = useClipboard();
  const treeTableRef = useRef(null);
  const { uuid: projectID, title } = projectData;

  const shareProjectURL = `${window.location.origin}/beta/@me/import?projectID=${projectID}`;

  const exportToJSON = () => {
    const el = document.createElement("a");

    el.setAttribute(
      "href",
      `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(treeTableRef.current.getData(), null, 2)
      )}`
    );
    el.setAttribute("download", `${encodeURIComponent(title)}.json`);
    el.click();
  };

  const useCombos = (combos = [], fn) =>
    combos.forEach((combo) =>
      useKeyboardEvent(combo, (e) => {
        if (treeTableRef.current.isEditMode()) return;
        e.preventDefault();
        e.stopPropagation();
        fn(e);
      })
    );

  useCombos(["s"], exportToJSON);
  useCombos(["Enter", "e"], () => treeTableRef.current.startEdit());
  useCombos(["ArrowDown"], () => treeTableRef.current.moveFocusNext());
  useCombos(["ArrowUp"], () => treeTableRef.current.moveFocusPrev());
  useCombos(["Space"], () => treeTableRef.current.toggleNode());
  useCombos(["Backspace"], () => {
    const currNode = treeTableRef.current.getCurrentNode();
    treeTableRef.current.removeNode(currNode, {
      confirm: (node) =>
        confirm(`Sure you want to remove this node?\n${node.id}`),
      setFocus: true
    });
  });

  return (
    <BetaPage
      title={title}
      subtitle={`Shall be completed when...`}
      linkBackTo={`/beta/@me`}
      menu={({ closeMenu }) => (
        <List>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => clip(projectID)}
              >
                <ContentCopyIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="ProjectID"
              secondary={
                <span onClick={() => clip(projectID)}>{projectID}</span>
              }
            />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => clip(shareProjectURL)}
              >
                <ContentCopyIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="Share via url:"
              secondary={
                <a
                  href={shareProjectURL}
                  target="_blank"
                  style={{ color: "white" }}
                >
                  Open in New Tab
                </a>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Share via QRCode:"
              secondary={<QRCode value={shareProjectURL} size={180} />}
            />
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              onClick={() => {
                treeTableRef.current.showEditor();
                closeMenu();
              }}
            >
              Edit Source Code
            </Button>
          </ListItem>
        </List>
      )}
      actions={
        <IconButton onClick={exportToJSON} title="Export to JSON (Shortcut: s)">
          <FileDownloadIcon />
        </IconButton>
      }
    >
      <Stack spacing={2} flex={1}>
        <AddTask
          placeholder={"(Ctrl + P) Prepend a new item"}
          shortcut={"Ctrl + p"}
          onSubmit={(title) =>
            treeTableRef.current.prependNode({
              title
            })
          }
        />
        <TreeTable
          ref={treeTableRef}
          etag={projectData.etag}
          value={projectData.data}
          onChange={onTreeTableChange}
        />
        <AddTask
          placeholder={"(Ctrl + A) Append a new item"}
          shortcut={"Ctrl + a"}
          onSubmit={(title) =>
            treeTableRef.current.appendNode({
              title
            })
          }
        />
      </Stack>
    </BetaPage>
  );
};
