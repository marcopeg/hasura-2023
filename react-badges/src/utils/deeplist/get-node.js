import { getNodeId } from "./get-node-id";

// TODO: move from recursion to an iterative approach
export const getNode = (nodes = [], desiredNode = "") => {
  if (!nodes || !nodes.length) return null;

  const desiredNodeId = getNodeId(desiredNode);
  if (desiredNodeId === null) return null;

  for (const node of nodes) {
    // Match current node:
    if (desiredNodeId === node.id) return node;

    // Descend into children:
    const sub = getNode(node.children, desiredNode);
    if (sub !== null) return sub;
  }

  return null;
};
