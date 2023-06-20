import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";

interface CenteredLayoutProps extends BoxProps {
  bgcolor?: string;
  color?: string;
}

const CenteredLayout = styled(Box)<CenteredLayoutProps>((props) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  minHeight: "100vh",
  height: "auto",
  paddingTop: "20vh", // start content at 20% from the top
  backgroundColor: props.bgcolor || "transparent",
  color: props.color || "inherit"
}));

export default CenteredLayout;
