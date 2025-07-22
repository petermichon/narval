import { serveDir } from 'https://deno.land/std@0.201.0/http/file_server.ts'

function handler(req: Request) {
  // return new Response('Hello, World!')
  return serveDir(req, { fsRoot: './dist', showDirListing: true })
}

function main() {
  const certPath = './secret/fullchain.pem'
  const keyPath = './secret/privkey.pem'

  const cert = Deno.readTextFileSync(certPath)
  const key = Deno.readTextFileSync(keyPath)

  // const handler = (request: Request) => {
  //   const body = `${request.headers.get("user-agent")}`;
  //   const response = new Response(body, {
  //     headers: {
  //       "Content-Type": "text/plain; charset=utf-8",
  //     },
  //     status: 200,
  //   });
  //   return response;
  // };

  const options = { port: 8443, cert: cert, key: key }

  Deno.serve(options, handler)
}

export { main }
