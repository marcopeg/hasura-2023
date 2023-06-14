import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { usePushID } from "../../../utils/use-pushid";

const LOAD_PROJECT = gql`
  query GetProjectFull($uuid: String!) {
    project: beta_projects_by_pk(uuid: $uuid) {
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

const UPDATE_PROJECT_DATA = gql`
  mutation UpdateProjectData($uuid: String!, $data: jsonb!, $etag: String!) {
    update_beta_projects_by_pk(
      pk_columns: { uuid: $uuid }
      _set: { data: $data, etag: $etag }
    ) {
      updated_at
    }
  }
`;

const buildError = (error, data) => {
  if (!Boolean(error) && !Boolean(data)) return null;
  if (error) return error;
  if (data?.project) return null;

  return {
    name: 404,
    message: "Project not found"
  };
};

const buildData = (data) => {
  if (!data) return null;
  return data?.project;
};

export const useBetaProject = () => {
  const { uuid } = useParams();
  const { generatePushID } = usePushID();

  // GraphQL
  const [_updateData] = useMutation(UPDATE_PROJECT_DATA);
  const { loading, error, data } = useQuery(LOAD_PROJECT, {
    variables: { uuid }
  });

  const updateData = (data, etag = generatePushID()) => {
    const variables = { uuid, data, etag };
    _updateData({ variables }).catch((err) => {
      console.log(`ERROR: ${err.message}`);
    });
  };

  const updateTitle = () => {
    console.warn("To be implemented");
  };

  return {
    loading,
    error: buildError(error, data),
    data: buildData(data),
    updateData,
    updateTitle
  };
};
