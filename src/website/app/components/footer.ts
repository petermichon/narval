function newFooter(): HTMLElement {
  const footer = document.createElement('div')
  footer.className = 'h-20 bg-white dark:bg-neutral-900'
  return footer
}

export { newFooter }
