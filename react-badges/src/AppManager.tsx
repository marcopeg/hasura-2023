import React from "react";

import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"
    defaultRoute="dashboard"
    routes={[
      {
        path: "dashboard",
        element: <div>Manager</div>
      }
    ]}
  />
);

export default AppManager;
