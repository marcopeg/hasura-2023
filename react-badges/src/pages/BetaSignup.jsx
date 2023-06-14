import { Typography, Divider, TextField, Button, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";

import { useBetaAccount } from "../state/use-beta-account";
import BetaPage from "../components/BetaPage";

export const BetaSignup = () => {
  const { createAccount, redeemAccount, accountID } = useBetaAccount();

  const handleRedeem = (evt) => {
    evt.preventDefault();
    redeemAccount(evt.target.elements["account_id"].value);
  };

  // Redirect after gaining access to the account:
  if (accountID) {
    return <Navigate to="/beta/@me" />;
  }

  return (
    <BetaPage>
      <Stack spacing={2}>
        <Typography variant={"h4"}>Create New Account</Typography>
        <Typography variant={"body"}>Signup policy...</Typography>
        <Button variant="contained" onClick={createAccount}>
          Create Account
        </Button>
      </Stack>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Stack component={"form"} spacing={2} onSubmit={handleRedeem}>
        <Typography variant={"h4"}>Redeem Existing Account</Typography>
        <Stack direction={"row"} spacing={2}>
          <TextField
            name={"account_id"}
            placeholder={"Write here your AccountID"}
            sx={{ flex: 1 }}
          />
          <Button type="submit" variant="contained">
            Redeem
          </Button>
        </Stack>
      </Stack>
    </BetaPage>
  );
};

export default BetaSignup;
