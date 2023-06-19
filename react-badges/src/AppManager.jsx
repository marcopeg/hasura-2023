import { removeLoadable } from "./utils/with-loadable";
import BasicLayout from "./layouts/BasicLayout";

import SwitchTheme from "./containers/SwitchTheme";
import SwitchRole from "./containers/SwitchRole";
import Logout from "./containers/Logout";

const AppManager = () => (
  <BasicLayout
    title="Badges"
    subtitle="Manager View"
    drawerContents={[<SwitchRole />, <SwitchTheme />]}
    drawerUtils={[<Logout />]}
  >
    manager app
  </BasicLayout>
);

export default removeLoadable(AppManager);
