# JSON Hex to HSL

This simple Deno Script takes a dir with JSON files (`palette`) that have hex values, and spits out 5 new dirs:

- `css-hex`
- `json-hex`
- `css-hsl`
- `json-hsl`
- `css-rgb`
- `json-rgb`

This was specifically made to change the [Refactoring UI](https://www.refactoringui.com/) color palettes into a more usable format. I got tired of having to translate the hex values into something better. Making it into css files and json files was a nice medium.

If you'd like to, you can also transform your own palettes into these different formats. Edit the palette (or make many) that are inside of `json-hex` and you'll get some cool new HSL palettes!

# How to Run

`deno run --allow-all src/index.ts`

Have a dir located here `palettes/json-hex` and also a file within it

Currently the contents of this look as follows:

```
palettes
| json-hex
|| example-palette.json
```

```jsonc
// example-palette.json
{
  "trueblack": "#000",
  "truewhite": "#fff",
  "white": "#fbfcfe",
  "black": "#10d121",
  "primary": "#2bb0ed",
  "secondary": "#da127d",
  "tertiary": "#27ab83"
}
```

Note: You will also need to be sure that your JSON files don't have a trailing comma
