import { getNode } from "./get-node";
import { getConfig } from "./defaults";
import { unwrapFn } from "./unwrap-fn";

const lastChild = (node, canGoDown, { childrenKey }) => {
  if (!node) return null;
  if (!canGoDown) return node;

  if (node[childrenKey].length === 0) return node;
  return lastChild(node[childrenKey][node[childrenKey].length - 1], canGoDown, {
    childrenKey
  });
};

const flatPrev = (item, items) => {
  const idx = items.indexOf(item);
  if (idx === 0) return null;

  return items[idx - 1];
};

export const getNodePrev = (nodes = [], currentNode = "", config = {}) => {
  const _node = getNode(nodes, currentNode, config);
  if (!_node) return _node;

  const { canGoDown, parentKey, childrenKey } = getConfig({
    canGoDown: true, // or a function that receives the node
    ...config
  });

  // root case
  if (_node[parentKey] === null) {
    const _prev = flatPrev(_node, nodes);
    return lastChild(_prev, unwrapFn(canGoDown, _prev), { childrenKey });
  }

  // Nested previous item
  const _prev = flatPrev(_node, _node[parentKey][childrenKey]);
  if (_prev)
    return lastChild(_prev, unwrapFn(canGoDown, _prev), { childrenKey });

  // Return the parent node
  if (_node[parentKey]) {
    return _node[parentKey];
  }

  return null;
};
