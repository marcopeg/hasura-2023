import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { gql, useSubscription, useMutation, useQuery } from "@apollo/client";
import { usePushID } from "../utils/use-pushid";
import { useBetaAccount } from "./use-beta-account";

const PROJECT_SUB = gql`
  subscription GetProject($uuid: String!) {
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

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $uuid: String!
    $title: String!
    $data: jsonb!
    $etag: String!
  ) {
    update_beta_projects_by_pk(
      pk_columns: { uuid: $uuid }
      _set: { data: $data, title: $title, etag: $etag }
    ) {
      updated_at
    }
  }
`;

export const useBetaProject = () => {
  const { generatePushID } = usePushID();
  const { uuid } = useParams();
  const [_data, setData] = useState(null);
  const lastUpdate = useRef(null);
  const { uname, accountID } = useBetaAccount();

  // GraphQL
  const variables = {
    variables: { uuid }
  };
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const { loading, error, data } = useQuery(LOAD_PROJECT, variables);
  const { data: updateData } = useSubscription(PROJECT_SUB, variables);

  // Update internal data on full reload:
  useEffect(() => {
    if (!data || !data.project) return;
    lastUpdate.current = data.project.etag;
    setData(data.project.data);
  }, [data]);

  // Update internal data from the subscription on changes:
  useEffect(() => {
    if (!updateData || !updateData.project) return;
    console.log("@got updated", updateData);
    if (updateData.project?.etag !== lastUpdate.current) {
      setData(updateData.project.data);
    }
  }, [updateData]);

  // Send an update and stores the local etag to avoid state duplication
  const update = (title, data) => {
    lastUpdate.current = generatePushID();

    updateProject({
      variables: {
        uuid,
        title,
        data,
        etag: lastUpdate.current
      }
    });
  };

  return {
    loading,
    error: error
      ? error
      : !loading && !data?.project
      ? {
          name: "404",
          message: "Project not found"
        }
      : null,
    uuid,
    projectID: uuid,
    title: data?.project?.title,
    data: _data,
    update,
    projectURL: `${window.location.origin}/beta/@me/${uuid}?accountID=${accountID}`,
    shareProjectURL: `${window.location.origin}/beta/@me/import?projectID=${uuid}`
  };
};
