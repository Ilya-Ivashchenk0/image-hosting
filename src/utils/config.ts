import dotenv from 'dotenv'
dotenv.config()

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3666),
  host: process.env.NODE_ENV === 'development' ? 'http://localhost:3666' : process.env.HOST,
  serverConfig: {
    logger: {
      base: {
        pid: process.pid
      },
      timestamp: () => `,"time":"${new Date().toISOString()}"`
    }
  },
  cors: () => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        origin: '*', // разрешенные домены
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'] // разрешенные методы
      }
    }

    return {
      origin: '*', // разрешенные домены
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'] // разрешенные методы
    }
  },
  rateLimit: {
    max: 100,
    timeWindow: '1 minute'
  }
}
