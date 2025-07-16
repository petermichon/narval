// @ts-check: <>

export {}

import { newFeedElement } from './feed.ts'
import { newVideoElement } from './video.ts'

let videos: { id: string; time: string }[] = []

const pathname = globalThis.location.pathname
// console.log(pathname)

goToPage(pathname)

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
    const urlparameters = new URLSearchParams(globalThis.location.search)

    document.title = 'Narval - Video'

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
}

globalThis.addEventListener('popstate', (event) => {
  goToPage(globalThis.location.pathname)
})
