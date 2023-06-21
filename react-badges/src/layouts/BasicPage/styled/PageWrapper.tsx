import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface PageWrapperProps {
  theme?: Theme;
  spacing: number;
  fullpage?: string;
}

const PageWrapper = styled(Paper)<PageWrapperProps>(
  ({ theme, fullpage = "false", spacing }) => ({
    display: "flex",
    flexDirection: "column",
    ...(fullpage === "true" ? { flexGrow: 1 } : {}),
    height: `calc(100vh - 164px - ${theme.spacing(spacing)} - ${theme.spacing(
      spacing
    )})`,
    marginTop: theme.spacing(spacing),
    marginLeft: theme.spacing(spacing),
    marginRight: theme.spacing(spacing),
    marginBottom: theme.spacing(spacing)
  })
);

export default PageWrapper;
