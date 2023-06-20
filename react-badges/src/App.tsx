import React, { createElement } from "react";
import loadable from "./utils/loadable";
import { useAuth } from "./state/with-auth";

import LoadingView from "./views/LoadingView";
const LoginView = loadable(() => import("./views/LoginView"));
const ErrorView = loadable(() => import("./views/ErrorView"));

// All the role-based views (SubApps) are lazy loaded in order to save
// loading time considering that they will be used one at the time.
const rolesToViews: { [key: string]: React.ComponentType } = {
  backoffice: loadable(() => import("./AppBackoffice")),
  manager: loadable(() => import("./AppManager")),
  engineer: loadable(() => import("./AppEngineer"))
};

const App: React.FC = () => {
  const { isLoading, needLogin, hasError, error, role } = useAuth();

  // Render the preparation screens:
  if (isLoading) return <LoadingView />;
  if (needLogin) return <LoginView />;
  if (hasError) return <ErrorView error={error} />;

  // Render Role-based View:
  if (role) {
    const RoleView = rolesToViews[role];
    if (RoleView) {
      return createElement(RoleView);
    }
  }

  return <ErrorView error={new Error("No role was found in the JWT!")} />;
};

export default App;
