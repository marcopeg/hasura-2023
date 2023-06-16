import styled from "@emotion/styled";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Fullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  z-index: 9999;
`;

const LoadableCurtain = ({ text }) => (
  <Fullscreen>
    <CircularProgress color="inherit" />
    {text && <Typography mt={2}>{text}</Typography>}
  </Fullscreen>
);

export default LoadableCurtain;
