import { describe, expect, it } from "vitest";
import { TESTING_CONTAINER_DEFAULT_SCOPE_NAME } from "@infrastructure/constant";

describe("testing container default scope name constant", () => {
	it("uses deterministic scope name for testing containers", () => {
		expect(TESTING_CONTAINER_DEFAULT_SCOPE_NAME).toBe("test-root");
	});
});
