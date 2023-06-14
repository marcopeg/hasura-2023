import { getNodeParent } from "./get-node-parent";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";
import nodesTreeL2 from "./fixtures/nodes.tree-l2";

describe("DeepList", () => {
  describe("getNodeParent", () => {
    let treeFlat = null;
    let treeL1 = null;
    let treeL2 = null;

    beforeEach(() => {
      treeFlat = list2tree(nodesFlat);
      treeL1 = list2tree(nodesTreeL1);
      treeL2 = list2tree(nodesTreeL2);
    });

    it("should return NULL for void lists", () => {
      expect(getNodeParent()).toBe(null);
      expect(getNodeParent([])).toBe(null);
      expect(getNodeParent(null)).toBe(null);
    });

    it("should return NULL for void Node", () => {
      expect(getNodeParent(treeFlat)).toBe(null);
      expect(getNodeParent(treeFlat, null)).toBe(null);
      expect(getNodeParent(treeFlat, {})).toBe(null);
    });

    it("should return NULL for root items", () => {
      const r1 = getNodeParent(treeFlat, "n1");
      expect(r1).toBe(null);
    });

    it("should return NULL for non existing items", () => {
      const r1 = getNodeParent(treeFlat, "doesNotExists");
      expect(r1).toBe(null);
    });

    it("should find the parent of a nested item at L1", () => {
      const r1 = getNodeParent(treeL1, "n1-2");
      expect(r1).toBe(treeL1[0]);
    });

    it("should find the parent of a nested item at L2", () => {
      // nested under root
      const r1 = getNodeParent(treeL2, "n1-2");
      expect(r1).toBe(treeL2[0]);

      // deeply tested
      const r2 = getNodeParent(treeL2, "n1-2-2");
      expect(r2).toBe(treeL2[0].children[1]);
    });
  });
});
