import { Response } from 'express'

export function errorMessage(error: any) {
  if (error?.code === 11000) {
    return {
      code: error.code,
      message: 'Already exists',
    }
  }
  return {
    code: -1,
    message: error?.message,
  }
}

export function success(data: any) {
  return {
    success: true,
    data: data,
  }
}

export function handler(callback: any) {
  return async function(req: Request, res: Response) {
    try {
      return res.json(await callback(req))
    }
    catch (e) {
      return res.status(500).json({
        success: false,
        errors: errorMessage(e),
      })
    }
  }
}