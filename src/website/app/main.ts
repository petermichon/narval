// @ts-check: <>

import { goToPage } from './pages.ts'

// console.log(pathname)

function main() {
  const pathname = globalThis.location.pathname

  goToPage(pathname)

  globalThis.addEventListener('popstate', (event) => {
    goToPage(globalThis.location.pathname)
  })
}

export { main }
