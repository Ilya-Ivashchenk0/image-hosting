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
  },
  uploadMultiple: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const parts = req.files()
      const files = []

      for await (const part of parts) {
        if (!part.file) {
          return reply.status(400).send({ error: 'Один или несколько файлов отсутствуют' })
        }
        files.push(part)
      }

      const results = await uploadsService.uploadImages(files)
      reply.send({ data: results })
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error)
      reply.status(500).send({ error: 'Ошибка при загрузке изображений' })
    }
  }
}
