import { RequestHandler } from 'express'
import 'dotenv/config'

import { APIResponse } from '../types/util.type'
import envConfig from '../utils/validate'

import HttpStatusCode from '../constants/httpStatusCode.constant'

const jwtSerect = envConfig.SECRECT_JWT

declare module 'http' {
  interface IncomingHttpHeaders {
    'X-Auth': string
  }
}

const authorization: RequestHandler<unknown, APIResponse, unknown, unknown> = async (
  request,
  response,
  next
) => {
  const authToken = request.header('X-Auth')

  if (!authToken) {
    return response.status(HttpStatusCode.Unauthorized).json({
      status: HttpStatusCode.Unauthorized,
      message: 'Unauthorized! Access Denied!'
    })
  }
  try {
    if (authToken === jwtSerect) {
      next()
    }
  } catch (error) {
    response.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: 'Bad Request'
    })
  }
}

export default authorization
