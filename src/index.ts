import { Plugin } from "unified";
import { RemarkGraphvizSvgOptions } from "..";
import { visit } from "unist-util-visit";
import { Code, Parent } from "mdast";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import hpccWasm from "@hpcc-js/wasm";
import { optimize, OptimizeOptions, OptimizedError } from "svgo";

export const defaultSvgoOptions: OptimizeOptions = {
	plugins: [
		"preset-default"
	]
};

export const remarkGraphvizSvg: Plugin<[RemarkGraphvizSvgOptions?]> = (options) => {
	// Destructure options
	const {
		language = "graphviz",
		graphvizEngine = "dot",
		svgoOptions = defaultSvgoOptions
	} = (options ?? {});

	// transformer can be async
	return async function transformer(ast) {
		const instances: [string, number, Parent][] = [];

		// visit can't be async
		visit(ast, { type: "code", lang: language }, (node: Code, index: number, parent: Parent) => {
			instances.push([node.value, index, parent]);
		});

		// Convert svg to hast
		const processor = unified()
			.use(rehypeParse, { fragment: true, space: "svg" });

		// Wait for rendering all instances
		const diagrams = await Promise.all(instances.map(async ([code]) => {
			let svg = await hpccWasm.graphviz
				.layout(code, "svg", graphvizEngine);
			// optimize svg
			if (svgoOptions !== null) {
				const result = optimize(svg, svgoOptions);
				if (result.error !== undefined) {
					throw new Error(`Failed to optimize svg: ${result.error}`);
				}
				else {
					svg = result.data;
				}
			}

			return svg;
		}));

		// Replace original code snippets
		instances.forEach(([, index, parent], i) => {
			parent.children.splice(index, 1, {
				type: "paragraph",
				children: [{
					type: "html",
					value: diagrams[i]
				}],
				data: {
					hChildren: processor.parse(diagrams[i]).children
				}
			})
		});
	};
};
