import React from "react";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadableCurtainProps {
  text?: string;
}

const LoadableCurtain: React.FC<LoadableCurtainProps> = ({ text }) => (
  <>
    <CircularProgress color="inherit" />
    {text && <Typography mt={2}>{text}</Typography>}
  </>
);

export default LoadableCurtain;
