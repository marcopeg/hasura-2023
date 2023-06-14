import { useState, useEffect } from "react";

import {
  Typography,
  Modal,
  Paper,
  TextField,
  Stack,
  Button
} from "@mui/material";

export const SourceCode = ({ open, value, onChange, onClose }) => {
  const [_value, setValue] = useState(value);

  // Import external value
  useEffect(() => {
    setValue(value);
  }, [value, open]);

  const applyCode = () => {
    try {
      JSON.parse(_value);
      onChange(_value);
      onClose();
    } catch (err) {
      alert("This is not correct JSON!");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{ p: 3 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          bgcolor: "black",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
          sx={{ mb: 2 }}
        >
          <Typography variang="h6">Edit Document:</Typography>
        </Stack>
        <TextField
          multiline
          fullWidth
          maxRows={20}
          value={_value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Stack direction="row" sx={{ mt: 2 }} justifyContent="flex-end">
          <Button onClick={onClose}>Close</Button>
          <Button onClick={applyCode} variant="contained">
            Apply
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
};
