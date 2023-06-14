import "./PageToolbar.css";
import { Stack, Box, Toolbar } from "@mui/material";

import { useScreenSize } from "../../utils/use-screen-size";
import { PageTitle } from "./PageTitle";
import { LinkBack } from "./LinkBack";
import { LinkClose } from "./LinkClose";
import { Menu } from "./Menu";

export const PageToolbar = ({
  sticky,
  placeholder,
  title,
  subtitle,
  linkBackTo,
  linkCloseTo,
  actions,
  actionsLeft,
  menu
}) => {
  const { isSmallScreen } = useScreenSize();
  const renderLeftBox = () => {
    if (!actionsLeft && !linkBackTo) return;
    return (
      <Stack direction={"row"} alignItems={"center"}>
        {actionsLeft}
        {linkBackTo && <LinkBack to={linkBackTo} />}
      </Stack>
    );
  };

  const renderRightBox = () => {
    if (!actions && !menu && !linkCloseTo) return;

    return (
      <Stack direction={"row"} alignItems={"center"}>
        {actions}
        {menu && <Menu children={menu} />}
        {linkCloseTo && <LinkClose to={linkCloseTo} />}
      </Stack>
    );
  };

  if (
    !title &&
    !subtitle &&
    !linkBackTo &&
    !linkCloseTo &&
    !actions &&
    !actionsLeft &&
    !menu
  )
    return "";

  return (
    <>
      <Box
        position={sticky ? "fixed" : "inline"}
        sx={{ width: "100%", zIndex: 2 }}
        className="beta-page--toolbar"
      >
        <Toolbar
          sx={{
            backgroundColor: "background.default"
          }}
          style={{ minHeight: isSmallScreen ? 80 : 100 }}
        >
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            flexGrow={1}
          >
            {renderLeftBox()}
            <PageTitle title={title} subtitle={subtitle} />
            {renderRightBox()}
          </Stack>
          {placeholder && ""}
        </Toolbar>
      </Box>
      {sticky && (
        <Toolbar
          sx={{ pb: 3, pt: 3 }}
          style={{ minHeight: isSmallScreen ? 80 : 100 }}
        />
      )}
    </>
  );
};
