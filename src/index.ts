import type { StringObject } from "./sharedTypes.ts"

import { hexArrToHSL, hexArrToRGB } from "./formatColors.ts"
import { writeCSSFile, writeJSONFile } from "./writeToFile.ts"

const baseDir = "./palettes"
const distDir = "./dist"
const dir = Deno.readDir(`${baseDir}`)

for await (const dirEntry of dir) {
  const { name } = dirEntry
  const file = await Deno.readTextFile(`${baseDir}/${name}`).catch(() => null)
  if (!file) break
  const fileNoComments = file
    .split("\n")
    .filter((line) => !line.includes("//"))
    .join("\n")

  const json: StringObject = JSON.parse(fileNoComments)
  const hexArray = Object.entries(json)

  const hslArray = hexArrToHSL(hexArray)
  await writeJSONFile(hslArray, name, `${distDir}/json-hsl`)
  await writeCSSFile(hslArray, name, `${distDir}/css-hsl`)

  // we have rgb too ayo
  const rgbArray = hexArrToRGB(hexArray)
  await writeJSONFile(rgbArray, name, `${distDir}/json-rgb`)
  await writeCSSFile(rgbArray, name, `${distDir}/css-rgb`)

  // may as well write the hex variants since we have it
  await writeCSSFile(hexArray, name, `${distDir}/css-hex`)
  await writeJSONFile(hexArray, name, `${distDir}/json-hex`)
}
