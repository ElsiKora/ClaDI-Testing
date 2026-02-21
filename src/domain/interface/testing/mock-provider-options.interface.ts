import type { EDependencyLifecycle, Token } from "@elsikora/cladi";

/**
 * Options for `mockProvider()` / `buildMockProvider()`.
 * @template TDependencies Factory dependency token tuple.
 */
export interface IMockProviderOptions<TDependencies extends ReadonlyArray<Token<unknown>> = ReadonlyArray<Token<unknown>>> {
	/**
	 * Dependency tokens injected into factory strategy mocks.
	 */
	deps?: TDependencies;
	/**
	 * Registers this mock as a multi-binding provider entry.
	 */
	isMultiBinding?: boolean;
	/**
	 * Lifecycle for factory strategy mocks.
	 */
	lifecycle?: EDependencyLifecycle;
	/**
	 * Mock registration strategy.
	 * - `value`: registers `useValue`
	 * - `factory`: registers `useFactory`
	 */
	strategy?: "factory" | "value";
}
