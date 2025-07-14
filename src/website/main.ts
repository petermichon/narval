// @ts-check: <>

export {}

import { newFeedElement } from './feed.ts'
import { newVideoElement } from './video.ts'

const videos = [
  { id: 'BsbvE2FLfxM', time: '3282' },
  { id: 'h9QHarUTy9w', time: '2599' },
  { id: 'wSa-sjaLVOM', time: '3507' },
  { id: 'wrFsapf0Enk', time: '4280' },
  { id: 'ssSRJ5cXn20', time: '1342' },
  { id: 'hV_2UC_6bTU', time: '0' },
  { id: 'TqwdGyfewTs', time: '0' },
  { id: 'Qe5WT22-AO8', time: '0' },
  { id: 'xuHVTYekC9M', time: '0' },
  { id: 'tYEflPGA1YM', time: '0' },
  { id: 'dxCQUgYEiM4', time: '0' },
  { id: 'yd4KskruaPM', time: '0' },
  { id: '9tX2BOCgJH0', time: '0' },
  { id: 'm7TUewww3fo', time: '0' },
  { id: '37Z7yKvzVaw', time: '0' },
  { id: '6MRu33HG0Io', time: '0' },
  { id: 'NuDhD6-4ZQI', time: '0' },

  { id: 'AjWfY7SnMBI', time: '0' },
  { id: 'QggJzZdIYPI', time: '0' },
  { id: '4zUUCTwOb0w', time: '0' },
  { id: '9sCuyYOo3tQ', time: '0' },
]

const pathname = globalThis.location.pathname
// console.log(pathname)

goToPage(pathname)

/**
 * @param {string} pathname
 */
function goToPage(pathname: string) {
  const app = document.getElementById('app')

  if (!app) {
    throw new Error('app not found')
  }

  if (pathname === '/') {
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
