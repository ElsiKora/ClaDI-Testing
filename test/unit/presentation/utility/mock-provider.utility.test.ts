import type { Provider } from "@elsikora/cladi";

import { EDependencyLifecycle, createToken } from "@elsikora/cladi";
import { describe, expect, it } from "vitest";
import { mockProvider } from "@presentation/utility";

const ConfigToken = createToken<string>("MockProviderConfig");
const ServiceToken = createToken<string>("MockProviderService");

describe("mockProvider", () => {
	it("creates a value provider for test doubles", () => {
		const provider: Provider = mockProvider(ServiceToken, "service-double");

		expect(provider.provide).toBe(ServiceToken);
		expect("useValue" in provider).toBe(true);
	});

	it("creates a factory provider for dynamic test doubles", () => {
		const provider: Provider = mockProvider<string, [typeof ConfigToken]>(
			ServiceToken,
			(configValue: string): string => `dynamic:${configValue}`,
			{
				deps: [ConfigToken],
				lifecycle: EDependencyLifecycle.TRANSIENT,
				strategy: "factory",
			},
		);

		expect("useFactory" in provider).toBe(true);
		if ("useFactory" in provider) {
			expect(provider.deps).toEqual([ConfigToken]);
			expect(provider.lifecycle).toBe(EDependencyLifecycle.TRANSIENT);
		}
	});
});
