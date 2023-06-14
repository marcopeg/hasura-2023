import { updateNode } from "./update-node";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";

describe("DeepList", () => {
  describe("updateNode", () => {
    let treeFlat = null;
    let treeL1 = null;

    beforeEach(() => {
      treeFlat = list2tree(nodesFlat);
      treeL1 = list2tree(nodesTreeL1);
    });

    it("should not update a non existing node", () => {
      const r1 = updateNode();
      expect(r1).toEqual([]);
    });

    it("should update a node's title", () => {
      const r1 = updateNode(treeFlat, "n1", { title: "foobar" });
      expect(r1[0].meta.title).toEqual("foobar");
      expect(r1).toBe(treeFlat);
    });

    it("should be immutable", () => {
      const r1 = updateNode(
        treeFlat,
        "n1",
        { title: "foobar" },
        { clone: true }
      );
      expect(r1[0].meta.title).toEqual("foobar");
      expect(r1).not.toBe(treeFlat);
    });
  });
});
