import React from "react";
import {
  SupervisorAccount as ManagersIcon,
  Engineering as EngineersIcon,
  Security as ShieldIcon
} from "@mui/icons-material";

import { useBasicLayout } from "../../layouts/BasicLayout";
import MenuList from "../../components/MenuList";

const BackofficeMenu: React.FC = () => {
  const { showDetails } = useBasicLayout();

  return (
    <MenuList
      showDetails={showDetails}
      title="Backoffice:"
      items={[
        {
          to: "managers",
          text: "Managers",
          icon: <ManagersIcon />
        },
        {
          to: "engineers",
          text: "Engineers",
          icon: <EngineersIcon />
        },
        {
          to: "badges",
          text: "Badges Definitions",
          icon: <ShieldIcon />
        }
      ]}
    />
  );
};

export default BackofficeMenu;
