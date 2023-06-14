import { useContext } from "react";
import { TreeTableContext } from "./Context";

export const useNestable = () => {
  const { nestableRef } = useContext(TreeTableContext);

  return {
    nestableRef
  };
};
