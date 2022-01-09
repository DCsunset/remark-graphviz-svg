# remark-graphviz-svg

[![Version](https://img.shields.io/npm/v/remark-graphviz-svg.svg)](https://npmjs.org/package/remark-graphviz-svg)

A remark plugin to convert GraphViz code into SVG diagram

## Features

* Custom language name for code blocks
* Support different GraphViz [engines](https://graphviz.org/docs/layouts/)
* SVG Optimization using [svgo](https://github.com/svg/svgo)

## Installation

```
npm install remark-graphviz-svg
```

Note: This package uses [ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
Use Node 12+ and ESM import syntax to use this package.

## Usage

```js
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { remarkGraphvizSvg } from "remark-graphviz-svg";
import fs from "fs";

const processor = unified()
  .use(remarkParse)
  .use(remarkGraphvizSvg)
  .use(remarkRehype)
  .use(rehypeStringify);

const content = await processor.process(
  fs.readFileSync("example.md")
);

console.log(content.value);
```

Suppose the `example.md` has the following content:

````md
# Hello, world

```graphviz
digraph {
  A -> B
}
```
````

Then the output of the above code is similar to the following:

```html
<h1>Hello, world</h1>
<p>
  <svg><!-- generated svg --></svg>
</p>
```


## Options

* `language`: Render GraphViz diagrams on specific language blocks. (Default: `graphviz`)
* `graphvizEngine`: GraphViz engine to use. See available engines [here](https://graphviz.org/docs/layouts/). (Default: `dot`)
* `svgoOptions`: Override default svgo options. Set it to `null` to disable svgo. (Default: `defaultSvgoOptions`)

## License

GPL-3.0
