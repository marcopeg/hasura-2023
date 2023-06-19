import React from "react";
import ReactDOM from "react-dom/client";

// Import all the providers that will be used int the app
// Those providers are exposed as HOC
import withEmitter from "./state/with-emitter";
import withAuthorization from "./state/with-authorization";
import withApollo from "./state/with-apollo";
import withMui from "./state/with-mui";
import withLoadable from "./state/with-loadable";
import { light, dark } from "./theme";

import App from "./App";

// HOC Providers must be applied in reverse order
// this is already better than [Provider Hell](https://marcopeg.com/context-provider-hell/#:~:text=the%20Galaxy%20and-,Context%20Providers,-to%20the%20index)
// but the best way to manage this issue is using [ForrestJS](https://forrestjs.github.io/)
const LoadableApp = withLoadable(App, { text: "BADGES" });
const MuiApp = withMui(LoadableApp, { light, dark });
const ConnectedApp = withApollo(MuiApp);
const AuthorizedApp = withAuthorization(ConnectedApp);
const EventsApp = withEmitter(AuthorizedApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <EventsApp />
  // </React.StrictMode>
);
