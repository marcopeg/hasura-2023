import { useNode } from "../state/use-node";
import { useEditMode } from "../state/use-edit-mode";
import { Box } from "@mui/material";
import Input from "./TextInput";

export const Title = ({ node, helpMode = false }) => {
  const { isEditMode, requestEditMode, requestViewMode } = useEditMode(node);

  const {
    update,
    data: { id, title }
  } = useNode(node);

  const handleChange = (title) => {
    update({ title });
  };

  return isEditMode ? (
    <Input
      value={title}
      onChange={handleChange}
      onBlur={requestViewMode}
      style={{
        flex: 1,
        background: "transparent",
        color: "white",
        border: "none",
        outline: "none",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontSize: "1rem",
        paddingTop: 2,
        paddingBottom: 2
      }}
    />
  ) : (
    <Box onClick={requestEditMode} sx={{ flex: 1 }}>
      {title || <i>write something here!</i>}
      {helpMode && <i>{" when..."}</i>}
    </Box>
  );
};

export default Title;
