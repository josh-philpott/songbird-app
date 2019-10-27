import io from 'socket.io-client'
import { socketEvents } from './events'
import { sendMessage } from './emit'
export const socket = io(process.env.REACT_APP_API_URL)
export const initSockets = ({ setValue }) => {
  socketEvents({ setValue })

  setValue(state => {
    return { ...state, sendMessage }
  })
}
