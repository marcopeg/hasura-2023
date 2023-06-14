import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */
export const useClickOutside = (ref, fn = () => {}) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
