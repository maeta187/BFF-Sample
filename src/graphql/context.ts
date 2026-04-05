import DataLoader from 'dataloader';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { findUsersByIds, type UserRecord } from '@/data/users.js';

export interface Loaders {
  userById: DataLoader<string, UserRecord | null>;
}

export interface GraphQLContext {
  requestId: string;
  loaders: Loaders;
}

export interface ServerContext {
  req: FastifyRequest;
  reply: FastifyReply;
}

function createLoaders(): Loaders {
  return {
    userById: new DataLoader<string, UserRecord | null>(async (ids) => {
      return findUsersByIds([...ids]);
    }),
  };
}

export function createGraphQLContext({ req }: ServerContext): GraphQLContext {
  return {
    requestId: req.id,
    loaders: createLoaders(),
  };
}
