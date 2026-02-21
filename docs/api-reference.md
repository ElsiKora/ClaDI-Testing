# ClaDI Testing API Reference

Compatibility:

- `@elsikora/cladi-testing` requires `@elsikora/cladi >= 2.1.0`

JSDoc source index:

- [JSDoc Links](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/jsdoc-links.md)
- [Testing Recipes](https://github.com/ElsiKora/ClaDI-Testing/blob/main/docs/testing-recipes.md)

## `createTestingContainer(options?)`

Creates and configures a ClaDI container for tests.

Signature:

```ts
function createTestingContainer(options?: ICreateTestingContainerOptions): IDIContainer;
```

Options:

- `containerOptions`: forwarded to ClaDI `createDIContainer(...)`
- `modules`: plain `IDIModule` entries and/or decorator module classes
- `providers`: providers registered after module composition
- `shouldValidateOnCreate`: runs `container.validate()`
- `shouldLockOnCreate`: runs `container.lock()`

JSDoc:

- [`createTestingContainer()`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/create/testing-container.utility.ts)
- [`ICreateTestingContainerOptions`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/domain/interface/testing/create-testing-container-options.interface.ts)

## `mockProvider(token, valueOrFactory, options?)`

Creates a provider from a mock value or factory.

Signature:

```ts
function mockProvider<TValue, TDependencies extends ReadonlyArray<Token<unknown>> = ReadonlyArray<Token<unknown>>>(token: Token<TValue>, valueOrFactory: TMockProviderValue<TValue, TDependencies>, options?: IMockProviderOptions<TDependencies>): Provider;
```

Behavior:

- default `strategy` is `"value"` and registers `useValue`
- `"factory"` strategy registers `useFactory`
- factory strategy supports `deps`, `lifecycle`, and `isMultiBinding`

JSDoc:

- [`mockProvider()`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/mock-provider.utility.ts)
- [`buildMockProvider()`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/application/utility/testing/build-mock-provider.utility.ts)
- [`IMockProviderOptions`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/domain/interface/testing/mock-provider-options.interface.ts)
- [`TMockProviderValue`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/domain/type/testing/mock-provider-value.type.ts)

## `overrideProvider(container, provider)`

Replaces providers for an existing token in the current scope.

Signature:

```ts
function overrideProvider(container: IDIContainer, provider: Provider): Promise<IOverrideProviderResult>;
```

Behavior:

- calls `unregister(token)` first
- registers replacement provider
- returns `{ wasRegistered: boolean }`

JSDoc:

- [`overrideProvider()`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/override-provider.utility.ts)
- [`IOverrideProviderResult`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/domain/interface/testing/override-provider-result.interface.ts)

## `composeTestingModules(container, modules)`

Composes test modules into the container.

Signature:

```ts
function composeTestingModules(container: IDIContainer, modules: Array<Constructor<unknown> | IDIModule>): void;
```

Supports:

- plain ClaDI `IDIModule` definitions
- classes decorated with ClaDI `@Module(...)`

JSDoc:

- [`composeTestingModules()`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/compose-testing-modules.utility.ts)

## `resetTestingContainer(container)`

Disposes the container and all active test resources/scopes.

Signature:

```ts
function resetTestingContainer(container: IDIContainer): Promise<void>;
```

JSDoc:

- [`resetTestingContainer()`](https://github.com/ElsiKora/ClaDI-Testing/blob/main/src/presentation/utility/reset-testing-container.utility.ts)
