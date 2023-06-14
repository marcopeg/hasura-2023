import { useTreeTable } from "./use-tree-table";
import { getNodeId } from "../deeplist";

export const useFocus = (node) => {
  const { focus, setFocus } = useTreeTable();

  return {
    hasFocus: focus === node.id,
    requestFocus: (target) => setFocus(target ? getNodeId(target) : node.id)
  };
};
