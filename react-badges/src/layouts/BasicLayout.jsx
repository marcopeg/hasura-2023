import RoleSwitcher from "../containers/RoleSwitcher";
import { useAuth } from "../utils/with-authorization";

const BasicLayout = ({ children }) => {
  const auth = useAuth();
  console.log(auth);
  return (
    <>
      <RoleSwitcher />
      <hr />
      {children}
    </>
  );
};

export default BasicLayout;
