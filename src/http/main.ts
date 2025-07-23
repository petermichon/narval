function handler(req: Request): Response {
  const url = new URL(req.url)

  if (url.pathname === '/video') {
    url.pathname = '/'
  }
  if (url.pathname === '/feed') {
    url.pathname = '/'
  }

  if (url.pathname === '/') {
    url.pathname = '/index.html'
  }

  const filePath = `./public${url.pathname}`

  // console.log(url.pathname, ':', filePath)

  let file: Uint8Array<ArrayBuffer>
  try {
    file = Deno.readFileSync(filePath)
  } catch (error) {
    return new Response('Not Found', { status: 404 })
  }

  const defaultContentType = 'application/octet-stream'
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
  }

  const fileExtension = filePath.substring(filePath.lastIndexOf('.'))

  const contentType = mimeTypes[fileExtension] || defaultContentType

  return new Response(file, {
    status: 200,
    headers: { 'content-type': contentType },
  })

  // return new Response('Internal Server Error', { status: 500 })
}

function main() {
  const certPath = './secret/fullchain.pem'
  const keyPath = './secret/privkey.pem'

  const cert = Deno.readTextFileSync(certPath)
  const key = Deno.readTextFileSync(keyPath)

  const options = { port: 8443, cert: cert, key: key }

  Deno.serve(options, handler)
}

export { main }
