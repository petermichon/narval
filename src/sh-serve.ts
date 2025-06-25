// deno run --allow-net --allow-read index.ts
const serve = new Deno.Command("deno", {
  args: ["run", "--allow-net", "--allow-read", "index.ts"],
  cwd: "./",
  stdout: "inherit",
  stderr: "inherit",
});

const result = await serve.output();
if (result.code !== 0) {
  throw new Error("failed to serve website");
}
