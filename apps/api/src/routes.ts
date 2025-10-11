
import { FastifyInstance } from 'fastify';
import { creatorRoutes } from './modules/creators/creators.routes';
import { studentRoutes } from './modules/students/students.routes';

export async function routes(fastify: FastifyInstance) {
  fastify.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });

  fastify.register(creatorRoutes, { prefix: '/api' });
  fastify.register(studentRoutes, { prefix: '/api' });
}
