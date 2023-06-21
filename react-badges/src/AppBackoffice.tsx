import React from "react";
import { RouteProps } from "react-router-dom";

import {
  SupervisorAccount as ManagersIcon,
  Engineering as EngineersIcon,
  Security as ShieldIcon
} from "@mui/icons-material";

import AppEntrypoint from "./containers/AppEntrypoint";
import ManagerEngineer from "./views/backoffice/ManagerEngineer";

import BackofficeMenu from "./views/backoffice/BackofficeMenu";

const AppBackoffice: React.FC = () => (
  <AppEntrypoint
    title="Backoffice"
    defaultRoute="managers"
    drawerContents={[<BackofficeMenu />]}
    mobileUtils={[
      {
        icon: <ManagersIcon />,
        text: "managers",
        link: "managers"
      },
      {
        icon: <EngineersIcon />,
        text: "engineers",
        link: "engineers"
      },
      {
        icon: <ShieldIcon />,
        text: "badges",
        link: "badges"
      }
    ]}
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
