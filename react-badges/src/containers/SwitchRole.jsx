import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { useAuth } from "../state/with-auth";
import { useBasicLayout } from "../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";

import MenuList from "../components/MenuList";

const rolesToIcons = {
  backoffice: <AdminPanelSettingsIcon />,
  manager: <SupervisorAccountIcon />,
  engineer: <LocalPoliceIcon />
};

const SwitchRole = () => {
  const { roles, switchRole } = useAuth();
  const { showDetails } = useBasicLayout();
  const navigate = useNavigate();

  // Hide if no multiple roles are available:
  if (roles.length === 1) return null;

  const handleSwitchRole = (role) => {
    switchRole(role);
    navigate("/", { replace: true });
  };

  return (
    <MenuList
      showDetails={showDetails}
      title={"Switch Role:"}
      items={roles.map((role) => ({
        onClick: () => handleSwitchRole(role),
        text: role,
        icon: rolesToIcons[role]
      }))}
    />
  );
};

export default SwitchRole;
