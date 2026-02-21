# ClaDI Testing

Testing-first utilities for applications built with [`@elsikora/cladi`](https://www.npmjs.com/package/@elsikora/cladi).

`@elsikora/cladi-testing` keeps test setup explicit and composable while reducing repeated wiring for common test scenarios.

## What it solves

- create a dedicated DI container for each test suite or case
- compose plain and decorator modules with one helper
- build deterministic value/factory mocks with typed tokens
- override providers in-place for scenario-specific tests
- reset and dispose resources safely between test runs

## Installation

```bash
npm install -D @elsikora/cladi @elsikora/cladi-testing
```

Compatibility:

- `@elsikora/cladi-testing` requires `@elsikora/cladi >= 2.1.0`

## Documentation

- [Docs Index](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/README.md)
- [API Reference](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/api-reference.md)
- [Testing Recipes](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/testing-recipes.md)
- [Examples](https://github.com/ElsiKora/ClaDI-Testing/blob/main/examples/README.md)
- [JSDoc Links](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/jsdoc-links.md)

## JSDoc quick links

- [`createTestingContainer()` JSDoc](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/create/testing-container.utility.ts)
- [`mockProvider()` JSDoc](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/mock-provider.utility.ts)
- [`overrideProvider()` JSDoc](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/override-provider.utility.ts)
- [`resetTestingContainer()` JSDoc](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/reset-testing-container.utility.ts)
- [`composeTestingModules()` JSDoc](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/compose-testing-modules.utility.ts)

## Quick start

```ts
import { createModule, createToken } from "@elsikora/cladi";
import { createTestingContainer, mockProvider, overrideProvider, resetTestingContainer } from "@elsikora/cladi-testing";

interface IUserRepository {
	findNameById(id: string): string | undefined;
}

interface IUserService {
	readName(id: string): string;
}

const UserRepositoryToken = createToken<IUserRepository>("UserRepository");
const UserServiceToken = createToken<IUserService>("UserService");

const appModule = createModule({
	exports: [UserServiceToken],
	providers: [
		mockProvider(UserRepositoryToken, { findNameById: () => "Alice" }),
		{
			deps: [UserRepositoryToken],
			provide: UserServiceToken,
			useFactory: (repository: IUserRepository): IUserService => ({
				readName: (id: string): string => repository.findNameById(id) ?? "unknown",
			}),
		},
	],
});

const container = createTestingContainer({
	modules: [appModule],
	shouldValidateOnCreate: true,
});

console.log(container.resolve(UserServiceToken).readName("u1")); // "Alice"

await overrideProvider(container, mockProvider(UserRepositoryToken, { findNameById: () => "Bob" }));

console.log(container.resolve(UserServiceToken).readName("u1")); // "Bob"
await resetTestingContainer(container);
```

## Typical Vitest pattern

```ts
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { createTestingContainer, resetTestingContainer } from "@elsikora/cladi-testing";

let container: ReturnType<typeof createTestingContainer>;

beforeEach(() => {
	container = createTestingContainer({ shouldValidateOnCreate: true });
});

afterEach(async () => {
	await resetTestingContainer(container);
});

describe("my feature", () => {
	it("resolves dependencies", () => {
		expect(container).toBeDefined();
	});
});
```

## API at a glance

- `createTestingContainer(options?)` - create and preconfigure a test container.
- `mockProvider(token, valueOrFactory, options?)` - build typed value/factory mocks.
- `overrideProvider(container, provider)` - replace provider registration for a token.
- `resetTestingContainer(container)` - dispose container and resource graph.
- `composeTestingModules(container, modules)` - compose plain and decorator modules.

Detailed behavior and signatures:

- [API Reference](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/api-reference.md)

## Architecture

The package follows clean architecture boundaries:

- `domain`: contracts, options, and shared types
- `application`: provider-building use-case utilities
- `infrastructure`: default constants and low-level details
- `presentation`: public API used directly in tests

Entrypoint:

- `src/index.ts`

## Development scripts

- `npm run lint`
- `npm run lint:types`
- `npm run test:unit`
- `npm run test:e2e`
- `npm run test:all`
- `npm run build`

## License

MIT
