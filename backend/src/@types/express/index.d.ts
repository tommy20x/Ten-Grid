import { Product, Server, Client } from '@prisma/client'

interface Payload {
  id: string
  username: string
  exp: number
  iat: number
}

declare global {
  namespace Express {
    interface Request {
      payload: Payload
      product: Product
      server: Server
      client: Client
    }
  }
}
