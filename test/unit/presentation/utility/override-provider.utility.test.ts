import type { IDIContainer, Token } from "@elsikora/cladi";

import { createToken } from "@elsikora/cladi";
import { describe, expect, it } from "vitest";
import { createTestingContainer, overrideProvider } from "@presentation/utility";

const ServiceToken: Token<string> = createToken<string>("OverrideTestingService");
const MissingToken: Token<string> = createToken<string>("OverrideMissingService");

describe("overrideProvider", () => {
	it("replaces an existing provider and reports replacement", async () => {
		const container: IDIContainer = createTestingContainer({
			providers: [{ provide: ServiceToken, useValue: "original" }],
		});

		const result = await overrideProvider(container, {
			provide: ServiceToken,
			useValue: "overridden",
		});

		expect(result.wasRegistered).toBe(true);
		expect(container.resolve(ServiceToken)).toBe("overridden");
	});

	it("registers provider when token was missing", async () => {
		const container: IDIContainer = createTestingContainer();

		const result = await overrideProvider(container, {
			provide: MissingToken,
			useValue: "new-value",
		});

		expect(result.wasRegistered).toBe(false);
		expect(container.resolve(MissingToken)).toBe("new-value");
	});
});
