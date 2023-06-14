import { tree2list } from "./tree2list";
import { list2tree } from "./list2tree";

export const cloneTree = (tree, shallow = false) =>
  shallow ? [...tree] : list2tree(tree2list(tree));
