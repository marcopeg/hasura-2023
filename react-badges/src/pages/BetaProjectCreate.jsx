import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { usePushID } from "../utils/use-pushid";
import { useScreenSize } from "../utils/use-screen-size";
import { Link } from "react-router-dom";
import { Button, TextField, Stack } from "@mui/material";
import BetaPage from "../components/BetaPage";
import { withBetaAccountGuard } from "../state/with-beta-account-guard";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $accountID: String!
    $projectID: String!
    $title: String!
    $data: jsonb!
  ) {
    project: insert_beta_projects_one(
      object: {
        uuid: $projectID
        account_uuid: $accountID
        title: $title
        data: $data
      }
    ) {
      projectID: uuid
      created_at
      updated_at
      title
    }
  }
`;

const ADD_OWN_PROJECT = gql`
  mutation AddOwnProject($accountID: String!, $project: jsonb!) {
    update_beta_accounts_by_pk(
      pk_columns: { uuid: $accountID }
      _append: { own_projects: $project }
    ) {
      own_projects
      uuid
    }
  }
`;

const BetaProjectCreate = ({ accountID, reloadAccount }) => {
  const { isBigScreen } = useScreenSize();
  const navigate = useNavigate();
  const { generatePushID } = usePushID();
  const [createProject] = useMutation(CREATE_PROJECT);
  const [addOwnProject] = useMutation(ADD_OWN_PROJECT);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const projectID = generatePushID();
    const title = evt.target.elements.title.value;

    try {
      // Create project:
      const res1 = await createProject({
        variables: {
          accountID,
          projectID,
          title,
          data: {
            collapse: [],
            items: [
              {
                id: generatePushID(),
                title: "My first item"
              },
              {
                id: generatePushID(),
                title: "My second item"
              }
            ]
          }
        }
      });

      // Add reference to user's account data:
      await addOwnProject({
        variables: {
          accountID,
          project: projectID
        }
      });

      // Reload account's data:
      await reloadAccount();

      navigate(`/beta/@me/${projectID}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <BetaPage title="Create New Project" linkBackTo={`/beta/@me`}>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField name="title" placeholder="Project's title" />
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
          <Button variant="contained" type="submit">
            Create
          </Button>
          {isBigScreen && (
            <Button component={Link} to={`/beta/@me`}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </BetaPage>
  );
};

export default withBetaAccountGuard(BetaProjectCreate);
