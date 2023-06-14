import { generatePushID } from "../use-pushid";

/**
 * Shall we look into a deep clone library?
 */
export const clone = (nodes) =>
  nodes.map((node) => ({
    ...node,
    children: clone(node.children)
  }));

/**
 * This can be improved A LOT
 */
export const flat = (nodes, parentId = null) => {
  const list = [];

  nodes.forEach((node) => {
    const { children, ...data } = node;
    list.push({ ...data, parentId });
    flat(children, data.id).forEach(($) => list.push($));
  });

  return list;
};

/**
 * Change this with PushID
 */
export const createId = () => generatePushID();

export const createNode = ({
  id,
  title,
  status,
  children,
  ...payload
} = {}) => ({
  id: id || createId(),
  title: Boolean(title) || title === "" ? title : "New item",
  status: status || false,
  children: children ? children.map(createNode) : [],
  ...payload
});

export const getNodeById = (nodes, id) => {
  for (const node of nodes) {
    if (id === node.id) return node;
    const sub = getNodeById(node.children, id);
    if (sub) return sub;
  }
};

export const getParentById = (nodes, id, parent = null) => {
  for (const node of nodes) {
    if (id === node.id) return parent;
    const sub = getParentById(node.children, id, node);
    if (sub) return sub;
  }
  return null;
};

/**
 * Applies changes to the properties of a Node.
 * NOTE: modifies the given list inline
 * @param {*} nodes
 * @param {*} id
 * @param {*} change
 * @returns
 */
export const updateNodeById = (nodes, id, change = {}) => {
  const _node = getNodeById(nodes, id);

  for (const key in change) {
    _node[key] = change[key];
  }

  return [...nodes];
};

export const isNodeCompleted = (node) => {
  if (!node.children.length) return node.status;
  return node.children.every(isNodeCompleted);
};

export const appendAfter = (nodes, nodeId, payload) => {
  const _nodes = clone(nodes);
  const _node = getNodeById(_nodes, nodeId);
  const _parent = getParentById(_nodes, nodeId);

  const newNode = createNode({
    ...payload,
    title: ""
  });

  if (!_parent) {
    const index = _nodes.indexOf(_node);
    _nodes.splice(index + 1, 0, newNode);
  } else {
    const index = _parent.children.indexOf(_node);
    _parent.children.splice(index + 1, 0, newNode);
  }

  return [newNode, _nodes];
};

export const appendInto = (nodes, nodeId, payload) => {
  const _nodes = clone(nodes);
  const _node = getNodeById(_nodes, nodeId);
  const newNode = createNode({ ...payload, title: "" });
  _node.children.push(newNode);
  return [newNode, _nodes];
};

export const moveNodeInById = (nodes, nodeId) => {
  console.log("@deeplist.moveNodeInById - coming soon...", nodeId);
  return nodes;
};

export const moveNodeOutById = (nodes, nodeId) => {
  console.log("@deeplist.moveNodeOutById - coming soon...", nodeId);
  return nodes;
};

export const getNextNodeById = (nodes, nodeId, skipChildren = false) => {
  console.log("deeplist.getNextNodeById - coming soon");
  console.log(nodes);

  if (!nodes.length) return null;
  if (!nodeId) return nodes[0].id;

  const _node = getNodeById(nodes, nodeId);
  const _parent = getParentById(nodes, nodeId);

  // Move into children
  if (_node.children.length && !skipChildren) {
    return _node.children[0].id;
  }

  // Root
  if (!_parent) {
    const idx = nodes.indexOf(_node);
    if (idx < nodes.length - 1) return nodes[idx + 1].id;
    return nodes[0].id;
  }

  // Nested list
  const idx = _parent.children.indexOf(_node);
  if (idx < _parent.children.length - 1) return _parent.children[idx + 1].id;

  // Go up one level
  const _gparent = getParentById(nodes, _parent.id);
  if (_gparent) {
    return getNextNodeById(_gparent.children, _parent.id, true);
  }

  // Go back to root
  const idx1 = nodes.indexOf(_parent);
  if (idx1 < nodes.length - 1) return getNextNodeById(nodes, _parent.id, true);
  return nodes[0].id;
};

const getLastLeafId = (node) => {
  if (!node.children || !node.children.length) return node.id;
  return getLastLeafId(node.children[node.children.length - 1]);
};

export const getPrevNodeById = (nodes, nodeId) => {
  console.log("deeplist.getPrevNodeById - coming soon");

  if (!nodes.length) return null;
  if (!nodeId) return getLastLeafId(nodes[nodes.length - 1]);

  // console.log("@deeplist.getPrevNodeById - coming soon...");
  const _node = getNodeById(nodes, nodeId);
  const _parent = getParentById(nodes, nodeId);

  if (_parent) {
    const idx = _parent.children.indexOf(_node);
    if (idx === 0) {
      const _gparent = getParentById(nodes, _parent.id);

      if (_gparent) {
        console.log("go back 1L");
        return nodeId;
      }

      const idx1 = nodes.indexOf(_parent);
      if (idx1 === 0) return _parent.id;
      console.log("prev is in root", idx1);
      // return getLastLeafId(nodes[idx - 1]);
      return nodeId;
      // return getLastLeafId(nodes[nodes.length - 1]);
    }
  }

  const idx = nodes.indexOf(_node);
  if (idx === 0) {
    return getLastLeafId(nodes[nodes.length - 1]);
  }

  return getLastLeafId(nodes[idx - 1]);
};

export const removeNodeById = (nodes, nodeId) => {
  const _nodes = clone(nodes);
  const _node = getNodeById(_nodes, nodeId);
  const _parent = getParentById(_nodes, nodeId);

  if (_parent) {
    _parent.children.splice(_nodes.indexOf(_node), 1);
  } else {
    _nodes.splice(_nodes.indexOf(_node), 1);
  }
  return _nodes;
};
