function newVideoHeader(id: string): HTMLElement {
  const video = { id: id, time: '0' }

  const videoHeader = document.createElement('div')

  {
    const pTitle = document.createElement('p')
    pTitle.textContent = ''
    pTitle.className =
      'text-xl font-bold line-clamp-2 pt-3 pl-6 text-black dark:text-white text-[19px] tracking-[-0.0px] transform scale-y-100'
    pTitle.style =
      "font-family: 'Roboto', sans-serif font-variant-numeric: tabular-nums;"
    videoHeader.appendChild(pTitle)

    const pAuthor = document.createElement('p')
    pAuthor.textContent = ''
    pAuthor.className =
      'text-sm font-bold line-clamp-2 pt-2 pl-6 text-black dark:text-white'
    pAuthor.style =
      "font-family: 'Roboto', sans-serif font-variant-numeric: tabular-nums;"
    // pAuthor.style.cursor = 'pointer'
    videoHeader.appendChild(pAuthor)

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

  return videoHeader
}

export { newVideoHeader }
