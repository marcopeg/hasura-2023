import { useState, useEffect, createElement } from "react";
import loadable from "./utils/loadable";
import { useAuth } from "./utils/with-authorization";

import LoadingView from "./views/LoadingView";
const LoginView = loadable(() => import("./views/LoginView"));
const ErrorView = loadable(() => import("./views/ErrorView"));

// All the role-based views (SubApps) are lazy loaded in order to save
// loading time considering that they will be used one at the time.
//
// TODO: this map should be rendered by a router
const rolesToViews = {
  backoffice: loadable(() => import("./views/BackofficeView")),
  manager: loadable(() => import("./views/ManagerView")),
  engineer: loadable(() => import("./views/EngineerView"))
};

const App = () => {
  const auth = useAuth();

  if (auth.isLoading) return <LoadingView />;
  if (auth.needLogin) return <LoginView />;
  if (auth.hasError) return <ErrorView error={auth.error} />;

  // Render Role-based View
  const role = auth.hasura["x-hasura-default-role"];
  if (role) return createElement(rolesToViews[role]);

  return "waiting for a default role...";
};

export default App;
