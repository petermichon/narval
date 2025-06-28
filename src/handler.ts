enum HTTPMethod {
  GET = "GET",
}

enum MimeType {
  CSS = "text/css",
  HTML = "text/html",
  Icon = "image/x-icon",
  PNG = "image/png",
  SVG = "image/svg+xml",
  JavaScript = "application/javascript",
  WebManifest = "application/manifest+json",
}

let nbRequests = 0;

export function handler(req: Request) {
  const url = new URL(req.url);

  // console.log(url.pathname);

  type Route = {
    type: string;
    handler: () => any;
  };
  const routes: Map<string, Route> = new Map();

  routes.set("/", {
    type: MimeType.HTML,
    handler: (): string => {
      {
        // Metrics
        nbRequests += 1;
        console.log(`Query: ${nbRequests}`);
      }
      const path = "./website/index.html";
      const file = Deno.readTextFileSync(path);
      return file;
    },
  });

  routes.set("/tailwind.css", {
    type: MimeType.CSS,
    handler: (): string => {
      const path = "./website/tailwind.css";
      return Deno.readTextFileSync(path);
    },
  });

  routes.set("/main.js", {
    type: MimeType.JavaScript,
    handler: (): string => {
      const path = "./website/main.js";
      return Deno.readTextFileSync(path);
    },
  });

  routes.set("/site.webmanifest", {
    type: MimeType.WebManifest,
    handler: (): string => {
      const path = "./website/site.webmanifest";
      return Deno.readTextFileSync(path);
    },
  });

  routes.set("/android-chrome-192x192.png", {
    type: MimeType.PNG,
    handler: (): Uint8Array<ArrayBuffer> => {
      const path = "./website/media/android-chrome-192x192.png";
      return Deno.readFileSync(path);
    },
  });

  routes.set("/android-chrome-512x512.png", {
    type: MimeType.PNG,
    handler: (): Uint8Array<ArrayBuffer> => {
      const path = "./website/media/android-chrome-512x512.png";
      return Deno.readFileSync(path);
    },
  });

  routes.set("/screenshot-wide.png", {
    type: MimeType.PNG,
    handler: (): Uint8Array<ArrayBuffer> => {
      const path = "./website/media/screenshot-wide.png";
      return Deno.readFileSync(path);
    },
  });

  routes.set("/screenshot-narrow.png", {
    type: MimeType.PNG,
    handler: (): Uint8Array<ArrayBuffer> => {
      const path = "./website/media/screenshot-narrow.png";
      return Deno.readFileSync(path);
    },
  });

  routes.set("/favicon.ico", {
    type: MimeType.Icon,
    handler: (): Uint8Array<ArrayBuffer> => {
      const path = "./website/media/favicon.ico";
      return Deno.readFileSync(path);
    },
  });

  routes.set("/narval.png", {
    type: MimeType.PNG,
    handler: (): Uint8Array<ArrayBuffer> => {
      const path = "./website/media/narval.png";
      return Deno.readFileSync(path);
    },
  });

  routes.set("/favicon-32x32.png", {
    type: MimeType.PNG,
    handler: (): Uint8Array<ArrayBuffer> => {
      const path = "./website/media/favicon-32x32.png";
      return Deno.readFileSync(path);
    },
  });

  routes.set("/favicon-32x32.png", {
    type: MimeType.PNG,
    handler: (): Uint8Array<ArrayBuffer> => {
      const path = "./website/media/favicon-16x16.png";
      return Deno.readFileSync(path);
    },
  });

  if (!routes.has(url.pathname)) {
    return new Response("Not Found", { status: 404 });
  }

  const route = routes.get(url.pathname) as Route;

  const result = route.handler();

  const response = new Response(result, {
    headers: { "Content-Type": route.type },
  });

  return response;
}
