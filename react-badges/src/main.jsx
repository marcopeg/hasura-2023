import React from "react";
import ReactDOM from "react-dom/client";
import withApollo from "./utils/with-apollo";
import withAuthorization from "./utils/with-authorization";
import App from "./App";

const ConnectedApp = withApollo(App);
const AuthorizedApp = withAuthorization(ConnectedApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthorizedApp />
  // </React.StrictMode>
);
