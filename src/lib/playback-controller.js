/**
 * We receive updates from the websocket server when the song changes
 * outside of some debounce conditions. Beyond that, the client must keep track of the current song
 * location and control the users spotify playback accordingly.
 *
 * Currently this module just hadles ticking
 */

let currentSongId = null
let currentSongDurationMs = null
let currentSongIsPlaying = false
let calculatedProgressMs = null

const tickListeners = []

const getCurrentPlaybackInfo = () => {
  return {
    itemId: currentSongId,
    progressMs: calculatedProgressMs,
    durationMs: currentSongDurationMs,
    isPlaying: currentSongIsPlaying
  }
}

const tickOneSecond = () => {
  if (currentSongIsPlaying) {
    if (calculatedProgressMs && calculatedProgressMs >= 0) {
      // prevent us from ticking over the actual song duration
      if (calculatedProgressMs >= currentSongDurationMs) {
        calculatedProgressMs = currentSongDurationMs
      }
      calculatedProgressMs += 1000
    }
  }

  updateListeners()
}

const updateProgressTicker = (
  songId,
  actualProgressMs,
  durationMs,
  isPlaying
) => {
  console.log('handling stream update in progress ticker')

  //if there's an interval already set, cancel it to avoid race conditions
  if (interval) {
    clearInterval(interval)
  }

  currentSongId = songId
  calculatedProgressMs = actualProgressMs
  currentSongDurationMs = durationMs
  currentSongIsPlaying = isPlaying

  console.log(`${songId}, ${actualProgressMs}, ${durationMs}, ${isPlaying}`)

  updateListeners()

  interval = setInterval(tickOneSecond, 1000)
}

const registerListener = callback => {
  tickListeners.push(callback)
}

const updateListeners = () => {
  tickListeners.forEach(listener => {
    listener(currentSongId, calculatedProgressMs, currentSongDurationMs)
  })
}

let interval = setInterval(tickOneSecond, 1000)

export default {
  getCurrentPlaybackInfo,
  updateProgressTicker,
  registerListener
}
