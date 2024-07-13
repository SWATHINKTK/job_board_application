
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
}`