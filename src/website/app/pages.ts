import { newFeedElement } from './components/feed.ts'
import { newYoutubeEmbed } from './components/youtube-embed.ts'
import { newChannelElement } from './components/channel.ts'
import { newLibraryElement } from './components/library.ts'
import { newTopBar } from './components/top-bar.ts'
import { newVideoHeader } from './components/video-header.ts'
import { newFooter } from './components/footer.ts'
import { newShareButton } from './components/share-button.ts'
import { newFullscreenButton } from './components/fullscreenButton.ts'

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
        const footer = newFooter()
        const bottomNavBar = document.createElement('nav')
        bottomNavBar.className =
          'absolute w-full p-7 fixed bottom-0 left-0 right-0 lg:hidden z-2 opacity-90 backdrop-blur-md bg-gray-100 dark:bg-neutral-900'

        feedElement.addEventListener('video-click', (event) => {
          const customEvent = event as CustomEvent

          const video = customEvent.detail.video

          let tParam = ''
          if (video.time > 0) {
            tParam = `&t=${video.time}`
          }

          const url = `/video?v=${video.id}` + tParam

          history.pushState({}, '', url)
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
    // document.title = 'Narval - Video'

    const urlparameters = new URLSearchParams(globalThis.location.search)

    const id = urlparameters.get('v') || ''
    const time = urlparameters.get('t') || '0'
    const video = { id: id, time: time }

    let url = `https://www.petermichon.fr:8443/video?v=${video.id}`
    if (video.time != '0') {
      url += `&t=${video.time}`
    }

    const videoElement = newYoutubeEmbed(video)
    const topBar = newTopBar()
    const videoHeader = newVideoHeader(video.id)
    const shareButton = newShareButton(url)
    const fullscreenButton = newFullscreenButton()
    const footer = newFooter()

    topBar.addEventListener('logo-click', (event) => {
      history.pushState({}, '', `/`)
      // document.title = 'Narval'
      goToPage('/')
    })

    videoHeader.addEventListener('video-loaded', (event) => {
      const customEvent = event as CustomEvent
      const video = customEvent.detail.video
      document.title = video.title
    })

    fullscreenButton.addEventListener('fullscreen-click', (event) => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.documentElement.requestFullscreen({ navigationUI: 'hide' })
        // videoElement.requestFullscreen()
        // document.documentElement.requestFullscreen()
      }
    })

    const shareButtonWrapper = document.createElement('div')
    shareButtonWrapper.className = 'text-white p-4 flex-1 min-w-[200px]'
    shareButtonWrapper.appendChild(shareButton)

    const wrapper = document.createElement('div')
    wrapper.className = 'flex flex-wrap'
    wrapper.appendChild(videoHeader)
    wrapper.appendChild(shareButtonWrapper)
    // wrapper.appendChild(fullscreenButton)

    app.innerHTML = ''
    app.appendChild(topBar)
    app.appendChild(videoElement)
    app.appendChild(wrapper)

    app.appendChild(footer)
  })

  dmap.set('/watch', () => {
    const params = new URLSearchParams(globalThis.location.search)

    let url = `/video`
    if (params.size > 0) {
      url += `?${params.toString()}`
    }

    history.pushState({}, '', url)
    goToPage('/video')
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
