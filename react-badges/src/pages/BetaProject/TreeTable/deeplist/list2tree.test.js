import { list2tree } from "./list2tree";

describe("DeepList", () => {
  describe("list2tree", () => {
    it("should work without nodes", () => {
      const r1 = list2tree();
      expect(r1).toEqual([]);
    });

    it("should work with one dimension", () => {
      const r1 = list2tree([
        {
          id: "n1",
          parentId: null,
          title: "hoho"
        },
        {
          id: "n2",
          parentId: null
        }
      ]);

      expect(r1).toEqual([
        {
          id: "n1",
          parent: null,
          children: [],
          meta: { title: "hoho" }
        },
        {
          id: "n2",
          parent: null,
          children: [],
          meta: {}
        }
      ]);
    });

    it("should work with nested data", () => {
      const r1 = list2tree([
        {
          id: "n1",
          parentId: null
        },
        {
          id: "n2",
          parentId: "n1"
        },
        {
          id: "n3",
          parentId: null
        },
        {
          id: "n4",
          parentId: "n1"
        }
      ]);

      expect(r1.length).toBe(2);
      expect(r1[0].children.length).toBe(2);
      expect(r1[0].children[0].parent).toBe(r1[0]);
      expect(r1.map(($) => $.id)).toEqual(["n1", "n3"]);
      expect(r1[0].children.map(($) => $.id)).toEqual(["n2", "n4"]);
    });

    it("should work even if children are defined before parents", () => {
      const r1 = list2tree([
        {
          id: "n1",
          parentId: "n3"
        },
        {
          id: "n2",
          parentId: null
        },
        {
          id: "n3",
          parentId: "n2"
        },
        {
          id: "n4",
          parentId: "n3"
        }
      ]);

      expect(r1[0].id).toBe("n2");
      expect(r1[0].children[0].id).toBe("n3");
      expect(r1[0].children[0].children[0].id).toBe("n1");
      expect(r1[0].children[0].children.map(($) => $.id)).toEqual(["n1", "n4"]);
    });
  });
});
