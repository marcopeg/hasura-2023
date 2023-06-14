import { appendNode } from "./append-node";
import { createNode } from "./create-node";
import { list2tree } from "./list2tree";
import nodesFlat from "./fixtures/nodes.flat";
import nodesTreeL1 from "./fixtures/nodes.tree-l1";
import nodesTreeL2 from "./fixtures/nodes.tree-l2";
import nodesTreeL3 from "./fixtures/nodes.tree-l3";

describe("DeepList", () => {
  describe("appendNode", () => {
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

    it("should append a node to ROOT", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }));
      expect(r1[3]).toHaveProperty("id", 123);
    });

    it("should append a node to ROOT - prepend", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }), {
        prepend: true
      });
      const r2 = appendNode(r1, createNode({ id: 456 }), {
        prepend: true
      });
      expect(r2.map(($) => $.id)).toEqual([456, 123, "n1", "n2", "n3"]);
    });

    it("should append INTO an existing node", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }), { into: "n1" });
      expect(r1[0].children[0]).toHaveProperty("id", 123);
      expect(r1[0].children[0].parent).toBe(r1[0]);
    });

    it("should append INTO an existing node - prepend", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }), { into: "n1" });
      const r2 = appendNode(r1, createNode({ id: 456 }), {
        into: "n1",
        prepend: true
      });
      expect(r2[0].children.map(($) => $.id)).toEqual([456, 123]);
      expect(r2[0].children.every(($) => $.parent === r2[0])).toBe(true);
    });

    it("should append AFTER an existing node", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }), { after: "n1" });
      expect(r1.map(($) => $.id)).toEqual(["n1", 123, "n2", "n3"]);
      expect(r1[0].parent).toEqual(r1[1].parent);
    });

    it("should append AFTER an existing node - last node", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }), { after: "n3" });
      expect(r1.map(($) => $.id)).toEqual(["n1", "n2", "n3", 123]);
    });

    it("should append BEFORE an existing node", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }), {
        before: "n1"
      });
      expect(r1.map(($) => $.id)).toEqual([123, "n1", "n2", "n3"]);
    });

    it("should adopt sibling parent node", () => {
      const r1 = appendNode(treeL1, createNode({ id: 123 }), {
        after: "n1-1"
      });
      expect(r1[0].children.every(($) => $.parent === r1[0])).toBe(true);
    });

    it("should not mutate the input tree", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }));
      expect(r1).toBe(treeFlat);
    });

    it("should shallow copy input tree", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }), {
        clone: () => true
      });
      expect(r1).not.toBe(treeFlat);
      expect(r1[0]).toBe(treeFlat[0]);
    });

    it("should deep copy the input tree", () => {
      const r1 = appendNode(treeFlat, createNode({ id: 123 }), {
        clone: true
      });
      expect(r1).not.toBe(treeFlat);
      expect(r1[0]).not.toBe(treeFlat[0]);
    });
  });
});
