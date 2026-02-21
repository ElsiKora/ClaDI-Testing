import type { Token } from "@elsikora/cladi";

import type { TMockProviderFactory } from "./mock-provider-factory.type";

/**
 * Accepted mock payload for `mockProvider()`.
 * Supports direct values and factory functions.
 * @template TValue Mocked token value type.
 * @template TDependencies Factory dependency token tuple.
 */
export type TMockProviderValue<TValue, TDependencies extends ReadonlyArray<Token<unknown>> = ReadonlyArray<Token<unknown>>> = TMockProviderFactory<TValue, TDependencies> | TValue;
