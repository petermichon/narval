import { DefaultMap } from "./default-map/mod.ts";

enum HTTPMethod {
  GET = "GET",
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

  // console.log(url.pathname);

  type Handler = (args?: any) => any;

  const routes = new DefaultMap<any, Handler>();

  type Result = {
    content: any;
    type: string;
    status: number;
  };

  {
    routes.set("/", (): Result => {
      // Metrics
      nbRequests += 1;
      console.log(`Query: ${nbRequests}`);

      const path = "./website/index.html";
      const result = {
        type: MimeType.HTML,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    routes.set("/tailwind.css", (): Result => {
      const path = "./website/tailwind.css";
      const result = {
        type: MimeType.CSS,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    routes.set("/main.js", (): Result => {
      const path = "./website/main.js";
      const result = {
        type: MimeType.JavaScript,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    routes.set("/site.webmanifest", (): Result => {
      const path = "./website/site.webmanifest";
      const result = {
        type: MimeType.WebManifest,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    routes.set("/android-chrome-192x192.png", (): Result => {
      const path = "./website/media/android-chrome-192x192.png";
      const result = {
        type: MimeType.PNG,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    // routes.set("/android-chrome-512x512.png", (): Result => {
    //   const path = "./website/media/android-chrome-512x512.png";
    //   const result = {
    //     type: MimeType.PNG,
    //     content: Deno.readFileSync(path),
    //     status: 200,
    //   };
    //   return result;
    // });

    routes.set("/screenshot-wide.png", (): Result => {
      const path = "./website/media/screenshot-wide.png";
      const result = {
        type: MimeType.PNG,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    routes.set("/screenshot-narrow.png", (): Result => {
      const path = "./website/media/screenshot-narrow.png";
      const result = {
        type: MimeType.PNG,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    // routes.set("/favicon.ico", (): Result => {
    //   const path = "./website/media/favicon.ico";
    //   const result = {
    //     type: MimeType.Icon,
    //     content: Deno.readFileSync(path),
    //     status: 200,
    //   };
    //   return result;
    // });

    routes.set("/narval.png", (): Result => {
      const path = "./website/media/narval.png";
      const result = {
        type: MimeType.PNG,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    routes.set("/favicon-32x32.png", (): Result => {
      const path = "./website/media/favicon-32x32.png";
      const result = {
        type: MimeType.PNG,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    routes.set("/favicon-32x32.png", (): Result => {
      const path = "./website/media/favicon-32x32.png";
      const result = {
        type: MimeType.PNG,
        content: Deno.readFileSync(path),
        status: 200,
      };
      return result;
    });

    routes.default((): Result => {
      const result = {
        type: MimeType.Text,
        content: "Not Found",
        status: 404,
      };
      return result;
    });
  }

  const handler = routes.get(url.pathname) as Handler;
  const result = handler();

  const response = new Response(result.content, {
    headers: {
      "Content-Type": result.type,
    },
  });

  return response;
}
