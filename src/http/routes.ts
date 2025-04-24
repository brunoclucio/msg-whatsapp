import type { FastifyInstance, FastifyRequest } from 'fastify'
import type {
  MessageReceivedWebhookProps,
  MessageSendButtonListProps,
  MessageSendOptionListProps,
  MessageSendPhoneExistsProps,
  MessageSendPhonesExistsProps,
  MessageSendTextProps,
  MessageSendWebhookProps,
} from '../@types/types'
// import { format } from 'date-fns'
// import { ptBR } from 'date-fns/locale'
import { env } from '../env'
import { ClientError } from '../errors/client-error'
import { api } from '../lib/axios'

export async function routes(app: FastifyInstance) {
  app.get('/', () => {
    return { message: 'rota inicial!' }
  })

  app.post(
    '/on-message-send-whatsapp-webhook',
    async (request: FastifyRequest<{ Body: MessageSendWebhookProps }>) => {
      try {
        console.log('body', request.body)

        const { zaapId, messageId, type } = request.body

        //Recupera as mensagens na fila da API.
        const { data: messages } = await api.get('/queue', {
          headers: {
            'Client-Token': env.CLIENT_TOKEN,
          },
          params: {
            page: 1,
            pageSize: 100,
          },
        })

        console.log('messages', messages)

        //Caso existam mensagens em fila, verifica se a mensagem que está sendo enviada está presente.
        // if (messages) {
        //   await Promise.all(
        //     messages.map(async message => {
        //       //Caso encontre a mensagem, insere na tabela de chats.
        //       if (message.ZaapId === zaapId) {
        //         console.log('Encontrou a mensagem')
        //         const chat = {
        //           zaapId,
        //           messageId,
        //           type,
        //           datIncl: new Date(),
        //           telefone: message.Phone,
        //           mensagem: message.Message,
        //         }

        //         console.log('chat', chat)
        //       }
        //     })
        //   )
        // }

        return request.body
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Erro no webhook de recebimento de mensagens!')
      }
    }
  )

  app.post(
    '/on-message-received-whatsapp-webhook',
    async (request: FastifyRequest<{ Body: MessageReceivedWebhookProps }>) => {
      try {
        console.log('body', request.body)
        const { phone, messageId, type, text } = request.body

        //Se houver mensagem.
        if (text) {
          console.log('Retorno de texto')

          const { message } = text

          const chat = {
            zaapId: '',
            messageId,
            type,
            datIncl: new Date(),
            telefone: phone,
            mensagem: message,
          }

          console.log('chat', chat)
        }

        return request.body
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Erro no webhook de envio de mensagens!')
      }
    }
  )

  app.post('/send-text', async (request: FastifyRequest<{ Body: MessageSendTextProps }>) => {
    try {
      const { phone, message } = request.body

      const text: MessageSendTextProps = {
        phone,
        message,
      }

      const { data } = await api.post<MessageSendTextProps>('/send-text', text, {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
      })

      return data
    } catch (error) {
      console.log('Error:', error)
      throw new ClientError('Não foi possível enviar a mensagem!')
    }
  })

  app.post(
    '/send-button-list',
    async (request: FastifyRequest<{ Body: MessageSendButtonListProps }>) => {
      try {
        console.log('body', request.body)

        const { phone, message } = request.body

        const text: MessageSendButtonListProps = {
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

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível enviar a mensagem!')
      }
    }
  )

  app.post(
    '/send-option-list',
    async (request: FastifyRequest<{ Body: MessageSendOptionListProps }>) => {
      try {
        console.log('body', request.body)
        const { phone, message } = request.body

        const text: MessageSendOptionListProps = {
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

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível enviar a mensagem!')
      }
    }
  )

  app.get(
    '/phone-exists/:phone',
    async (request: FastifyRequest<{ Params: Omit<MessageSendPhoneExistsProps, 'exists'> }>) => {
      try {
        const { phone } = request.params

        const { data } = await api.get<MessageSendPhoneExistsProps>(`/phone-exists/${phone}`, {
          headers: {
            'Client-Token': env.CLIENT_TOKEN,
          },
        })

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível verificar o telefone!')
      }
    }
  )

  app.post(
    '/phone-exists-batch',
    async (request: FastifyRequest<{ Body: Pick<MessageSendPhonesExistsProps, 'phones'> }>) => {
      try {
        console.log('body', request.body)

        const { phones } = request.body

        const { data } = await api.post<Omit<MessageSendPhonesExistsProps, 'phones'>>(
          '/phone-exists-batch',
          {
            phones,
          },
          {
            headers: {
              'Client-Token': env.CLIENT_TOKEN,
            },
          }
        )

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível verificar o telefone!')
      }
    }
  )
}
