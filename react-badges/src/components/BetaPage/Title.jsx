import { Box, Typography } from "@mui/material";

export const Title = ({ value, typographyProps = {} }) => {
  if (!value) return null;

  return typeof value === "string" ? (
    <Typography {...typographyProps}>{value}</Typography>
  ) : (
    <Box>{value}</Box>
  );
};
