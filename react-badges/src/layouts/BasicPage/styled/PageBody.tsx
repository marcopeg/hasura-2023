import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface PageBodyProps {
  theme?: Theme;
  scrollable?: string;
  spacing: number;
}

const PageBody = styled(Box)<PageBodyProps>(
  ({ theme, spacing, scrollable = "true" }) => ({
    display: "flex",
    flexDirection: "column",
    overflow: scrollable === "true" ? "auto" : "inherit",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.getContrastText(theme.palette.background.default),
    paddingLeft: theme.spacing(spacing),
    paddingRight: theme.spacing(spacing)
  })
);

export default PageBody;
