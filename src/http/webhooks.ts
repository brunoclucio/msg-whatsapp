import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type {
  MessageReceivedWebhookProps,
  MessageSendWebhookProps,
  MessageStatusChangeWebhookProps,
} from '../@types/types'
import { ClientError } from '../errors/client-error'

export async function webhooks(app: FastifyInstance) {
  app.post(
    '/on-message-send-whatsapp-webhook',
    (
      request: FastifyRequest<{ Body: MessageSendWebhookProps }>,
      reply: FastifyReply<{ Body: MessageSendWebhookProps }>
    ) => {
      const data = request.body

      console.log('Entrou no webhook de envio de mensagens!')

      reply.code(200).send()

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

      console.log('Entrou no webhook de recebimento de mensagens!')

      reply.code(200).send()

      MessageReceivedWebhook(data)
    }
  )

  app.post(
    '/on-message-status-change-whatsapp-webhook',
    (
      request: FastifyRequest<{ Body: MessageStatusChangeWebhookProps }>,
      reply: FastifyReply<{ Body: MessageStatusChangeWebhookProps }>
    ) => {
      const data = request.body

      console.log('Entrou no webhook de mudança de status de mensagens!')

      reply.code(200).send()

      MessageStatusChangeWebhook(data)
    }
  )
}

async function MessageSendWebhook(data: MessageSendWebhookProps) {
  try {
    console.log('MessageSendWebhook: data =>', data)
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

async function MessageStatusChangeWebhook(data: MessageStatusChangeWebhookProps) {
  try {
    console.log('MessageStatusChangeWebhook: data =>', data)
  } catch (error) {
    console.log('Error:', error)
    throw new ClientError('Erro no webhook de mudança de status de mensagens!')
  }
}
