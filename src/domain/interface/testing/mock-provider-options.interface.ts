import type { EDependencyLifecycle, Token } from "@elsikora/cladi";

export interface IMockProviderOptions<TDependencies extends ReadonlyArray<Token<unknown>> = ReadonlyArray<Token<unknown>>> {
	deps?: TDependencies;
	isMultiBinding?: boolean;
	lifecycle?: EDependencyLifecycle;
	strategy?: "factory" | "value";
}
