# Testing Recipes

## Prerequisites

```bash
npm install -D @elsikora/cladi @elsikora/cladi-testing
```

API and JSDoc:

- [API Reference](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/api-reference.md)
- [JSDoc Links](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/jsdoc-links.md)

## Recipe: deterministic value mocks

```ts
container.register(
	mockProvider(DateNowToken, {
		now: () => 1_700_000_000_000,
	}),
);
```

Use this when tests must be stable and independent from wall-clock time.

## Recipe: async factory mocks

```ts
container.register(mockProvider(DbToken, async (): Promise<IDatabase> => await createInMemoryDatabase(), { strategy: "factory" }));
```

Use this for async resources (DB clients, HTTP clients, gateways) without touching production wiring.

## Recipe: override provider per test case

```ts
await overrideProvider(
	container,
	mockProvider(UserRepositoryToken, {
		findById: () => ({ id: "u1", name: "Mocked user" }),
	}),
);
```

Use this when each test case needs a different dependency behavior.

## Recipe: isolate and cleanup

```ts
const container = createTestingContainer({ shouldValidateOnCreate: true });
try {
	// execute test
} finally {
	await resetTestingContainer(container);
}
```

Use this pattern to avoid leaked scoped/singleton resources between tests.

## Recipe: suite-level setup with Vitest

```ts
import { afterEach, beforeEach } from "vitest";
import { createTestingContainer, resetTestingContainer } from "@elsikora/cladi-testing";

let container: ReturnType<typeof createTestingContainer>;

beforeEach(() => {
	container = createTestingContainer({
		shouldValidateOnCreate: true,
	});
});

afterEach(async () => {
	await resetTestingContainer(container);
});
```

## Recipe: module-first tests

```ts
const container = createTestingContainer({
	modules: [AppModule],
	shouldValidateOnCreate: true,
});
```

Use this when you want test setup to mirror production composition root structure.
