import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useScreenSize } from "../utils/use-screen-size";
import BetaPage from "../components/BetaPage";
import { withBetaAccountGuard } from "../state/with-beta-account-guard";

import { Box, Stack, TextField, Button, Typography } from "@mui/material";

const IMPORT_BY_ID = gql`
  mutation ImportProjectById($accountID: String!, $projectID: String!) {
    result: beta_project_import(
      args: { accountID: $accountID, projectID: $projectID }
    ) {
      payload
    }
  }
`;

const BetaProjectImport = ({ accountID, reloadAccount }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isBigScreen, isSmallScreen } = useScreenSize();
  const [projectID, setProjectID] = useState(
    searchParams.get("projectID") || ""
  );
  const [importByIdFn] = useMutation(IMPORT_BY_ID);

  const importById = async (evt) => {
    evt.preventDefault();
    await importByIdFn({
      variables: {
        accountID,
        projectID
      }
    });
    await reloadAccount();
    navigate(`/beta/@me/${projectID}`);
  };

  // Remove ProjectID from URL:
  useEffect(() => {
    setSearchParams({});
  }, []);

  return (
    <BetaPage title="Import project">
      <Box component={"form"} onSubmit={importById}>
        <Typography variant="h4">Import project by ID:</Typography>
        <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
          <TextField
            value={projectID}
            onChange={(e) => setProjectID(e.target.value)}
            sx={{ minWidth: isBigScreen ? 300 : 100 }}
            fullWidth={isSmallScreen}
          />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </Box>
    </BetaPage>
  );
};

export default withBetaAccountGuard(BetaProjectImport);
