export type MessageSendTextProps = {
  phone: string
  message: string
}

export type MessageSendOptionListProps = {
  phone: string
  message: string
  optionList: OptionListProps
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

export type MessageSendButtonListProps = MessageSendTextProps & {
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

export type Text = {
  message: string
  descritpion?: string
  title?: string
  url?: string
  thumbnailUrl?: string
}
