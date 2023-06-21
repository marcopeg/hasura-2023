import { useState, createContext, useContext, useEffect, useRef } from "react";
import { useEmitter } from "./with-emitter";

import FullscreenLayout from "../layouts/FullscreenLayout";
import LoadableCurtain from "../components/LoadableCurtain";

const LoadableContext = createContext();

const defaults = {
  // Minimum on-screen time for the loading curtain
  minDuration: 800,
  // Stuff to show
  text: ""
};

const withLoadable =
  (
    Component,
    { minDuration = defaults.minDuration, text = defaults.text } = defaults
  ) =>
  (props) => {
    const emitter = useEmitter();
    const displayedAt = useRef(new Date());
    const [isVisible, setIsVisible] = useState(true);
    const triggerRef = useRef(setIsVisible);

    useEffect(() =>
      emitter.sub("loadable::show", () => {
        displayedAt.current = new Date();
        setIsVisible(true);
      })
    );

    return (
      <>
        <LoadableContext.Provider
          value={{
            minDuration,
            displayedAt,
            triggerRef,
            isVisible,
            setIsVisible
          }}
        >
          <Component {...props} />
        </LoadableContext.Provider>
        {isVisible && (
          <FullscreenLayout>
            <LoadableCurtain text={text} />
          </FullscreenLayout>
        )}
      </>
    );
  };

export const useRemoveLoadable = () => {
  const { minDuration, displayedAt, setIsVisible } =
    useContext(LoadableContext);
  useEffect(() => {
    const delay = minDuration - (new Date() - displayedAt.current);
    setTimeout(
      () => {
        setIsVisible(false);
      },
      delay > 0 ? delay : 0
    );
  }, []);
  return null;
};

export const removeLoadable = (Component) => (props) => {
  useRemoveLoadable();
  return <Component {...props} />;
};

export default withLoadable;
