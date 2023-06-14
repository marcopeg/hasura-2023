import { removeNode } from "./remove-node";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";
import nodesTreeL2 from "./fixtures/nodes.tree-l2";
import nodesTreeL3 from "./fixtures/nodes.tree-l3";

describe("DeepList", () => {
  describe("removeNode", () => {
    let treeFlat = null;
    let treeL1 = null;
    let treeL2 = null;
    let treeL3 = null;

    beforeEach(() => {
      treeFlat = list2tree(nodesFlat);
      treeL1 = list2tree(nodesTreeL1);
      treeL2 = list2tree(nodesTreeL2);
      treeL3 = list2tree(nodesTreeL3);
    });

    it("should not remove a non existing node", () => {
      expect(removeNode(treeFlat)).toBe(treeFlat);
      expect(removeNode(treeFlat, "IDNotExists")).toBe(treeFlat);
    });

    it("should remove an item from the root", () => {
      const r1 = removeNode(treeFlat, "n1");
      expect(r1.map(($) => $.id)).toEqual(["n2", "n3"]);
    });

    it("should remove a nested item", () => {
      const r1 = removeNode(treeL3, "n1-2");
      expect(r1[0].children.map(($) => $.id)).toEqual(["n1-1"]);
    });

    it("should not mutate the tree", () => {
      expect(removeNode(treeL3, "n1-2")).toBe(treeL3);
    });
  });
});
