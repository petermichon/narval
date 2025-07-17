import { newFeedElement } from './feed.ts'

function newLibraryElement(): HTMLElement {
  let libElem = document.createElement('div')
  // {
  //   const newData = { name: 'Alice', age: 30 }
  //   localStorage.setItem('userData', JSON.stringify(newData))
  // }
  {
    type Channel = {
      id: string
      videos: { id: string }[]
    }

    const stringData = localStorage.getItem('channels') || '[]'
    const channels: Channel[] = JSON.parse(stringData)

    channels.push({
      id: 'UCEi0DIwuAQNe68OK_1hAN7w',
      videos: [{ id: 'hFOkrLuf94M' }, { id: 'saVzevTylc4' }],
    })

    // localStorage.setItem('channels', JSON.stringify(channels))

    console.log(JSON.parse(localStorage.getItem('channels')!))
  }
  {
    type Video = {
      id: string
    }

    const stringData = localStorage.getItem('videos') || '[]'
    const videos: Video[] = JSON.parse(stringData)

    videos.push({ id: 'saVzevTylc4' })
    videos.push({ id: 'hFOkrLuf94M' })

    // localStorage.setItem('videos', JSON.stringify(videos))

    console.log(JSON.parse(localStorage.getItem('videos')!))
  }

  const videos = JSON.parse(localStorage.getItem('videos')!)

  libElem = newFeedElement(videos)

  return libElem
}

export { newLibraryElement }
