import { removeLoadable } from "../utils/with-loadable";
import BasicLayout from "../layouts/BasicLayout";

import SwitchTheme from "../containers/SwitchTheme";
import SwitchRole from "../containers/SwitchRole";
import Logout from "../containers/Logout";

const EngineerView = () => (
  <BasicLayout
    title="Badges"
    subtitle="Engineer View"
    drawerContents={[<SwitchRole />, <SwitchTheme />]}
    drawerUtils={[<Logout />]}
  >
    engineer app
  </BasicLayout>
);

export default removeLoadable(EngineerView);
