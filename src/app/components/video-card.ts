function newVideoCardElement(video: { id: string; time: string }): HTMLElement {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.id}&format=json`
  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
  // const thumbnailUrl = ``;
  // mqdefault.jpg
  // hqdefault.jpg
  // sddefault.jpg
  // maxresdefault.jpg
  // https://i.ytimg.com/vi_webp/6VgKYd0JWq4/maxresdefault.webp

  const videoElem = document.createElement('a')
  videoElem.className =
    'relative overflow-hidden bg-white p-0 hover:scale-100 transition-all duration-180 md:rounded-lg bg-white text-black dark:bg-neutral-900 dark:text-white'

  let url = `/video?v=${video.id}`
  if (video.time != '0') {
    url += `&t=${video.time}`
  }
  videoElem.href = url

  // {
  //   const img = document.createElement("div");
  //   img.className = "rounded-xl w-full aspect-video bg-gray-300";
  //   // img.className = "cursor-pointer rounded-3xl object-cover aspect-[16/9]";
  //   singleVideo.appendChild(img);
  // }

  const imgcontainer = document.createElement('div')
  imgcontainer.className =
    'rounded-md aspect-video relative bg-gray-50 dark:bg-neutral-800'
  videoElem.appendChild(imgcontainer)

  const textloading1 = document.createElement('div')
  textloading1.className =
    'h-7 m-3 rounded-lg animate-pulse z-10 bg-gray-200 dark:bg-neutral-700'
  videoElem.appendChild(textloading1)

  const authorloading = document.createElement('div')
  authorloading.className =
    'h-2 m-2 w-1/4 rounded-full animate-pulse bg-gray-200 dark:bg-neutral-700'
  videoElem.appendChild(authorloading)

  {
    const separator = document.createElement('div')
    separator.className = 'h-1 sm:hidden bg-gray-200 dark:bg-neutral-700'
    videoElem.appendChild(separator)
  }

  fetch(oembedUrl)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
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
          'absolute inset-0 w-full h-full object-cover z-0 opacity-20 blur-3xl scale-80 saturate-1000 contrast-100 brightness-100 dark:contrast-20'
        img.loading = 'lazy'
        videoElem.appendChild(img)
      }

      {
        const p = document.createElement('p')
        p.textContent = data.title
        p.className =
          'relative text-sm text-black line-clamp-2 items-center align-center m-2 z-1 min-h-[3rem] leading-[1.5rem] text-black dark:text-white'
        p.style = "font-family: 'Roboto', sans-serif"
        // singleVideo.appendChild(p);
        textloading1.replaceWith(p)
      }

      {
        const p = document.createElement('p')
        p.textContent = data.author_name
        p.className =
          'relative bottom-0 text-xs m-2 line-clamp-2 z-1 text-gray-500 dark:text-gray-400'
        p.style = "font-family: 'Roboto', sans-serif"
        p.style.cursor = 'pointer'
        // singleVideo.appendChild(p);
        authorloading.replaceWith(p)
      }

      videoElem.style.cursor = 'pointer'

      videoElem.addEventListener('click', () => {
        const event = new CustomEvent('video-click', {
          detail: { video: video },
        })

        videoElem.dispatchEvent(event)
      })
    })

  return videoElem
}

export { newVideoCardElement }
