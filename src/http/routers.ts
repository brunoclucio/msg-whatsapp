import { Router } from 'express'

export const router = Router()

router.post('/on-message-send-webhook', (req, res) => {
  console.log(res.json(req.body))
})

router.post('/on-message-received-webhook', (req, res) => {
  console.log(res.json(req.body))
})
