import { removeLoadable } from "../utils/with-loadable";
import BasicLayout from "../layouts/BasicLayout";

const ManagerView = () => (
  <BasicLayout title="Badges" subtitle="Manager View">
    manager app
  </BasicLayout>
);

export default removeLoadable(ManagerView);
