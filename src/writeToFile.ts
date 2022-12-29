import type { StringObject } from "./sharedTypes.ts"

import { hexArrToHSL, hexArrToRGB } from "./formatColors.ts"

type WriteToFilesProps = {
  colorType: "rgb" | "hex" | "hsl"
  hexArray: [string, string][]
  fileName: string
  dirName: string
}

export const writeToFiles = async ({
  colorType,
  hexArray,
  fileName,
  dirName,
}: WriteToFilesProps) => {
  switch (colorType) {
    case "rgb": {
      const rgbArray = hexArrToRGB(hexArray)
      await writeJSONFile(rgbArray, fileName, `${dirName}/json-rgb`)
      await writeCSSFile(rgbArray, fileName, `${dirName}/css-rgb`)
      break
    }
    case "hsl": {
      const hslArray = hexArrToHSL(hexArray)
      await writeJSONFile(hslArray, fileName, `${dirName}/json-hsl`)
      await writeCSSFile(hslArray, fileName, `${dirName}/css-hsl`)
      break
    }
    case "hex": {
      await writeCSSFile(hexArray, fileName, `${dirName}/css-hex`)
      await writeJSONFile(hexArray, fileName, `${dirName}/json-hex`)
      break
    }
  }
}

export const writeJSONFile = async (
  colorArray: string[][],
  jsonFileName: string,
  dirName: string
) => {
  const colorObject: StringObject = Object.fromEntries(colorArray)
  const colorJSON = JSON.stringify(colorObject)
  await Deno.mkdir(dirName, { recursive: true })
  Deno.writeTextFile(`${dirName}/${jsonFileName}`, colorJSON)
}

export const writeCSSFile = async (
  colorArray: string[][],
  jsonFileName: string,
  dirName: string
) => {
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
