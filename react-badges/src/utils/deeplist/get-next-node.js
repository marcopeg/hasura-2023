import { getNodeId } from "./get-node-id";
import { getNode } from "./get-node";
import { getNodeParent } from "./get-node-parent";

export const getNextNode = (nodes = [], currentNode = "") => {
  if (!nodes.length) return null;

  const currentNodeId = getNodeId(currentNode);
  if (!currentNodeId) return nodes[0];

  const currentNodeRef = getNode(nodes, currentNodeId);
  const currentNodeParent = getNodeParent(currentNodeId);

  // has children
  // some kind of recursion here
  // unless it is the last item, in that case we need to move to
  // next element at this level
  if (currentNodeRef?.children.length) {
    // console.log("has kids");
    const ddd = getNextNode(currentNodeRef.children, currentNodeId);
    // console.log(ddd);
    return ddd;
  }

  // root
  if (!currentNodeParent) {
    const currentNodeIdx = nodes.indexOf(currentNodeRef);

    if (currentNodeIdx < nodes.length - 1) {
      return nodes[currentNodeIdx + 1];
    }

    // End of document reached
    // MAYBE: return item zero?
    return currentNodeRef;
  }

  console.log("not root");

  return null;
};
