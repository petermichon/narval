function newFullscreenButton(): HTMLElement {
  const fullscreenButton = document.createElement('button')
  fullscreenButton.className =
    'relative ml-5 mt-4 p-4 rounded-full bg-neutral-900 dark:bg-white'

  fullscreenButton.addEventListener('click', () => {
    const event = new CustomEvent('fullscreen-click', {})

    fullscreenButton.dispatchEvent(event)
  })

  return fullscreenButton
}

export { newFullscreenButton }
