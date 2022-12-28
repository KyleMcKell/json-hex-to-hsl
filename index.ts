import type { StringObject } from "./sharedTypes.ts"

import { hexArrToHSL } from "./formatData.ts"
import { writeCSSFile, writeJSONFile } from "./writeToFile.ts"

const loopAndFormat = async (
  dir: AsyncIterable<Deno.DirEntry>,
  dirName: string
) => {
  for await (const dirEntry of dir) {
    const { name } = dirEntry
    const file = await Deno.readTextFile(`${dirName}/${name}`)
    const fileNoComments = file
      .split("\n")
      .filter((line) => !line.includes("//"))
      .join("\n")
    const json: StringObject = JSON.parse(fileNoComments)
    const hexArray = Object.entries(json)
    writeJSONFile(hexArray, name, dirName)
    writeCSSFile(hexArray, name, "./css-hex")
    const hslArray = hexArrToHSL(hexArray)
    writeJSONFile(hslArray, name, "./json-hsl")
    writeCSSFile(hslArray, name, "./css-hsl")
  }
}

const dirName = "./json-hex"
const dir = Deno.readDir(dirName)
await loopAndFormat(dir, dirName)
