import { newVideoCardElement } from './video-card.ts'

function newFeedElement(videos: { id: string; time: string }[]) {
  const feedElem = document.createElement('div')

  {
    const videoFeed = document.createElement('div')
    videoFeed.className =
      'sm:p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-0 sm:gap-3 bg-white text-black dark:bg-neutral-900 dark:text-white'
    feedElem.appendChild(videoFeed)

    {
      // videos.forEach((video: Video) => {
      for (const video of videos) {
        const videoCard = newVideoCardElement(video)
        videoFeed.appendChild(videoCard)

        videoCard.addEventListener('video-click', (event) => {
          const eventCopy = new CustomEvent('video-click', {
            detail: { video: video },
          })
          feedElem.dispatchEvent(eventCopy)
        })
      }
    }

    {
      const div = document.createElement('div')
      div.className = 'h-20 bg-white dark:bg-neutral-900'
      feedElem.appendChild(div)
    }

    {
      const nav = document.createElement('nav')
      nav.className =
        'absolute w-full p-7 fixed bottom-0 left-0 right-0 lg:hidden z-2 opacity-90 backdrop-blur-md bg-gray-100 dark:bg-neutral-900'
      feedElem.appendChild(nav)
    }
  }

  return feedElem
}

export { newFeedElement }
