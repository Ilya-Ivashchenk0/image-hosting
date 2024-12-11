import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { uploadsController } from '../../controllers'

export const uploads = async (server: FastifyInstance) => {
  server.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    return uploadsController.uploadOne(req, reply)
  })
}
