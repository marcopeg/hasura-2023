import styled from "@emotion/styled";
import { Drawer } from "@mui/material";

interface DesktopDrawerProps {
  width: number;
}

const DesktopDrawer = styled(Drawer)<DesktopDrawerProps>(
  ({ width, theme }) => ({
    width,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width,
      top: "64px",
      height: "calc(100% - 64px)"
    }
  })
);

export default DesktopDrawer;
