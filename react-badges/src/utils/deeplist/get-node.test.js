import { getNode } from "./get-node";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";

describe("DeepList", () => {
  describe("getNode", () => {
    it("should return NULL for void lists", () => {
      expect(getNode()).toBe(null);
      expect(getNode([])).toBe(null);
      expect(getNode(null)).toBe(null);
    });

    it("should return NULL for void Node", () => {
      expect(getNode(nodesFlat)).toBe(null);
      expect(getNode(nodesFlat, null)).toBe(null);
      expect(getNode(nodesFlat, {})).toBe(null);
    });

    it("should find an item out of a flat list", () => {
      const r1 = getNode(nodesFlat, "n1");
      expect(r1).toBe(nodesFlat[0]);
      const r2 = getNode(nodesFlat, "n3");
      expect(r2).toBe(nodesFlat[2]);
    });

    it("should return NULL if an item does not exists in a flat list", () => {
      const r1 = getNode(nodesFlat, "doesNotExists");
      expect(r1).toBe(null);
    });

    it("should find an item in a sub-tree", () => {
      const r1 = getNode(nodesTreeL1, "n1-2");
      expect(r1).toBe(nodesTreeL1[0].children[1]);
    });
  });
});
