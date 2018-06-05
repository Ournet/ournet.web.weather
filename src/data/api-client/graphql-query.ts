// const debug = require('debug')('ournet.web.weather');
import fetch from 'node-fetch';

export type Index<T> = {
    [index: string]: T
}

export type GraphQLQueryItem = {
    name: string
    fields: string
    outName?: string
    variables?: { type?: string, name: string, value: any, varName?: string }[]
}

export type GraphQLQueryItemInput = {
    name: string
    fields: string
}

export type GraphQLRequestResult = {
    data: Index<any>
    error?: Error[]
}

export type GraphQLQueryData = {
    query: string
    variables: Index<any>
}

export class GraphQLQueryExecutor {
    constructor(private url: string, private headers: Index<string> = { 'Content-Type': 'application/json' }) { }

    execute(data: GraphQLQueryData): Promise<GraphQLRequestResult> {
        console.log(`executing url ${this.url}`);
        console.log(`executing data ${JSON.stringify(data)}`);
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data),
            timeout: 1000 * 3,
        }).then(response => response.json());
    }
}

export class GraphQlQuery {
    private items: GraphQLQueryItem[] = [];

    constructor(private executor: GraphQLQueryExecutor, private type: 'query' | 'mutation') { }

    protected addQueryItem(item: GraphQLQueryItem) {
        this.items.push(item);
        return this;
    }

    protected formatQueryData(): GraphQLQueryData {
        const variables: Index<any> = {};
        let query: string = this.type + ' queryName';
        const queryParams: Index<any> = {};
        let varCount = 0;
        const body = this.items.map(item => {
            let body = (item.outName || item.name) + ':' + item.name;
            if (item.variables) {
                item.variables.forEach(v => {
                    v.varName = '$input' + varCount;
                    queryParams[v.varName] = v.type || 'String!';
                    variables[v.varName.substr(1)] = v.value;
                    varCount++;
                });
                body += '(' + item.variables.map(v => v.name + ':' + v.varName).join(', ') + ')';
            }
            return body + '{' + item.fields + '}';
        }).join(',');

        if (Object.keys(queryParams).length) {
            query += '(' + Object.keys(queryParams).map(key => key + ':' + queryParams[key]).join(',') + ')';
        }

        query += '{' + body + '}';

        return { query, variables };
    }

    execute() {
        const queryData = this.formatQueryData();
        return this.executor.execute(queryData);
    }
}

export interface GraphQlQueryFactory<T extends GraphQlQuery> {
    create(url: string, headers?: Index<string>): T
}
