import cors from '@fastify/cors'
import fastify from 'fastify'
import { errorHandler } from './error-handler'
import { routes } from './routes'
import { webhooks } from './webhooks'

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.setErrorHandler(errorHandler)

app.register(routes)
app.register(webhooks)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Servidor rodando!')
  })
