import type { StringObject } from "./sharedTypes.ts"

import { hexArrToHSL, hexArrToRGB } from "./formatColors.ts"
import { writeCSSFile, writeJSONFile } from "./writeToFile.ts"

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

  const hslArray = hexArrToHSL(hexArray)
  await writeJSONFile(hslArray, fileName, `${distDir}/json-hsl`)
  await writeCSSFile(hslArray, fileName, `${distDir}/css-hsl`)

  // we have rgb too ayo
  const rgbArray = hexArrToRGB(hexArray)
  await writeJSONFile(rgbArray, fileName, `${distDir}/json-rgb`)
  await writeCSSFile(rgbArray, fileName, `${distDir}/css-rgb`)

  // may as well write the hex variants since we have it
  await writeCSSFile(hexArray, fileName, `${distDir}/css-hex`)
  await writeJSONFile(hexArray, fileName, `${distDir}/json-hex`)
}
