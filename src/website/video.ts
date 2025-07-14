export {}

export function newVideoElement(video: { id: any; time: any }) {
  const videoElem = document.createElement('div')

  {
    const pathname = globalThis.location.pathname

    const urlparameters = new URLSearchParams(globalThis.location.search)
    // console.log(urlparameters)

    // video.id = urlparameters.get('v')!
    // video.time = urlparameters.get('t')!

    const vid = {
      title: 'title',
      author_name: 'author_name',
    }

    {
      const logo = document.createElement('div')
      logo.className = 'flex cursor-pointer'

      logo.addEventListener('click', () => {
        const event = new CustomEvent('logo-click')

        videoElem.dispatchEvent(event)
      })

      videoElem.appendChild(logo)
      {
        const img = document.createElement('img')
        img.className = 'w-9 h-9 ml-4 mr-1'
        img.src = './narval.png'
        logo.appendChild(img)
      }
      {
        const div2 = document.createElement('div')
        div2.className =
          'text-3xl text-black font-bold pr-3 font-sans hidden lg:block'
        div2.textContent = 'narval'
        div2.style = "font-family: 'Roboto', sans-serif"
        logo.appendChild(div2)
      }
    }

    const videoPlayer = document.createElement('div')
    videoPlayer.className = ''
    // videoFeed.appendChild(videoPlayer);

    videoElem.appendChild(videoPlayer)

    {
      const url = `https://www.youtube.com/embed/${video.id}?start=${video.time}`
      // const url = ``
      // ?start=90&autoplay=1&controls=0&mute=1&loop=1&playlist=${video.id}
      const iframe = document.createElement('iframe')
      iframe.style.margin = '0px'
      iframe.style.padding = '0px'
      // iframe.width = '560'
      // iframe.height = '315'
      iframe.src = url
      // iframe.frameBorder = '0'
      iframe.allowFullscreen = true
      iframe.referrerPolicy = 'strict-origin-when-cross-origin'
      iframe.className = 'w-full aspect-video'
      videoPlayer.appendChild(iframe)
    }

    {
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
