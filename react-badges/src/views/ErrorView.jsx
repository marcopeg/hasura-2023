import { removeLoadable } from "../utils/with-loadable";

const ErrorView = ({ error }) => {
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
    </>
  );
};

export default removeLoadable(ErrorView);
