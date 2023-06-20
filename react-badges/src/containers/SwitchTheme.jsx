import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import { useThemeSwitcher } from "../state/with-mui";
import { useBasicLayout } from "../layouts/BasicLayout";

import MenuList from "../components/MenuList";

const SwitchTheme = () => {
  const { switchTheme } = useThemeSwitcher();
  const { showDetails } = useBasicLayout();

  return (
    <MenuList
      showDetails={showDetails}
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
