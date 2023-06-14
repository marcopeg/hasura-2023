/**
 * list2tree
 * ===========
 *
 * Takes a mono-dimensional list of nodes with a "id/parentId" relational
 * property and converts it into a tree structure with upward circular reference.
 *
 * Each node has:
 * - id        <any>
 * - parent    <ref> circular reference to the parent node
 * - children  <[]>  noes
 * - meta      <{}>  any other property in the original item
 */

import { getConfig } from "./defaults";

const upsertNode = (map, nodeId, config) => {
  if (!nodeId) return null;
  const { idKey, parentKey, childrenKey, metaKey } = config;

  if (!map[nodeId]) {
    map[nodeId] = {
      [idKey]: nodeId,
      [parentKey]: null,
      [childrenKey]: [],
      [metaKey]: {}
    };
  }

  return map[nodeId];
};

export const list2tree = (items = [], config) => {
  const _config = getConfig(config);
  const { idKey, parentIdKey, childrenKey, parentKey, metaKey } = _config;

  const map = {};
  const root = [];

  for (const item of items) {
    const nodeId = item[idKey];
    const parentId = item[parentIdKey];

    // Upsert nodes
    const parent = upsertNode(map, parentId, _config);
    const node = upsertNode(map, nodeId, _config);

    // Set parent
    node[parentKey] = parent;

    // Add node's meta data
    const { [idKey]: _f1, [parentIdKey]: _f2, ...nodeData } = item;
    node[metaKey] = nodeData;

    if (parent) {
      parent[childrenKey].push(node);
    } else {
      root.push(node);
    }
  }

  return root;
};
