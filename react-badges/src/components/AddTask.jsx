import { useRef } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { useKeyboardEvent } from "../utils/use-keyboard-event";

const AddTask = ({ shortcut, onSubmit, scrollOptions = {}, ...props }) => {
  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current.focus();
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
      ...scrollOptions
    });
  };

  useKeyboardEvent(shortcut, () => {
    inputRef.current.focus();
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
      ...scrollOptions
    });
  });

  return (
    <Stack
      direction={"row"}
      spacing={2}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        {...props}
        fullWidth
        size="small"
        inputProps={{
          ref: inputRef,
          type: "text"
        }}
      />
      <Button variant="contained" type="submit">
        Add
      </Button>
    </Stack>
  );
};

export default AddTask;
