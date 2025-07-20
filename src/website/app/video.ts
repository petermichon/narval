import { newYoutubeEmbed } from './youtube-embed.ts'

function newVideoElement(video: { id: any; time: any }) {
  const videoElem = document.createElement('div')

  {
    const videoPlayer = document.createElement('div')
    videoPlayer.className = ''
    // videoFeed.appendChild(videoPlayer);

    videoElem.appendChild(videoPlayer)

    {
      const embedContainer = document.createElement('div')
      embedContainer.className = 'relative w-full aspect-[2.15/1]'
      videoPlayer.appendChild(embedContainer)

      {
        const embed = newYoutubeEmbed(video)
        embedContainer.appendChild(embed)
      }
    }

    // {
    //   const embed = newYoutubeEmbedAPI(video)
    //   videoPlayer.appendChild(embed)
    // }

    {
      // ;async () => {
      //   const player = await newVideo(video)
      //   console.log('test')
      //   videoPlayer.appendChild(player as any)
      // }
    }

    {
      const pTitle = document.createElement('p')
      pTitle.textContent = ''
      pTitle.className =
        'text-xl font-bold line-clamp-2 pt-3 pl-6 text-black dark:text-white text-[19px] tracking-[-0.0px] transform scale-y-100'
      pTitle.style =
        "font-family: 'Roboto', sans-serif font-variant-numeric: tabular-nums;"
      videoPlayer.appendChild(pTitle)

      const pAuthor = document.createElement('p')
      pAuthor.textContent = ''
      pAuthor.className =
        'text-sm font-bold line-clamp-2 pt-2 pl-6 text-black dark:text-white'
      pAuthor.style =
        "font-family: 'Roboto', sans-serif font-variant-numeric: tabular-nums;"
      // pAuthor.style.cursor = 'pointer'
      videoPlayer.appendChild(pAuthor)

      {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.id}&format=json`

        fetch(oembedUrl)
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            {
              pTitle.textContent = data.title
              pAuthor.textContent = data.author_name
            }
          })
      }
    }
  }

  {
    const div = document.createElement('div')
    div.className = 'h-20 bg-white dark:bg-neutral-900'
    videoElem.appendChild(div)
  }

  return videoElem
}

export { newVideoElement }
