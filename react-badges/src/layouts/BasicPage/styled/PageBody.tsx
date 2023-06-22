import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface PageBodyProps {
  theme?: Theme;
  scrollable?: string;
}

const PageBody = styled(Box)<PageBodyProps>(
  ({ theme, scrollable = "true" }) => ({
    display: "flex",
    flexDirection: "column",
    overflow: scrollable === "true" ? "auto" : "inherit"
  })
);

export default PageBody;
