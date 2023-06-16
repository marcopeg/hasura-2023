import { removeLoadable } from "../utils/with-loadable";

const LoginView = () =>
  'You need a valid JWT token in the "hasura-token" LocalStorage key';

export default removeLoadable(LoginView);
