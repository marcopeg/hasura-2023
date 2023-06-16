import React from "react";
import ReactDOM from "react-dom/client";

// Import all the providers that will be used int the app
// Those providers are exposed as HOC
import withApollo from "./utils/with-apollo";
import withAuthorization from "./utils/with-authorization";

import App from "./App";

// HOC Providers must be applied in reverse order
// this is already better than [Provider Hell](https://marcopeg.com/context-provider-hell/#:~:text=the%20Galaxy%20and-,Context%20Providers,-to%20the%20index)
// but the best way to manage this issue is using [ForrestJS](https://forrestjs.github.io/)
const ConnectedApp = withApollo(App);
const AuthorizedApp = withAuthorization(ConnectedApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthorizedApp />
  // </React.StrictMode>
);
