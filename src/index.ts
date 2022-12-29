import type { StringObject } from "./sharedTypes.ts"

import { writeToFiles } from "./writeFiles.ts"

const baseDir = "./palettes"
const distDir = "./dist"
const dir = Deno.readDir(`${baseDir}`)

for await (const dirEntry of dir) {
  const { name: fileName } = dirEntry
  const file = await Deno.readTextFile(`${baseDir}/${fileName}`).catch()
  if (!file) break
  const fileNoComments = file
    .split("\n")
    .filter((line) => !line.includes("//"))
    .join("\n")

  const json: StringObject = JSON.parse(fileNoComments)
  const hexArray = Object.entries(json)

  writeToFiles({ dirName: distDir, fileName, hexArray })
}
