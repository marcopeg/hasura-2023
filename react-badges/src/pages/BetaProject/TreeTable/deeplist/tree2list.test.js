import { tree2list } from "./tree2list";
import { list2tree } from "./list2tree";

describe("DeepList", () => {
  describe("tree2list", () => {
    it("should work without nodes", () => {
      const r1 = tree2list();
      expect(r1).toEqual([]);
    });

    it("should flatte a mono-dimensional tree", () => {
      const r1 = tree2list([
        {
          id: "n1",
          parent: null,
          children: [],
          meta: {}
        },
        {
          id: "n2",
          parent: null,
          children: [],
          meta: {}
        }
      ]);

      expect(r1).toEqual([
        { id: "n1", parentId: null },
        { id: "n2", parentId: null }
      ]);
    });

    it("should flatten a multi-dimensional tree", () => {
      const n1 = {
        id: "n1",
        parent: null,
        children: [],
        meta: {}
      };

      const n2 = {
        id: "n2",
        parent: null,
        children: [],
        meta: {}
      };

      const n3 = {
        id: "n3",
        parent: null,
        children: [],
        meta: {}
      };

      const n4 = {
        id: "n4",
        parent: null,
        children: [],
        meta: {}
      };

      // Put n2 into n1
      n2.parent = n1;
      n1.children.push(n2);

      // Put n3 into n2
      n3.parent = n2;
      n2.children.push(n3);

      // Put n4 into n1
      n4.parent = n1;
      n1.children.push(n4);

      const r1 = tree2list([n1]);
      expect(r1).toEqual([
        { id: "n1", parentId: null },
        { id: "n2", parentId: "n1" },
        { id: "n3", parentId: "n2" },
        { id: "n4", parentId: "n1" }
      ]);
    });
  });
});
