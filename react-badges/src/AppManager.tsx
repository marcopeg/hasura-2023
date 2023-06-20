import React from "react";
import AppEntrypoint from "./containers/AppEntrypoint";

const AppManager: React.FC = () => (
  <AppEntrypoint
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
