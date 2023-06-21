import React from "react";
import AppEntrypoint, { EngineerIcon } from "./containers/AppEntrypoint";

const AppEngineer: React.FC = () => (
  <AppEntrypoint
    icon={<EngineerIcon />}
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
