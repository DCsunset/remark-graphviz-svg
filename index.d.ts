export type GraphvizEngine = "circo" | "dot" | "fdp" | "sfdp" | "neato" | "osage" | "patchwork" | "twopi";

export interface RemarkGraphvizSvgOptions {
	/**
	 * Render graphviz on specific language code blocks 
	 * 
	 * @default "graphviz"
	 */
	language?: string,
	/**
	 * Graphviz engine to render the code
	 * 
	 * @default "dot"
	 */
	graphvizEngine?: GraphvizEngine
}

export declare const remarkGraphvizSvg: Plugin<[RemarkGraphvizSvgOptions?]>;
