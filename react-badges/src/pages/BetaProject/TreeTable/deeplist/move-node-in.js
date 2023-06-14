import { getNode } from "./get-node";
// import { getConfig } from "./defaults";

export const moveNodeIn = (nodes = [], targetNode = "", config) => {
  const _node = getNode(nodes, targetNode, config);
  if (!_node) return null;

  if (_node.parent === null) {
    const idx = nodes.indexOf(_node);
    if (idx === 0) return null;

    const _prev = nodes[idx - 1];

    nodes.splice(idx, 1);
    _prev.children.push(_node);
    _node.parent = _prev;

    return nodes;
  }

  const idx = _node.parent.children.indexOf(_node);
  if (idx === 0) return null;

  const _prev = _node.parent.children[idx - 1];

  _node.parent.children.splice(idx, 1);
  _prev.children.push(_node);
  _node.parent = _prev;

  return nodes;
};
