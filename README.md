# About

Songbird allows you to sync your currently playing Spotify music with your friends.

## How It Works

The Broadcaster logs in via Spotify and starts a broadcast.

Listeners login via their spotify account and join the Broadcast. Songbird will sync the listeners spotify session to the whatever the broadcaster is playing!

Note: Both Broadcaster and Listeners must have Spotify Premium accounts.

# TODO

# Work Log

10/16/19
Been a while since I've added to the README

- Viewers UI
- See if Angela and I can flush out a design system for more consitency across the app
- Default to standard profile image
- Broadcasts to be stored to Postgres

9/10/19

- More work on viewers
  - Broadcaster is not added to viewer list
  - Listeners send real profile info on registration

9/9/19

- Viewers

9/6/19

- Refactored a few of my components to use hooks
- Handle broadcast

9/5/19

- Broadcaster leaving should stop broadcast

9/3/19

- Websockets
- Logic to determine whether listeners will need a sync lives in API layer. The Client layer just accepts commands via websockets and executes on spotify for the client.

8/?/19

- Pause broadcast button
- Handle Spotify Refresh Token
- A room is created based upon a users spotify ID. So that a persons listen link is always the same

7/29/19

- bug fixes for listener not updating
- replace profile image with svg
- dev mode
- minor style updates and log cleanup

7/27/19

- Listener Page Styling
- move current song info to syncPlayback in handler

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
