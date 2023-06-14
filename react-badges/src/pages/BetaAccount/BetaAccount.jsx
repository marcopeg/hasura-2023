import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Button,
  Paper,
  ListItemText,
  ListSubheader,
  Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { withBetaAccountGuard } from "../../state/with-beta-account-guard";
import { useScreenSize } from "../../utils/use-screen-size";
import BetaPage from "../../components/BetaPage";
import { ProjectItem } from "./ProjectItem";

const BetaAccount = ({
  uname,
  accountData,
  removeOwnProject,
  removeSharedProject
}) => {
  const { isBigScreen, isSmallScreen } = useScreenSize();

  const { own_projects: ownProjects, shared_projects: sharedProjects } =
    accountData;

  return (
    <BetaPage
      title="Hello, Unknown User"
      actions={
        isBigScreen && (
          <Button
            component={Link}
            to={`/beta/@me/create`}
            variant="contained"
            startIcon={<AddIcon />}
          >
            New&nbsp;Project
          </Button>
        )
      }
      menu={
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={`/beta/@me/create`}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New Project" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={`/beta/@me/import`}>
              <ListItemIcon>
                <UploadFileIcon />
              </ListItemIcon>
              <ListItemText primary="Import Project" />
            </ListItemButton>
          </ListItem>
        </List>
      }
    >
      <Paper sx={{ mb: isSmallScreen ? 12 : 0 }}>
        <List subheader={<ListSubheader>My Projects</ListSubheader>}>
          {ownProjects.map((project) => (
            <ProjectItem
              key={project.uuid}
              project={project}
              onDeleteRequest={removeOwnProject}
            />
          ))}
          <ListSubheader>Shared Projects</ListSubheader>
          {sharedProjects.map((project) => (
            <ProjectItem
              showOwner
              key={project.uuid}
              project={project}
              onDeleteRequest={removeSharedProject}
            />
          ))}
        </List>
      </Paper>
      {isSmallScreen && (
        <Fab
          component={Link}
          to={`/beta/@me/create`}
          color={"primary"}
          sx={{
            margin: 0,
            top: "auto",
            right: 30,
            bottom: 30,
            left: "auto",
            position: "fixed"
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </BetaPage>
  );
};

export default withBetaAccountGuard(BetaAccount);
