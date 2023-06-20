import React, { FC } from "react";

interface FakeContentProps {
  length?: number;
  text?: string;
}

const FakeContent: FC<FakeContentProps> = ({ length = 50, text = "Item" }) => (
  <>
    {Array.from({ length }).map((_, i) => (
      <p key={i}>
        {text} {i + 1}
      </p>
    ))}
  </>
);

export default FakeContent;
