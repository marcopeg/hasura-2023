import { nodeMatch } from "./node-match";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";
import nodesTreeL2 from "./fixtures/nodes.tree-l2";
import nodesTreeL3 from "./fixtures/nodes.tree-l3";

describe("DeepList", () => {
  describe("nodeMatch", () => {
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

    it("Should return FALSE if the node does not exist", () => {
      const r1 = nodeMatch(treeFlat, "nXXX", ($) => $.meta.status === true);
      expect(r1).toBe(false);
    });

    it("Should return FALSE if expectation fails on single level", () => {
      const r1 = nodeMatch(treeFlat, "n1", ($) => $.meta.status === true);
      expect(r1).toBe(false);
    });

    it("Should return TRUE if expectation succeede on single level", () => {
      const r1 = nodeMatch(treeFlat, "n3", ($) => $.meta.status === true);
      expect(r1).toBe(true);
    });

    it("Should return FALSE if any of the children don't pass the test", () => {
      const r1 = nodeMatch(treeL1, "n2", ($) => $.meta.status === true, {
        all: true
      });
      expect(r1).toBe(false);
    });

    it("Should return TRUE if all of the children pass the test", () => {
      const r1 = nodeMatch(treeL1, "n1", ($) => $.meta.status === true, {
        all: true
      });
      expect(r1).toBe(true);
    });

    it("Should return TRUE if all of the children pass the test - l3", () => {
      const r1 = nodeMatch(treeL3, "n2", ($) => $.meta.status === true, {
        all: true
      });
      expect(r1).toBe(true);
    });
  });
});
