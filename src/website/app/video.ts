import { newYoutubeEmbed } from './youtube-embed.ts'

function newVideoElement(video: { id: any; time: any }) {
  const videoElem = document.createElement('div')

  {
    const videoPlayer = document.createElement('div')
    videoPlayer.className = ''
    // videoFeed.appendChild(videoPlayer);

    videoElem.appendChild(videoPlayer)

    {
      const embed = newYoutubeEmbed(video)
      videoPlayer.appendChild(embed)
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
      const vid = {
        title: 'title',
        author_name: 'author_name',
      }

      const pTitle = document.createElement('p')
      pTitle.textContent = vid.title
      pTitle.className = 'text-xl font-bold text-black line-clamp-2'
      pTitle.style = "font-family: 'Roboto', sans-serif"
      videoPlayer.appendChild(pTitle)

      const pAuthor = document.createElement('p')
      pAuthor.textContent = vid.author_name
      pAuthor.className = 'text-l font-bold text-black line-clamp-2'
      pAuthor.style = "font-family: 'Roboto', sans-serif"
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

  return videoElem
}

export { newVideoElement }
