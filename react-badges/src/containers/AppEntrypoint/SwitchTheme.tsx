import React from "react";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import { useThemeSwitcher } from "../../state/with-mui";
import { useBasicLayout } from "../../layouts/BasicLayout";

import { DrawerMenu } from "../../layouts/BasicLayout";

const SwitchTheme: React.FC = () => {
  const { switchTheme } = useThemeSwitcher();
  const { showDetails } = useBasicLayout();

  return (
    <DrawerMenu
      withDivider={false}
      title={"Switch Theme:"}
      items={[
        {
          text: "Light Mode",
          icon: <LightMode />,
          onClick: () => switchTheme("light")
        },
        {
          text: "Dark Mode",
          icon: <DarkMode />,
          onClick: () => switchTheme("dark")
        }
      ]}
    />
  );
};

export default SwitchTheme;
