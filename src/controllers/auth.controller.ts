import { RequestHandler } from 'express'

import bcryptHash from '../configs/bcrypt.config'
import { User } from '../models/user.model'

import { RegisterBodyRequest } from './../types/auth.type'
import { APIResponse } from '../types/util.type'

import HttpStatusCode from '../constants/httpStatusCode.constant'
import { isStrongPassword, isValidateEmail } from '../utils/rules'

export const RegisterController: RequestHandler<
  unknown,
  APIResponse,
  RegisterBodyRequest,
  unknown
> = async (request, response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = request.body
    const hashedPw = await bcryptHash.hash(password)

    /* Check Dependency */
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Missing Dependency'
      })
    }
    /* Check Email */
    if (!isValidateEmail(email)) {
      response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Email is invalid'
      })
    }
    const isExistEmail = await User.findOne({ email: email }).exec()
    if (isExistEmail) {
      response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Email is existed!'
      })
    }
    /* Check Password */
    if (!isStrongPassword(password)) {
      response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Password is not strong'
      })
    } else {
      if (password !== confirmPassword) {
        response.status(HttpStatusCode.FailedDependency).json({
          status: HttpStatusCode.FailedDependency,
          message: 'Confirm Password need to be same with Password'
        })
      }
    }

    /* Check First-Time Admin Used */
    const users = await User.find()
    if (users.length > 0) {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPw,
        role: 'User'
      })
      await newUser.save()
      response.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: 'Create Account Successfully',
        data: newUser
      })
    } else {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPw,
        role: 'Admin'
      })
      await newUser.save()
      response.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: 'Create Account Successfully',
        data: newUser
      })
    }
  } catch (error) {
    response.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: 'Bad Request'
    })
  }
}

/* export const LoginController: RequestHandler = async (request: Request, response: Response) => {
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
} */
