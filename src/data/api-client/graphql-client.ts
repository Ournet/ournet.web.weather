import { GraphQlQuery } from "./graphql-query";


export class GraphQLClient<Q extends GraphQlQuery, M extends GraphQlQuery> {
    constructor(readonly query: Q, readonly mutation: M) { }
}
