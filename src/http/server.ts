import { routes } from './routes'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { errorHandler } from './error-handler'

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
