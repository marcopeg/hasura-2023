import { getConfig } from "./defaults";

const getNodeIdFromString = (nodeId) => {
  if (nodeId === 0) return 0;
  if (nodeId === Infinity) return null;
  if (!Boolean(nodeId)) return null;
  return nodeId;
};

export const getNodeId = (node = "", config) => {
  const { idKey } = getConfig(config);

  if (node === 0) return 0;
  if (node === Infinity) return null;
  if (!Boolean(node)) return null;

  const nodeId = typeof node === "object" ? node[idKey] : node;
  return getNodeIdFromString(nodeId);
};
