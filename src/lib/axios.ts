import axios from 'axios'
import { env } from '../env'

export const api = axios.create({
  baseURL: `https://api.z-api.io/instances/${env.INSTANCE_ID}/token/${env.INSTANCE_TOKEN}`,
})
