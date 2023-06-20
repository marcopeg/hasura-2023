import styled from "@emotion/styled";
import { Drawer } from "@mui/material";

const MobileDrawer = styled(Drawer)({
  width: "75vw",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "75vw"
  }
});

export default MobileDrawer;
