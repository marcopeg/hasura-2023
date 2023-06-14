import { getNode } from "./get-node";
import { getConfig } from "./defaults";

export const getNodeParent = (nodes = [], targetNode = "", config) => {
  const _config = getConfig(config);
  const { parentKey } = _config;

  const node = getNode(nodes, targetNode, _config);
  return node ? node[parentKey] : null;
};
