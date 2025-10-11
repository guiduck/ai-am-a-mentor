import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
  interface FastifyRequest {
    user: {
      id: string;
      role: string;
    };
  }
}

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        throw new Error('Missing token');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      request.user = decoded as { id: string; role: string };
    } catch (err) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });
});
