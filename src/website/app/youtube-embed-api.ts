// declare namespace YT {
//   class Player {
//     constructor(elementId: string, options: any)
//     getCurrentTime(): number
//   }
// }

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT: typeof YT
  }
}

function newYoutubeEmbedAPI(video: { id: string; time: string }): YT.Player {
  // Load the YouTube API script (only once)
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(tag)

  let player: YT.Player

    // This function gets called automatically by the API once it’s loaded
  ;(window as any).onYouTubeIframeAPIReady = () => {
    // Create the player inside videoPlayer div (no need to create iframe yourself)
    // player = new YT.Player(videoPlayer!, {
    // height: '315',
    // width: '560',
    //   videoId: 'hFOkrLuf94M', // Replace with your YouTube video ID
    //   events: {
    //     onReady: () => {
    //       console.log('Player ready')
    //       // Start logging time every second
    //       setInterval(() => {
    //         const time = player.getCurrentTime()
    //         console.log('Timestamp:', time.toFixed(2))
    //       }, 1000)
    //     },
    //   },
    // })
  }
  return player
}

type YouTubePlayer = YT.Player

interface YouTubeEmbedOptions {
  videoId: string
  elementId: string // DOM element ID to embed into
  width?: number
  height?: number
  autoplay?: boolean
}

function loadYouTubeIframeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (globalThis.YT && globalThis.YT.Player) {
      resolve()
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }

      ;(window as any).onYouTubeIframeAPIReady = () => {
        resolve()
      }
    }
  })
}

async function createYouTubePlayer(
  options: YouTubeEmbedOptions
): Promise<YouTubePlayer> {
  await loadYouTubeIframeAPI()

  return new Promise((resolve) => {
    const player = new YT.Player(options.elementId, {
      // height: options.height?.toString() || '390',
      // width: options.width?.toString() || '640',
      videoId: options.videoId,
      // playerVars: {
      //   autoplay: options.autoplay ? 1 : 0,
      // },
      events: {
        onReady: () => {
          resolve(player)
        },
      },
    })
  })
}

declare namespace YT {
  class Player {
    constructor(
      elementId: string,
      options: {
        videoId: string
        events: { onReady: () => void }
      }
    )
    getCurrentTime(): number
  }
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
  }
}

function loadYouTubeAPI(): Promise<void> {
  const promise: Promise<void> = new Promise((resolve) => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    tag
    globalThis.onYouTubeIframeAPIReady = () => resolve()
  })
  return promise
}

async function newVideo(video: {
  id: string
  time: string
}): Promise<YT.Player> {
  const promise = await loadYouTubeAPI()

  const div = document.createElement('div')
  div.id = 'player'
  document.body.appendChild(div)

  const player = new YT.Player('player', {
    videoId: video.id,
    events: {
      onReady: () => {
        // setInterval(() => {
        //   console.log('Time:', player.getCurrentTime())
        // }, 1000)
      },
    },
  })
  // player.destroy()
  return player
}

export { newYoutubeEmbedAPI, loadYouTubeIframeAPI, newVideo }
