import { Plugin } from "unified";
import { OptimizeOptions } from "svgo";

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
	/**
	 * Override default svgo options
	 * (set it to `null` to disable svgo)
	 * 
	 * @default defaultSvgoOptions
	 */
	svgoOptions?: OptimizeOptions | null
}

export declare const defaultSvgoOptions: OptimizeOptions;

export declare const remarkGraphvizSvg: Plugin<[RemarkGraphvizSvgOptions?]>;
