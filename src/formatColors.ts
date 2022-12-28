import { hexToHSL, hexToRGB } from "./colorChange.ts"

export const hexArrToHSL = (fileArr: [string, string][]) => {
  const newColors = fileArr.map((color) => {
    const [name, hex] = color
    const { hslo } = hexToHSL(hex)
    return [name, hslo]
  })
  return newColors
}

export const hexArrToRGB = (fileArr: [string, string][]) => {
  const newColors = fileArr.map((color) => {
    const [name, hex] = color
    const { rgb } = hexToRGB(hex)
    return [name, rgb]
  })
  return newColors
}
