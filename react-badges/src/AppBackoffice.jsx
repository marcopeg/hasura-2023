import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { removeLoadable } from "./state/with-loadable";

import BasicLayout from "./layouts/BasicLayout";
import SwitchTheme from "./containers/SwitchTheme";
import SwitchRole from "./containers/SwitchRole";
import Logout from "./containers/Logout";

import ManagerEngineer from "./views/backoffice/ManagerEngineer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagerEngineer />
  }
]);

const AppBackoffice = () => {
  return (
    <BasicLayout
      title="Badges"
      subtitle="Backoffice View"
      drawerContents={[<SwitchRole />, <SwitchTheme />]}
      drawerUtils={[<Logout />]}
    >
      <RouterProvider router={router} />
    </BasicLayout>
  );
};

export default removeLoadable(AppBackoffice);
