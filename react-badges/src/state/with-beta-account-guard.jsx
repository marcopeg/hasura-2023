import { Alert, AlertTitle, Button } from "@mui/material";
import BetaPage from "../components/BetaPage";
import { useBetaAccount } from "./use-beta-account";

export const withBetaAccountGuard = (Component) => () => {
  const account = useBetaAccount();
  const { loading, error, accountData, resetAccount } = account;

  if (loading) return null;

  // In case the Account does not exist
  if (error)
    return (
      <BetaPage>
        <Alert
          severity="error"
          action={<Button onClick={resetAccount}>reset account</Button>}
        >
          <AlertTitle>Oooops!</AlertTitle>
          {error.message}
        </Alert>
      </BetaPage>
    );

  // There is still some delay between end of loading and the
  // AccountData being available... d'oh!
  if (!accountData) return "missing account";

  return <Component {...account} />;
};
