
import Fastify from 'fastify';
import { routes } from './routes';
import authPlugin from './plugins/auth';

const fastify = Fastify({
  logger: true
});

fastify.register(authPlugin);
fastify.register(routes);

export { fastify };
