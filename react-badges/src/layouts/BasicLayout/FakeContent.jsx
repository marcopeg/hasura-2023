const FakeContent = ({ length = 50, text = "Item" }) => (
  <>
    {Array.from({ length }).map((_, i) => (
      <p key={i}>
        {text} {i + 1}
      </p>
    ))}
  </>
);

export default FakeContent;
