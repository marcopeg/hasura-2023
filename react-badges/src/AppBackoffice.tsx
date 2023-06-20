import React from "react";
import AppEntrypoint from "./containers/AppEntrypoint";
import ManagerEngineer from "./views/backoffice/ManagerEngineer";
import { RouteProps } from "react-router-dom";

const AppBackoffice: React.FC = () => (
  <AppEntrypoint
    title="Backoffice"
    defaultRoute="managers"
    routes={
      [
        {
          path: "managers",
          element: <ManagerEngineer />
        }
      ] as RouteProps[]
    }
  />
);

export default AppBackoffice;
