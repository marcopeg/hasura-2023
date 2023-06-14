import { gql, useSubscription } from "@apollo/client";

const PROJECT_SUBSCRIPTION = gql`
  subscription GetBetaProjectUpdates(
    $uuid: String!
    $updated_at: timestamptz!
  ) {
    items: beta_projects(
      where: { uuid: { _eq: $uuid }, updated_at: { _gt: $updated_at } }
    ) {
      uuid
      title
      data
      etag
      updated_at
      created_at
      account_uuid
    }
  }
`;

const buildData = (update, projectData) => {
  if (!update) return projectData;
  if (!update.items.length) return projectData;
  return update.items[0];
};

export const useBetaProjectUpdates = (projectData) => {
  const { uuid, updated_at } = projectData;

  const { error, data: update } = useSubscription(PROJECT_SUBSCRIPTION, {
    variables: { uuid, updated_at }
  });

  return {
    error,
    data: buildData(update, projectData)
  };
};
