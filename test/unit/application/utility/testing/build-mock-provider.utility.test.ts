import type { Provider } from "@elsikora/cladi";

import { EDependencyLifecycle, createToken } from "@elsikora/cladi";
import { describe, expect, it } from "vitest";
import { BaseError } from "@elsikora/cladi";
import { buildMockProvider } from "@application/utility";

const ConfigToken = createToken<string>("BuildMockConfig");
const ServiceToken = createToken<string>("BuildMockService");

describe("buildMockProvider", () => {
	it("builds value providers by default", () => {
		const provider: Provider = buildMockProvider(ServiceToken, "value-mock");

		expect(provider.provide).toBe(ServiceToken);
		expect("useValue" in provider).toBe(true);
		if ("useValue" in provider) {
			expect(provider.useValue).toBe("value-mock");
		}
	});

	it("builds factory providers when strategy is factory", () => {
		const provider: Provider = buildMockProvider<string, [typeof ConfigToken]>(
			ServiceToken,
			(configValue: string): string => `service:${configValue}`,
			{
				deps: [ConfigToken],
				lifecycle: EDependencyLifecycle.SINGLETON,
				strategy: "factory",
			},
		);

		expect("useFactory" in provider).toBe(true);
		if ("useFactory" in provider) {
			expect(provider.deps).toEqual([ConfigToken]);
			expect(provider.lifecycle).toBe(EDependencyLifecycle.SINGLETON);
		}
	});

	it("throws structured error when factory strategy receives non-function", () => {
		try {
			buildMockProvider(ServiceToken, "invalid-factory", {
				strategy: "factory",
			});
			expect.unreachable("buildMockProvider must throw for invalid factory strategy input");
		} catch (error) {
			expect(error).toBeInstanceOf(BaseError);
			expect((error as BaseError).code).toBe("MOCK_PROVIDER_FACTORY_INVALID");
		}
	});

	it("throws structured error when value strategy receives deps", () => {
		try {
			buildMockProvider(ServiceToken, "invalid-value-config", {
				deps: [ConfigToken],
				strategy: "value",
			});
			expect.unreachable("buildMockProvider must throw when deps are used with value strategy");
		} catch (error) {
			expect(error).toBeInstanceOf(BaseError);
			expect((error as BaseError).code).toBe("MOCK_PROVIDER_DEPS_NOT_ALLOWED");
		}
	});
});
