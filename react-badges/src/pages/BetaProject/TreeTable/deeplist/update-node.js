import { getNode } from "./get-node";
import { getConfig } from "./defaults";
import { cloneTree } from "./clone-tree";

export const updateNode = (nodes = [], targetNode, update = {}, config) => {
  const { clone, metaKey } = getConfig({
    clone: false,
    ...config
  });

  // Clone tree before adding new data:
  const _nodes =
    typeof clone === "function"
      ? cloneTree(nodes, clone())
      : clone
      ? cloneTree(nodes)
      : nodes;

  // Get the node
  const _node = getNode(_nodes, targetNode, config);
  if (!_node) return nodes;

  // Update the meta information
  _node[metaKey] = {
    ..._node[metaKey],
    ...update
  };

  return _nodes;
};
