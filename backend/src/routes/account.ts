import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import * as accountService from 'services/account.service'

const router = Router()

router.post(
  '/store',
  auth.required,
  body('serverId').isNumeric(),
  validate,
  accountService.createAccount
)

router.delete('/:id', auth.required, accountService.deleteAccount)

export default router
