import { goToPage } from './app/pages.ts'

function main() {
  const pathname = globalThis.location.pathname

  // console.log(pathname)

  globalThis.addEventListener('popstate', (event) => {
    goToPage(globalThis.location.pathname)
  })

  goToPage(pathname)
}

export { main }
