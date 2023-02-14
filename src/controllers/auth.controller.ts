import { RequestHandler } from 'express'
import bcryptHash from '../configs/bcrypt.config'

import { LoginBodyRequest, RegisterBodyRequest } from './../types/auth.type'
import { APIResponse } from '../types/util.type'

import { isStrongPassword, isValidateEmail } from '../utils/rules'
import HttpStatusCode from '../constants/httpStatusCode.constant'
import { UserCollection } from '../models/user.model'

const RegisterAction: RequestHandler<unknown, APIResponse, RegisterBodyRequest, unknown> = async (
  request,
  response
) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = request.body
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
    const isExistEmail = await UserCollection.findOne({ email: email }).exec()

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

    const hashedPw = await bcryptHash.hash(password)
    /* Check First-Time Admin Used */
    const userList = await UserCollection.find()
    if (userList.length > 0) {
      const newUser = new UserCollection({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPw,
        role: 0
      })
      await newUser.save()

      response.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: 'Create Account Successfully',
        data: newUser
      })
    } else {
      const newUser = new UserCollection({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPw,
        role: 1
      })
      await newUser.save()

      response.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: 'Create Admin Successfully',
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

const LoginAction: RequestHandler<unknown, APIResponse, LoginBodyRequest, unknown> = async (
  request,
  response
) => {
  try {
    const { email, password } = request.body
    const user = await UserCollection.findOne({ email: email })
    if (!user) {
      response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Email or Password is not correct!'
      })
    } else {
      const validatePw = bcryptHash.compare(password, user.password)
      if (!validatePw) {
        response.status(HttpStatusCode.FailedDependency).json({
          status: HttpStatusCode.FailedDependency,
          message: 'Email or Password is not correct!'
        })
      }
      response.status(HttpStatusCode.Ok).json({
        status: HttpStatusCode.Ok,
        message: 'Login success'
      })
    }
  } catch (error) {
    response.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: 'Bad Request'
    })
  }
}

const AuthController = {
  RegisterAction,
  LoginAction
}

export default AuthController
