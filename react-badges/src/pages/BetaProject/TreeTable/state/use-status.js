import { useTreeTable } from "./use-tree-table";
import { updateNode, nodeMatch } from "../deeplist";

export const useStatus = (node) => {
  const { nodes, setNodes } = useTreeTable();

  return {
    isCompleted: nodeMatch(nodes, node, ($) => $.meta.status === true, {
      all: true
    }),
    toggleStatus: (evt, status) => {
      const _nodes = updateNode(nodes, node.id, { status }, { clone: true });
      setNodes(_nodes);
    }
  };
};
