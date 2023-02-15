import { RequestHandler } from 'express'
import bcryptHash from '../configs/bcrypt.config'

import { UserModel } from '../models/user.model'

import { LoginBodyRequest, RegisterBodyRequest } from './../types/auth.type'
import { APIResponse } from '../types/util.type'

import { isStrongPassword, isValidateEmail } from '../utils/rules'
import HttpStatusCode from '../constants/httpStatusCode.constant'

const RegisterAction: RequestHandler<unknown, APIResponse, RegisterBodyRequest, unknown> = async (
  request,
  response
) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = request.body
    /* Check Dependency */
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Missing Dependency'
      })
    }
    /* Check Email */
    if (!isValidateEmail(email)) {
      return response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Email is invalid'
      })
    }
    const isExistEmail = await UserModel.findOne({ email: email }).exec()
    if (isExistEmail) {
      return response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Email is existed!'
      })
    }
    let role = 1
    const isHaveAdmin = await UserModel.findOne({ role: 1 }).exec()
    if (isHaveAdmin) {
      role = 0
    }
    /* Check Password */
    if (!isStrongPassword(password)) {
      return response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Password is not strong'
      })
    }
    if (password !== confirmPassword) {
      return response.status(HttpStatusCode.FailedDependency).json({
        status: HttpStatusCode.FailedDependency,
        message: 'Confirm Password need to be same with Password'
      })
    }

    const hashedPw = await bcryptHash.hash(password)
    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPw,
      role: role
    })
    await newUser.save().then(() => {
      return response.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: 'Account created!',
        data: newUser
      })
    })
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
    const user = await UserModel.findOne({ email: email })
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
