export {}

const app2 = document.getElementById('app')!

{
  const div = document.createElement('div')
  div.className = 'bg-white flex p-3'
  app2.appendChild(div)

  {
    const img = document.createElement('img')
    img.className = 'w-9 h-9 ml-4 mr-1'
    img.src = './narval.png'
    div.appendChild(img)
  }

  {
    const div2 = document.createElement('div')
    div2.className =
      'text-3xl text-black font-bold pr-3 font-sans hidden lg:block'
    div2.textContent = 'narval'
    div2.style = "font-family: 'Roboto', sans-serif"
    div.appendChild(div2)
  }
  {
    // const test = {
    //   className: 'text-3xl text-black font-bold pr-3 font-sans block lg:hidden',
    //   textContent: 'narval',
    // } as HTMLDivElement
  }
}

{
  const videoFeed = document.createElement('div')
  videoFeed.className =
    'sm:m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-0 sm:gap-3 bg-white'
  app2.appendChild(videoFeed)

  {
    type Video = {
      id: string
      time: string
    }

    const videos: Array<Video> = [
      { id: 'GX17waseMtU', time: '4701' },
      { id: 'wSa-sjaLVOM', time: '3507' },
      { id: 'sjNx8ir-z9w', time: '900' },
      { id: 'wrFsapf0Enk', time: '4280' },
      { id: 'Qe5WT22-AO8', time: '0' },
      { id: '2lZHygbJzZU', time: '0' },
      { id: 'xuHVTYekC9M', time: '0' },
      { id: 'rW_EoVHFMEc', time: '0' },
      { id: 'tYEflPGA1YM', time: '0' },
      { id: 'dxCQUgYEiM4', time: '0' },
      { id: 'ssSRJ5cXn20', time: '0' },
      { id: 'yd4KskruaPM', time: '0' },

      // { id: '4FoylWoF1ns' },
      // { id: 'bY0tH3-kmG0' },
      // { id: 'ig-_3_-9wu4' },
      // { id: 'ZMS_X-wdTi4' },
      // { id: 'AV8IxzS7xU8' },
      // { id: 'wrFsapf0Enk' },
      // { id: '6VgKYd0JWq4' },
      // { id: 'S1dN1NY36cY' },
      // { id: 'ZCM-eMOJXiU' },
      // { id: 'FAd8SD3W3zg' },
      // { id: 'FLw4vYrKO4M' },
      // { id: '-DjSU7vBZoY' },
      // { id: 'E99ffL9wwEQ' },
      // { id: '-lJ9En6E9Z8' },
      // { id: 'ZRJo0yJWdfY' },
      // { id: 'LGULuWU6NXg' },
      // { id: '2u19fmGsu5M' },
      // { id: '5L7M55xOLp8' },

      { id: 'AjWfY7SnMBI', time: '0' },
      { id: 'QggJzZdIYPI', time: '0' },
      { id: '4zUUCTwOb0w', time: '0' },
      { id: '9sCuyYOo3tQ', time: '0' },
    ]

    // videos.forEach((video: Video) => {
    for (const video of videos) {
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.id}&format=json`
      const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
      // const thumbnailUrl = ``;
      // mqdefault.jpg
      // hqdefault.jpg
      // sddefault.jpg
      // maxresdefault.jpg
      // https://i.ytimg.com/vi_webp/6VgKYd0JWq4/maxresdefault.webp

      const singleVideo = document.createElement('div')
      singleVideo.className =
        'relative overflow-hidden bg-white p-0 hover:scale-100 transition-all duration-180 rounded-lg'
      videoFeed.appendChild(singleVideo)

      // {
      //   const img = document.createElement("div");
      //   img.className = "rounded-xl w-full aspect-video bg-gray-300";
      //   // img.className = "cursor-pointer rounded-3xl object-cover aspect-[16/9]";
      //   singleVideo.appendChild(img);
      // }

      const imgcontainer = document.createElement('div')
      imgcontainer.className = 'rounded-md aspect-video bg-gray-50 relative '
      singleVideo.appendChild(imgcontainer)

      const textloading1 = document.createElement('div')
      textloading1.className =
        'h-7 m-3 bg-gray-200 rounded-lg animate-pulse z-10'
      singleVideo.appendChild(textloading1)

      const authorloading = document.createElement('div')
      authorloading.className =
        'h-2 m-2 w-1/4 bg-gray-200 rounded-full animate-pulse'
      singleVideo.appendChild(authorloading)

      {
        const separator = document.createElement('div')
        separator.className = 'h-1 bg-gray-200 sm:hidden'
        singleVideo.appendChild(separator)
      }

      fetch(oembedUrl)
        .then((res: Response) => {
          return res.json()
        })
        .then((data: any) => {
          {
            const img = document.createElement('img')
            img.src = thumbnailUrl
            img.className =
              'sm:rounded-md relative w-full h-full aspect-video object-cover opacity-0 transition-opacity duration-500 z-1'
            img.loading = 'lazy'
            img.onload = () => {
              img.classList.add('opacity-100')
            }
            imgcontainer.appendChild(img)
          }

          {
            const img = document.createElement('img')
            img.src = thumbnailUrl
            img.className =
              'absolute inset-0 w-full h-full object-cover z-0 opacity-20 blur-3xl scale-80 saturate-1000 contrast-100 brightness-100'
            img.loading = 'lazy'
            singleVideo.appendChild(img)
          }

          {
            const p = document.createElement('p')
            p.textContent = data.title
            p.className =
              'relative text-sm text-black line-clamp-2 items-center align-center m-2 z-1'
            p.style = "font-family: 'Roboto', sans-serif"
            // singleVideo.appendChild(p);
            textloading1.replaceWith(p)
          }

          {
            const p = document.createElement('p')
            p.textContent = data.author_name
            p.className =
              'relative bottom-0 text-xs m-2 text-gray-500 line-clamp-2 z-1'
            p.style = "font-family: 'Roboto', sans-serif"
            p.style.cursor = 'pointer'
            // singleVideo.appendChild(p);
            authorloading.replaceWith(p)
          }

          singleVideo.style.cursor = 'pointer'

          {
            const videoPlayer = document.createElement('div')
            videoPlayer.className = ''
            // videoFeed.appendChild(videoPlayer);

            {
              const url = `https://www.youtube.com/embed/${video.id}?start=${video.time}`
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
              const p = document.createElement('p')
              p.textContent = data.title
              p.className = 'text-xl font-bold text-black line-clamp-2'
              p.style = "font-family: 'Roboto', sans-serif"
              videoPlayer.appendChild(p)
            }

            {
              const p = document.createElement('p')
              p.textContent = data.author_name
              p.className = 'text-l font-bold text-black line-clamp-2'
              p.style = "font-family: 'Roboto', sans-serif"
              p.style.cursor = 'pointer'
              videoPlayer.appendChild(p)
            }

            singleVideo.addEventListener('click', () => {
              app2.innerHTML = ''
              import('./video.js')

              // videoFeed.replaceWith(videoPlayer)
              // window.location.hash = video.id;

              // globalThis.location.href = `/video?v=${video.id}&t=${video.time}`
              // history.replaceState({}, '', '/video')

              history.pushState(
                { page: 1 },
                'Title 1',
                `/video?v=${video.id}&t=${video.time}`
              )
            })
          }
        })
    }
  }

  {
    const div = document.createElement('div')
    div.className = 'h-20'
    app2.appendChild(div)
  }

  {
    const nav = document.createElement('nav')
    nav.className =
      'absolute w-full p-7 fixed bottom-0 left-0 right-0 bg-gray-100 lg:hidden z-2 opacity-90 backdrop-blur-md'
    app2.appendChild(nav)
  }
}
