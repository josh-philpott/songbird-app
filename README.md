# About

Songbird allows you to sync your currently playing Spotify music with your friends.

## How It Works

The Broadcaster logs in via Spotify and starts a broadcast.

Listeners login via their spotify account and join the Broadcast. Songbird will sync the listeners spotify session to the whatever the broadcaster is playing!

Note: Both Broadcaster and Listeners must have Spotify Premium accounts.

# TODO

- replace profile image with svg
- Add some validation around getting profile information to handle defaulting some items (profile image?)
- Add check if they're a spotify premium member
- Default to standard profile image
- Styling
  - Fix Home Page scaling issues. Get it looking good up to a standard mobile view (pick those sizes?)
  - Listener Page
  - Broadcaster Page
- Handle Spotify Refresh Token
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
- Move sync logic to API
  - Bridge will sync _while_ the player is open and the active device.
  - Once the player is not the active device, we should stop syncing to that listener

# Work Log

7/27/19

- Listener Page Styling

7/25/19

- Fix Profile Picture Bug on Listener Page
- Target the 'SongBridge' player as the listeners device
- SongBridge player should only attempt to load on the listener page. Manage the script injection such that it doesn't load prior.
- Listener page gets broadcaster name, profile picture, and basic song info
- Navbar handles sign in state
- Some styling fixes to the home page

7/21/19

- Temporarily removed 'state' check from Spotify Auth after fighting with cross-domain cookies
- Productionized and deployed to heroku (api) and netlify (app)
- Broke out Spotify Authentication, Callback comonents
- Added AuthenticatedRoute handler with properly handled redirects

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
