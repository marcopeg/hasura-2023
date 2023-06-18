import styled from "@emotion/styled";
import { Toolbar, IconButton } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const StyledToolbar = styled(Toolbar)(({ theme, width }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: `calc(${width}px - 1px)`,
  display: "flex",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`
}));

const CollapsibleToolbar = ({
  width,
  isDrawerCollapsed,
  setDrawerCollapsed
}) => (
  <>
    <Toolbar />
    <StyledToolbar width={width}>
      <IconButton onClick={() => setDrawerCollapsed(!isDrawerCollapsed)}>
        {isDrawerCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </StyledToolbar>
  </>
);

export default CollapsibleToolbar;
