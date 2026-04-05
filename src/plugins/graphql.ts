import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { createYoga } from 'graphql-yoga'

import { createGraphQLContext, type ServerContext } from '@/graphql/context.js'
import { schema } from '@/graphql/schema.js'

const DEFAULT_GRAPHQL_PATH = '/graphql'

export const graphqlPlugin: FastifyPluginAsync = async (app) => {
	const graphqlEndpoint = process.env.GRAPHQL_PATH ?? DEFAULT_GRAPHQL_PATH
	const graphiql = process.env.ENABLE_GRAPHIQL !== 'false'

	const yoga = createYoga<ServerContext>({
		schema,
		graphqlEndpoint,
		graphiql,
		landingPage: false,
		context: createGraphQLContext
	})

	app.route({
		url: graphqlEndpoint,
		method: ['GET', 'POST', 'OPTIONS'],
		handler: async (request, reply) => {
			return yoga.handleNodeRequestAndResponse(request, reply, {
				req: request,
				reply
			} satisfies ServerContext)
		}
	})
}

export type GraphQLRequest = FastifyRequest
export type GraphQLReply = FastifyReply
