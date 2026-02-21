import type { IMockProviderOptions } from "@domain/interface";
import type { TMockProviderValue } from "@domain/type";
import type { Provider, Token } from "@elsikora/cladi";

import { buildMockProvider } from "@application/utility";

/**
 * Creates a testing provider from a mock value or factory.
 * @param {Token<TValue>} token Provider token to mock.
 * @param {TMockProviderValue<TValue, TDependencies>} valueOrFactory Mock value or factory.
 * @param {IMockProviderOptions<TDependencies>} [options] Mock provider options.
 * @returns {Provider} Provider definition.
 * @template TValue Mocked value type.
 * @template TDependencies Factory dependency token tuple.
 */
export function mockProvider<TValue, TDependencies extends ReadonlyArray<Token<unknown>> = ReadonlyArray<Token<unknown>>>(token: Token<TValue>, valueOrFactory: TMockProviderValue<TValue, TDependencies>, options: IMockProviderOptions<TDependencies> = {}): Provider {
	return buildMockProvider(token, valueOrFactory, options);
}
