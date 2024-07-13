
import { gql } from 'graphql-request';

export const GET_JOBS = `query MyQuery {
  jobs(order_by: {createdAt: desc}) {
    createdAt
    id
    location
    role
    salary
    title
    updatedAt
  }
}`;

export const FILTER_JOBS = `query MyQuery($role:String!) {
  jobs(where: {role: {_eq: $role}}) {
    id
    createdAt
    location
    role
    salary
    title
    updatedAt
  }
}`;