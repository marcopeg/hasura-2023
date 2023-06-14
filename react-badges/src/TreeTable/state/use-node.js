import { useContext, useCallback } from "react";
import { TreeTableContext } from "./Context";
import { updateNodeById } from "../../utils/deeplist";

export const useNode = (node) => {
  const { nodes, setNodes, pubsub } = useContext(TreeTableContext);
  const { children, ...data } = node;

  const update = useCallback(
    (change) => {
      setNodes((curr) => updateNodeById(curr, node.id, change));
      pubsub.publish("node::changed", { node, change });
    },
    [nodes, node]
  );

  return {
    id: node.id,
    data,
    children,
    update
  };
};
