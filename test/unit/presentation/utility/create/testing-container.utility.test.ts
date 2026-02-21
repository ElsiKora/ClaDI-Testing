import type { IDIContainer, IDIModule, Token } from "@elsikora/cladi";

import { createModule, createToken } from "@elsikora/cladi";
import { describe, expect, it } from "vitest";
import { createTestingContainer } from "@presentation/utility";

const ConfigToken: Token<string> = createToken<string>("CreateTestingContainerConfig");
const ServiceToken: Token<string> = createToken<string>("CreateTestingContainerService");
const ExtraToken: Token<string> = createToken<string>("CreateTestingContainerExtra");

describe("createTestingContainer", () => {
	it("registers modules and providers from options", () => {
		const baseModule: IDIModule = createModule({
			exports: [ConfigToken],
			name: "base-testing-module",
			providers: [{ provide: ConfigToken, useValue: "base-config" }],
		});
		const container: IDIContainer = createTestingContainer({
			modules: [baseModule],
			providers: [
				{
					deps: [ConfigToken],
					provide: ServiceToken,
					useFactory: (configValue: string): string => `service:${configValue}`,
				},
			],
			shouldValidateOnCreate: true,
		});

		expect(container.resolve(ServiceToken)).toBe("service:base-config");
	});

	it("locks the container when lock option is enabled", () => {
		const container: IDIContainer = createTestingContainer({
			shouldLockOnCreate: true,
		});

		expect(container.isLocked).toBe(true);
		expect(() => container.register({ provide: ExtraToken, useValue: "blocked" })).toThrow("Scope is locked for registrations");
	});
});
