// Install dependencies

// npm install tailwindcss @tailwindcss/cli
const install = new Deno.Command("npm", {
  args: ["install", "tailwindcss", "@tailwindcss/cli"],
  cwd: "./website",
  stdout: "inherit",
  stderr: "inherit",
});

const result = await install.output();
if (result.code !== 0) {
  throw new Error("failed to install dependencies");
}
