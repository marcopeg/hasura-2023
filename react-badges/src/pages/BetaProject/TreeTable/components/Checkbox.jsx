import { memo, useState, useEffect } from "react";
import { Checkbox as MUICheckbox } from "@mui/material";

const Checkbox = ({ value, onChange }) => {
  // console.log("@render::Checkbox");
  const [status, setStatus] = useState(value);

  useEffect(() => {
    setStatus(value);
  }, [value]);

  const onStatusChange = (evt) => {
    if (!onChange) return;

    const value = Boolean(evt.target.checked);
    setStatus(value);
    onChange(evt, value);
  };

  return (
    <MUICheckbox size={"small"} checked={status} onChange={onStatusChange} />
  );
};

export default memo(Checkbox);
