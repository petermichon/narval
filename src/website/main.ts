export {}

const app = document.getElementById('app')!

const pathname = globalThis.location.pathname
console.log(pathname)

if (pathname === '/') {
  // globalThis.location.href = '/feed'
  // history.replaceState({}, '', '/feed')
  import('./feed.js')
  // import('./feed.js').then((module) => {})
}

if (pathname === '/feed') {
  import('./feed.js')
  // import('./feed.js').then((module) => {})
}

if (pathname === '/video') {
  import('./video.js')
  // import('./video.js').then((module) => {})
}

// Later, when user clicks back, 'popstate' event fires
globalThis.addEventListener('popstate', (event) => {
  if (!event.state) {
    console.log('No state object — probably the initial page')
  }
  console.log('User navigated to state:', event.state)
  // Update your UI here based on event.state.page
  // videoPlayer.replaceWith(videoFeed)
  // import('./feed.js')
  // app.innerHTML = ''
})
