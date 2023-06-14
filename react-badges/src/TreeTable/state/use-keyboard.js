import { useKeyboardEvent } from "../../utils/use-keyboard-event";

export const useKeyboard = (apiRef) => {
  useKeyboardEvent("alt + e", () => apiRef.current.requestEditMode(), {
    exact: true
  });

  useKeyboardEvent(
    "alt + Enter",
    () => {
      const activeNode = apiRef.current.getActiveNodeId();
      apiRef.current.appendAfter(activeNode, {});
    },
    { exact: true }
  );

  useKeyboardEvent(
    "shift + alt + Enter",
    () => {
      const activeNode = apiRef.current.getActiveNodeId();
      apiRef.current.appendInto(activeNode, {});
    },
    { exact: true }
  );

  useKeyboardEvent("alt + ArrowDown", () => apiRef.current.requestFocusNext(), {
    exact: true
  });

  useKeyboardEvent("alt + ArrowUp", () => apiRef.current.requestFocusPrev(), {
    exact: true
  });

  useKeyboardEvent(
    "alt + ArrowLeft",
    () => {
      const activeNode = apiRef.current.getActiveNodeId();
      apiRef.current.requestMoveIn(activeNode);
    },
    {
      exact: true
    }
  );

  useKeyboardEvent(
    "alt + ArrowRight",
    () => {
      const activeNode = apiRef.current.getActiveNodeId();
      apiRef.current.requestMoveOut(activeNode);
    },
    {
      exact: true
    }
  );

  useKeyboardEvent(
    "alt + Space",
    () => {
      const activeNode = apiRef.current.getActiveNode();
      if (activeNode.children.length) {
        apiRef.current.requestToggleCollapse(activeNode.id);
      } else {
        apiRef.current.requestToggleStatus(activeNode.id);
      }
    },
    {
      exact: true
    }
  );

  useKeyboardEvent(
    "alt + d",
    () => {
      console.log("DELETE");
      const activeNode = apiRef.current.getActiveNode();
      apiRef.current.requestDelete(activeNode.id);
    },
    {
      exact: true
    }
  );
};
