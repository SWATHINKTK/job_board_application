
import { gql } from 'graphql-request';

export const CRETE_JOB_MUTATION = gql`
mutation CreateJob($title: String, $role: String, $salary: String, $location: String) {
  insert_jobs_one(object: {location: $location, role: $role, salary: $salary, title: $title}) {
    id
    createdAt
    location
    role
    salary
    title
    updatedAt
  }
}
`;

export const DELETE_JOB_MUTATION = gql`
mutation MyMutation($id:uuid!) {
  delete_jobs_by_pk(id: $id) {
    id
  }
}`;


export const EDIT_JOB_MUTATION = gql`
mutation UpdateJob($id: uuid!, $title: String!, $role: String!, $location: String!, $salary: String!) {
  update_jobs(
    where: { id: { _eq: $id } }
    _set: {
      title: $title,
      role: $role,
      location: $location,
      salary: $salary
    }
  ) {
    returning {
      id
      title
      role
      location
      salary
      updatedAt
    }
  }
}
`