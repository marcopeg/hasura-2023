import { createNode } from "./create-node";

describe("DeepList", () => {
  describe("createNode", () => {
    it("should create an empty node", () => {
      const r1 = createNode();
      expect(r1).toHaveProperty("id");
      expect(r1).toHaveProperty("parent", null);
      expect(r1).toHaveProperty("children", []);
      expect(r1).toHaveProperty("meta", {});
    });

    it("should create a node with meta data", () => {
      const r1 = createNode({ title: "foo" });
      expect(r1).toHaveProperty("id");
      expect(r1).toHaveProperty("parent", null);
      expect(r1).toHaveProperty("children", []);
      expect(r1).toHaveProperty("meta", { title: "foo" });
    });

    it("should create a node with a custom id", () => {
      const r1 = createNode({ id: 123, title: "foo" });
      expect(r1).toHaveProperty("id", 123);
      expect(r1).toHaveProperty("parent", null);
      expect(r1).toHaveProperty("children", []);
      expect(r1).toHaveProperty("meta", { title: "foo" });
    });
  });
});
