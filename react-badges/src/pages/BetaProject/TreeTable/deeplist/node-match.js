import { getNode } from "./get-node";
import { getConfig } from "./defaults";

export const nodeMatch = (nodes = [], targetNode = "", match, config = {}) => {
  const _node = getNode(nodes, targetNode, config);
  if (!_node) return false;

  const _config = getConfig({
    all: false,
    ...config
  });
  const { childrenKey, all } = _config;

  if (!match) return true;

  // Recurse into the sub-tree:
  if (all && _node[childrenKey].length > 0)
    return _node[childrenKey].every((childNode) =>
      nodeMatch(nodes, childNode, match, config)
    );

  // Base of recursion:
  return match(_node, nodes, _config);
};
