import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Stack } from "@mui/material";
import { Title } from "./Title";

export const PageTitle = ({ title, subtitle }) => {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  if (!title && !subtitle) return null;

  return (
    <Stack flexGrow={1}>
      <Title
        value={title}
        typographyProps={{
          variant: isBigScreen ? "h5" : "h6"
        }}
      />
      <Title value={subtitle} typographyProps={{ variant: "subtitle" }} />
    </Stack>
  );
};
