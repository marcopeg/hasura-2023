import { useState, createElement } from "react";
import { useAuth } from "./utils/with-authorization";

import BackofficeApp from "./views/BackofficeApp";
import ManagerApp from "./views/ManagerApp";

const apps = {
  backoffice: BackofficeApp,
  manager: ManagerApp
};

const App = () => {
  const { needLogin, hasError, roles, error: authError } = useAuth();
  const [currentApp, setCurrentApp] = useState("backoffice");

  if (hasError) {
    return authError.message;
  }

  if (needLogin) {
    return "login needed";
  }

  // Render current app
  if (currentApp) return createElement(apps[currentApp]);

  return (
    <div>
      <h2>Menu: {currentApp}</h2>
      <ul>
        {roles.map((role) => (
          <li key={role} onClick={() => setCurrentApp(role)}>
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
