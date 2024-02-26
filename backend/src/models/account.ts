import { Server } from '@prisma/client'
import { errorHandler } from './errors'
import prisma from '../config/prisma'

export async function findAll(productId: number) {
  try {
    return await prisma.server.findMany({
      where: {
        productId: productId,
      },
    })
  } catch (err) {
    console.log('Failed to get all products:', err)
    return null
  }
}

export async function findUnique(where: object) {
  try {
    return await prisma.server.findUnique({
      where: where,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function findServerById(id: number) {
  return findUnique({ id })
}

export async function findServerByAddress(address: string) {
  return findUnique({ address })
}

export async function createServer(data: {
  address: string
  name: string
  desc: string
  productId: number
}) {
  try {
    return await prisma.server.create({
      data: data,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function updateById(id: number, data: object) {
  try {
    return await prisma.server.update({
      where: {
        id: id,
      },
      data,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function deleteById(id: number) {
  try {
    return await prisma.account.delete({
      where: {
        id: id,
      },
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function deleteManyById(ids: Array<number>) {
  try {
    return await prisma.account.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export default Server
