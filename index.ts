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

    const hslArray = hexArrToHSL(hexArray)
    await writeJSONFile(hslArray, name, "./json-hsl")
    await writeCSSFile(hslArray, name, "./css-hsl")

    // may as well write the hex variants since we have it
    await writeCSSFile(hexArray, name, "./css-hex")
    if (fileNoComments.length !== file.length) {
      await writeJSONFile(hexArray, name, dirName)
    }
  }
}

const dirName = "./json-hex"
const dir = Deno.readDir(dirName)
await loopAndFormat(dir, dirName)
