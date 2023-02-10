import express from 'express'
import * as mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import envConfig from './utils/validate'

class AppInit {
  public express: express.Application

  constructor() {
    this.express = express()

    this.middlewares()
  }

  private middlewares(): void {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(bodyParser.json({ limit: '10mb' }))
    this.express.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  }

  /* Call Global */
  public startServer(): void {
    mongoose
      .set('strictQuery', false)
      .connect(envConfig.MONGODB_URL)
      .then(() => {
        this.express.listen(envConfig.PORT || 2399, () => {
          console.log('Backend is running. MongoDB Connected!')
        })
      })
      .catch((err) => console.error('Mongo Error:', err))
  }
}

const App = new AppInit()

export default App
