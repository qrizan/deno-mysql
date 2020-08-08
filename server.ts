import { Application } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

import route from './src/routes/routes.ts';

const app = new Application();
const port = 3000;

app.use(route.routes());
app.use(route.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    console.log(
      `${yellow("Listening on:")} ${green(url)}`,
    );
});

await app.listen({port})