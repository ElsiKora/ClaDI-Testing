import type { IMockProviderOptions } from "@domain/interface";
import type { TMockProviderFactory, TMockProviderValue } from "@domain/type";
import type { Provider, Token } from "@elsikora/cladi";

import { BaseError } from "@elsikora/cladi";

/**
 * Builds a test provider using a mock value or a mock factory.
 * @param {Token<TValue>} token Provider token to mock.
 * @param {TMockProviderValue<TValue, TDependencies>} valueOrFactory Mock value or mock factory.
 * @param {IMockProviderOptions<TDependencies>} [options] Mock provider options.
 * @returns {Provider} Mock provider definition.
 * @template TValue Mocked token value type.
 * @template TDependencies Factory dependency token tuple.
 */
export function buildMockProvider<TValue, TDependencies extends ReadonlyArray<Token<unknown>> = ReadonlyArray<Token<unknown>>>(token: Token<TValue>, valueOrFactory: TMockProviderValue<TValue, TDependencies>, options: IMockProviderOptions<TDependencies> = {}): Provider {
	const strategy: "factory" | "value" = options.strategy ?? "value";

	if (strategy === "factory") {
		if (typeof valueOrFactory !== "function") {
			throw new BaseError("Factory strategy requires a callable mock factory", {
				code: "MOCK_PROVIDER_FACTORY_INVALID",
				context: {
					token: describeToken(token),
				},
				source: "buildMockProvider",
			});
		}

		return {
			deps: options.deps,
			isMultiBinding: options.isMultiBinding,
			lifecycle: options.lifecycle,
			provide: token,
			useFactory: valueOrFactory as TMockProviderFactory<TValue, TDependencies>,
		};
	}

	if (options.deps !== undefined) {
		throw new BaseError("Value strategy does not accept dependency tokens", {
			code: "MOCK_PROVIDER_DEPS_NOT_ALLOWED",
			context: {
				token: describeToken(token),
			},
			source: "buildMockProvider",
		});
	}

	return {
		isMultiBinding: options.isMultiBinding,
		provide: token,
		useValue: valueOrFactory as TValue,
	};
}

/**
 * Builds readable token description for structured diagnostics.
 * @param {Token<unknown>} token Provider token.
 * @returns {string} Human-readable token string.
 */
function describeToken(token: Token<unknown>): string {
	return token.description ? `Symbol(${token.description})` : token.toString();
}
