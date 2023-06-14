import { getNode } from "./get-node";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";

describe("DeepList", () => {
  let treeFlat = null;
  let treeL1 = null;

  beforeEach(() => {
    treeFlat = list2tree(nodesFlat);
    treeL1 = list2tree(nodesTreeL1);
  });

  describe("getNode", () => {
    it("should return NULL for void lists", () => {
      expect(getNode()).toBe(null);
      expect(getNode([])).toBe(null);
      expect(getNode(null)).toBe(null);
    });

    it("should return NULL for void Node", () => {
      expect(getNode(treeFlat)).toBe(null);
      expect(getNode(treeFlat, null)).toBe(null);
      expect(getNode(treeFlat, {})).toBe(null);
    });

    it("should find an item out of a flat list", () => {
      const r1 = getNode(treeFlat, "n1");
      expect(r1).toBe(treeFlat[0]);
      const r2 = getNode(treeFlat, "n3");
      expect(r2).toBe(treeFlat[2]);
    });

    it("should return NULL if an item does not exists in a flat list", () => {
      const r1 = getNode(treeFlat, "doesNotExists");
      expect(r1).toBe(null);
    });

    it("should find an item in a sub-tree", () => {
      const r1 = getNode(treeL1, "n1-2");
      expect(r1).toBe(treeL1[0].children[1]);
    });
  });
});
