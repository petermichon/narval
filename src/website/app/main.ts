// @ts-check: <>

import { newFeedElement } from './feed.ts'
import { newVideoElement } from './video.ts'
import { newChannelElement } from './channel.ts'
import { newLibraryElement } from './library.ts'

let videos: { id: string; time: string }[] = []

const pathname = globalThis.location.pathname
// console.log(pathname)

function main() {
  goToPage(pathname)

  globalThis.addEventListener('popstate', (event) => {
    goToPage(globalThis.location.pathname)
  })
}

function goToPage(pathname: string) {
  const app = document.getElementById('app')

  if (!app) {
    throw new Error('app not found')
  }

  if (pathname === '/') {
    fetch('http://localhost:3000')
      .then((response) => response.json())
      .then((data) => {
        videos = data

        // console.log(videos)

        document.title = 'Narval'

        const feedElement = newFeedElement(videos)

        feedElement.addEventListener('video-click', (event) => {
          // @ts-ignore: <>
          const video = event.detail.video
          history.pushState({}, '', `/video?v=${video.id}&t=${video.time}`)
          goToPage('/video')
        })

        app.innerHTML = ''
        app.appendChild(feedElement)
      })
  }

  if (pathname === '/feed') {
    history.pushState({}, '', `/`)
    goToPage('/')
  }

  if (pathname === '/video') {
    document.title = 'Narval - Video'

    const urlparameters = new URLSearchParams(globalThis.location.search)

    const id = urlparameters.get('v') || ''
    const time = urlparameters.get('t') || '0'

    const videoElement = newVideoElement({ id: id, time: time })

    videoElement.addEventListener('logo-click', (event) => {
      history.pushState({}, '', `/`)
      goToPage('/')
    })

    app.innerHTML = ''
    app.appendChild(videoElement)
  }

  if (pathname === '/channel') {
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
  }

  if (pathname === '/library') {
    document.title = 'Narval - Library'
    app.innerHTML = ''
    app.appendChild(newLibraryElement())
  }
}

export { main }
