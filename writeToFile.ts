import type { StringObject } from "./sharedTypes.ts"

export const writeJSONFile = async (colorArray: string[][], jsonFileName: string, dirName: string) => {
  const colorObject: StringObject = Object.fromEntries(colorArray)
  const colorJSON = JSON.stringify(colorObject)
  await Deno.mkdir(dirName, { recursive: true })
  Deno.writeTextFile(`${dirName}/${jsonFileName}`, colorJSON)
}

export const writeCSSFile = async (colorArray: string[][], jsonFileName: string, dirName: string) => {
  const turnNameToCssVar = colorArray.map((colorArr) => {
    const [key, value] = colorArr
    const formatted = `--${key}: ${value};`
    return formatted
  })
  turnNameToCssVar.unshift("html {")
  turnNameToCssVar.push("}")

  const joined = turnNameToCssVar.join("\n")
  const cssFileName = `${jsonFileName.split(".json")[0]}.css`

  await Deno.mkdir(dirName, { recursive: true })
  Deno.writeTextFile(`${dirName}/${cssFileName}`, joined)
}
