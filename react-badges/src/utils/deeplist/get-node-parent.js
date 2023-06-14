import { getNodeId } from "./get-node-id";

export const getNodeParent = (nodes = [], targetNode = "", parent = null) => {
  if (!nodes || !nodes.length) return null;

  const targetNodeId = getNodeId(targetNode);
  if (targetNodeId === null) return null;

  for (const currentNode of nodes) {
    if (targetNodeId === currentNode.id) return parent;

    const sub = getNodeParent(currentNode.children, targetNode, currentNode);
    if (sub !== null) return sub;
  }
  return null;
};
