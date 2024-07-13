
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.GRAPHQL_API_ENDPOINT || 'http://localhost:8080/v1/graphql';

const client = new GraphQLClient(endpoint);

export default client;
