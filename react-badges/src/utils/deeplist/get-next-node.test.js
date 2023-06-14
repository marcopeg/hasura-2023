import { getNextNode } from "./get-next-node";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";

describe("DeepList", () => {
  describe("getNextNodeById", () => {
    it("should return null in case there are no nodes", () => {
      const r1 = getNextNode([], "n1");
      expect(r1).toBe(null);
    });

    it("should default to the first available component if no node was provided", () => {
      const r1 = getNextNode(nodesFlat);
      expect(r1).toBe(nodesFlat[0]);
      const r2 = getNextNode(nodesFlat, null);
      expect(r2).toBe(nodesFlat[0]);
    });

    it("should get next node in a flat tree", () => {
      const r1 = getNextNode(nodesFlat, "n1");
      expect(r1).toBe(nodesFlat[1]);
    });

    it("should return the invariant node if it is the last item in a flat list", () => {
      const r1 = getNextNode(nodesFlat, "n3");
      expect(r1).toBe(nodesFlat[2]);
    });

    it("should return the first child of a nested tree", () => {
      const r1 = getNextNode(nodesTreeL1, "n1");
      expect(r1).toBe(nodesTreeL1[0].children[0]);
    });

    it("should return the next element within an L1 children", () => {
      const r1 = getNextNode(nodesTreeL1, "n1-1");
      // console.log(r1);
      // expect(r1).toBe(nodesTreeL1[0].children[1]);
    });
  });
});
