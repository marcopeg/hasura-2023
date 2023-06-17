import MUIButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

import CenteredLayout from "../layouts/CenteredLayout";
import { removeLoadable } from "../utils/with-loadable";
import { useAuth } from "../utils/with-authorization";

const Button = styled(({ color, variant, ...props }) => (
  <MUIButton color="primary" variant="contained" {...props} />
))({
  borderWidth: 1,
  borderStyle: "solid",
  backgroundColor: "#D43A45",
  borderColor: "#D43A45",
  color: "white",
  "&:hover": {
    borderColor: "#FFFFFF",
    backgroundColor: "#D43A45"
  }
});

const ErrorView = ({ error }) => {
  const { logout } = useAuth();
  return (
    <CenteredLayout bgcolor="#FF4B5C" color="#fff">
      <Typography variant="h6">Ooooops!</Typography>
      <Typography variant="body1">{error.message}</Typography>

      <Button onClick={logout} sx={{ mt: 4 }}>
        Not much I can do about it
      </Button>
    </CenteredLayout>
  );
};

export default removeLoadable(ErrorView);
