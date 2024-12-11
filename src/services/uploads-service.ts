import path from 'path'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { MultipartFile } from '@fastify/multipart'
import { Readable } from 'stream'
import { config } from '../utils'

const uploadDir = path.join(process.cwd(), 'images')

const streamToBuffer = (stream: Readable): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })

export const uploadsService = {
  uploadImage: async (file: MultipartFile) => {
    try {
      const fileId = uuidv4()
      const fileExtension = path.extname(file.filename)
      const filePath = path.join(uploadDir, `${fileId}${fileExtension}`)

      console.log(`Saving file to: ${filePath}`)

      const fileBuffer = await streamToBuffer(file.file)

      await sharp(fileBuffer).toFile(filePath)

      return `${config.host}/images/${fileId}${fileExtension}`
    } catch (err) {
      console.log(err)
    }
  }
}
