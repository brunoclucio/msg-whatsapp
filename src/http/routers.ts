import { Router } from 'express'
import { env } from '../env'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import axios from 'axios'

type MessageSendTextProps = {
  phone: string
  message: string
}

type MessageSendOptionListProps = {
  phone: string
  message: string
  optionList: OptionListProps
}

type OptionListProps = {
  title: string
  buttonLabel: string
  options: OptionProps[]
}

type OptionProps = {
  id: string
  description: string
  title: string
}

type MessageSendButtonListProps = MessageSendTextProps & {
  buttonList: ButtonListProps
}

type ButtonListProps = {
  buttons: ButtonProps[]
}

type ButtonProps = {
  id: string
  label: string
}

type MessageSendWebhookProps = {
  phone: string
  zaapId: string
  messageId: string
  type: string
  instanceId: string
}

type MessageReceivedWebhookProps = {
  isStatusReply: boolean
  senderLid: string
  connectedPhone: string
  waitingMessage: boolean
  isEdit: boolean
  isGroup: boolean
  isNewsletter: boolean
  instanceId: string
  messageId: string
  phone: string
  fromMe: boolean
  momment: number
  status: string
  chatName: string
  senderPhoto: string
  senderName: string
  participantPhone: string
  participantLid: string
  photo: string
  broadcast: boolean
  type: string
  text: Text
}

type Text = {
  message: string
  descritpion?: string
  title?: string
  url?: string
  thumbnailUrl?: string
}

export const router = Router()

router.post<MessageSendTextProps>('/send-text', async (req, res) => {
  const { phone } = req.body

  const parsedDate = new Date().getTime()

  const formattedDate = format(parsedDate, "'dia' dd 'de' MMMM', às' H:mm'h'", {
    locale: ptBR,
  })

  const text = {
    phone,
    message: `Novo agendamento para o ${formattedDate}`,
  }

  const { data } = await axios.post<MessageSendTextProps>(
    `https://api.z-api.io/instances/${env.INSTANCE_ID}/token/${env.INSTANCE_TOKEN}/send-text`,
    text,
    {
      headers: {
        'Client-Token': env.CLIENT_TOKEN,
      },
    }
  )

  const message = {
    ...data,
    phone,
    message: text.message,
    status: 'sent',
  }

  res.json(message)
})

router.post<MessageSendButtonListProps>('/send-button-list', async (req, res) => {
  const { phone } = req.body

  const parsedDate = new Date().getTime()

  const formattedDate = format(parsedDate, "'dia' dd 'de' MMMM', às' H:mm'h'", {
    locale: ptBR,
  })

  const text = {
    phone,
    message: `*CEMI DIAGNÓSTICO* 
              Você possui AUDIOMETRIA dia 03/02/2025 às 14:30hrs. (ordem de chegada dentro do grupo de horários). Caso não possa comparecer, favor desmarcar pelo WhatsApp ou pelo telefone 2712-1950. 
              *Preparo para o Exame de Audiometria*
              Exposição ao Ruído: Evite ambientes com ruídos intensos nas 24 horas que antecedem o exame. Isso ajuda a garantir resultados mais precisos.
             
              *Confirma o agendamento* ?`,
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

  const { data } = await axios.post<MessageSendButtonListProps>(
    `https://api.z-api.io/instances/${env.INSTANCE_ID}/token/${env.INSTANCE_TOKEN}/send-button-list`,
    text,
    {
      headers: {
        'Client-Token': env.CLIENT_TOKEN,
      },
    }
  )

  const message = {
    ...data,
    phone,
    message: text.message,
    status: 'sent',
  }

  res.json(message)
})

router.post<MessageSendOptionListProps>('/send-option-list', async (req, res) => {
  const { phone } = req.body

  const parsedDate = new Date().getTime()

  const formattedDate = format(parsedDate, "'dia' dd 'de' MMMM', às' H:mm'h'", {
    locale: ptBR,
  })

  const text = {
    phone,
    message: `Novo agendamento para o ${formattedDate}. Confirma o agendamento ?`,
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

  const { data } = await axios.post<MessageSendOptionListProps>(
    `https://api.z-api.io/instances/${env.INSTANCE_ID}/token/${env.INSTANCE_TOKEN}/send-button-list`,
    text,
    {
      headers: {
        'Client-Token': env.CLIENT_TOKEN,
      },
    }
  )

  const message = {
    ...data,
    phone,
    message: text.message,
    status: 'sent',
  }

  res.json(message)
})

router.post<MessageSendWebhookProps>('/on-message-send-webhook', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

router.post<MessageReceivedWebhookProps>('/on-message-received-webhook', (req, res) => {
  console.log(req.body)

  const { referenceMessageId, buttonsResponseMessage } = req.body

  if (referenceMessageId) {
    if (buttonsResponseMessage) {
      console.log('Retorno de texto (Lista de Botão)')
      const { message } = buttonsResponseMessage
      if (message === 'Sim') {
        console.log(message)
      }
    }
  } else {
    console.log('Retorno de texto')
  }

  res.json(req.body)
})
