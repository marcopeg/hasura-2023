export const DEFAULTS = {
  idKey: "id",
  parentIdKey: "parentId",
  parentKey: "parent",
  childrenKey: "children",
  metaKey: "meta"
};

export const getConfig = (config = DEFAULTS) => ({
  ...DEFAULTS,
  ...config
});
