import Fastify from 'fastify'
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

  const uploadDir = path.join(__dirname, '../images')

  try {
    await fs.mkdir(uploadDir, { recursive: true }).catch(console.error)

    server
      .register(fastifyCors, config.cors)
      .register(fastifyMultipart)
      .register(fastifyStatic, {
        root: uploadDir,
        prefix: '/images/'
      })
      .register(routes, { prefix: '/api' })
      .register(fastifyRateLimit, config.rateLimit)
      .listen({ port: config.port })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

export default start
