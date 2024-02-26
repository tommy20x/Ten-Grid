import { Router, Request, Response, NextFunction } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import * as serverService from 'services/server.service'
import * as serverModel from 'models/server'

const router = Router()

// Preload server on routes with ':serverId'
router.param('serverId', async function (req: Request, res: Response, next: NextFunction, serverId: number) {
  try {
    const server = await serverModel.findById(serverId)
    if (!server) {
      return res.sendStatus(500)
    }

    req.server = server;
    return next()
  }
  catch(e) {
    return res.sendStatus(500)
  }
})

router.put(
  '/:serverId',
  auth.required,
  body('address').isIP(4),
  body('name').notEmpty(),
  body('desc').notEmpty(),
  body('state').isNumeric(),
  validate,
  async (req: Request, res: Response) => {
    try {
      return res.json(await serverService.updateServer(req.server, req.body))
    }
    catch(e) {
      return res.sendStatus(500)
    }
  }
)

router.delete('/:serverId', auth.required, async (req: Request, res: Response) => {
  try {
    return res.json(await serverService.deleteServer(req.server))
  }
  catch(e) {
    return res.sendStatus(500)
  }
})

export default router
