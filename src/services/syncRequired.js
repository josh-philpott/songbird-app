const DEBOUNCE_MS = 5000

const isWithinDebouncePeriod = (listenerProgressMs, broadcasterProgressMs) => {
  const diff = Math.abs(broadcasterProgressMs - listenerProgressMs)
  return diff < DEBOUNCE_MS
}

const getItemId = currentlyPlaying => {
  if (currentlyPlaying && currentlyPlaying.item) {
    return currentlyPlaying.item.id
  }
  return null
}

/**
 * Determines if we need to modify the listeners play status
 *
 * @param {*} listenerCurrentlyPlaying spotify api response for the listener
 * @param {*} broadcasterCurrentlyPlaying spotify api response for the broadcaster
 * @returns true if the song ids or play status is different OR if the progress
 * in the song is not within the debounce period. Otherwise false.
 */
const isSyncRequired = (
  listenerCurrentlyPlaying,
  broadcasterCurrentlyPlaying
) => {
  const idsEqual =
    getItemId(listenerCurrentlyPlaying) ===
    getItemId(broadcasterCurrentlyPlaying)
  const isPlayingEqual =
    listenerCurrentlyPlaying.is_playing ===
    broadcasterCurrentlyPlaying.is_playing
  const withinDebouncePeriod = isWithinDebouncePeriod(
    listenerCurrentlyPlaying.progress_ms,
    broadcasterCurrentlyPlaying.progress_ms
  )

  return !idsEqual || !isPlayingEqual || !withinDebouncePeriod
}

export default isSyncRequired
