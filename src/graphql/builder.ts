import SchemaBuilder from '@pothos/core'

export interface GraphQLSchemaTypes {
	Context: import('./context.js').GraphQLContext
}

export const builder = new SchemaBuilder<GraphQLSchemaTypes>({})

builder.queryType({})
