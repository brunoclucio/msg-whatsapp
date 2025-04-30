export type MessageSendTextProps = {
  phone: string
  message: string
  delayMessage?: number
  delayTyping?: number
  editMessageId?: string
}

export type MessageSendOptionListProps = {
  phone: string
  message: string
  delayMessage?: number
  optionList: OptionListProps
}

export type MessageSendPhoneExistsProps = {
  phone: string
  exists: true
}

export type MessageSendPhonesExistsProps = {
  phones: string[]
  exists: true
  inputPhone: string
  outputPhone: string
}

export type OptionListProps = {
  title: string
  buttonLabel: string
  options: OptionProps[]
}

export type OptionProps = {
  id: string
  description: string
  title: string
}

export type MessageSendButtonListProps = Omit<
  MessageSendTextProps,
  'delayTyping' | 'editMessageId'
> & {
  buttonList: ButtonListProps
}

export type ButtonListProps = {
  buttons: ButtonProps[]
}

export type ButtonProps = {
  id: string
  label: string
}

export type MessageSendWebhookProps = {
  phone: string
  zaapId: string
  messageId: string
  type: string
  instanceId: string
  momment: number
}

export type MessageReceivedWebhookProps = {
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

export type MessageStatusChangeWebhookProps = {
  instanceId: string
  status: string
  ids: string[]
  momment: number
  phoneDevice: number
  phone: string
  type: string
  isGroup: boolean
}

export type Text = {
  message: string
  descritpion?: string
  title?: string
  url?: string
  thumbnailUrl?: string
}

export type MessageQueueProps = {
  _id: string
  DelayMessage: number
  Message: string
  IsTrial: boolean
  InstanceId: string
  Phone: string
  ZaapId: string
  DelayTyping: number
  MessageId: string
  Created: number
}

export type RegistrationAvailableRequest = {
  ddi: string
  phone: string
}

export type RegistrationAvailableResponse = {
  available: boolean
  smsWaitSeconds: number
  voiceWaitSeconds: number
  waOldWaitSeconds: number
  waOldEligible: boolean
  blocked: boolean
  appealToken: string
}

export type RegistrationCodeRequest = RegistrationAvailableRequest & {
  method: string
}

export type RegistrationCodeResponse = {
  success: boolean
  retryAfter: number
  smsWaitSeconds: number
  voiceWaitSeconds: number
  waOldWaitSeconds: number
  method: string
  blocked: boolean
}

export type RespondCaptchaRequest = {
  captcha: string
}

export type RespondCaptchaResponse = {
  success: boolean
}

export type ConfirmRegistrationCodeRequest = {
  code: string
}

export type ConfirmRegistrationCodeResponse = {
  success: boolean
  confirmSecurityCode: boolean
}

export type ConfirmPinCodeRequest = {
  code: string
}

export type ConfirmPinCodeResponse = {
  success: boolean
}

export type QrCodeImageResponse = {
  value: string
  connected?: boolean
}

export type InstanceStatusResponse = {
  connected: boolean
  error: string
  smartphoneConnected: boolean
}

export type InstanceDataResponse = {
  id: string //	Id da instância
  token: string // Token da instância
  name: string // Nome da instância
  due: number // Timestamp com a data de vencimento da instância (unix timestamp)
  connected: boolean // Define se a instância está conectada
  paymentStatus: string // Define o status de pagamento da instância
  created: Date // Data de criação da instância
  connectedCallbackUrl: string // Url do webhook de conexão
  deliveryCallbackUrl: string // Url do webhook de envio de mensagem
  disconnectedCallbackUrl: string // Url do webhook de desconexão
  messageStatusCallbackUrl: string // Url do webhook de status da mensagem
  presenceChatCallbackUrl: string // Url do webhook de presença do chat
  receivedCallbackUrl: string // Url do webhook de recebimento
  receiveCallbackSentByMe: boolean // Define se irá receber webhook das mensagens enviadas pela própria instância
  callRejectAuto: boolean // Define se irá rejeitar uma chamada recebida automaticamente
  callRejectMessage: string // Mensagem a ser enviada quando rejeitar uma chamada
  autoReadMessage: boolean // Define se irá marcar as mensagens recebidas como lidas automaticamente
  initialDataCallbackUrl: string // Url do webhook de dados iniciais após conexão
}

export type ContactsRequest = {
  page: number
  pageSize: number
}

export type ContactsResponse = {
  name: string
  short: string
  notify: string
  vname: string
  phone: string
}

export type ChatRequest = ContactsRequest

export type ChatResponse = {
  archived: string
  pinned: string
  messagesUnread: number
  phone: string
  unread: string
  name: string
  lastMessageTime: string
  muteEndTime: number
  isMuted: string
  isMarkedSpam: string
  isGroupAnnouncement: boolean
  isGroup: boolean
}
