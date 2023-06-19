import { createElement } from "react";
import loadable from "./utils/loadable";
import { useAuth } from "./utils/with-authorization";

import LoadingView from "./views/LoadingView";
const LoginView = loadable(() => import("./views/LoginView"));
const ErrorView = loadable(() => import("./views/ErrorView"));

// All the role-based views (SubApps) are lazy loaded in order to save
// loading time considering that they will be used one at the time.
const rolesToViews = {
  backoffice: loadable(() => import("./AppBackoffice")),
  manager: loadable(() => import("./AppManager")),
  engineer: loadable(() => import("./AppEngineer"))
};

const App = () => {
  const { isLoading, needLogin, hasError, error, role } = useAuth();

  if (isLoading) return <LoadingView />;
  if (needLogin) return <LoginView />;
  if (hasError) return <ErrorView error={error} />;

  // Render Role-based View
  if (role) return createElement(rolesToViews[role]);

  return <ErrorView error={new Error("No role was found in the JWT!")} />;
};

export default App;
