import { useContext } from "react";
import { TreeTableContext } from "./Context";

export const useFocus = (node) => {
  const { focus, setFocus } = useContext(TreeTableContext);

  return {
    hasFocus: focus === node.id,
    requestFocus: () => setFocus(node.id)
  };
};
