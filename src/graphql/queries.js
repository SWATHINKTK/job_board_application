
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
}

`;
