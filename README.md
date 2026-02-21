# ClaDI Testing

Testing-first utilities for applications built with [`@elsikora/cladi`](https://www.npmjs.com/package/@elsikora/cladi).

ClaDI Testing keeps test setup explicit and composable while reducing boilerplate for common testing tasks:

- create a ready-to-use test container
- compose plain and decorator-based modules
- build deterministic mock providers
- override providers in-place during tests
- reset/dispose containers safely between test cases

## Installation

```bash
npm install -D @elsikora/cladi-testing @elsikora/cladi
```

Compatibility:

- `@elsikora/cladi-testing` requires `@elsikora/cladi >= 2.1.0`

## Quick Start

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

// Initial assertion
console.log(container.resolve(UserServiceToken).readName("u1")); // "Alice"

// Override dependency for a specific scenario
await overrideProvider(
	container,
	mockProvider(
		UserRepositoryToken,
		(): IUserRepository => ({
			findNameById: () => "Bob",
		}),
		{ strategy: "factory" },
	),
);

console.log(container.resolve(UserServiceToken).readName("u1")); // "Bob"

await resetTestingContainer(container);
```

## Public API

### `createTestingContainer(options?)`

Creates a ClaDI container preconfigured for tests.

Options:

- `containerOptions`: forwarded to ClaDI `createDIContainer(...)`
- `modules`: `IDIModule` and/or decorated module classes
- `providers`: providers registered after module composition
- `shouldValidateOnCreate`: run `validate()` on creation
- `shouldLockOnCreate`: run `lock()` on creation

### `mockProvider(token, valueOrFactory, options?)`

Creates a provider for test doubles.

- default strategy: `"value"` (uses `useValue`)
- `"factory"` strategy: uses `useFactory`, supports `deps`, `lifecycle`, and async factories

### `overrideProvider(container, provider)`

Replaces existing providers for the same token in the current scope:

- performs `unregister(token)` first
- registers replacement provider
- returns `{ wasRegistered: boolean }`

### `resetTestingContainer(container)`

Disposes the container and all tracked scopes/resources.

### `composeTestingModules(container, modules)`

Composes test modules into container:

- plain modules via ClaDI module contracts
- decorator module classes through ClaDI decorator composition pipeline

## Architecture

The package follows clean architecture boundaries:

- `domain`: options/contracts/types
- `application`: provider-building logic
- `infrastructure`: defaults/constants
- `presentation`: public utilities used by tests

Source entrypoint:

- `src/index.ts`

## Development Scripts

- `npm run lint`
- `npm run lint:types`
- `npm run test:unit`
- `npm run test:e2e`
- `npm run test:all`
- `npm run build`

## License

MIT
