import { createContext, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useEffectDebounced } from "../utils/use-effect-debounced";

const LOAD_ACCOUNT = gql`
  query BetaGetAccount($accountID: String!) {
    account: beta_get_account(args: { accountID: $accountID }) {
      payload
    }
  }
`;

export const BetaAccountContext = createContext();

export const withBetaAccountProvider = (Component) => () => {
  const navigate = useNavigate();
  const [accountID, setAccountID] = useState(null);
  const [error, setError] = useState(null);

  const [loadAccount, { loading, refetch: reloadAccount, ...loadStatus }] =
    useLazyQuery(LOAD_ACCOUNT);

  /**
   * Load AccountID or Create New Account
   */
  useEffectDebounced(
    () => {
      // Import AccountID from URL parameter:
      if (window.__IMPORT_ACCOUNT__) {
        setAccountID(window.__IMPORT_ACCOUNT__);
        return;
      }

      // Load AccountID from local storage:
      const accountID = localStorage.getItem("liste123.beta.account.id");
      if (accountID) {
        setAccountID(accountID);
        return;
      }

      // Send to signup pipeline:
      navigate("/beta/signup");
    },
    [],
    { delay: 0 }
  );

  /**
   * Load Account Data
   */
  useEffectDebounced(
    () => {
      loadAccount({ variables: { accountID } }).then((res) => {
        if (res.data.account[0].payload.success) {
          localStorage.setItem("liste123.beta.account.id", accountID);
        } else {
          setError({
            name: "MissingAccount",
            message: `Account "${accountID}" does not exists on this server`
          });
        }
      });
    },
    [accountID],
    { delay: 0, skipFirst: true }
  );

  return (
    <BetaAccountContext.Provider
      value={{
        loading,
        error: loadStatus.error || error,
        accountID,
        setAccountID,
        accountData: loadStatus.data?.account[0].payload.data,
        loadAccount,
        reloadAccount,
        loadStatus
      }}
    >
      <Component />
    </BetaAccountContext.Provider>
  );
};
