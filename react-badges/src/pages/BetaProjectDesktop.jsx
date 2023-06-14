import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  TextField,
  Alert,
  AlertTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Modal,
  Paper
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { QRCode } from "react-qrcode-logo";

import { withBetaAccountGuard } from "../state/with-beta-account-guard";
import { useBetaProject } from "../state/use-beta-project";
import { useClipboard } from "../utils/use-clipboard";
import BetaPage from "../components/BetaPage";
import AddTask from "../components/AddTask";
import TreeTable from "../TreeTable";

const BetaProject = () => {
  const { clip } = useClipboard();
  const treeTableRef = useRef();
  const {
    loading,
    error,
    uuid,
    title,
    data,
    update,
    projectID,
    shareProjectURL
  } = useBetaProject();

  // Used for the inline code editor
  const [showEditor, setShowEditor] = useState(false);
  const [_data, setData] = useState(data);
  const [src, setSrc] = useState(JSON.stringify(data, null, 2));
  useEffect(() => {
    setData(data);
    setSrc(JSON.stringify(data, null, 2));
  }, [data]);

  const onChange = (data) => {
    setSrc(JSON.stringify(data, null, 2));
    update(title, data);
  };

  if (loading) {
    return null;
  }

  if (error)
    return (
      <BetaPage>
        <Alert
          severity="error"
          action={
            <Button component={Link} to={`/beta/@me`}>
              close
            </Button>
          }
        >
          <AlertTitle>Oooops!</AlertTitle>
          {error.message}
        </Alert>
      </BetaPage>
    );

  return (
    <BetaPage
      title={title}
      subtitle={`Shall be completed when...`}
      linkBackTo={`/beta/@me`}
      menu={
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
            <Button fullWidth onClick={() => setShowEditor(true)}>
              Edit code
            </Button>
          </ListItem>
        </List>
      }
    >
      <Stack spacing={2} flex={1}>
        <AddTask
          placeholder={"(Ctrl + P) Prepend a new item"}
          shortcut={"Ctrl + p"}
          onSubmit={(title) =>
            treeTableRef.current.prepend({
              title
            })
          }
        />

        <TreeTable ref={treeTableRef} data={_data} onChange={onChange} />

        <AddTask
          placeholder={"(Ctrl + A) Append a new item"}
          shortcut={"Ctrl + a"}
          onSubmit={(title) =>
            treeTableRef.current.append({
              title
            })
          }
        />
      </Stack>
      <Modal open={showEditor} onClose={() => setShowEditor(false)}>
        <Paper
          sx={{ p: 3 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            height: 600,
            bgcolor: "black",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
            sx={{ mb: 2 }}
          >
            <Typography variang="h6">Edit Document:</Typography>
            <Button onClick={() => setData(JSON.parse(src))}>Apply</Button>
          </Stack>
          <TextField
            multiline
            fullWidth
            maxRows={20}
            value={src}
            onChange={(e) => setSrc(e.target.value)}
          />
        </Paper>
      </Modal>
    </BetaPage>
  );
};

export default withBetaAccountGuard(BetaProject);
