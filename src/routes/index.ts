import { FastifyInstance } from 'fastify'
import { uploads } from './upload'

const routes = async (server: FastifyInstance) => {
  server.register(uploads, { prefix: '/upload' })
}

export default routes
