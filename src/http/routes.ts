import type { FastifyInstance, FastifyRequest } from 'fastify'
import type {
  ChatRequest,
  ChatResponse,
  ConfirmPinCodeRequest,
  ConfirmPinCodeResponse,
  ConfirmRegistrationCodeRequest,
  ConfirmRegistrationCodeResponse,
  ContactsRequest,
  ContactsResponse,
  InstanceDataResponse,
  InstanceStatusResponse,
  MessageSendButtonListProps,
  MessageSendOptionListProps,
  MessageSendPhoneExistsProps,
  MessageSendPhonesExistsProps,
  MessageSendTextProps,
  QrCodeImageResponse,
  RegistrationAvailableRequest,
  RegistrationAvailableResponse,
  RegistrationCodeRequest,
  RegistrationCodeResponse,
  RespondCaptchaRequest,
  RespondCaptchaResponse,
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

  app.post('/send-text', async (request: FastifyRequest<{ Body: MessageSendTextProps }>) => {
    try {
      const { phone, message } = request.body

      const text: MessageSendTextProps = {
        phone,
        message,
        delayMessage: 5,
      }

      const { data } = await api.post<MessageSendTextProps>('/send-text', text, {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
      })

      console.log('data', data)

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

        console.log('data', data)

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

        console.log('data', data)

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

        console.log('data', data)

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível verificar o telefone!')
      }
    }
  )

  app.get('/me', async request => {
    try {
      const { data } = await api.get<InstanceDataResponse>('/me', {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
      })

      console.log('data', data)

      return data
    } catch (error) {
      console.log('Error:', error)
      throw new ClientError('Não foi possível obter os dados da instância!')
    }
  })

  app.get('/status', async request => {
    try {
      const { data } = await api.get<InstanceStatusResponse>('/status', {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
      })

      console.log('data', data)

      return data
    } catch (error) {
      console.log('Error:', error)
      throw new ClientError('Não foi possível retornar o status de instância!')
    }
  })

  app.get('/disconnect', async request => {
    try {
      const { data } = await api.get('/disconnect', {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
      })

      console.log('data', data)

      return data
    } catch (error) {
      console.log('Error:', error)
      throw new ClientError('Não foi possível desconectar da instância!')
    }
  })

  app.get('/qr-code/image', async request => {
    try {
      const { data } = await api.get<QrCodeImageResponse>('/qr-code/image', {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
      })

      console.log('data', data)

      return data
    } catch (error) {
      console.log('Error:', error)
      throw new ClientError('Não foi possível retornar o QRCode!')
    }
  })

  app.get('/contacts', async (request: FastifyRequest<{ Querystring: ContactsRequest }>) => {
    try {
      const { page, pageSize } = request.query

      const { data } = await api.get<ContactsResponse[]>('/contacts', {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
        params: {
          page,
          pageSize,
        },
      })

      console.log('data', data)

      return data
    } catch (error) {
      console.log('Error:', error)
      throw new ClientError('Não foi possível retornar os contatos!')
    }
  })

  app.get('/chats', async (request: FastifyRequest<{ Querystring: ChatRequest }>) => {
    try {
      const { page, pageSize } = request.query

      const { data } = await api.get<ChatResponse[]>('/chats', {
        headers: {
          'Client-Token': env.CLIENT_TOKEN,
        },
        params: {
          page,
          pageSize,
        },
      })

      console.log('data', data)

      return data
    } catch (error) {
      console.log('Error:', error)
      throw new ClientError('Não foi possível retornar os chats!')
    }
  })

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

        console.log('data', data)

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível verificar o telefone!')
      }
    }
  )

  app.post(
    '/mobile/registration-available',
    async (request: FastifyRequest<{ Body: RegistrationAvailableRequest }>) => {
      try {
        console.log('body', request.body)

        const { ddi, phone } = request.body

        const { data } = await api.post<RegistrationAvailableResponse>(
          '/mobile/registration-available',
          {
            ddi,
            phone,
          },
          {
            headers: {
              'Client-Token': env.CLIENT_TOKEN,
            },
          }
        )

        console.log('data', data)

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível verificar o registro do telefone!')
      }
    }
  )

  app.post(
    '/mobile/request-registration-code',
    async (request: FastifyRequest<{ Body: RegistrationCodeRequest }>) => {
      try {
        console.log('body', request.body)

        const { ddi, phone } = request.body

        const { data } = await api.post<RegistrationCodeResponse>(
          '/mobile/request-registration-code',
          {
            ddi,
            phone,
            method: 'wa_old',
          },
          {
            headers: {
              'Client-Token': env.CLIENT_TOKEN,
            },
          }
        )

        console.log('data', data)

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível registrar o código do telefone!')
      }
    }
  )

  app.post(
    '/mobile/respond-captcha',
    async (request: FastifyRequest<{ Body: RespondCaptchaRequest }>) => {
      try {
        console.log('body', request.body)

        const { captcha } = request.body

        const { data } = await api.post<RespondCaptchaResponse>(
          '/mobile/respond-captcha',
          {
            captcha,
          },
          {
            headers: {
              'Client-Token': env.CLIENT_TOKEN,
            },
          }
        )

        console.log('data', data)

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível responder o captcha!')
      }
    }
  )

  app.post(
    '/mobile/confirm-registration-code',
    async (request: FastifyRequest<{ Body: ConfirmRegistrationCodeRequest }>) => {
      try {
        console.log('body', request.body)

        const { code } = request.body

        const { data } = await api.post<ConfirmRegistrationCodeResponse>(
          '/mobile/confirm-registration-code',
          {
            code,
          },
          {
            headers: {
              'Client-Token': env.CLIENT_TOKEN,
            },
          }
        )

        console.log('data', data)

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível confirmar o código!')
      }
    }
  )

  app.post(
    '/mobile/confirm-pin-code',
    async (request: FastifyRequest<{ Body: ConfirmPinCodeRequest }>) => {
      try {
        console.log('body', request.body)

        const { code } = request.body

        const { data } = await api.post<ConfirmPinCodeResponse>(
          '/mobile/confirm-pin-code',
          {
            code,
          },
          {
            headers: {
              'Client-Token': env.CLIENT_TOKEN,
            },
          }
        )

        console.log('data', data)

        return data
      } catch (error) {
        console.log('Error:', error)
        throw new ClientError('Não foi possível confirmar o código!')
      }
    }
  )
}
