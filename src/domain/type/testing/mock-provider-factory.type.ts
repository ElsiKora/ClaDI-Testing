import type { Token } from "@elsikora/cladi";

/**
 * Factory function signature for mock providers.
 * @template TValue Factory result type.
 * @template TDependencies Factory dependency token tuple.
 */
export type TMockProviderFactory<TValue, TDependencies extends ReadonlyArray<Token<unknown>> = ReadonlyArray<Token<unknown>>> = (
	...dependencies: number extends TDependencies["length"]
		? ReadonlyArray<unknown>
		: {
				[Index in keyof TDependencies]: TDependencies[Index] extends Token<infer TDependencyValue> ? TDependencyValue : never;
			}
) => Promise<TValue> | TValue;
