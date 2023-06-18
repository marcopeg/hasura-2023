import { removeLoadable } from "../utils/with-loadable";
import BasicLayout from "../layouts/BasicLayout";

const EngineerView = () => (
  <BasicLayout title="Badges" subtitle="Engineer View">
    engineer app
  </BasicLayout>
);

export default removeLoadable(EngineerView);
