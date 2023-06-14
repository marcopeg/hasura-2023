import { getNode } from "./get-node";
import { getConfig } from "./defaults";
import { unwrapFn } from "./unwrap-fn";

const flatNext = (item, items) => {
  const idx = items.indexOf(item);
  if (idx < items.length - 1) {
    return items[idx + 1];
  }

  return null;
};

export const getNodeNext = (nodes = [], currentNode = "", config = {}) => {
  const _node = getNode(nodes, currentNode, config);
  if (!_node) return _node;

  const { canGoDown, parentKey, childrenKey, idKey } = getConfig({
    canGoDown: true, // or a function that receives the node
    ...config
  });

  // return first child
  if (_node[childrenKey].length && unwrapFn(canGoDown, _node)) {
    return _node[childrenKey][0];
  }

  // root case
  if (_node[parentKey] === null) {
    const _next = flatNext(_node, nodes);
    if (!_next) return null;

    if (unwrapFn(canGoDown, _node) && _node[childrenKey].length) {
      return null;
    }

    return _next;
  }

  // nested level
  const _next = flatNext(_node, _node[parentKey][childrenKey]);
  if (_next) return _next;

  // End of same level, iterate up to root
  let parent = _node[parentKey];
  let _loop = 0;
  while (parent[parentKey] && _loop < 100) {
    const _next = flatNext(parent, parent[parentKey][childrenKey]);
    if (_next) return _next;

    // Move up one level
    parent = parent[parentKey];
    _loop++;
  }

  if (_loop === 99) {
    console.warning(
      `Maximum depth level (100) reached while searching for next node of: ${_node[idKey]}`
    );
  }

  // Base for recursion
  return flatNext(parent, nodes);
};
