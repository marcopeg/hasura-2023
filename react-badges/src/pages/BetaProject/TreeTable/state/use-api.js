import { useTreeTable } from "./use-tree-table";
import {
  createNode,
  appendNode,
  removeNode,
  updateNode,
  getNode,
  getNodeNext,
  getNodePrev
} from "../deeplist";

export const makeApi = ({
  nodes,
  focus,
  collapse,
  isEditMode,
  setCollapse,
  setNodes,
  setFocus,
  setIsEditMode
}) => {
  const _create = (data = {}) =>
    createNode({
      title: "",
      status: false,
      ...data
    });

  const _insert = (data = {}, focus = false, config = {}) => {
    const newNode = _create(data);

    // Persist change in memory
    setNodes(
      appendNode(nodes, newNode, {
        ...config,
        clone: true
      })
    );

    // Conditional focus
    Boolean(focus) &&
      setTimeout(() => {
        setFocus(newNode.id);
        setIsEditMode(true);
      });

    return newNode;
  };

  return {
    getCurrentNode: () => getNode(nodes, focus),
    isEditMode: () => isEditMode,
    startEdit: () => setIsEditMode(true),
    createNode: (d) => _create(d),
    appendNode: (d, f) => _insert(d, f),
    prependNode: (d, f) => _insert(d, f, { prepend: true }),
    insertNodeAfter: (after, d, f) => _insert(d, f, { after }),
    insertNodeInto: (into, d, f) => _insert(d, f, { into, prepend: true }),
    removeNode: (targetNode = focus, config = {}) => {
      // Manage optional confirmation
      if (
        typeof config.confirm === "function" &&
        !config.confirm(getNode(nodes, targetNode))
      )
        return;
      if (config.confirm === true && !confirm("Sure?")) return;

      // Get references to manage focus switch
      if (config.setFocus) {
        const _nextFocus =
          getNodePrev(nodes, focus, { canGoDown: false }) ||
          getNodeNext(nodes, focus, { canGoDown: false });
        _nextFocus && setFocus(_nextFocus.id);
      }

      // Effectively remove the node
      const _nodes = removeNode(nodes, targetNode, { clone: true });
      setNodes(_nodes);
    },
    moveFocusNext: () => {
      const nextNode = getNodeNext(nodes, focus, {
        canGoDown: (node) => node && !collapse.includes(node.id)
      });

      if (!nextNode) {
        setFocus(nodes[0].id);
        return;
      }
      setFocus(nextNode.id);
    },
    moveFocusPrev: () => {
      const prevNode = getNodePrev(nodes, focus, {
        canGoDown: (node) => node && !collapse.includes[node.id]
      });
      if (!prevNode) {
        // setFocus(nodes[0].id);
        return;
      }
      setFocus(prevNode.id);
    },
    toggleNode: () => {
      const node = getNode(nodes, focus);
      if (!node) return;

      // Change collapse' status
      if (node.children.length) {
        setCollapse((v) =>
          v.includes(focus) ? v.filter(($) => $ !== focus) : [...v, focus]
        );
        return;
      }

      // Change node' status
      const _nodes = updateNode(
        nodes,
        node.id,
        { status: !Boolean(node.meta.status) },
        { clone: true }
      );
      setNodes(_nodes);
    }
  };
};

export const useApi = () => makeApi(useTreeTable());
