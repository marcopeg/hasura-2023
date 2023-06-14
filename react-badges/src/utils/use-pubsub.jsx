import { createContext, useContext, useRef } from "react";

const DEFAULT_SUBSCRIBE_OPTIONS = {
  debounce: 0
};

export const useCreatePubSub = () => {
  const ref = useRef({});
  const debounceRef = useRef({});

  const unsubscribe = (eventName, fn) => {
    if (!ref.current[eventName]) return;
    ref.current[eventName] = ref.current[eventName].filter(($) => $ !== fn);
  };

  const subscribe = (eventName, fn, options = DEFAULT_SUBSCRIBE_OPTIONS) => {
    const delay = options.debounce || DEFAULT_SUBSCRIBE_OPTIONS.debounce;

    const debouncedFn = (...args) => {
      clearTimeout(debounceRef.current[fn]);
      debounceRef.current[fn] = setTimeout(() => fn(...args), delay);
    };

    if (!ref.current[eventName]) {
      ref.current[eventName] = [debouncedFn];
    } else {
      ref.current[eventName].push(debouncedFn);
    }

    return () => {
      clearTimeout(debounceRef.current[fn]);
      unsubscribe(eventName, fn);
    };
  };

  const publish = (eventName, payload = null) => {
    if (!ref.current[eventName]) return;
    ref.current[eventName].forEach((fn) => fn(payload));
  };

  return {
    subscribe,
    unsubscribe,
    publish
  };
};

const PubSubContext = createContext();

/**
 * HOC Version
 *
 * ```js
 * withPubSub(App)
 * ```
 *
 * @param {*} Component
 * @returns
 */
export const withPubSub = (Component) => () => {
  console.log("@withPubSub::render");

  return (
    <PubSubContext.Provider value={useCreatePubSub()}>
      <Component />
    </PubSubContext.Provider>
  );
};

/**
 * Provider Component Version
 *
 * ```jsx
 * <PubSubProvider>
 *   <App />
 * </PubSubProvider>
 *
 * @param {} props
 * @returns
 */
export const PubSubProvider = (props) => {
  console.log("@PubSubProvider::render");

  return <PubSubContext.Provider {...props} value={useCreatePubSub()} />;
};

export const usePubSub = () => useContext(PubSubContext);
