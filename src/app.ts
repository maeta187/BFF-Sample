import Fastify from 'fastify';

import { graphqlPlugin } from './plugins/graphql.js';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get('/healthz', async () => {
    return { ok: true };
  });

  app.register(graphqlPlugin);

  return app;
}
