import { createContext, useState, useRef, forwardRef } from "react";

import { arrayToTree } from "performant-array-to-tree";
import { useEffectDebounced } from "../../utils/use-effect-debounced";
import {
  flat,
  createNode,
  appendAfter,
  appendInto,
  getNodeById,
  getNextNodeById,
  getPrevNodeById,
  moveNodeInById,
  moveNodeOutById,
  updateNodeById,
  removeNodeById
} from "../../utils/deeplist";
import { useCreatePubSub } from "../../utils/use-pubsub";
import { useKeyboard } from "./use-keyboard";

const DEBOUNCE_DELAY = 0;

export const TreeTableContext = createContext();

export const withTreeTable = (Component) =>
  forwardRef((props, ref) => {
    const { data, onChange } = props;
    const pubsub = useCreatePubSub();
    const isPropsUpdateRef = useRef(false);
    const lastOnChangeData = useRef(null);
    const nestableRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [focus, setFocus] = useState(null);
    const [collapse, setCollapse] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const updateNode = (nodeId, change) => {
      setNodes((curr) => updateNodeById(curr, nodeId, change));
      pubsub.publish("node::changed", { nodeId, change });
    };

    /**
     * Imports changes from the outside world into the component.
     */
    useEffectDebounced(
      () => {
        // Skip loopback updates from outside state management
        if (data === lastOnChangeData.current) return;

        // Mark the data change as driven by a props update activity
        // (this is to avoid circular loops with the outside world)
        isPropsUpdateRef.current = true;

        // Set internal state:
        const _nodes = arrayToTree(data.items, { dataField: null });
        setNodes(_nodes);

        setCollapse(data.collapse);

        // Set focus on initial item:
        // focus === null && _nodes.length && setFocus(_nodes[0].id);

        console.log("@withTreeTable::nodes::reset");
      },
      [data],
      { delay: DEBOUNCE_DELAY, firstDelay: 0 }
    );

    /**
     * Exports the internal state to the outside world.
     * (by triggering the "onChange()" prop)
     */
    useEffectDebounced(
      () => {
        if (!onChange) return;
        if (!nodes.length) return;

        // Skip reacting to props updates
        // (this is to avoid circular loops with the outside world)
        if (isPropsUpdateRef.current) {
          isPropsUpdateRef.current = false;
          return;
        }

        // Rewrite the data into the outside world format
        const data = {
          collapse,
          items: flat(nodes)
        };

        // Keep track of the latest outward data to prevent loopback
        // updates, and trigger the onChange callback
        lastOnChangeData.current = data;
        onChange(data);

        console.log("@withTreeTable::nodes::changed");
      },
      [nodes, collapse],
      { delay: DEBOUNCE_DELAY }
    );

    /**
     * Propagate the collapsable state to the Nestable APIs
     */
    useEffectDebounced(
      () => {
        nestableRef.current.collapse(collapse);
      },
      [collapse],
      { delay: 0 }
    );

    useKeyboard(ref);

    /**
     * Expose programmatic API
     */
    ref.current = {
      getActiveNodeId: () => focus,
      getActiveNode: () => getNodeById(nodes, focus),
      requestEditMode: () => setIsEditMode(true),
      requestFocusPrev: () => setFocus(getPrevNodeById(nodes, focus)),
      requestFocusNext: () => setFocus(getNextNodeById(nodes, focus)),
      prepend: (payload) => setNodes((curr) => [createNode(payload), ...curr]),
      append: (payload) => setNodes((curr) => [...curr, createNode(payload)]),
      appendAfter: (nodeId, payload) => {
        const [_node, _nodes] = appendAfter(nodes, nodeId, payload);
        setNodes(_nodes);
        setTimeout(() => {
          setFocus(_node.id);
          setIsEditMode(true);
        }, 0);
      },
      appendInto: (nodeId, payload) => {
        const [_node, _nodes] = appendInto(nodes, nodeId, payload);
        setNodes(_nodes);
        setTimeout(() => {
          setFocus(_node.id);
          setIsEditMode(true);
        }, 0);
      },
      requestMoveIn: (nodeId) => setNodes(moveNodeInById(nodes, nodeId)),
      requestMoveOut: (nodeId) => setNodes(moveNodeOutById(nodes, nodeId)),
      requestToggleCollapse: (nodeId) =>
        setCollapse((curr) =>
          curr.includes(nodeId)
            ? curr.filter(($) => $ !== nodeId)
            : [...curr, nodeId]
        ),
      requestToggleStatus: (nodeId) => {
        const node = getNodeById(nodes, nodeId);
        updateNode(node.id, { status: !node.status });
      },
      requestDelete: (nodeId) => {
        // Pick next item to focus on:
        let _nextFocus = getNextNodeById(nodes, nodeId);
        if (!_nextFocus) _nextFocus = getPrevNodeById(nodes, nodeId);

        setNodes(removeNodeById(nodes, nodeId));
        setFocus(_nextFocus);
      }
    };

    return (
      <TreeTableContext.Provider
        value={{
          ref,
          pubsub,
          nestableRef,
          nodes,
          setNodes,
          focus,
          setFocus,
          collapse,
          setCollapse,
          isEditMode,
          setIsEditMode
        }}
      >
        <Component />
      </TreeTableContext.Provider>
    );
  });
