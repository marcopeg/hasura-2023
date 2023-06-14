import { useRef, useLayoutEffect, useState } from "react";
import { useKeyboardEvent } from "../../../../utils/use-keyboard-event";
import { useEffectDebounced } from "../../../../utils/use-effect-debounced";

export const TextInput = ({
  value,
  onChange,
  onBlur,
  onEnter,
  onCancel,
  ...props
}) => {
  const inputRef = useRef();
  const initialValue = useRef(value);
  const lastCommit = useRef(value);
  const [_value, setValue] = useState(value);

  // Focus on the field:
  useLayoutEffect(() => {
    inputRef.current.focus();
  }, []);

  // Handle blur event also on mobile:
  // https://stackoverflow.com/questions/4971061/capture-done-button-click-in-iphones-virtual-keyboard-with-javascript
  useLayoutEffect(() => {
    const onLoseFocus = () =>
      onBlur &&
      onBlur(
        inputRef.current.value,
        inputRef.current.value !== initialValue.current &&
          inputRef.current.value !== lastCommit.current
      );
    inputRef.current.addEventListener("focusout", onLoseFocus);
    return () => {
      inputRef.current.removeEventListener("focusout", onLoseFocus);
    };
  }, []);

  // Debounced "onChage"
  const { cancel: cancelOnChange } = useEffectDebounced(
    () => {
      if (!onChange) return;
      onChange(_value);
      lastCommit.current = _value;
    },
    [_value],
    {
      delay: 250,
      skipFirst: true
    }
  );

  // Cancel Event
  useKeyboardEvent(
    "Escape",
    () => {
      cancelOnChange();
      onCancel && onCancel(initialValue.current);
    },
    { target: inputRef }
  );

  // Add More Event
  useKeyboardEvent(
    "Enter",
    (evt) => {
      cancelOnChange();
      onEnter && onEnter(evt.target.value, evt.ctrlKey || evt.metaKey);
    },
    { target: inputRef }
  );

  return (
    <input
      {...props}
      ref={inputRef}
      type="text"
      value={_value}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
