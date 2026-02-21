import type { IOverrideProviderResult } from "@domain/interface";
import type { IDIContainer, Provider, Token } from "@elsikora/cladi";

/**
 * Overrides a provider token in the target test container.
 * @param {IDIContainer} container Target container.
 * @param {Provider} provider Replacement provider.
 * @returns {Promise<IOverrideProviderResult>} Override result metadata.
 */
export async function overrideProvider(container: IDIContainer, provider: Provider): Promise<IOverrideProviderResult> {
	const providerKey: Token<unknown> = provider.provide as Token<unknown>;
	const wasRegistered: boolean = await container.unregister(providerKey);
	container.register(provider);

	return { wasRegistered };
}
