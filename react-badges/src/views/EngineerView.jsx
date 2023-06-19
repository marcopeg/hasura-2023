import { removeLoadable } from "../utils/with-loadable";
import BasicLayout from "../layouts/BasicLayout";

import SwitchTheme from "../containers/SwitchTheme";
import SwitchRole from "../containers/SwitchRole";

const EngineerView = () => (
  <BasicLayout
    title="Badges"
    subtitle="Engineer View"
    drawerContents={[<SwitchRole />, <SwitchTheme />]}
  >
    engineer app
  </BasicLayout>
);

export default removeLoadable(EngineerView);
