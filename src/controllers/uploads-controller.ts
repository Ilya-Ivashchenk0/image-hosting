import { FastifyReply, FastifyRequest } from 'fastify'
import { uploadsService } from '../services'

export const uploadsController = {
  uploadOne: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const file = await req.file()

      if (!file) {
        return reply.status(400).send({ error: 'Файл не найден' })
      }

      const result = await uploadsService.uploadImage(file)
      reply.send(result)
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error)
      reply.status(500).send({ error: 'Ошибка при загрузке изображений' })
    }
  }
}
