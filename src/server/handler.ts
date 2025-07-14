import { DefaultMap } from "../default-map/mod.ts";

type Handler = (args?: any) => any;

type Result = {
  content: any;
  type: string;
  status: number;
};

enum HTTPMethod {
  GET = "GET",
}

enum Status {
  OK = 200,
  NOT_FOUND = 404,
}

enum MimeType {
  Text = "text/plain",
  Binary = "application/octet-stream",

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

  const method = req.method;
  // console.log(method);

  // console.log(url.pathname);

  const routes = new DefaultMap<any, Handler>();

  // LOAD ROUTES
  loadRoutes(routes);

  const handler = routes.get(url.pathname) as Handler;
  const result = handler();

  const response = new Response(result.content, {
    headers: {
      "Content-Type": result.type,
    },
  });

  return response;
}

function loadRoutes(routes: DefaultMap<any, Handler>) {
  const websiteFolder = "../website";

  routes.set("/index.html", (): Result => {
    // Metrics
    nbRequests += 1;
    console.log(`Query: ${nbRequests}`);

    const path = websiteFolder + "/index.html";
    const result = {
      type: MimeType.HTML,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/", routes.get("/index.html") as Handler);
  routes.set("/feed", routes.get("/index.html") as Handler);
  routes.set("/video", routes.get("/index.html") as Handler);

  routes.set("/tailwind.css", (): Result => {
    const path = websiteFolder + "/tailwind.css";
    const result = {
      type: MimeType.CSS,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/main.js", (): Result => {
    const path = websiteFolder + "/main.js";
    const result = {
      type: MimeType.JavaScript,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/video.js", (): Result => {
    const path = websiteFolder + "/video.js";
    const result = {
      type: MimeType.JavaScript,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/feed.js", (): Result => {
    const path = websiteFolder + "/feed.js";
    const result = {
      type: MimeType.JavaScript,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/feed.html", (): Result => {
    const path = websiteFolder + "/feed.html";
    const result = {
      type: MimeType.HTML,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/video.html", (): Result => {
    const path = websiteFolder + "/video.html";
    const result = {
      type: MimeType.HTML,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/site.webmanifest", (): Result => {
    const path = websiteFolder + "/site.webmanifest";
    const result = {
      type: MimeType.WebManifest,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/android-chrome-192x192.png", (): Result => {
    const path = websiteFolder + "/media/android-chrome-192x192.png";
    const result = {
      type: MimeType.PNG,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  // routes.set("/android-chrome-512x512.png", (): Result => {
  //   const path = websiteFolder + "media/android-chrome-512x512.png";
  //   const result = {
  //     type: MimeType.PNG,
  //     content: Deno.readFileSync(path),
  //     status: Status.OK,
  //   };
  //   return result;
  // });

  routes.set("/screenshot-wide.png", (): Result => {
    const path = websiteFolder + "/media/screenshot-wide.png";
    const result = {
      type: MimeType.PNG,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/screenshot-narrow.png", (): Result => {
    const path = websiteFolder + "/media/screenshot-narrow.png";
    const result = {
      type: MimeType.PNG,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  // routes.set("/favicon.ico", (): Result => {
  //   const path = "websiteFolder" + "media/favicon.ico";
  //   const result = {
  //     type: MimeType.Icon,
  //     content: Deno.readFileSync(path),
  //     status: Status.OK,
  //   };
  //   return result;
  // });

  routes.set("/narval.png", (): Result => {
    const path = websiteFolder + "/media/narval.png";
    const result = {
      type: MimeType.PNG,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/favicon-32x32.png", (): Result => {
    const path = websiteFolder + "/media/favicon-32x32.png";
    const result = {
      type: MimeType.PNG,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.set("/favicon-32x32.png", (): Result => {
    const path = websiteFolder + "/media/favicon-32x32.png";
    const result = {
      type: MimeType.PNG,
      content: Deno.readFileSync(path),
      status: Status.OK,
    };
    return result;
  });

  routes.default((): Result => {
    const result = {
      type: MimeType.Text,
      content: "Not Found",
      status: Status.NOT_FOUND,
    };
    return result;
  });
}
