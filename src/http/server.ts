import express from 'express'
import bodyParser from 'body-parser'
import { router } from './routers'

const app = express()

app.use(bodyParser.json())

app.use(router)

app.listen({
  port: 3333,
})

console.log('Servidor Rodando!')
