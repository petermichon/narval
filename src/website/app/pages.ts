import { DefaultMap } from '../../default-map/mod.ts'

import { newFeedElement } from './feed.ts'
import { newVideoElement } from './video.ts'
import { newChannelElement } from './channel.ts'
import { newLibraryElement } from './library.ts'
import { newTopBar } from './top-bar.ts'

function goToPage(pathname: string) {
  let videos: { id: string; time: string }[] = []

  const app = document.getElementById('app')

  if (!app) {
    throw new Error('app not found')
  }

  const dmap = new DefaultMap()

  {
    dmap.set('/', () => {
      // fetch('http://localhost:3000')
      fetch('http://141.94.215.121:3000/')
        .then((response) => response.json())
        .then((data) => {
          videos = data

          // console.log(videos)

          document.title = 'Narval'

          const topBar = newTopBar()

          const feedElement = newFeedElement(videos)

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

      const videoElement = newVideoElement({ id: id, time: time })

      const topBar = newTopBar()

      topBar.addEventListener('logo-click', (event) => {
        history.pushState({}, '', `/`)
        goToPage('/')
      })

      app.innerHTML = ''
      app.appendChild(topBar)
      app.appendChild(videoElement)
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
  }

  const handler = dmap.get(pathname) as () => HTMLElement
  handler()

  // app.replaceChild(page)
  // app.replaceChildren(page)
}

export { goToPage }
