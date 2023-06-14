import { useState, useRef, createContext, forwardRef, useEffect } from "react";

import Nestable from "react-nestable";
import "react-nestable/dist/styles/index.css";
import "./nestable.css";

import { useEffectDebounced } from "../../../utils/use-effect-debounced";
import { usePushID } from "../../../utils/use-pushid";
import { list2tree, tree2list } from "./deeplist";
import { makeApi } from "./state/use-api";

import { SourceCode } from "./components/SourceCode";
import { Node } from "./components/Node";

const DEBOUNCE_DELAY = 0;

export const TreeTableContext = createContext({});

/**
 *
 * @param {Array} data { id, parentId, custom, fields, ...}
 * @returns
 */
export const TreeTable = forwardRef(({ etag, value, onChange }, apiRef) => {
  const { generatePushID } = usePushID();
  const isPropsUpdateRef = useRef(false);
  const etagRef = useRef(etag);
  const nestableRef = useRef(null);

  // Project State
  const [nodes, setNodes] = useState(list2tree(value.items));
  const [collapse, setCollapse] = useState(value.collapse);
  const [focus, setFocus] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Source Code support
  const isSourceCodeUpdateRef = useRef(false);
  const [showEditor, setShowEditor] = useState(false);
  const [sourceCode, setSourceCode] = useState(JSON.stringify(value, null, 2));

  // Imports changes from the outside world into the component
  useEffectDebounced(
    () => {
      // Skip loopback updates from outside state management
      if (etag === etagRef.current) {
        etagRef.current = etag;
        return;
      }

      console.log(`@TreeTable::reset(${etag})`);

      // Mark the data change as driven by a props update activity
      // (this is to avoid circular loops with the outside world)
      isPropsUpdateRef.current = true;

      // Set internal state
      setNodes(list2tree(value.items));
      setCollapse(value.collapse);

      // Update Source Code Editor
      isSourceCodeUpdateRef.current = true;
      setSourceCode(JSON.stringify(value, null, 2));
    },
    [etag, value],
    { delay: DEBOUNCE_DELAY, firstDelay: 0, skipFirst: true }
  );

  // Exports the internal state to the outside world
  useEffectDebounced(
    () => {
      // Skip reacting to props updates
      // (this is to avoid circular loops with the outside world)
      if (isPropsUpdateRef.current) {
        isPropsUpdateRef.current = false;
        return;
      }

      // To update with whathever comes form the Nestable
      // Generate the PushID here so we can skip the same-data update
      etagRef.current = generatePushID();

      console.log(`@TreeTable::update(${etagRef.current})`);

      // Apply document changes
      const data = {
        ...value,
        collapse,
        items: tree2list(nodes)
      };
      onChange(data, etagRef.current);

      // Propagate the change to the Source Code
      isSourceCodeUpdateRef.current = true;
      setSourceCode(JSON.stringify(data, null, 2));
    },
    [nodes, collapse],
    { delay: DEBOUNCE_DELAY, skipFirst: true }
  );

  // Apply collapsed elements to Nestable
  useEffectDebounced(
    () => {
      nestableRef.current.collapse(collapse);
    },
    [collapse],
    { delay: 0 }
  );

  // SRC -> Project
  useEffectDebounced(
    () => {
      // Prevent infinite loop in syncing the project with the Source Code
      if (isSourceCodeUpdateRef.current) {
        isSourceCodeUpdateRef.current = false;
        return;
      }

      // Parse the Source Code and propagate the change only when
      // we have a correct JSON document
      try {
        const _src = JSON.parse(sourceCode);
        setNodes(list2tree(_src.items));
        setCollapse(_src.collapse);
      } catch (err) {}
    },
    [sourceCode],
    { delay: 0, skipFirst: true }
  );

  const handleNestableChange = ({ items, dragItem, targetPath }) => {
    console.log("@handleNestableChange");

    // Reassign parent using the change path provided by Nestable
    targetPath.pop();
    dragItem.parent = null;
    let collection = items;
    for (const idx of targetPath) {
      dragItem.parent = collection[idx];
      collection = dragItem.parent.children;
    }

    // Apply new items to the internal state
    // (side effect: save the project and sync on other clients)
    setNodes(items);
  };

  const contextValue = {
    nodes,
    setNodes,
    collapse,
    setCollapse,
    sourceCode,
    setSourceCode,
    focus,
    setFocus,
    isEditMode,
    setIsEditMode
  };

  // Build the external API object
  apiRef.current = {
    ...makeApi(contextValue),
    showEditor: () => setShowEditor(true),
    getData: () => ({
      ...value,
      collapse,
      items: tree2list(nodes)
    })
  };

  return (
    <TreeTableContext.Provider value={contextValue}>
      <Nestable
        ref={nestableRef}
        items={nodes}
        renderItem={({ item, ...rest }) => (
          <Node node={item} nestableProps={rest} />
        )}
        onChange={handleNestableChange}
      />
      <SourceCode
        open={showEditor}
        value={sourceCode}
        onChange={setSourceCode}
        onClose={() => setShowEditor(false)}
      />
    </TreeTableContext.Provider>
  );
});
