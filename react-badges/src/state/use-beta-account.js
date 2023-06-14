import { useContext } from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { usePushID } from "../utils/use-pushid";
import { BetaAccountContext } from "./with-beta-account-provider";

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($accountID: String!, $data: jsonb = "{}") {
    account: insert_beta_accounts_one(
      object: { uuid: $accountID, data: $data }
    ) {
      uuid
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation CreateDummyProject(
    $accountID: String!
    $projectID: String!
    $title: String!
    $data: jsonb!
  ) {
    project: insert_beta_projects_one(
      object: {
        uuid: $projectID
        account_uuid: $accountID
        title: $title
        data: $data
      }
    ) {
      projectID: uuid
      created_at
      updated_at
      title
    }
  }
`;

const APPEND_PROJECT = gql`
  mutation AppendDummyProject($accountID: String!, $projectID: jsonb!) {
    update_beta_accounts_by_pk(
      pk_columns: { uuid: $accountID }
      _append: { own_projects: $projectID }
    ) {
      uuid
    }
  }
`;

const REMOVE_SHARED_PROJECT = gql`
  mutation RemoveSharedProject($accountID: String!, $projectID: String!) {
    beta_project_remove_shared(
      args: { accountID: $accountID, projectID: $projectID }
    ) {
      payload
    }
  }
`;

const REMOVE_OWN_PROJECT = gql`
  mutation RemoveOwnProject($accountID: String!, $projectID: String!) {
    beta_project_remove_own(
      args: { accountID: $accountID, projectID: $projectID }
    ) {
      payload
    }
  }
`;

export const useBetaAccount = () => {
  const { uname } = useParams();
  const { generatePushID } = usePushID();
  const [createAccountFn] = useMutation(CREATE_ACCOUNT);
  const [createProjectFn] = useMutation(CREATE_PROJECT);
  const [appendProjectFn] = useMutation(APPEND_PROJECT);
  const [removeSharedProjectFn] = useMutation(REMOVE_SHARED_PROJECT);
  const [removeOwnProjectFn] = useMutation(REMOVE_OWN_PROJECT);

  const { setAccountID, loadAccount, ...state } =
    useContext(BetaAccountContext);
  const { accountID, reloadAccount } = state;

  const createAccount = async () => {
    const accountID = generatePushID();
    const projectID = generatePushID();
    const t1 = generatePushID();
    const t2 = generatePushID();

    await createAccountFn({ variables: { accountID } });
    await createProjectFn({
      variables: {
        accountID,
        projectID,
        title: "Cook Dinner",
        data: {
          collapse: [t2],
          items: [
            {
              id: t1,
              title: "Main coure is done"
            },
            {
              id: generatePushID(),
              parentId: t1,
              title: "Boil water",
              status: true
            },
            {
              id: generatePushID(),
              parentId: t1,
              title: "Put pasta into boiling water"
            },
            {
              id: generatePushID(),
              parentId: t1,
              title: "Serve with garlic and oil"
            },
            {
              id: t2,
              title: "Desserts are done"
            },
            {
              id: generatePushID(),
              parentId: t2,
              title: "Buy a frozen cake",
              status: true
            },
            {
              id: generatePushID(),
              parentId: t2,
              title: "Move it to the fride before cooking time",
              status: true
            }
          ]
        }
      }
    });
    await appendProjectFn({ variables: { accountID, projectID } });

    setAccountID(accountID);
  };

  const redeemAccount = (accountID) =>
    loadAccount({ variables: { accountID } }).then((res) => {
      if (!res.data.account[0].payload.success) {
        alert("Account not found");
        return;
      }

      setAccountID(accountID);
    });

  const resetAccount = () => {
    localStorage.removeItem("liste123.beta.account.id");
    window.location = window.location.href.split("?")[0];
  };

  const removeSharedProject = async (projectID) => {
    const res = await removeSharedProjectFn({
      variables: { accountID, projectID }
    });
    await reloadAccount();
    return res;
  };

  const removeOwnProject = async (projectID) => {
    const res = await removeOwnProjectFn({
      variables: { accountID, projectID }
    });
    await reloadAccount();
    return res;
  };

  return {
    ...state,
    uname,
    accountURL: `${window.location.origin}?accountID=${state.accountID}`,
    createAccount,
    redeemAccount,
    resetAccount,
    removeSharedProject,
    removeOwnProject
  };
};
