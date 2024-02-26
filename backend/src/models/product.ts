import { Product } from '@prisma/client'
import prisma from '../config/prisma'

export async function findAll() {
  return await prisma.product.findMany()
}

export async function getServerCount(product: Product) {
  return await prisma.product.findMany()
}

export async function findUnique(where: object) {
  return await prisma.product.findUnique({
    where: where,
  })
}

export async function findById(id: number) {
  return findUnique({ id })
}

export async function findByName(name: string) {
  return findUnique({ name })
}

export async function createProduct(name: string, code: string) {
  return await prisma.product.create({
    data: {
      name: name,
      code: code,
    },
  })
}

export async function updateProductById(id: number, data: any) {
  return await prisma.product.update({
    where: {
      id: id,
    },
    data,
  })
}

export async function deleteById(id: number) {
  return await prisma.product.delete({
    where: {
      id: id,
    },
  })
}

export async function getServers(product: Product) {
  return await prisma.product.findUnique({
    where: {
      id: product.id,
    },
    include: {
      servers: true,
    },
  })
}

export async function getServerCounts() {
  return await prisma.server.groupBy({
    by: ['productId'],
    _count: true,
  })
}

export default Product
