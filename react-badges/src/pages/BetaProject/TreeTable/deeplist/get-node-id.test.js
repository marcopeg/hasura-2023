import { getNodeId } from "./get-node-id";

describe("DeepList", () => {
  describe("getNodeId", () => {
    it("should return NULL for void ids", () => {
      expect(getNodeId()).toBe(null);
      expect(getNodeId(null)).toBe(null);
      expect(getNodeId(NaN)).toBe(null);
      expect(getNodeId(Infinity)).toBe(null);
    });

    it("should return a String id", () => {
      expect(getNodeId("n1")).toBe("n1");
    });

    it("should return a Numeric id", () => {
      expect(getNodeId(1)).toBe(1);
      expect(getNodeId(0)).toBe(0);
      expect(getNodeId(-1)).toBe(-1);
    });

    it("should return the node.id from an object form", () => {
      expect(getNodeId({ id: "n1" })).toBe("n1");
      expect(getNodeId({ id: 1 })).toBe(1);
      expect(getNodeId({ id: 0 })).toBe(0);
      expect(getNodeId({})).toBe(null);
    });
  });
});
