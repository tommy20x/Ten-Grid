import { Server } from '@prisma/client'
import prisma from '../config/prisma'

export async function findAll(productId: number) {
  return await prisma.server.findMany({
    where: {
      productId: productId,
    },
  })
}

export async function findUnique(where: object) {
  return await prisma.server.findUnique({
    where: where,
  })
}

export async function findById(id: number) {
  return findUnique({ id })
}

export async function findByAddress(address: string) {
  return findUnique({ address })
}

export async function createServer(data: {address: string, name: string, desc: string, productId: number}) {
  return await prisma.server.create({
    data: data,
  })
}

export async function updateById(id: number, data: object) {
  return await prisma.server.update({
    where: {
      id: id,
    },
    data,
  })
}

export async function deleteById(id: number) {
  return await prisma.server.delete({
    where: {
      id: id,
    },
  })
}

export async function getClientCounts() {
  return await prisma.client.groupBy({
    by: ['serverId'],
    _count: true,
  })
}

export default Server
