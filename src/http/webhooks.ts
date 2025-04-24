import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type {
  MessageQueueProps,
  MessageReceivedWebhookProps,
  MessageSendWebhookProps,
} from '../@types/types'
import { env } from '../env'
import { ClientError } from '../errors/client-error'
import { api } from '../lib/axios'

export async function webhooks(app: FastifyInstance) {
  app.post(
    '/on-message-send-whatsapp-webhook',
    (
      request: FastifyRequest<{ Body: MessageSendWebhookProps }>,
      reply: FastifyReply<{ Body: MessageSendWebhookProps }>
    ) => {
      const data = request.body

      reply.code(200).send({ message: 'Entrou no webhook de envio de mensagens!' })

      MessageSendWebhook(data)
    }
  )

  app.post(
    '/on-message-received-whatsapp-webhook',
    (
      request: FastifyRequest<{ Body: MessageReceivedWebhookProps }>,
      reply: FastifyReply<{ Body: MessageReceivedWebhookProps }>
    ) => {
      const data = request.body

      reply.code(200).send({ message: 'Entrou no webhook de recebimento de mensagens!' })

      MessageReceivedWebhook(data)
    }
  )
}

async function MessageSendWebhook(data: MessageSendWebhookProps) {
  try {
    console.log('MessageSendWebhook: data =>', data)

    const { zaapId, messageId, type } = data

    //Recupera as mensagens na fila da API.
    const { data: messages } = await api.get<MessageQueueProps[]>('/queue', {
      headers: {
        'Client-Token': env.CLIENT_TOKEN,
      },
      // params: {
      //   page: 1,
      //   pageSize: 100,
      // },
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
  } catch (error) {
    console.log('Error:', error)
    throw new ClientError('Erro no webhook de envio de mensagens!')
  }
}

async function MessageReceivedWebhook(data: MessageReceivedWebhookProps) {
  try {
    console.log('MessageReceivedWebhook: data =>', data)
    const { phone, messageId, type, text } = data

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
  } catch (error) {
    console.log('Error:', error)
    throw new ClientError('Erro no webhook de recebimento de mensagens!')
  }
}
