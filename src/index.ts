import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import routes from './routes'
import { config } from './utils/config'
import fastifyRateLimit from '@fastify/rate-limit'
import path from 'path'
import fs from 'fs/promises'

const start = async () => {
  const server = Fastify(config.serverConfig)

  const uploadDir = path.join(process.cwd(), 'images')

  try {
    await fs.mkdir(uploadDir, { recursive: true }).catch(console.error)
    server
      .register(fastifyCors, config.cors)
      .register(fastifyMultipart)
      .register(fastifyRateLimit, config.rateLimit)
      .register(fastifyStatic, {
        root: uploadDir,
        prefix: '/images/'
      })
      .get('/', async (req: FastifyRequest, reply: FastifyReply) =>
        reply.sendFile('index.html', path.join(process.cwd(), 'public')))
      .register(routes, { prefix: '/api' })
      .listen({ port: config.port, host: '0.0.0.0' })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

export default start
