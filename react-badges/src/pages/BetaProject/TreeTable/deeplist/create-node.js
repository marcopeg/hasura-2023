import { generatePushID } from "../../../../utils/use-pushid";
import { getConfig } from "./defaults";

export const createNode = (data = {}, config = {}) => {
  const { idKey, parentKey, childrenKey, metaKey } = getConfig({
    id: null,
    ...config
  });

  const { [idKey]: _id, ...meta } = data;

  return {
    [idKey]: _id || generatePushID(),
    [parentKey]: null,
    [childrenKey]: [],
    [metaKey]: meta
  };
};
