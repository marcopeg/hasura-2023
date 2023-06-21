import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";

import { removeLoadable } from "../state/with-loadable";
import BasicLayout from "../layouts/BasicLayout";

import Route404 from "../components/Route404";
import SwitchTheme from "./SwitchTheme";
import SwitchRole from "./SwitchRole";
import Logout from "./Logout";

interface AppEntrypointProps {
  title: string;
  subtitle?: string;
  drawerContents?: any[];
  drawerUtils?: any[];
  mobileUtils?: any[];
  routes?: any[];
  defaultRoute?: string;
}

const AppEntrypoint: React.FC<AppEntrypointProps> = ({
  title,
  subtitle = "Badges App",
  drawerContents = [],
  drawerUtils = [],
  mobileUtils = [],
  routes = [],
  defaultRoute = "_"
}) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <BasicLayout
          title={title}
          subtitle={subtitle}
          drawerContents={[...drawerContents, <SwitchRole />, <SwitchTheme />]}
          drawerUtils={[...drawerUtils, <Logout />]}
          mobileUtils={mobileUtils}
        >
          <Outlet />
        </BasicLayout>
      ),
      children: [
        ...routes,
        {
          path: "",
          element: <Navigate to={defaultRoute} replace />
        },
        {
          path: "*",
          element: <Route404 />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default removeLoadable(AppEntrypoint);
