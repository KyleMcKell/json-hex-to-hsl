# JSON Hex to HSL

This simple Deno Script takes a dir with JSON files (`json-hex`) that have hex values, and spits out 3 new dirs:

- `css-hex`
- `css-hsl`
- `json-hsl`

This was specifically made to change the [Refactoring UI](https://www.refactoringui.com/) color palettes into a more usable format. I got tired of having to translate the hex values into something better. Making it into css files and json files was a nice medium.

If you'd like to, you can also transform your own palettes into these different formats. Edit the palette (or make many) that are inside of `json-hex` and you'll get some cool new HSL palettes!
