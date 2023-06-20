import React from "react";
import AppEntrypoint from "./containers/AppEntrypoint";

const AppEngineer: React.FC = () => (
  <AppEntrypoint
    title="Engineer"
    defaultRoute="dashboard"
    routes={[
      {
        path: "dashboard",
        element: <div>Engineer</div>
      }
    ]}
  />
);

export default AppEngineer;
