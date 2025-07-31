function newShareButton(textToCopy: string): HTMLElement {
  const copyButton = document.createElement('button')

  copyButton.className =
    'text-white font-bold px-4 py-1 rounded-3xl bg-neutral-800 hover:bg-neutral-700'
  copyButton.style.fontFamily = "'Roboto', sans-serif"

  copyButton.textContent = 'Share'

  // Add click event listener
  copyButton.addEventListener('click', () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copyButton.classList.add('ring-3', 'ring-neutral-400')
        setTimeout(() => {
          copyButton.classList.remove('ring-3', 'ring-neutral-400')
        }, 600)
      })
      .catch((err) => {
        console.error('Clipboard copy failed:', err)
        copyButton.textContent = 'Error'
      })
  })

  return copyButton
}

export { newShareButton }
