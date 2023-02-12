import express, { Application, Router } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import envConfig from '../utils/validate'

class AppInit {
  public express: Application
  public router: Router

  constructor() {
    this.express = express()
    this.router = Router()

    this.middlewares()
    this.startServer()
  }

  private middlewares(): void {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(bodyParser.json({ limit: '10mb' }))
    this.express.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  }
  private startServer(): void {
    mongoose
      .set('strictQuery', false)
      .connect(envConfig.MONGODB_URL)
      .then(() => {
        ExApp.listen(envConfig.PORT || 2399, () => {
          console.log('Backend is running. MongoDB Connected!')
        })
      })
      .catch((err) => console.error('Mongo Error:', err))
  }
}

const App = new AppInit()

export const ExApp = App.express
export const ExRouter = App.router
