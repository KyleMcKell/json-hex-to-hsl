import type { StringObject } from "./sharedTypes.ts"

import { hexArrToHSL, hexArrToRGB } from "./formatColors.ts"
import { writeCSSFile, writeJSONFile } from "./writeToFile.ts"

const formatFilesInDir = async (
  dir: AsyncIterable<Deno.DirEntry>,
  dirName: string,
  baseDir = "./palettes"
) => {
  for await (const dirEntry of dir) {
    const { name } = dirEntry
    const file = await Deno.readTextFile(`${baseDir}/${dirName}/${name}`)
    const fileNoComments = file
      .split("\n")
      .filter((line) => !line.includes("//"))
      .join("\n")

    const json: StringObject = JSON.parse(fileNoComments)
    const hexArray = Object.entries(json)

    const hslArray = hexArrToHSL(hexArray)
    await writeJSONFile(hslArray, name, `${baseDir}/json-hsl`)
    await writeCSSFile(hslArray, name, `${baseDir}/css-hsl`)

    // we have rgb too ayo
    const rgbArray = hexArrToRGB(hexArray)
    await writeJSONFile(rgbArray, name, `${baseDir}/json-rgb`)
    await writeCSSFile(rgbArray, name, `${baseDir}/css-rgb`)

    // may as well write the hex variants since we have it
    await writeCSSFile(hexArray, name, `${baseDir}/css-hex`)
    await writeJSONFile(hexArray, name, `${baseDir}/${dirName}`)
  }
}

const baseDir = "./palettes"
const dirName = "json-hex"
const dir = Deno.readDir(`${baseDir}/${dirName}`)
await formatFilesInDir(dir, dirName, baseDir)
