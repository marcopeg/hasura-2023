import { getConfig } from "./defaults";
import { getNode } from "./get-node";
import { cloneTree } from "./clone-tree";

const insertItem = (nodes, target, newItem, offset = 1) => {
  const idx = nodes.indexOf(target);
  nodes.splice(idx + offset, 0, newItem);
};

export const appendNode = (nodes = [], node = null, config = {}) => {
  const { into, prepend, before, after, clone, childrenKey, parentKey } =
    getConfig({
      clone: false,
      after: null,
      before: null,
      into: null,
      prepend: false,
      ...config
    });

  // Clone tree before adding new data:
  const _nodes =
    typeof clone === "function"
      ? cloneTree(nodes, clone())
      : clone
      ? cloneTree(nodes)
      : nodes;

  // Add into root
  if (into === null && before === null && after === null) {
    if (prepend) {
      insertItem(_nodes, "-na-", node);
    } else {
      _nodes.push(node);
    }
  }

  if (into !== null) {
    const targetNode = getNode(_nodes, into, config);
    node[parentKey] = targetNode;
    if (prepend) {
      insertItem(targetNode[childrenKey], "-na-", node);
    } else {
      targetNode[childrenKey].push(node);
    }
  }

  if (after !== null) {
    const targetNode = getNode(_nodes, after, config);
    if (targetNode[parentKey]) {
      node[parentKey] = targetNode[parentKey];
      insertItem(targetNode[parentKey][childrenKey], targetNode, node);
    } else {
      insertItem(_nodes, targetNode, node);
    }
  }

  if (before !== null) {
    const targetNode = getNode(_nodes, before, config);
    if (targetNode[parentKey]) {
      insertItem(targetNode[parentKey][childrenKey], targetNode, node, 0);
    } else {
      insertItem(_nodes, targetNode, node, 0);
    }
  }

  return _nodes;
};
