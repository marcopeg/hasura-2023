import React from "react";
import ReactDOM from "react-dom/client";

// Import all the providers that will be used int the app
// Those providers are exposed as HOC
import withLoadable from "./utils/with-loadable";
import withAuthorization from "./utils/with-authorization";
import withApollo from "./utils/with-apollo";
import withMui from "./utils/with-mui";

import App from "./App";

// HOC Providers must be applied in reverse order
// this is already better than [Provider Hell](https://marcopeg.com/context-provider-hell/#:~:text=the%20Galaxy%20and-,Context%20Providers,-to%20the%20index)
// but the best way to manage this issue is using [ForrestJS](https://forrestjs.github.io/)
const MuiApp = withMui(App);
const LoadableApp = withLoadable(MuiApp, { text: "BADGES" });
const ConnectedApp = withApollo(LoadableApp);
const AuthorizedApp = withAuthorization(ConnectedApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthorizedApp />
  // </React.StrictMode>
);
