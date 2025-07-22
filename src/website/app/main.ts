import { goToPage } from './pages.ts'

// console.log(pathname)

function main() {
  const pathname = globalThis.location.pathname

  globalThis.addEventListener('popstate', (event) => {
    goToPage(globalThis.location.pathname)
  })

  goToPage(pathname)
}

export { main }
