import { removeLoadable } from "../utils/with-loadable";
import BasicLayout from "../layouts/BasicLayout";

import SwitchTheme from "../containers/SwitchTheme";
import SwitchRole from "../containers/SwitchRole";

const ManagerView = () => (
  <BasicLayout
    title="Badges"
    subtitle="Manager View"
    drawerContents={[<SwitchRole />, <SwitchTheme />]}
  >
    manager app
  </BasicLayout>
);

export default removeLoadable(ManagerView);
