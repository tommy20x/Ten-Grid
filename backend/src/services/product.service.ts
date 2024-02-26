import { Product } from '@prisma/client'
import { success } from 'helpers'
import * as _products from 'models/product'

export async function getProducts() {
  const items = await _products.findAll()
  if (!items) {
    throw new Error('Failed to get records')
  }

  const servers = await _products.getServerCounts()
  if (!servers) {
    throw new Error('Failed to get number of servers')
  }

  const products = items.map((it) => ({
    ...it,
    servers: servers.find((s) => s.productId === it.id)?._count || 0,
  }))

  return success({
    products,
  })
}

export async function createProduct(name: string, code: string) {
  const product = await _products.createProduct(name, code)
  if (!product) {
    throw new Error('Failed to create record')
  }

  return success({
    product,
  })
}

export async function updateProduct(product: Product, data: {name: string, code: string}) {
  const updated = await _products.updateProductById(product.id, {
    name: data.name,
    code: data.code,
  })
  if (!updated) {
    throw new Error('Failed to update record')
  }

  return success({
    updatedId: product.id,
  })
}

export async function deleteProduct(product: Product) {
  const deleted = await _products.deleteById(product.id)
  if (!deleted) {
    throw new Error('Failed to delete record')
  }

  return success({
    deletedId: product.id,
  })
}
