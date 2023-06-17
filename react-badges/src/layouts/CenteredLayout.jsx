import styled from "@emotion/styled";
import Box from "@mui/material/Box";

const CenteredLayout = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  height: auto;
  padding-top: 20vh; // start content at 20% from the top
  background-color: ${(props) => props.bgcolor || "transparent"};
  color: ${(props) => props.color || "inherith"};
`;

export default CenteredLayout;
