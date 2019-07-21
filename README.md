# About

SilentDisco allows you to sync your currently playing Spotify music with your friends.

## How It Works

The Broadcaster logs in via Spotify and starts a broadcast.

Listeners login via their spotify account and join the Broadcast. SilentDisco will sync the listeners spotify session to the whatever the broadcaster is playing!

Note: Both Broadcaster and Listeners must have Spotify Premium accounts.

# TODO

MVP Todos

- Page Styling
  - Home Page
  - Broadcaster
  - Listener
- Componetize
  - Broadcaster
    - BroadcastStream
    - BroadcastInterface
    - SpotifyListener
  - Listener
    - ListenerStream
    - ListenerInterface
    - SpotifyController
- Sync Performance Optimizations
  - Broadcast and Listeners synced via Websockets
- Support Multiple Concurrent Broadcasts
  - Broadcasts to be stored to Postgres or Redis (planning to start with Postgres and move to Redis if it becomes an issue in syncing)

# Work Log

7/20/19

- PM2 ecosystem setup
- Generated Broadcast Short Code
  - Display Link on Broadcast page
  - /listen/broadcastId grabs that broadcast

# Current Thoughts

- Spotify doesn't provide a user event stream. I'm currently querying Spotify every couple of seconds, but that adds a bit of delay. Few solutions:
  - Get smarter with syncing
    - Add a timestamp to the outgoing broadcast message. When a listener receives it, get the diff between the timestamp and the current time and add that to progress_ms.
  - Query spotify more often.
    - I'll probably need to provide a method to control the delay. I can then adjust it with load. (i.e. the more people using the app, the longer the sync takes so that I'm not blowing up the spotify API)
