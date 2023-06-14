import { moveNodeIn } from "./move-node-in";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";
import nodesTreeL2 from "./fixtures/nodes.tree-l2";
import nodesTreeL3 from "./fixtures/nodes.tree-l3";

describe("DeepList", () => {
  describe("moveNodeIn", () => {
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

    it("should nest a node at ROOT level", () => {
      const r1 = moveNodeIn(treeFlat, "n2");
      expect(r1.map(($) => $.id)).toEqual(["n1", "n3"]);
      expect(r1[0].children.map(($) => $.id)).toEqual(["n2"]);
      expect(r1[0].children[0].parent).toBe(r1[0]);
    });

    it("should nest a DEEP nested level", () => {
      const r1 = moveNodeIn(treeL3, "n1-2");
      expect(r1[0].children.map(($) => $.id)).toEqual(["n1-1"]);
      expect(r1[0].children[0].children.map(($) => $.id)).toEqual(["n1-2"]);
      expect(r1[0].children[0].children[0].parent).toBe(r1[0].children[0]);
    });
  });
});
