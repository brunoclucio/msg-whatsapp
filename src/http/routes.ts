import type { FastifyInstance, FastifyRequest } from 'fastify'
// import { format } from 'date-fns'
// import { ptBR } from 'date-fns/locale'
import axios from 'axios'
import { env } from '../env'
import type {
  MessageReceivedWebhookProps,
  MessageSendButtonListProps,
  MessageSendOptionListProps,
  MessageSendTextProps,
  MessageSendWebhookProps,
} from '../@types/types'
import { ClientError } from '../errors/client-error'

const api = axios.create({
  baseURL: `https://api.z-api.io/instances/${env.INSTANCE_ID}/token/${env.INSTANCE_TOKEN}`,
})

export async function routes(app: FastifyInstance) {
  app.get('/', () => {
    return { message: 'Testanto rota!' }
  })

  app.post(
    '/on-message-send-whatsapp-webhook',
    (request: FastifyRequest<{ Body: MessageSendWebhookProps }>) => {
      console.log('body', request.body)
      return request.body
    }
  )

  app.post(
    '/on-message-received-whatsapp-webhook',
    (request: FastifyRequest<{ Body: MessageReceivedWebhookProps }>) => {
      console.log('body', request.body)
      return request.body
    }
  )

  app.post('/send-text', async (request: FastifyRequest<{ Body: MessageSendTextProps }>) => {
    const { phone, message } = request.body

    const text = {
      phone,
      message,
    }

    const { data } = await api.post<MessageSendTextProps>('/send-text', text, {
      headers: {
        'Client-Token': env.CLIENT_TOKEN,
      },
    })

    if (!data) {
      throw new ClientError('Não foi possível enviar a mensagem!')
    }

    return data
  })

  app.post(
    '/send-button-list',
    async (request: FastifyRequest<{ Body: MessageSendButtonListProps }>) => {
      console.log('body', request.body)

      const { phone, message } = request.body

      const text = {
        phone,
        message,
        buttonList: {
          buttons: [
            {
              id: '1',
              label: 'Sim',
            },
            {
              id: '2',
              label: 'Não',
            },
          ],
        },
      }

      const { data } = await api.post<MessageSendButtonListProps>('/send-button-list', text, {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
      })

      if (!data) {
        throw new ClientError('Não foi possível enviar a mensagem!')
      }

      return data
    }
  )

  app.post(
    '/send-option-list',
    async (request: FastifyRequest<{ Body: MessageSendOptionListProps }>) => {
      console.log('body', request.body)
      const { phone, message } = request.body

      const text = {
        phone,
        message,
        optionList: {
          title: 'Opções disponíveis',
          buttonLabel: 'Abrir lista de opções',
          options: [
            {
              id: '1',
              description: '',
              title: 'Sim',
            },
            {
              id: '2',
              description: '',
              title: 'Não',
            },
          ],
        },
      }

      const { data } = await api.post<MessageSendOptionListProps>('/send-option-list', text, {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
      })

      if (!data) {
        throw new ClientError('Não foi possível enviar a mensagem!')
      }

      return data
    }
  )
}
