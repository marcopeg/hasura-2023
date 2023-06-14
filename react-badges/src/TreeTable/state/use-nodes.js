import { useContext } from "react";
import { TreeTableContext } from "./Context";
import { getNodeById } from "../../utils/deeplist";

export const useNodes = () => {
  const { nodes, setNodes, pubsub } = useContext(TreeTableContext);

  const onChange = (data) => {
    setNodes(data.items);
    pubsub.publish("nodes::changed", data.items);
  };

  return {
    nodes,
    onChange,
    getNodeById: (nodeId) => getNodeById(nodes, nodeId)
  };
};
