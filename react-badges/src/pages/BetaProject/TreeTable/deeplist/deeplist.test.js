import { tree2list } from "./tree2list";
import { list2tree } from "./list2tree";

describe("DeepList", () => {
  it("should unserialize/serialize a DeepList", () => {
    const src = [
      { id: "n1", parentId: null },
      { id: "n2", parentId: "n1" },
      { id: "n3", parentId: "n2" },
      { id: "n4", parentId: "n1", title: "foo" }
    ];

    const r1 = tree2list(list2tree(src));
    expect(r1).toEqual(src);
  });
});
