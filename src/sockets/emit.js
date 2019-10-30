import { socket } from './index'

//broadcaster actions
export const initBroadcast = (
  broadcastId,
  broadcasterName,
  profileImageUrl
) => {
  socket.emit('init broadcast', broadcastId, broadcasterName, profileImageUrl)
  //TODO: I think I need to potentially rethink broadcast initlization
  //from both perspectives
}

export const subscribeAsBroadcaster = broadcastId => {
  socket.emit('join', broadcastId, true)
}

export const sendCurrentlyPlayingUpdate = (broadcastId, currentlyPlaying) => {
  socket.emit('update broadcast', broadcastId, currentlyPlaying)
}

export const broadcasterConnect = broadcastId => {
  socket.emit('broadcaster connect')
}

export const pauseBroadcast = broadcastId => {
  socket.emit('pause broadcast', broadcastId)
}

//listener actions
export const subscribeAsListener = (broadcastId, listenerProfileInfo) => {
  socket.emit(
    'join',
    broadcastId,
    false,
    listenerProfileInfo.id,
    listenerProfileInfo.name,
    listenerProfileInfo.imageUrl
  )
}

//mutual actions
export const sendMessage = async (message, user, broadcastId) => {
  socket.emit('message', { message, user }, broadcastId)
}

/*
* Websockets update broadcastInfo and streamInfo
*
*broadcastMeta          
*{
*  id: broadcastId
*  profileImageUrl
*  displayName:
*  isConnected: bool
*  isSyncEnabled: bool
*  lastUpdated: Date
*}

-> [broadcaster socket connect]
-> broadcasterConnect - broadcastId, profileImageUrl, displayName - isConnected=true isSyncEnabled=true
-> setIsSyncEnabled - broadcastId, isSyncEnabled
-> [on broadcaster socket disconnect] -- update isConnected
<- broadcastMetaUpdate
*
*
*
*streamData
*{
*   songId
*   albumArtUrl
*   title
*   artist
*   locationMs: int
*   durationMs: int
*   isPlaying: bool
*}
*  -> broadcaster socket sends streamUpdate event
*  <- streamUpdate
*
*chatMessages
*[
*   {
*       message,
*       profileImageUrl,
*       displayName,
*       time
*   },
*   ...
*]
*
*
* onListenerJoin:
*   <- SOB:
*       {
            broadcasterMeta:{}
            streamData:{}
            chatMessages:[{},...]
            viewers:[{},...]
        }
*
* onBroadcasterJoin:
*   -> broadcasterConnect
*   -> streamUpdate... (every few seconds)
*   -> setIsSyncEnabled
*   -> [broadcaster socket disconnect]
*
*
*/
