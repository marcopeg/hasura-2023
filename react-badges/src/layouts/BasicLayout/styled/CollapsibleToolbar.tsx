import styled from "@emotion/styled";
import { Toolbar } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface CollapsibleToolbarProps {
  theme?: Theme;
}

const CollapsibleToolbar = styled(Toolbar)<CollapsibleToolbarProps>(
  ({ theme }) => ({
    justifyContent: "center",
    borderTop: `1px solid ${theme.palette.divider}`
  })
);

export default CollapsibleToolbar;
