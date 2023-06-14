import { useEffect, useState } from "react";

export const useEffectTriggerable = (fn) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    return fn();
  }, [count]);

  return () => setCount(($) => $ + 1);
};
