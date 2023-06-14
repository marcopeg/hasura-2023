export const getNodeIdFromString = (nodeId) => {
  if (nodeId === 0) return 0;
  if (nodeId === Infinity) return null;
  if (!Boolean(nodeId)) return null;
  return nodeId;
};

export const getNodeId = (node = "") => {
  if (node === 0) return 0;
  if (node === Infinity) return null;
  if (!Boolean(node)) return null;

  const nodeId = typeof node === "object" ? node.id : node;
  return getNodeIdFromString(nodeId);
};
