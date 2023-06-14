import { Box } from "@mui/material";

import { PageToolbar } from "./PageToolbar";

const BetaPage = ({ children, ...props }) => {
  return (
    // <Box>
    <Box>
      <PageToolbar sticky {...props} />
      <Box p={2} pl={3} pr={3}>
        {children}
      </Box>
    </Box>
    // </Box>
  );
};

export default BetaPage;
