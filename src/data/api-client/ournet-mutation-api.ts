import { GraphQlQuery, GraphQLQueryExecutor } from "./graphql-query";

export class OurnetMutationApi extends GraphQlQuery {
    constructor(executor: GraphQLQueryExecutor) {
        super(executor, 'mutation');
    }
}
