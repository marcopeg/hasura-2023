import React from "react";
import { useAuth } from "../../state/with-auth";
import { useNavigate } from "react-router-dom";

import { DrawerMenu } from "../../layouts/BasicLayout";

import { BackofficeIcon, ManagerIcon, EngineerIcon } from "./AppEntrypoint";

const rolesToIcons = {
  backoffice: <BackofficeIcon />,
  manager: <ManagerIcon />,
  engineer: <EngineerIcon />
};

const SwitchRole: React.FC = () => {
  const { roles, switchRole } = useAuth();
  const navigate = useNavigate();

  // Hide if no multiple roles are available:
  if (roles.length === 1) return null;

  const handleSwitchRole = (role) => {
    switchRole(role);
    navigate("/", { replace: true });
  };

  return (
    <DrawerMenu
      title={"Switch Role:"}
      items={roles.map((role) => ({
        onClick: () => handleSwitchRole(role),
        text: `${role.charAt(0).toUpperCase()}${role.slice(1)}`,
        icon: rolesToIcons[role]
      }))}
    />
  );
};

export default SwitchRole;
