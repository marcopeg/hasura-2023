import styled from "@emotion/styled";

import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

const Fullscreen = styled.div(
  ({ theme }) => `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.palette.background.default};
  color: ${theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main};
  z-index: 9999;
`
);

const LoadableCurtain = ({ text }) => (
  <Fullscreen>
    <CircularProgress color="inherit" />
    {text && <Typography mt={2}>{text}</Typography>}
  </Fullscreen>
);

export default LoadableCurtain;
