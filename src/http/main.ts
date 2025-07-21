function handler(req: Request) {
  return new Response('Hello, World!')
}

function main() {
  const certPath = './secret/localhost+2.pem'
  const keyPath = './secret/localhost+2-key.pem'

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
