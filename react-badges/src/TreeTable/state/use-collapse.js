import { useContext } from "react";
import { TreeTableContext } from "./Context";

export const useCollapse = (node) => {
  const { collapse, setCollapse } = useContext(TreeTableContext);

  const toggleCollapse = () => {
    const _collapse = collapse.includes(node.id)
      ? collapse.filter(($) => $ !== node.id)
      : [...collapse, node.id];

    setCollapse(_collapse);
  };

  return {
    isCollapsed: collapse.includes(node.id),
    toggleCollapse
  };
};
