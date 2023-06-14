import { useContext } from "react";
import { useFocus } from "./use-focus";
import { TreeTableContext } from "./Context";

export const useEditMode = (node) => {
  const { isEditMode, setIsEditMode } = useContext(TreeTableContext);
  const { hasFocus, requestFocus } = useFocus(node);

  const requestEditMode = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    setIsEditMode(true);
    requestFocus();
  };

  const requestViewMode = () => {
    setIsEditMode(false);
  };

  return {
    isEditMode: isEditMode && hasFocus,
    requestEditMode,
    requestViewMode
  };
};
