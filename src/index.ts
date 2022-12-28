import type { StringObject } from "./sharedTypes.ts"

import { hexArrToHSL } from "./formatData.ts"
import { writeCSSFile, writeJSONFile } from "./writeToFile.ts"

const loopAndFormat = async (
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

    // may as well write the hex variants since we have it
    await writeCSSFile(hexArray, name, `${baseDir}/css-hex`)
    if (fileNoComments.length !== file.length) {
      await writeJSONFile(hexArray, name, dirName)
    }
  }
}

const baseDir = "./palettes"
const dirName = "json-hex"
const dir = Deno.readDir(`${baseDir}/${dirName}`)
await loopAndFormat(dir, dirName, baseDir)
