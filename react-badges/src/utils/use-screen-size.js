import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useScreenSize = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return {
    isBigScreen: smUp,
    isSmallScreen: !smUp
  };
};
