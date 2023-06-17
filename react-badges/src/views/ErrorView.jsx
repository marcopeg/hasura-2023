import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import CenteredLayout from "../layouts/CenteredLayout";
import { removeLoadable } from "../utils/with-loadable";
import { useAuth } from "../utils/with-authorization";

const ErrorView = ({ error }) => {
  const { logout } = useAuth();
  return (
    <CenteredLayout bgcolor="#FF4B5C" color="#fff">
      <Typography variant="h6">Ooooops!</Typography>
      <Typography variant="body1">{error.message}</Typography>

      <Button
        variant="contained"
        sx={{
          marginTop: 4,
          borderWidth: "1px",
          borderStyle: "solid",
          backgroundColor: "#D43A45",
          borderColor: "#D43A45",
          "&:hover": {
            borderColor: "#FFFFFF",

            backgroundColor: "#D43A45"
          }
        }}
        onClick={logout}
      >
        Not much I can do about it
      </Button>
    </CenteredLayout>
  );
};

export default removeLoadable(ErrorView);
