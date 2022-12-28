import { hexToHSL } from "./colorChange.ts"

export const hexArrToHSL = (fileArr: [string, string][]) => {
  const newColors = fileArr.map((color) => {
    const [name, hex] = color
    const { hslo } = hexToHSL(hex)
    return [name, hslo]
  })
  return newColors
}
