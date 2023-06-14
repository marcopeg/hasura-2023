import { getNodeNext } from "./get-node-next";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";
import nodesTreeL2 from "./fixtures/nodes.tree-l2";
import nodesTreeL3 from "./fixtures/nodes.tree-l3";

describe("DeepList", () => {
  describe("getNodeNext", () => {
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
      expect(getNodeNext()).toBe(null);
      expect(getNodeNext(null)).toBe(null);
      expect(getNodeNext(NaN)).toBe(null);
      expect(getNodeNext(Infinity)).toBe(null);
      expect(getNodeNext([], null)).toBe(null);
      expect(getNodeNext([], 0)).toBe(null);
      expect(getNodeNext([], { id: 1 })).toBe(null);
      expect(getNodeNext([{ id: 1 }], { id: 2 })).toBe(null);
    });

    it("should return next node from ROOT level", () => {
      const r1 = getNodeNext(treeFlat, "n1");
      // console.log(r1);
      expect(r1.id).toBe("n2");
    });

    it("should return NULL from last item at ROOT level", () => {
      const r1 = getNodeNext(treeFlat, "n3");
      // console.log(r1);
      expect(r1).toBe(null);
    });

    it("should return next node from NESTED level", () => {
      const r1 = getNodeNext(treeL1, "n1-1");
      // console.log(r1);
      expect(r1.id).toBe("n1-2");
    });

    it("should return first children if available", () => {
      const r1 = getNodeNext(treeL1, "n1");
      // console.log(r1);
      expect(r1.id).toBe("n1-1");
    });

    it("should return next item from the ROOT in case we reach the end of same level", () => {
      const r1 = getNodeNext(treeL1, "n1-2");
      expect(r1.id).toBe("n2");
    });

    it("should return next item from the ROOT in case we reach the end of same level - deep nested", () => {
      const r1 = getNodeNext(treeL2, "n1-2-2");
      expect(r1.id).toBe("n2");
    });

    it("should return next item from the GRANDPARENT in case we reach the end of same level", () => {
      const r1 = getNodeNext(treeL3, "n2-1-1");
      expect(r1.id).toBe("n2-2");
    });

    it("should return next item same deeply nested level", () => {
      const r1 = getNodeNext(treeL3, "n1-2-1");
      expect(r1.id).toBe("n1-2-2");
    });

    it("should skip collapsed nodes", () => {
      const r1 = getNodeNext(treeL3, "n1", { canGoDown: () => false });
      expect(r1.id).toBe("n2");

      const r2 = getNodeNext(treeL3, "n1", { canGoDown: false });
      expect(r2.id).toBe("n2");
    });
  });
});
