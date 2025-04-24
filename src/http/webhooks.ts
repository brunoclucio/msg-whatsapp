import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { MessageReceivedWebhookProps, MessageSendWebhookProps } from '../@types/types'
import { env } from '../env'
import { ClientError } from '../errors/client-error'
import { api } from '../lib/axios'

export async function webhooks(app: FastifyInstance) {
  app.post(
    '/on-message-send-whatsapp-webhook',
    async (
      request: FastifyRequest<{ Body: MessageSendWebhookProps }>,
      reply: FastifyReply<{ Body: MessageSendWebhookProps }>
    ) => {
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

        reply.code(200).send({ message: 'Recebimento realizado com sucesso!' })
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Erro no webhook de recebimento de mensagens!')
      }
    }
  )

  app.post(
    '/on-message-received-whatsapp-webhook',
    async (
      request: FastifyRequest<{ Body: MessageReceivedWebhookProps }>,
      reply: FastifyReply<{ Body: MessageReceivedWebhookProps }>
    ) => {
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

        reply.code(200).send({ message: 'Envio realizado com sucesso!' })
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Erro no webhook de envio de mensagens!')
      }
    }
  )
}
