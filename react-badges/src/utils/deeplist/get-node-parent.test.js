import { getNodeParent } from "./get-node-parent";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";
import nodesTreeL2 from "./fixtures/nodes.tree-l2";

describe("DeepList", () => {
  describe("getNodeParent", () => {
    it("should return NULL for void lists", () => {
      expect(getNodeParent()).toBe(null);
      expect(getNodeParent([])).toBe(null);
      expect(getNodeParent(null)).toBe(null);
    });

    it("should return NULL for void Node", () => {
      expect(getNodeParent(nodesFlat)).toBe(null);
      expect(getNodeParent(nodesFlat, null)).toBe(null);
      expect(getNodeParent(nodesFlat, {})).toBe(null);
    });

    it("should return NULL for root items", () => {
      const r1 = getNodeParent(nodesFlat, "n1");
      expect(r1).toBe(null);
    });

    it("should return NULL for non existing items", () => {
      const r1 = getNodeParent(nodesFlat, "doesNotExists");
      expect(r1).toBe(null);
    });

    it("should find the parent of a nested item at L1", () => {
      const r1 = getNodeParent(nodesTreeL1, "n1-2");
      expect(r1).toBe(nodesTreeL1[0]);
    });

    it("should find the parent of a nested item at L2", () => {
      // nested under root
      const r1 = getNodeParent(nodesTreeL2, "n1-2");
      expect(r1).toBe(nodesTreeL2[0]);

      // deeply tested
      const r2 = getNodeParent(nodesTreeL2, "n1-2-2");
      expect(r2).toBe(nodesTreeL2[0].children[1]);
    });
  });
});
