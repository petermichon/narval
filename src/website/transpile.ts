import { transpile } from 'jsr:@deno/emit'

export async function transpileTsToJs(inputPath: string, outputPath: string) {
  const inputUrl = new URL(`file://${Deno.realPathSync(inputPath)}`)
  const result = await transpile(inputUrl)
  const jsCode = result.get(inputUrl.href)

  if (!jsCode) {
    throw new Error('Failed to transpile the TypeScript file.')
  }

  await Deno.writeTextFile(outputPath, jsCode)
  console.log(`✅ Transpiled ${inputPath} to ${outputPath}`)
}

transpileTsToJs('feed.ts', 'feed.js')
transpileTsToJs('video.ts', 'video.js')
transpileTsToJs('main.ts', 'main.js')
