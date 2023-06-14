import { useContext } from "react";
import { TreeTableContext } from "../TreeTable";

export const useTreeTable = (propName) => {
  const ctx = useContext(TreeTableContext);
  return propName ? ctx.propName : ctx;
};
