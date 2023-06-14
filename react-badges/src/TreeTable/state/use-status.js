import { useNode } from "./use-node";
import { isNodeCompleted } from "../../utils/deeplist";

export const useStatus = (node) => {
  const { update } = useNode(node);

  return {
    isCompleted: isNodeCompleted(node),
    toggleStatus: (evt, status) => update({ status })
  };
};
