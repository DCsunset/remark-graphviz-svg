import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
// js extension is necessary for esm
import { remarkGraphvizSvg } from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processor = unified()
	.use(remarkParse)
	.use(remarkGraphvizSvg)
	.use(remarkRehype)
	.use(rehypeStringify);

const content = await processor.process(
	fs.readFileSync(path.join(__dirname, "example.md"))
);

console.log(content.value);
