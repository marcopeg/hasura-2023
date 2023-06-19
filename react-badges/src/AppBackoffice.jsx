import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { removeLoadable } from "./state/with-loadable";

import BasicLayout from "./layouts/BasicLayout";
import SwitchTheme from "./containers/SwitchTheme";
import SwitchRole from "./containers/SwitchRole";
import Logout from "./containers/Logout";

const GET_MANAGERS = gql`
  query getManagersAndEngineers {
    managers {
      id
      name
    }
    engineers {
      id
      name
    }
  }
`;

const ADD_RELATION = gql`
  mutation addRela($engineer: Int!, $manager: Int!) {
    insert_users_relations_one(
      object: { engineer: $engineer, manager: $manager }
    ) {
      manager
      engineer
      created_by
      created_at
    }
  }
`;

const AppBackoffice = () => {
  const [manager, setManager] = useState(null);
  const [engineer, setEngineer] = useState(null);

  const r1 = useQuery(GET_MANAGERS);
  const [addRelation, r2] = useMutation(ADD_RELATION);

  const dothis = () => {
    addRelation({
      variables: { manager, engineer }
    });
  };

  console.log(r2);

  if (r1.loading) return "loading...";
  if (r1.error) return "error loading stuff from backoffice ";

  return (
    <BasicLayout
      title="Badges"
      subtitle="Backoffice View"
      drawerContents={[<SwitchRole />, <SwitchTheme />]}
      drawerUtils={[<Logout />]}
    >
      {manager} - {engineer}
      <div>
        <h4>Managers</h4>
        <select onChange={(e) => setManager(e.target.value)}>
          {r1.data.managers.map((record) => (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Engineers</h4>
        <select onChange={(e) => setEngineer(e.target.value)}>
          {r1.data.engineers.map((record) => (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={dothis}>Add</button>
    </BasicLayout>
  );
};

export default removeLoadable(AppBackoffice);
