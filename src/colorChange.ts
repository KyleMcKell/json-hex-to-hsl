export const hexToRGB = (hexString: string) => {
  const hexArray = hexString.split("")

  // get rid of the hex hash
  if (hexArray[0] === "#") {
    hexArray.shift()
  }

  let red = "0"
  let green = "0"
  let blue = "0"

  switch (hexArray.length) {
    case 3:
      red = "0x" + hexArray[0] + hexArray[0]
      green = "0x" + hexArray[1] + hexArray[1]
      blue = "0x" + hexArray[2] + hexArray[2]
      break
    case 6:
      red = "0x" + hexArray[0] + hexArray[1]
      green = "0x" + hexArray[2] + hexArray[3]
      blue = "0x" + hexArray[4] + hexArray[5]
      break
    default:
      break
  }

  const rgbString = `rgb(${Number(red)},${Number(green)},${Number(blue)})`
  return {
    rgb: rgbString,
    red: Number(red),
    green: Number(green),
    blue: Number(blue),
  }
}

export const hexToHSL = (hexString: string) => {
  let { red, green, blue } = hexToRGB(hexString)
  red /= 255
  green /= 255
  blue /= 255

  const colorMin = Math.min(red, green, blue)
  const colorMax = Math.max(red, green, blue)
  const delta = colorMax - colorMin
  let hue = 0
  let saturation = 0
  let lightness = 0

  if (delta !== 0) {
    switch (colorMax) {
      case red:
        hue = ((green - blue) / delta) % 6
        break
      case green:
        hue = (blue - red) / delta + 2
        break
      case blue:
        hue = (red - green) / delta + 4
        break
    }
  }

  hue = Math.round(hue * 60)

  if (hue < 0) hue += 360

  lightness = (colorMax + colorMin) / 2
  saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  saturation = Number((saturation * 100).toFixed(1))
  lightness = Number((lightness * 100).toFixed(1))

  const hslChain = `${hue} ${saturation}% ${lightness}%`
  const hslString = `hsl(${hslChain})`
  const hslOpacity = `hsl(${hslChain} / 1)`

  return {
    hsl: hslString,
    hslo: hslOpacity,
    hue,
    saturation,
    lightness,
  }
}
