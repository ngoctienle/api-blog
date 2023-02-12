import { Request, Response } from 'express'

import HttpStatusCode from '../constants/httpStatusCode.constant'
import { ExRouter } from '../configs/app.config'
import bcryptHash from '../configs/bcrypt.config'

import UserModel from '../models/user.model'

/* Register API */
ExRouter.post('/register', async (request: Request, response: Response) => {
  try {
    const hashedPw = await bcryptHash.hash(request.body.password)

    const newUser = new UserModel({
      username: request.body.username,
      email: request.body.email,
      password: hashedPw
    })
    const user = await newUser.save()

    response.status(HttpStatusCode.Ok).json(user)
  } catch (error) {
    response.status(HttpStatusCode.BadRequest).json(error)
  }
})

/* SignIn API */
ExRouter.post('/login', async (request: Request, response: Response) => {
  try {
    const user = await UserModel.findOne({ username: request.body.username })
    if (!user) {
      return response.status(HttpStatusCode.NotFound).json('Wrong Credentials!')
    }
    const validatePw = bcryptHash.compare(request.body.password, user.password)
    if (!validatePw) {
      return response.status(HttpStatusCode.NotFound).json('Wrong Credentials!')
    }
    const { ...others } = user.__v
    response.status(HttpStatusCode.Ok).json(others)
  } catch (error) {
    response.status(HttpStatusCode.BadRequest).json(error)
  }
})

export default ExRouter
