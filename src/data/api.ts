import { GraphQLClient } from "./api-client/graphql-client";
import { GraphQLQueryExecutor } from "./api-client/graphql-query";
import { OurnetQueryApi } from "./api-client/ournet-query-api";
import { OurnetMutationApi } from "./api-client/ournet-mutation-api";

const executor = new GraphQLQueryExecutor(process.env.OURNET_API_HOST || 'ournetapi.com');

export const api = new GraphQLClient(
    new OurnetQueryApi(executor),
    new OurnetMutationApi(executor),
);
