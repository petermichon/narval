import { newFeedElement } from './feed.ts'
import { newVideoCardElement } from './video-card.ts'

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

    console.log(JSON.parse(localStorage.getItem('channels') || '[]'))
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

    console.log(JSON.parse(localStorage.getItem('videos') || '[]'))
  }

  const videos = JSON.parse(localStorage.getItem('videos') || '[]')

  libElem = newFeedElement(videos)

  {
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Type something and press Enter'
    input.className =
      'w-80 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 shadow-sm'
    input.style = "font-family: 'Roboto', sans-serif"

    input.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log(input.value)

        const videoElem = newVideoCardElement({ id: input.value, time: '0' })

        input.value = '' // Clear input after logging
        libElem.appendChild(videoElem)
      }
    })

    libElem.appendChild(input)
  }

  return libElem
}

export { newLibraryElement }
