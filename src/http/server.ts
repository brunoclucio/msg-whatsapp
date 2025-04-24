import cors from '@fastify/cors'
import fastify from 'fastify'
import { errorHandler } from './error-handler'
import { routes } from './routes'

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.setErrorHandler(errorHandler)

app.register(routes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Servidor rodando!')
  })
