import { gql, useQuery } from "@apollo/client";

const GET_BADGES = gql`
  query getBadges {
    badges: badges_definitions {
      id
      title
    }
  }
`;

import withApollo from "./with-apollo";

const App = () => {
  const { data, loading, error } = useQuery(GET_BADGES);

  if (loading) return "loading....";

  if (error) return `ERROR: ${error.message}`;

  return (
    <div>
      <h2>Badges:</h2>
      <ul>
        {data.badges.map((badge) => (
          <li key={badge.id}>{badge.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default withApollo(App);
