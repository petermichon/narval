import { newFeedElement } from './feed.ts'
import { newYoutubeEmbed } from './youtube-embed.ts'
import { newChannelElement } from './channel.ts'
import { newLibraryElement } from './library.ts'
import { newTopBar } from './top-bar.ts'
import { newVideoHeader } from './video-header.ts'

function goToPage(pathname: string) {
  let videos: { id: string; time: string }[] = []

  const app = document.getElementById('app')

  if (!app) {
    throw new Error('app not found')
  }

  const dmap = new Map<string, () => void>()

  dmap.set('/', () => {
    document.title = 'Narval'

    fetch('videos.json')
      .then((response) => response.json())
      .then((data) => {
        videos = data

        // console.log(videos)
        const topBar = newTopBar()
        const feedElement = newFeedElement(videos)
        const footer = document.createElement('div')
        footer.className = 'h-20 bg-white dark:bg-neutral-900'
        const bottomNavBar = document.createElement('nav')
        bottomNavBar.className =
          'absolute w-full p-7 fixed bottom-0 left-0 right-0 lg:hidden z-2 opacity-90 backdrop-blur-md bg-gray-100 dark:bg-neutral-900'

        feedElement.addEventListener('video-click', (event) => {
          // @ts-ignore: <>
          const video = event.detail.video
          history.pushState({}, '', `/video?v=${video.id}&t=${video.time}`)
          goToPage('/video')
        })

        topBar.addEventListener('logo-click', (event) => {
          // history.pushState({}, '', `/`)
          // goToPage('/')
        })

        app.innerHTML = ''
        app.appendChild(topBar)
        app.appendChild(feedElement)
        app.appendChild(footer)
        app.appendChild(bottomNavBar)
      })
  })

  dmap.set('/feed', () => {
    history.pushState({}, '', `/`)
    goToPage('/')
  })

  dmap.set('/video', () => {
    document.title = 'Narval - Video'

    const urlparameters = new URLSearchParams(globalThis.location.search)

    const id = urlparameters.get('v') || ''
    const time = urlparameters.get('t') || '0'
    const video = { id: id, time: time }

    const videoElement = newYoutubeEmbed(video)
    const topBar = newTopBar()
    const videoHeader = newVideoHeader(video.id)
    const footer = document.createElement('div')
    footer.className = 'h-20 bg-white dark:bg-neutral-900'
    const fullscreenButton = document.createElement('button')
    fullscreenButton.className =
      'relative ml-5 mt-4 p-4 rounded-full bg-neutral-900 dark:bg-white'

    fullscreenButton.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        // videoElement.requestFullscreen()
        document.documentElement.requestFullscreen({ navigationUI: 'hide' })
      }
    })

    videoHeader.appendChild(fullscreenButton)

    topBar.addEventListener('logo-click', (event) => {
      history.pushState({}, '', `/`)
      goToPage('/')
    })

    app.innerHTML = ''
    app.appendChild(topBar)
    app.appendChild(videoElement)
    app.appendChild(videoHeader)
    app.appendChild(fullscreenButton)
    app.appendChild(footer)
  })

  dmap.set('/channel', () => {
    document.title = 'Narval - Channel'

    const urlparameters = new URLSearchParams(globalThis.location.search)

    const id = urlparameters.get('c') || ''

    const channelElement = newChannelElement(id)

    // channelElement.addEventListener('logo-click', (event) => {
    //   history.pushState({}, '', `/`)
    //   goToPage('/')
    // })

    app.innerHTML = ''
    app.appendChild(channelElement)
  })

  dmap.set('/library', () => {
    document.title = 'Narval - Library'
    app.innerHTML = ''
    app.appendChild(newLibraryElement())
  })

  const handler = dmap.get(pathname) as () => HTMLElement
  handler()

  // app.replaceChild(page)
  // app.replaceChildren(page)
}

export { goToPage }
