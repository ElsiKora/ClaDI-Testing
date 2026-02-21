import type { IDIContainer, Token } from "@elsikora/cladi";

import { createToken } from "@elsikora/cladi";
import { describe, expect, it } from "vitest";
import { createTestingContainer, resetTestingContainer } from "@presentation/utility";

const ServiceToken: Token<string> = createToken<string>("ResetTestingService");

describe("resetTestingContainer", () => {
	it("disposes the container and prevents further resolutions", async () => {
		const container: IDIContainer = createTestingContainer({
			providers: [{ provide: ServiceToken, useValue: "active" }],
		});

		expect(container.resolve(ServiceToken)).toBe("active");

		await resetTestingContainer(container);

		expect(() => container.resolve(ServiceToken)).toThrow("Scope is already disposed");
	});
});
