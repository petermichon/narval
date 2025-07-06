export {}

const app = document.getElementById('app')!
// const app = document.getElementById('app') || null

const pathname = globalThis.location.pathname

const video = {
  id: '',
  time: '',
}

const urlparameters = new URLSearchParams(globalThis.location.search)
console.log(urlparameters)

video.id = urlparameters.get('v')!
video.time = urlparameters.get('t')!

const data = {
  title: 'title',
  author_name: 'author_name',
}

const videoPlayer = document.createElement('div')
videoPlayer.className = ''
// videoFeed.appendChild(videoPlayer);

app.appendChild(videoPlayer)

{
  const url = `https://www.youtube.com/embed/${video.id}?start=${video.time}`
  // ?start=90&autoplay=1&controls=0&mute=1&loop=1&playlist=${video.id}
  const iframe = document.createElement('iframe')
  iframe.style.margin = '0px'
  iframe.style.padding = '0px'
  // iframe.width = '560'
  // iframe.height = '315'
  iframe.src = url
  // iframe.frameBorder = '0'
  iframe.allowFullscreen = true
  iframe.referrerPolicy = 'strict-origin-when-cross-origin'
  iframe.className = 'w-full aspect-video'
  videoPlayer.appendChild(iframe)
}

{
  const p = document.createElement('p')
  p.textContent = data.title
  p.className = 'text-xl font-bold text-black line-clamp-2'
  p.style = "font-family: 'Roboto', sans-serif"
  videoPlayer.appendChild(p)
}

{
  const p = document.createElement('p')
  p.textContent = data.author_name
  p.className = 'text-l font-bold text-black line-clamp-2'
  p.style = "font-family: 'Roboto', sans-serif"
  p.style.cursor = 'pointer'
  videoPlayer.appendChild(p)
}

// singleVideo.addEventListener('click', () => {
//   videoFeed.replaceWith(videoPlayer)
//   // window.location.hash = video.id;
//   history.pushState({ page: 1 }, 'Title 1', `#${video.id}`)

//   // Later, when user clicks back, 'popstate' event fires
//   globalThis.addEventListener('popstate', (event) => {
//     if (!event.state) {
//       console.log('No state object — probably the initial page')
//     }
//     console.log('User navigated to state:', event.state)
//     // Update your UI here based on event.state.page
//     videoPlayer.replaceWith(videoFeed)
//   })
// })
