import { useLayoutEffect, useRef } from "react";

const DEFAULT_OPTIONS = {
  exact: false, // check that combo and event have same length
  preventDefault: false,
  stopPropagation: false,
  debounceDelay: 0,
  target: document // Could be a DOM object or a React.useRef
};

const getKeyName = (code) => {
  if (code.includes("Key")) return code.substr(3, 1);
  if (code.includes("Digit")) return code.substr(5, 1);
  return code.toUpperCase();
};

/**
 *
 * @param {String} combo Event combo: "ALT + C", "ctrl+z" (case insensitive)
 * @param {Function} fn the callback
 * @param {Object} options See DEFAULT_OPTIONS
 */
export const useKeyboardEvent = (combo = "", fn, options = DEFAULT_OPTIONS) => {
  const setupRef = useRef(null);
  const debounceRef = useRef(null);

  const { exact, target, preventDefault, stopPropagation, debounceDelay } = {
    ...DEFAULT_OPTIONS,
    ...options
  };
  const comboTokens = combo.split("+").map(($) => $.trim().toUpperCase());

  useLayoutEffect(() => {
    const onKeyPress = (evt) => {
      const eventTokens = [
        getKeyName(evt.code, evt.keyCode),
        evt.altKey ? "ALT" : null,
        evt.ctrlKey ? "CTRL" : null,
        evt.metaKey ? "META" : null,
        evt.shiftKey ? "SHIFT" : null
      ].filter(($) => Boolean($));

      // Strict check on "exact" option
      if (exact && comboTokens.length !== eventTokens.length) return;

      // All comboTokens must be present in the eventTokens
      if (comboTokens.every(($) => eventTokens.includes($))) {
        preventDefault && evt.preventDefault();
        stopPropagation && evt.stopPropagation();

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(
          () =>
            fn(evt, {
              combo: comboTokens,
              event: eventTokens
            }),
          debounceDelay
        );
      }
    };

    // Bind to DOM (body)
    setupRef.current = setTimeout(() => {
      if (target && target.current) {
        target.current.addEventListener("keydown", onKeyPress);
        return;
      }

      if (target) {
        target.addEventListener("keydown", onKeyPress);
        return;
      }

      throw new Error("Could not add Keboard listener to undefined target");
    });

    // Unbind and clear timeout
    return () => {
      clearTimeout(setupRef.current);
      clearTimeout(debounceRef.current);

      if (target && target.current && target.current.removeEventListener) {
        target.current.removeEventListener("keydown", onKeyPress);
      } else if (target && target.removeEventListener) {
        target.removeEventListener("keydown", onKeyPress);
      } else {
        console.info("Could not remove Keboard listener to undefined target");
      }
    };
  }, []);
};
