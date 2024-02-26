import { Product, Server } from '@prisma/client'
import { success } from 'helpers'
import * as _servers from 'models/server'

export async function getServers(product: Product) {
  const servers = await _servers.findAll(product.id)
  if (!servers) {
    throw new Error('Failed to get servers')
  }
  return success({
    servers,
  })
}

export async function createServer(product: Product, address: string, name: string, desc: string) {
  const server = await _servers.createServer({
    address,
    name,
    desc,
    productId: product.id,
  })
  if (!server) {
    throw new Error('Failed to create server')
  }

  return success({
    server,
  })
}

export async function updateServer(server: Server, data: { address: string, name: string, desc: string, state: number }) {
  const updated = await _servers.updateById(server.id, data)
  if (!updated) {
    throw new Error('Failed to update server')
  }

  return success({
    updatedId: server.id,
  })
}

export async function deleteServer(server: Server) {
  const deleted = await _servers.deleteById(server.id)
  if (!deleted) {
    throw new Error('Failed to delete server')
  }

  return success({
    deletedId: deleted.id,
  })
}
