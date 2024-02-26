import { Router, Request, Response, NextFunction } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import { handler } from 'helpers'
import auth from 'routes/auth'
import * as productService from 'services/product.service'
import * as serverService from 'services/server.service'
import * as productModel from 'models/product'

const router = Router()

// Preload product on routes with ':productId'
router.param('productId', async function (req: Request, res: Response, next: NextFunction, productId: string) {
  try {
    const product = await productModel.findById(Number(productId))
    if (!product) {
      return res.sendStatus(500)
    }

    req.product = product;
    return next()
  }
  catch(e) {
    return res.sendStatus(500)
  }
})

router.get('/', auth.required, handler(async () => await productService.getProducts()))

router.post(
  '/',
  auth.required,
  body('name').notEmpty(),
  body('code').notEmpty(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { name, code } = req.body
      return res.json(await productService.createProduct(
        String(name),
        String(code)
      ))
    }
    catch (e) {
      return catchError(res, e)
    }
  }
)

router.put(
  '/:productId',
  auth.required,
  body('name').notEmpty(),
  body('code').notEmpty(),
  validate,
  async (req: Request, res: Response) => {
    try {
      return res.json(await productService.updateProduct(req.product, {
        name: String(req.body.name),
        code: String(req.body.code),
      }))
    }
    catch (e) {
      return catchError(res, e)
    }
  }
)

router.delete(
  '/:productId',
  auth.required,
  async (req: Request, res: Response) => {
    try {
      return res.json(await productService.deleteProduct(req.product))
    }
    catch (e) {
      return catchError(res, e)
    }
  }
)

router.get(
  '/:productId/servers',
  auth.required,
  async (req: Request, res: Response) => {
    try {
      return res.json(await serverService.getServers(req.product))
    }
    catch (e) {
      return catchError(res, e)
    }
  }
)

router.post(
  '/:productId/servers',
  auth.required,
  body('address').isIP(4),
  body('name').notEmpty(),
  body('desc').notEmpty(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { address, name, desc } = req.body
      return res.json(await serverService.createServer(
        req.product,
        address,
        name,
        desc
      ))
    }
    catch (e) {
      return catchError(res, e)
    }
  }
)

export default router
