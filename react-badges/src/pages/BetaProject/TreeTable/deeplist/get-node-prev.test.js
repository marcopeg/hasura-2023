import { getNodePrev } from "./get-node-prev";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";
import nodesTreeL2 from "./fixtures/nodes.tree-l2";
import nodesTreeL3 from "./fixtures/nodes.tree-l3";

describe("DeepList", () => {
  describe("getNodePrev", () => {
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

    it("should return NULL for non existing nodes", () => {
      expect(getNodePrev()).toBe(null);
      expect(getNodePrev(null)).toBe(null);
      expect(getNodePrev(NaN)).toBe(null);
      expect(getNodePrev(Infinity)).toBe(null);
      expect(getNodePrev([], null)).toBe(null);
      expect(getNodePrev([], 0)).toBe(null);
      expect(getNodePrev([], { id: 1 })).toBe(null);
      expect(getNodePrev([{ id: 1 }], { id: 2 })).toBe(null);
    });

    it("should return prev node from ROOT level", () => {
      const r1 = getNodePrev(treeFlat, "n2");
      expect(r1.id).toBe("n1");
    });

    it("should return NULL from first item at ROOT level", () => {
      const r1 = getNodePrev(treeFlat, "n1");
      expect(r1).toBe(null);
    });

    it("should return prev node from NESTED level", () => {
      const r1 = getNodePrev(treeL1, "n1-2");
      expect(r1.id).toBe("n1-1");
    });

    it("should return prev node from the ROOT in case we reach the top of same level", () => {
      const r1 = getNodePrev(treeL1, "n1-1");
      expect(r1.id).toBe("n1");
    });

    it("should return last node of flatPrev item if it has child", () => {
      const r1 = getNodePrev(treeL1, "n2");
      expect(r1.id).toBe("n1-2");
    });

    it("should return last node of flatPrev item if it has child - deeply nested", () => {
      const r1 = getNodePrev(treeL3, "n3");
      expect(r1.id).toBe("n2-2-1-1-1");
    });

    it("should skip previous nodes children if asked politely", () => {
      const r1 = getNodePrev(treeL3, "n3", {
        canGoDown: false
      });
      expect(r1.id).toBe("n2");

      const r2 = getNodePrev(treeL3, "n3", {
        canGoDown: () => false
      });
      expect(r2.id).toBe("n2");
    });
  });
});
