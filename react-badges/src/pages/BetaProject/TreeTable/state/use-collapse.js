import { useTreeTable } from "./use-tree-table";

export const useCollapse = (node) => {
  const { collapse, setCollapse } = useTreeTable();

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
