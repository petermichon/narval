enum MimeType {
  CSS = "text/css",
  HTML = "text/html",
  Icon = "image/x-icon",
  PNG = "image/png",
  SVG = "image/svg+xml",
  JavaScript = "application/javascript",
  WebManifest = "application/manifest+json",
}

function readTextFile(path: string) {
  return Deno.readTextFileSync(path);
}

function readFile(path: string) {
  return Deno.readFileSync(path);
}

function indexHtml(): string {
  const path = "./website/index.html";
  return readTextFile(path);
}

function tailwindCss(): string {
  const path = "./website/tailwind.css";
  return readTextFile(path);
}

function mainJs(): string {
  const path = "./website/main.js";
  return readTextFile(path);
}

function siteWebManifest(): string {
  const path = "./website/site.webmanifest";
  return readTextFile(path);
}

function androidChrome192x192(): Uint8Array<ArrayBuffer> {
  const path = "./website/media/android-chrome-192x192.png";
  return readFile(path);
}

function androidChrome512x512(): Uint8Array<ArrayBuffer> {
  const path = "./website/media/android-chrome-512x512.png";
  return readFile(path);
}

function screenshotWide(): Uint8Array<ArrayBuffer> {
  const path = "./website/media/screenshot-wide.png";
  return readFile(path);
}

function screenshotNarrow(): Uint8Array<ArrayBuffer> {
  const path = "./website/media/screenshot-narrow.png";
  return readFile(path);
}

function favicon(): Uint8Array<ArrayBuffer> {
  const path = "./website/media/favicon.ico";
  return readFile(path);
}

function narval(): Uint8Array<ArrayBuffer> {
  const path = "./website/media/narval.png";
  return readFile(path);
}

function favicon32(): Uint8Array<ArrayBuffer> {
  const path = "./website/media/favicon-32x32.png";
  return readFile(path);
}

function favicon16(): Uint8Array<ArrayBuffer> {
  const path = "./website/media/favicon-16x16.png";
  return readFile(path);
}

let nbRequests = 0;

export function handler(req: Request) {
  const url = new URL(req.url);

  {
    if (url.pathname === "/" || url.pathname === "/index.html") {
      nbRequests += 1;
      console.log(`Query: ${nbRequests}`);
    }
  }

  {
    // console.log(url.pathname);
  }

  type Route = { type: string; func: () => any };
  const routes: Map<string, Route> = new Map();

  {
    const route: Route = {
      func: indexHtml,
      type: MimeType.HTML,
    };

    routes.set("/", route);
    routes.set("/index.html", route);
  }

  {
    const route: Route = {
      func: tailwindCss,
      type: MimeType.CSS,
    };
    routes.set("/tailwind.css", route);
  }

  {
    const route: Route = {
      func: mainJs,
      type: MimeType.JavaScript,
    };
    routes.set("/main.js", route);
  }

  {
    const route: Route = {
      func: siteWebManifest,
      type: MimeType.WebManifest,
    };
    routes.set("/site.webmanifest", route);
  }

  {
    const route: Route = {
      func: androidChrome192x192,
      type: MimeType.PNG,
    };
    routes.set("/android-chrome-192x192.png", route);
  }

  {
    const route: Route = {
      func: androidChrome512x512,
      type: MimeType.PNG,
    };
    routes.set("/android-chrome-512x512.png", route);
  }

  {
    const route: Route = {
      func: screenshotWide,
      type: MimeType.PNG,
    };
    routes.set("/screenshot-wide.png", route);
  }

  {
    const route: Route = {
      func: screenshotNarrow,
      type: MimeType.PNG,
    };
    routes.set("/screenshot-narrow.png", route);
  }

  {
    const route: Route = {
      func: favicon,
      type: MimeType.Icon,
    };
    routes.set("/favicon.ico", route);
  }

  {
    const route: Route = {
      func: narval,
      type: MimeType.PNG,
    };
    routes.set("/narval.png", route);
  }

  {
    const route: Route = {
      func: favicon32,
      type: MimeType.PNG,
    };
    routes.set("/favicon-32x32.png", route);
  }

  {
    const route: Route = {
      func: favicon16,
      type: MimeType.PNG,
    };
    routes.set("/favicon-32x32.png", route);
  }

  if (!routes.has(url.pathname)) {
    return new Response("Not Found", { status: 404 });
  }

  const route = routes.get(url.pathname) as Route;

  const result = route.func();

  const response = new Response(result, {
    headers: { "Content-Type": route.type },
  });

  return response;
}

export function handlerOld(req: Request) {
  const url = new URL(req.url);

  type Route = { path: string; type: string };
  const routes: Map<string, Route> = new Map();

  {
    const route: Route = {
      path: "./website/index.html",
      type: MimeType.HTML,
    };
    routes.set("/", route);
    routes.set("/index.html", route);
  }

  {
    const route: Route = {
      path: "./website/styles.css",
      type: MimeType.CSS,
    };
    routes.set("/styles.css", route);
  }

  {
    const route: Route = {
      path: "./website/site.webmanifest",
      type: MimeType.WebManifest,
    };
    routes.set("/site.webmanifest", route);
  }

  {
    const route: Route = {
      path: "./website/icons/favicon.ico",
      type: MimeType.Icon,
    };
    routes.set("/favicon.ico", route);
  }

  {
    const route: Route = {
      path: "./website/icons/android-chrome-192x192.png",
      type: MimeType.PNG,
    };
    routes.set("/android-chrome-192x192.png", route);
  }

  {
    const route: Route = {
      path: "./website/icons/android-chrome-512x512.png",
      type: MimeType.PNG,
    };
    routes.set("/android-chrome-512x512.png", route);
  }

  {
    const route: Route = {
      path: "./website/icons/apple-touch-icon.png",
      type: MimeType.PNG,
    };
    routes.set("/apple-touch-icon.png", route);
  }

  {
    const route: Route = {
      path: "./website/icons/favicon-32x32.png",
      type: MimeType.PNG,
    };
    routes.set("/favicon-32x32.png", route);
  }

  {
    const route: Route = {
      path: "./website/icons/favicon-16x16.png",
      type: MimeType.PNG,
    };
    routes.set("/favicon-16x16.png", route);
  }

  {
    const route: Route = {
      path: "./website/icons/favicon.svg",
      type: MimeType.SVG,
    };
    routes.set("/favicon.svg", route);
  }

  {
    const route: Route = {
      path: "./website/main.js",
      type: MimeType.JavaScript,
    };
    routes.set("/main.js", route);
  }

  {
    const route: Route = {
      path: "./website/tailwind.css",
      type: MimeType.CSS,
    };
    routes.set("/tailwind.css", route);
  }

  console.log(url.pathname);

  if (!routes.has(url.pathname)) {
    return new Response("Not Found", { status: 404 });
  }

  const route = routes.get(url.pathname) as Route;

  const response = new Response(Deno.readTextFileSync(route.path), {
    headers: { "Content-Type": route.type },
  });
  return response;
}
