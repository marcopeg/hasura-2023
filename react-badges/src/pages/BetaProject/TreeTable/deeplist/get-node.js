import { getNodeId } from "./get-node-id";
import { getConfig } from "./defaults";

// TODO: move from recursion to an iterative approach
export const getNode = (nodes = [], desiredNode = "", config) => {
  if (!nodes || !nodes.length) return null;

  const desiredNodeId = getNodeId(desiredNode, config);
  if (desiredNodeId === null) return null;

  const { idKey, childrenKey } = getConfig(config);

  for (const node of nodes) {
    // Match current node:
    if (desiredNodeId === node[idKey]) return node;

    // Descend into children:
    const sub = getNode(node[childrenKey], desiredNode, config);
    if (sub !== null) return sub;
  }

  return null;
};
