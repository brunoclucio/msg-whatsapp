import cors from '@fastify/cors'
import fastify from 'fastify'
import { errorHandler } from './error-handler'
import { routes } from './routes'
import { webhooks } from './webhooks'

const app = fastify()

app.setErrorHandler(errorHandler)
app.register(webhooks)

app.register(cors, {
  origin: '*',
})

app.register(routes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Servidor rodando!')
  })
