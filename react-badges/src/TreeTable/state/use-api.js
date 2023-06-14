import { useContext } from "react";
import { TreeTableContext } from "./Context";

export const useApi = () => {
  const { ref } = useContext(TreeTableContext);
  return ref.current;
};
