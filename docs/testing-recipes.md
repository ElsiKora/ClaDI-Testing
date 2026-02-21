# Testing Recipes

## Recipe: deterministic value mocks

```ts
container.register(
	mockProvider(DateNowToken, {
		now: () => 1_700_000_000_000,
	}),
);
```

## Recipe: async factory mocks

```ts
container.register(mockProvider(DbToken, async (): Promise<IDatabase> => await createInMemoryDatabase(), { strategy: "factory" }));
```

## Recipe: override provider per test case

```ts
await overrideProvider(
	container,
	mockProvider(UserRepositoryToken, {
		findById: () => ({ id: "u1", name: "Mocked user" }),
	}),
);
```

## Recipe: isolate and cleanup

```ts
const container = createTestingContainer({ shouldValidateOnCreate: true });
try {
	// execute test
} finally {
	await resetTestingContainer(container);
}
```
