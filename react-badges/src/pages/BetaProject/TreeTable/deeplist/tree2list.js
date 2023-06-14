/**
 * tree2list
 * ===========
 *
 * Takes a tree and returns its mono-dimensional representation
 */

import { getConfig } from "./defaults";

export const tree2list = (nodes = [], config) => {
  const _config = getConfig(config);
  const { idKey, parentKey, parentIdKey, childrenKey, metaKey } = _config;

  const items = [];

  for (const node of nodes) {
    // Add item:
    items.push({
      [idKey]: node[idKey],
      [parentIdKey]: node[parentKey] ? node[parentKey][idKey] : null,
      ...node[metaKey]
    });

    // Add children:
    for (const sub of tree2list(node[childrenKey], _config)) {
      items.push(sub);
    }
  }

  return items;
};
