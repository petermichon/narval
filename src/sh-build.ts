// Build website

// npx @tailwindcss/cli -i ./styles.css -o ./tailwind.css
const build = new Deno.Command("npx", {
  args: ["@tailwindcss/cli", "-i", "./styles.css", "-o", "./tailwind.css"],
  cwd: "./website",
  stdout: "inherit",
  stderr: "inherit",
});

const result = await build.output();
if (result.code !== 0) {
  throw new Error("failed to build website");
}
