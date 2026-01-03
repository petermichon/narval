import { newFeedElement } from './feed.ts'
import { newVideoCardElement } from './video-card.ts'

type Video = { id: string; time: string }

function newLibraryElement(): HTMLElement {
  let libElem = document.createElement('div')

  const storageVideos = localStorage.getItem('videos') || '[]'
  const videos: Video[] = JSON.parse(storageVideos)
  libElem = newFeedElement(videos)
  {
    const importButton = newImportButton()
    libElem.appendChild(importButton)
  }
  {
    // const addOneButton = newAddOneButton()
    // libElem.appendChild(addOneButton)
  }
  {
    // const removeAllButton = newRemoveAllButton()
    // libElem.appendChild(removeAllButton)
  }

  return libElem
}

function newImportButton(): HTMLElement {
  const input = document.createElement('input')
  input.type = 'file'
  input.className =
    'text-white font-bold px-4 py-1 rounded-3xl bg-neutral-800 hover:bg-neutral-700 cursor-pointer'
  input.style.fontFamily = "'Roboto', sans-serif"
  // input.textContent = 'Import'

  input.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target!.result as string
      // console.log('File contents:', text)
      // Replace videos
      localStorage.setItem('videos', text)
    }

    // Optional: handle errors
    reader.onerror = (event: ProgressEvent<FileReader>) => {
      console.error('Error reading file')
    }

    // Read the file as text (you can also use readAsDataURL, readAsArrayBuffer, etc.)
    reader.readAsText(file)
  })
  return input
}

function newAddOneButton(): HTMLElement {
  const button = document.createElement('button')
  button.className =
    'text-white font-bold px-4 py-1 rounded-3xl bg-neutral-800 hover:bg-neutral-700 cursor-pointer'
  button.style.fontFamily = "'Roboto', sans-serif"
  button.textContent = 'Add video'
  button.addEventListener('click', () => {
    const videoId = prompt('Enter video ID')
    if (videoId) {
      addVideo({ id: videoId, time: '0' })
    }
  })
  return button
}

function newRemoveAllButton(): HTMLElement {
  const button = document.createElement('button')
  button.className =
    'text-white font-bold px-4 py-1 rounded-3xl bg-neutral-800 hover:bg-neutral-700 cursor-pointer'
  button.style.fontFamily = "'Roboto', sans-serif"
  button.textContent = 'Clear videos'
  button.addEventListener('click', () => {
    const answer = confirm('Delete all videos ?')
    if (answer) {
      localStorage.clear()
    }
  })
  return button
}

function addVideo(video: { id: string; time: string }) {
  const storageVideos = localStorage.getItem('videos') || '[]'
  const videos: Video[] = JSON.parse(storageVideos)
  videos.push(video)
  // videos.push({ id: 'hFOkrLuf94M', time: '0' })
  // videos.push({ id: 'saVzevTylc4', time: '0' })
  localStorage.setItem('videos', JSON.stringify(videos))
}

export { newLibraryElement }
