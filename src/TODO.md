# TODO List

## Improvements

### HTTPS certificates `dev`

Add support for running the server without HTTPS certificates.

### Add logo `general`

Add a better logo.

### Add icon `general`

Add an icon to the website.

### Clean PWA `general`

Clean up the PWA install card.

### Redirect /watch `video`

Redirect the /watch URL to /video page to better match YouTube URL.

### Empty video `video`

When no video ID is specified in the URL, the player doesn't load and the page is empty.

Add a way to insert a video ID manually, which both updates the URL and loads the player with given video ID.

### Privacy `feed` `video`

When fetching video data like titles, thumbnails, and the video itself, YouTube requires access to some user data like an IP address.

Before connecting, add a friendly reminder that the user is about to connect to the internet and share some of their data with the video provider.

## New Features

### Fullscreen `video`

Add a true fullscreen (immersive mode) option for mobile (and desktop?). Must be good looking and easy to use.

### Twitch support `feed` `video`

Add twitch integration for live streams (and videos?).

### Alternative players `video`

Add support for alternative players for playing YouTube videos. The user will be able to choose which player to use from a list of players.
