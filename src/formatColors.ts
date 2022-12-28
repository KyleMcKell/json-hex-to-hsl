import { hexToHSL, hexToRGB } from "./colorChange.ts"

export const hexArrToHSL = (fileArr: [string, string][]) => {
  const newColors = fileArr.map((color) => {
    const [name, hex] = color
    const { hsla } = hexToHSL(hex)
    return [name, hsla]
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
