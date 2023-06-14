import { getNode } from "./get-node";
import { getConfig } from "./defaults";
import { cloneTree } from "./clone-tree";

export const removeNode = (nodes = [], desiredNode = "", config) => {
  const { parentKey, childrenKey, clone } = getConfig({
    clone: false,
    ...config
  });

  // Clone tree before delete:
  const _nodes =
    typeof clone === "function"
      ? cloneTree(nodes, clone())
      : clone
      ? cloneTree(nodes)
      : nodes;

  // Identify the node
  const _node = getNode(_nodes, desiredNode, config);
  if (!_node) return nodes;

  // Apply the removal
  if (_node[parentKey]) {
    const _idx = _node[parentKey][childrenKey].indexOf(_node);
    _node[parentKey][childrenKey].splice(_idx, 1);
  } else {
    const _idx = _nodes.indexOf(_node);
    _nodes.splice(_idx, 1);
  }

  return _nodes;
};
